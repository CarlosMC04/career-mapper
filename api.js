// API integration for backend communication
const API_BASE = window.location.origin;

// Auth state management
let authToken = localStorage.getItem('authToken');
let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

function setAuth(token, user) {
  authToken = token;
  currentUser = user;
  localStorage.setItem('authToken', token);
  localStorage.setItem('currentUser', JSON.stringify(user));
  updateAuthUI();
}

function clearAuth() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  updateAuthUI();
}

function updateAuthUI() {
  const loginLink = document.querySelector('[data-page="login"]');
  const signupLink = document.querySelector('[data-page="signup"]');
  
  if (currentUser && loginLink && signupLink) {
    loginLink.textContent = `Hi, ${currentUser.name}`;
    signupLink.textContent = 'Logout';
    signupLink.setAttribute('data-page', 'logout');
  }
}

// Handle logout
document.addEventListener('click', (e) => {
  if (e.target.getAttribute('data-page') === 'logout') {
    e.preventDefault();
    clearAuth();
    alert('Logged out successfully');
    location.reload();
  }
});

// Signup handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupFullName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirm').value;
    const faculty = document.getElementById('signupFaculty').value.trim();
    const msgEl = document.getElementById('signupMessage');
    
    // Validation
    if (!name) {
      msgEl.textContent = '✗ Please enter your full name';
      msgEl.style.color = '#ff6b6b';
      return;
    }
    
    if (password.length < 6) {
      msgEl.textContent = '✗ Password must be at least 6 characters';
      msgEl.style.color = '#ff6b6b';
      return;
    }
    
    if (password !== confirmPassword) {
      msgEl.textContent = '✗ Passwords do not match';
      msgEl.style.color = '#ff6b6b';
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, faculty })
      });
      const data = await res.json();
      
      if (res.ok) {
        msgEl.textContent = '✓ Account created! Redirecting to login...';
        msgEl.style.color = 'var(--accent)';
        signupForm.reset();
        setTimeout(() => {
          document.querySelector('[data-page="login"]').click();
        }, 1500);
      } else {
        msgEl.textContent = '✗ ' + (data.error || 'Signup failed');
        msgEl.style.color = '#ff6b6b';
      }
    } catch (err) {
      msgEl.textContent = '✗ Network error. Make sure server is running.';
      msgEl.style.color = '#ff6b6b';
    }
  });
}

// Login handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const msgEl = document.getElementById('loginMessage');
    
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        setAuth(data.token, data.user);
        msgEl.textContent = '✓ Login successful!';
        msgEl.style.color = 'var(--accent)';
        setTimeout(() => {
          document.querySelector('[data-page="home"]').click();
        }, 1000);
      } else {
        msgEl.textContent = '✗ ' + (data.error || 'Login failed');
        msgEl.style.color = '#ff6b6b';
      }
    } catch (err) {
      msgEl.textContent = '✗ Network error';
      msgEl.style.color = '#ff6b6b';
    }
  });
}

// Load jobs
async function loadJobs() {
  const jobsList = document.getElementById('jobsList');
  if (!jobsList) return;
  
  try {
    const res = await fetch(`${API_BASE}/api/jobs`);
    const jobs = await res.json();
    
    jobsList.innerHTML = '';
    jobs.forEach(job => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${job.title}</h3>
        <div class="meta">Sponsor: ${job.sponsor} | Faculty: ${job.faculty}</div>
        <p>${job.description}</p>
        <button class="applyBtn" data-job-id="${job.id}" style="margin-top:10px;padding:8px 12px;background:var(--accent);color:#041029;border:none;border-radius:6px;cursor:pointer;font-weight:600;">
          Apply Now
        </button>
      `;
      jobsList.appendChild(card);
    });
  } catch (err) {
    jobsList.innerHTML = '<p>Failed to load jobs. Make sure the server is running.</p>';
  }
}

// Apply for job
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('applyBtn')) {
    const jobId = e.target.getAttribute('data-job-id');
    
    if (!authToken) {
      alert('Please login first to apply for jobs');
      document.querySelector('[data-page="login"]').click();
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE}/api/jobs/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ jobId: parseInt(jobId) })
      });
      const data = await res.json();
      
      if (res.ok) {
        alert('✓ Application submitted successfully!');
        e.target.textContent = 'Applied ✓';
        e.target.disabled = true;
        e.target.style.opacity = '0.6';
      } else {
        alert('✗ ' + (data.error || 'Application failed'));
      }
    } catch (err) {
      alert('✗ Network error');
    }
  }
});

// Load jobs when careers page is opened
document.addEventListener('click', (e) => {
  if (e.target.getAttribute('data-page') === 'careers') {
    setTimeout(loadJobs, 100);
  }
});

// Forgot password handler
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    const msgEl = document.getElementById('forgotMessage');
    
    if (!email) {
      msgEl.textContent = '✗ Please enter your email';
      msgEl.style.color = '#ff6b6b';
      return;
    }
    
    // Simulate password reset (in real app, this would send an email)
    msgEl.textContent = '✓ Password reset instructions sent to ' + email;
    msgEl.style.color = 'var(--accent)';
    
    setTimeout(() => {
      msgEl.textContent = 'Note: Password reset is not yet implemented. Contact admin for help.';
      msgEl.style.color = '#ffd88a';
    }, 3000);
  });
}

// Initialize auth UI on load
window.addEventListener('load', () => {
  updateAuthUI();
});
