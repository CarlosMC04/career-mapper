# Testing Guide for CareerHub

This document provides step-by-step instructions to test all features of the CareerHub website.

## Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for Chart.js CDN)
- The project files in the `career-mapper` folder

## Test Environment Setup
1. Navigate to the project folder: `c:\Users\Dawie Van Dyk\Desktop\Career Mapper\career-mapper`
2. Open `index.html` in your browser (double-click or right-click → Open with → Browser)
3. Open browser Developer Tools (F12) to monitor console for errors

---

## Test Cases

### Test 1: Initial Page Load
**Objective**: Verify the page loads without errors and displays correctly.

**Steps**:
1. Open `index.html` in browser
2. Check Developer Tools Console for errors
3. Verify the following elements are visible:
   - CareerHub logo and brand name in header
   - Navigation menu (Home, Careers, Resources, About, Login, Sign Up)
   - Student Profile form on the left
   - Empty chart area and results area on the right
   - Footer with "CareerHub • Static Website"

**Expected Result**: Page loads cleanly with no console errors. All UI elements visible.

---

### Test 2: Profile Form Submission
**Objective**: Test career matching functionality.

**Steps**:
1. Navigate to the Home page (should be default)
2. Fill in the form:
   - **Name**: `John Doe`
   - **Degree Program**: `Computer Science`
   - **Interests**: `data, analytics, visualization`
   - **Skills**: `SQL, Excel, Python`
3. Click **Find Careers** button
4. Observe the results panel on the right

**Expected Result**:
- Career cards appear sorted by match percentage
- "Data Analyst" should appear near the top (high match)
- Each card shows:
  - Career title
  - Match percentage
  - Description
  - Required skills list
  - Skill gap advice
  - "Show gap" button
- Bar chart displays at the top showing matched vs missing skills

---

### Test 3: Skill Gap Visualization
**Objective**: Test the chart updates for different careers.

**Steps**:
1. Complete Test 2 first (have results displayed)
2. Scroll through the career cards
3. Click **Show gap** button on different career cards
4. Observe the bar chart updates

**Expected Result**:
- Chart updates immediately when clicking "Show gap"
- Chart shows two bars: "Matched" and "Missing"
- Values change based on the selected career's requirements

---

### Test 4: Save Profile Functionality
**Objective**: Test localStorage persistence.

**Steps**:
1. Fill in the profile form with test data:
   - **Name**: `Jane Smith`
   - **Degree Program**: `Design`
   - **Interests**: `user experience, prototyping`
   - **Skills**: `Figma, User Research`
2. Click **Save Profile** button
3. Verify alert appears: "Profile saved locally"
4. Close the browser tab completely
5. Reopen `index.html`

**Expected Result**:
- Form fields are pre-populated with saved data
- Career results automatically render on page load
- Chart displays with the saved profile's data

---

### Test 5: Clear and Test Empty Profile
**Objective**: Test behavior with minimal input.

**Steps**:
1. Clear browser localStorage:
   - Open Developer Tools (F12)
   - Go to Application/Storage tab
   - Expand Local Storage
   - Right-click → Clear
2. Refresh the page
3. Leave all fields empty or enter only a name
4. Click **Find Careers**

**Expected Result**:
- Careers still display but with 0% or low match percentages
- No JavaScript errors in console
- Skill gap advice shows all skills as missing

---

### Test 6: Navigation Between Pages
**Objective**: Test multi-page navigation.

**Steps**:
1. Click **Careers** in the navigation menu
2. Verify the Careers page displays
3. Click **Resources** in navigation
4. Verify the Resources page displays
5. Click **About** in navigation
6. Verify the About page displays
7. Click **Login** in navigation
8. Verify the Login form displays
9. Click **Sign Up** in navigation
10. Verify the Sign Up form displays
11. Click **Home** to return

**Expected Result**:
- Each page displays correctly
- Only one page visible at a time
- No layout breaks or console errors
- Navigation highlights or responds to clicks

---

### Test 7: Login Form (Demo)
**Objective**: Test login form interaction.

**Steps**:
1. Navigate to **Login** page
2. Enter test credentials:
   - **Email**: `test@example.com`
   - **Password**: `password123`
3. Click **Log In** button

**Expected Result**:
- Form submission is prevented (no page reload)
- Alert or console message confirms demo mode
- No errors in console

---

