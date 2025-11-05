const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

const jobs = [
  { title: "Software Developer Intern", sponsor: "TechCorp", faculty: "IT", description: "Assist in web app development." },
  { title: "Lab Assistant", sponsor: "Campus Labs", faculty: "Science", description: "Support research staff in experiments." },
  { title: "Tutor", sponsor: "Learning Center", faculty: "Education", description: "Help students with academic support." },
  { title: "Marketing Assistant", sponsor: "Student Union", faculty: "Commerce", description: "Create content for social media campaigns." },
  { title: "Research Assistant", sponsor: "Engineering Dept", faculty: "Engineering", description: "Support faculty with research projects." },
];

db.serialize(() => {
  // Create all tables
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
  
  console.log("✓ Tables created");
  
  // Seed jobs
  db.run("DELETE FROM jobs");
  const stmt = db.prepare("INSERT INTO jobs (title,sponsor,faculty,description) VALUES (?,?,?,?)");
  jobs.forEach(j => stmt.run(j.title, j.sponsor, j.faculty, j.description));
  stmt.finalize();
  console.log(`✓ ${jobs.length} jobs seeded into SQLite`);
  console.log("\nDatabase ready! Run 'npm start' to start the server.");
  
  db.close();
});
