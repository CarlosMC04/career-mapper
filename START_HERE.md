# 🚀 Deploy Your CareerHub Site - Complete Checklist

Your app is **100% ready** for deployment! Follow these steps in order:

---

## ✅ Step 1: Install Git (5 minutes)

**If Git is not installed:**

1. Download Git: https://git-scm.com/download/win
2. Run the installer (use default settings)
3. Restart your terminal/PowerShell
4. Verify: Open terminal and type `git --version`

---

## ✅ Step 2: Create GitHub Account (2 minutes)

**If you don't have a GitHub account:**

1. Go to: https://github.com/signup
2. Create a free account
3. Verify your email

---

## ✅ Step 3: Run Deployment Script (3 minutes)

**Option A - Automated (Recommended):**

1. Open PowerShell or Command Prompt in this folder
2. Run: `deploy.bat`
3. Follow the prompts

**Option B - Manual:**

Open terminal in this folder and run these commands:

```bash
# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Ready for Render deployment"

# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## ✅ Step 4: Deploy on Render (3 minutes)

1. **Go to Render:** https://dashboard.render.com/
   - Sign up with GitHub (easiest) or email

2. **Create Blueprint:**
   - Click **"New +"** button (top right)
   - Select **"Blueprint"**
   - Click **"Connect GitHub"** and authorize Render
   - Select your `career-mapper` repository
   - Render will detect `render.yaml` automatically

3. **Review Configuration:**
   - Service name: `career-mapper`
   - Environment: Node
   - Persistent disk: 1GB at `/data`
   - Environment variables: Auto-configured

4. **Deploy:**
   - Click **"Apply"**
   - Wait 2-3 minutes for build and deployment

---

## ✅ Step 5: Seed Database (1 minute)

**After deployment completes:**

1. In Render dashboard, click on your service name
2. Click **"Shell"** tab (top right)
3. Type: `node seed.js`
4. Press Enter
5. Wait for: `✓ 5 jobs seeded into SQLite`

---

## ✅ Step 6: Test Your Live Site! 🎉

1. **Get your URL:**
   - Render shows it at the top: `https://career-mapper-XXXX.onrender.com`

2. **Test authentication:**
   - Click **Sign Up** → Create an account
   - Click **Login** → Log in with your credentials
   - Navigate to **Careers** → Apply to a job
   - Check that everything works!

---

## 📝 Important Notes

### Free Tier Behavior
- ⏱️ Service sleeps after 15 minutes of inactivity
- 🐌 First request after sleep takes ~30 seconds (cold start)
- 💾 Database persists on disk (survives restarts)
- 🔄 Auto-deploys when you push to GitHub

### Your Live URLs
- **Website:** `https://career-mapper-XXXX.onrender.com`
- **API:** Same URL + `/api/auth/signup`, `/api/auth/login`, etc.

### Security
- ✅ HTTPS enabled automatically
- ✅ JWT_SECRET auto-generated securely
- ✅ Database on persistent disk

---

## 🆘 Troubleshooting

### "Git not found"
- Install Git from: https://git-scm.com/download/win
- Restart terminal after installation

### "Authentication failed" when pushing to GitHub
- Use GitHub Desktop: https://desktop.github.com/
- Or set up SSH keys: https://docs.github.com/en/authentication

### "Build failed" on Render
- Check build logs in Render dashboard
- Verify `package.json` has all dependencies
- Ensure Node version is 18+

### "Database not persisting"
- Verify disk is attached in Render dashboard
- Check `DB_PATH=/data/db.sqlite` in environment variables
- Re-run `node seed.js` in Shell

### Site loads but signup/login doesn't work
- Check browser console for errors (F12)
- Verify `JWT_SECRET` is set in Render environment variables
- Check API logs in Render dashboard

---

## 🔄 Updating Your Site

After making changes:

```bash
git add .
git commit -m "Your update description"
git push
```

Render will automatically detect the push and redeploy!

---

## 📞 Need Help?

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **GitHub Docs:** https://docs.github.com

---

## ✨ You're All Set!

Your CareerHub site is ready to go live. The entire process takes about **15 minutes** from start to finish.

**Good luck with your deployment! 🚀**
