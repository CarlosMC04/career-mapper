# Quick Start Guide

## Setup in 5 Minutes

### Step 1: Install Node.js
Download and install from: https://nodejs.org (choose LTS version)

### Step 2: Open Terminal
- Press `Win + R`
- Type `cmd` and press Enter
- Navigate to project folder:
```bash
cd "c:\Users\Dawie Van Dyk\Desktop\Career Mapper\career-mapper"
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Initialize Database
```bash
npm run seed
```
You should see:
```
✓ Tables created
✓ 5 jobs seeded into SQLite
Database ready! Run 'npm start' to start the server.
```

### Step 5: Start Server
```bash
npm start
```
You should see:
```
SQLite Server running on port 3000
```

### Step 6: Open Browser
Navigate to: `http://localhost:3000`

---

## Testing the Application

### Test 1: Career Matching (No login required)
1. Go to **Home** page
2. Fill in:
   - **Interests**: `data, analytics`
   - **Skills**: `SQL, Excel, Python`
3. Click **Find Careers**
4. See matched careers with skill gap chart

### Test 2: Create Account
1. Click **Sign Up**
2. Fill in:
   - **Name**: `Test User`
   - **Email**: `test@example.com`
   - **Password**: `password123`
   - **Faculty**: `IT`
3. Click **Create Account**
4. You'll be redirected to login

### Test 3: Login
1. Click **Login**
2. Enter:
   - **Email**: `test@example.com`
   - **Password**: `password123`
3. Click **Log In**
4. Notice navbar shows "Hi, Test User"

### Test 4: Apply for Jobs
1. Click **Careers**
2. Browse available jobs
3. Click **Apply Now** on any job
4. See confirmation message

---

## Troubleshooting

**Problem**: `npm: command not found`  
**Solution**: Install Node.js and restart terminal

**Problem**: Port 3000 already in use  
**Solution**: Stop other servers or change port in `server.js`

**Problem**: Database errors  
**Solution**: Delete `db.sqlite` and run `npm run seed` again

**Problem**: Login not working  
**Solution**: Check browser console (F12) for errors

---

## Backend Features

✅ User authentication (signup/login with JWT)  
✅ Password hashing with bcrypt  
✅ SQLite database with 3 tables (users, jobs, applications)  
✅ Job browsing and applications  
✅ Protected routes (must login to apply)  

## Frontend Features

✅ Career matching algorithm  
✅ Skill gap visualization  
✅ Profile persistence (localStorage)  
✅ Responsive design  
✅ Real-time API integration  

---

## Next Steps

- Add more jobs in `seed.js`
- Customize career matching in `script.js`
- Style the UI in `style.css`
- Add profile images to `Media/` folder
