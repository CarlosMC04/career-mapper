# CareerHub

A lightweight, client-side career exploration website. Users enter their profile (degree, interests, and skills) to discover suitable careers, see skill gaps, and visualize matched vs missing skills via a bar chart.

## Features
- **Profile form**: Capture `name`, `degree`, `interests`, and `skills` on the `home` page.
- **Instant recommendations**: Client-side scoring against predefined careers in `script.js`.
- **Skill gap chart**: Simple bar chart using Chart.js to show matched vs missing skills.
- **Local persistence**: Save/load profile using `localStorage`.
- **Multi-page UI**: Simple navigation for `Home`, `Careers`, `Resources`, `About`, `Login`, and `Sign Up` sections (single-page tabs).
- **Responsive layout**: Collapsible left panel with burger button on smaller screens.

## Project Structure
```
career-mapper/
├─ index.html        # Main HTML with navbar, sections, and script/style includes
├─ script.js         # Career matching logic, chart rendering, event handlers
├─ api.js            # Backend API integration (login, signup, job applications)
├─ style.css         # Theme, layout, responsive styles
├─ server.js         # Express backend server with SQLite database
├─ seed.js           # Database initialization and seeding script
├─ package.json      # Node.js dependencies and scripts
├─ db.sqlite         # SQLite database (created after running seed)
└─ Media/            # Place images like Logo Small.png, Background.png, Banner.png
```

## Getting Started

### Backend Setup (Required for full functionality)
1. **Install Node.js**: Download from https://nodejs.org (v16 or higher)
2. **Install dependencies**:
   ```bash
   cd "c:\Users\Dawie Van Dyk\Desktop\Career Mapper\career-mapper"
   npm install
   ```
3. **Initialize database**:
   ```bash
   npm run seed
   ```
4. **Start the server**:
   ```bash
   npm start
   ```
5. **Open browser**: Navigate to `http://localhost:3000`

### Frontend-Only Mode (No backend)
- Simply open `index.html` in your browser
- Career matching and skill gap features work offline
- Login/signup and job applications require the backend server

### Usage
- **Home**: Enter interests and skills to get career recommendations
- **Careers**: Browse and apply for available jobs (requires login)
- **Login/Signup**: Create an account to apply for jobs
- **Save Profile**: Persist your profile data locally

## Notes
- **Chart.js**: Loaded from CDN in `index.html` – requires an internet connection. To work 100% offline, download Chart.js and include it locally:
  - Download from https://cdn.jsdelivr.net/npm/chart.js
  - Save as `Media/chart.umd.js` and replace the CDN `<script>` in `index.html` with:
    ```html
    <script src="Media/chart.umd.js"></script>
    ```
- **Images**: The CSS/HTML references images in `Media/` (`Background.png`, `Banner.png`, `Logo Small.png`). Add your own files or update paths in `style.css` / `index.html`.

## How It Works
- `script.js` defines a small set of careers and their required skills.
- `getCurrentProfile()` creates a profile from form inputs.
- `scoreProfile(profile, career)` returns:
  - A normalized score in [0,1] based on skill matches (50%), interest keyword hit (20%), and degree match (30%).
  - `missing`: which required skills are not present in the profile.
- `renderResults(profile)` sorts careers by score, renders cards, and updates the chart.
- Clicking "Show gap" on a card updates the chart for that specific career.

## Customization
- **Add careers**: Extend the `careers` array in `script.js` with more roles, required skills, and matching degrees.
- **Scoring weights**: Adjust weights in `scoreProfile()` to emphasize different factors.
- **Styling**: Tune colors and layout in `style.css`.

## Deploying
- **GitHub Pages**: Push the folder to a repo and enable Pages (root or `/docs`).
- **Netlify / Vercel**: Drag-and-drop the folder or connect the repo. No build step needed.
- **Static hosting**: Any static file host works (only HTML/CSS/JS files).

## Accessibility
- Uses semantic elements and `aria-live` on results for dynamic updates. Consider adding labels and focus states as you expand the UI.

## License
This project is provided as-is; add your preferred license if needed.