### Test 8: Sign Up Form (Demo)
**Objective**: Test sign up form interaction.

**Steps**:
1. Navigate to **Sign Up** page
2. Enter test data:
   - **Email**: `newuser@example.com`
   - **Password**: `securepass`
   - **Confirm Password**: `securepass`
3. Click **Create Account** button

**Expected Result**:
- Form submission is prevented
- Alert or console message confirms demo mode
- No errors in console

---

### Test 9: Responsive Design (Mobile View)
**Objective**: Test responsive layout and burger menu.

**Steps**:
1. Open Developer Tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or click mobile icon)
3. Set viewport to 375x667 (iPhone SE)
4. Observe the layout changes
5. Click the burger menu button (☰)
6. Verify left panel slides in
7. Click burger button again

**Expected Result**:
- Burger menu button appears in header
- Left panel is hidden by default on mobile
- Clicking burger toggles the left panel visibility
- Layout adapts without horizontal scrolling
- All content remains accessible

---

### Test 10: Different Skill Combinations
**Objective**: Test matching algorithm with various inputs.

**Steps**:
1. Test with **Software Developer** profile:
   - **Degree**: `Software Engineering`
   - **Interests**: `coding, APIs`
   - **Skills**: `JavaScript, Git, APIs`
2. Click **Find Careers**
3. Verify "Software Developer" ranks highest
4. Clear form and test with **UX Designer** profile:
   - **Degree**: `Design`
   - **Interests**: `design, user experience`
   - **Skills**: `Figma, Prototyping, User Research`
5. Click **Find Careers**
6. Verify "UX Designer" ranks highest

**Expected Result**:
- Matching algorithm correctly prioritizes careers based on:
  - Skill matches (50% weight)
  - Interest keywords (20% weight)
  - Degree match (30% weight)
- Results are sorted by match percentage

---

### Test 11: Edge Cases
**Objective**: Test unusual inputs and edge cases.

**Steps**:
1. Enter very long strings in each field (200+ characters)
2. Enter special characters: `@#$%^&*()`
3. Enter only commas in interests/skills: `,,,,,`
4. Mix uppercase and lowercase: `SQL, sql, Sql`
5. Click **Find Careers** after each test

**Expected Result**:
- No JavaScript errors
- Form handles long inputs gracefully
- Special characters don't break functionality
- Case-insensitive matching works (SQL = sql)
- Empty values after normalization don't crash

---

### Test 12: Browser Compatibility
**Objective**: Test across different browsers.

**Steps**:
1. Open `index.html` in Chrome
2. Test core functionality (Tests 2-4)
3. Repeat in Firefox
4. Repeat in Edge
5. Repeat in Safari (if available)

**Expected Result**:
- Consistent behavior across all browsers
- Chart.js renders correctly
- localStorage works in all browsers
- CSS styling appears consistent

---

## Performance Testing

### Test 13: Load Time
**Steps**:
1. Open Developer Tools → Network tab
2. Hard refresh the page (Ctrl+Shift+R)
3. Check total load time and resource sizes

**Expected Result**:
- Page loads in under 2 seconds on standard connection
- All resources load successfully
- Chart.js CDN loads without errors

---

## Regression Testing Checklist

After any code changes, verify:
- [ ] Profile form accepts input and submits
- [ ] Career cards render with correct data
- [ ] Chart displays and updates
- [ ] Save/Load profile works
- [ ] Navigation switches pages correctly
- [ ] Burger menu toggles on mobile
- [ ] No console errors on any page
- [ ] localStorage persists across sessions

---

## Known Limitations
- **Chart.js CDN**: Requires internet connection. Chart won't display offline unless Chart.js is downloaded locally.
- **Media files**: Background images may not display if files are missing from `Media/` folder.
- **Demo forms**: Login and Sign Up forms are non-functional (demo only).

---

## Bug Reporting Template

If you find issues during testing, document them as follows:

**Bug Title**: [Brief description]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result**: [What should happen]

**Actual Result**: [What actually happened]

**Browser/OS**: [e.g., Chrome 120 / Windows 11]

**Console Errors**: [Copy any error messages]

**Screenshots**: [If applicable]

---

## Test Sign-Off

**Tester Name**: ___________________

**Date**: ___________________

**Test Results**: ☐ Pass  ☐ Fail  ☐ Pass with issues

**Notes**: ___________________________________________
