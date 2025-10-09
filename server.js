const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const DB_PATH = process.env.DB_PATH || "./db.sqlite";
const db = new sqlite3.Database(DB_PATH);
const JWT_SECRET = process.env.JWT_SECRET || "secretkey123";

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    faculty TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    sponsor TEXT,
    faculty TEXT,
    description TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    jobId INTEGER,
    appliedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, faculty } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run(
    "INSERT INTO users (name,email,password,faculty) VALUES (?,?,?,?)",
    [name, email, hashed, faculty],
    function (err) {
      if (err) return res.status(400).json({ error: "Signup failed", details: err.message });
      res.json({ message: "User registered" });
    }
  );
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) return res.status(400).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
  });
});

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/api/jobs", (req, res) => {
  db.all("SELECT * FROM jobs", [], (err, rows) => res.json(rows));
});

app.post("/api/jobs/apply", auth, (req, res) => {
  const { jobId } = req.body;
  db.get("SELECT * FROM applications WHERE userId=? AND jobId=?", [req.user.id, jobId], (err, row) => {
    if (row) return res.status(400).json({ error: "Already applied" });
    db.run("INSERT INTO applications (userId,jobId) VALUES (?,?)", [req.user.id, jobId], function (err2) {
      if (err2) return res.status(500).json({ error: "Failed to apply" });
      res.json({ message: "Application submitted" });
    });
  });
});

app.get("/api/applications", auth, (req, res) => {
  db.all(
    "SELECT jobs.title,jobs.description,jobs.sponsor FROM applications JOIN jobs ON applications.jobId=jobs.id WHERE applications.userId=?",
    [req.user.id],
    (err, rows) => res.json(rows)
  );
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SQLite Server running on port ${PORT}`));
