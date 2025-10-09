# Deployment Guide - Render

## Prerequisites
1. Push this project to a GitHub repository
2. Create a free account at [render.com](https://render.com)

## Step-by-Step Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - CareerHub ready for deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Render

#### Option A: Using Blueprint (Recommended - Automated)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Blueprint**
3. Connect your GitHub repository
4. Render will detect `render.yaml` and configure everything automatically:
   - Creates a Web Service
   - Attaches a 1GB persistent disk at `/data`
   - Sets `JWT_SECRET` (auto-generated)
   - Sets `DB_PATH=/data/db.sqlite`
   - Sets `NODE_ENV=production`
5. Click **Apply** to deploy

#### Option B: Manual Setup
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `career-mapper` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (click "Generate" for a secure random value)
   - `DB_PATH` = `/data/db.sqlite`
6. Add Persistent Disk:
   - Click **Add Disk**
   - **Name**: `data`
   - **Mount Path**: `/data`
   - **Size**: 1 GB
7. Click **Create Web Service**

### 3. Seed the Database (One-Time Setup)
After the first deployment completes:

1. In Render Dashboard, open your service
2. Click **Shell** tab (top right)
3. Run the seed command:
   ```bash
   node seed.js
   ```
4. You should see:
   ```
   ✓ Tables created
   ✓ 5 jobs seeded into SQLite
   
   Database ready! Run 'npm start' to start the server.
   ```

### 4. Test Your Live Site
1. Render will provide a URL like: `https://career-mapper-xxxx.onrender.com`
2. Open the URL in your browser
3. Test the authentication flow:
   - Click **Sign Up** → Create an account
   - Click **Login** → Log in with your credentials
   - Navigate to **Careers** → Apply to a job
   - Verify the application was saved

## Important Notes

### Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds (cold start)
- 750 hours/month of runtime (sufficient for most projects)
- Persistent disk ensures your database survives restarts

### Security
- **JWT_SECRET**: Never commit the actual secret. Use Render's environment variables.
- **HTTPS**: Render provides free SSL/TLS certificates automatically.
- **CORS**: Currently allows all origins. For production, update `server.js`:
  ```javascript
  app.use(cors({
    origin: 'https://your-domain.onrender.com'
  }));
  ```

### Database Backups
To backup your SQLite database:
1. Open Shell in Render Dashboard
2. Run: `cat /data/db.sqlite | base64`
3. Copy the output and decode locally to restore

### Monitoring
- View logs in Render Dashboard → **Logs** tab
- Monitor service health in **Metrics** tab
- Set up email alerts for deployment failures

## Troubleshooting

### Build Fails
- Check Node version compatibility (requires Node 18+)
- Verify `package.json` has all dependencies
- Check build logs for specific errors

### Database Not Persisting
- Ensure disk is mounted at `/data`
- Verify `DB_PATH=/data/db.sqlite` environment variable
- Check that disk is attached to the service

### Authentication Not Working
- Verify `JWT_SECRET` is set in environment variables
- Check browser console for API errors
- Ensure CORS is properly configured

### Service Won't Start
- Check start command is `node server.js`
- Verify PORT environment variable (Render sets this automatically)
- Review startup logs for errors

## Updating Your Site
Push changes to GitHub:
```bash
git add .
git commit -m "Your update message"
git push
```

Render will automatically detect changes and redeploy.

## Custom Domain (Optional)
1. In Render Dashboard → Your Service → **Settings**
2. Scroll to **Custom Domains**
3. Add your domain and follow DNS configuration instructions

## Support
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
