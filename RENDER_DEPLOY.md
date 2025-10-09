# Quick Render Deployment Guide

## Your app is ready to deploy! Follow these steps:

### Step 1: Install Git (if not already installed)
Download and install Git from: https://git-scm.com/download/win

### Step 2: Push to GitHub

Open a new terminal in this folder and run:

```bash
git init
git add .
git commit -m "Ready for deployment"
```

Then create a new repository on GitHub and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Render (EASIEST METHOD)

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub account
4. Select the repository you just created
5. Render will detect `render.yaml` and show the configuration
6. Click **"Apply"** - Render will automatically:
   - Create the web service
   - Install dependencies
   - Attach a persistent disk for your database
   - Generate a secure JWT_SECRET
   - Deploy your app

### Step 4: Seed the Database (ONE TIME ONLY)

After deployment completes:

1. In Render dashboard, click on your service
2. Click **"Shell"** (top right corner)
3. Type: `node seed.js` and press Enter
4. Wait for confirmation: "✓ 5 jobs seeded into SQLite"

### Step 5: Test Your Live Site!

1. Render will show your URL: `https://career-mapper-XXXX.onrender.com`
2. Click the URL to open your site
3. Test signup and login:
   - Click **Sign Up** → Create an account
   - Click **Login** → Log in
   - Go to **Careers** → Apply to jobs

## ✅ That's it! Your site is LIVE!

---

## Important Notes:

- **Free tier**: Service sleeps after 15 min of inactivity (first load takes ~30 sec)
- **Database**: Persists on the disk at `/data/db.sqlite`
- **Auto-deploy**: Push to GitHub = automatic redeployment
- **HTTPS**: Automatically enabled with free SSL certificate

## Need Help?

Check `DEPLOYMENT.md` for detailed troubleshooting and advanced options.
