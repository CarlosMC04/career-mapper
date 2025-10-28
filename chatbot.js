// AI Career Chatbot
// This chatbot provides intelligent career guidance and assistance

class CareerChatbot {
  constructor() {
    this.messagesContainer = document.getElementById('chatbotMessages');
    this.input = document.getElementById('chatbotInput');
    this.sendBtn = document.getElementById('chatbotSend');
    this.toggleBtn = document.getElementById('chatbotToggle');
    this.closeBtn = document.getElementById('chatbotClose');
    this.window = document.getElementById('chatbotWindow');
    
    this.conversationHistory = [];
    this.userProfile = this.loadUserProfile();
    
    this.initializeEventListeners();
  }
  
  initializeEventListeners() {
    // Toggle chatbot window
    this.toggleBtn.addEventListener('click', () => this.toggleWindow());
    this.closeBtn.addEventListener('click', () => this.closeWindow());
    
    // Send message
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }
  
  toggleWindow() {
    const isVisible = this.window.style.display === 'flex';
    this.window.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      this.input.focus();
    }
  }
  
  closeWindow() {
    this.window.style.display = 'none';
  }
  
  loadUserProfile() {
    const profile = localStorage.getItem('careerMapperProfile');
    return profile ? JSON.parse(profile) : null;
  }
  
  async sendMessage() {
    const message = this.input.value.trim();
    if (!message) return;
    
    // Add user message
    this.addMessage(message, 'user');
    this.input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    // Get AI response
    const response = await this.generateResponse(message);
    
    // Remove typing indicator and show response
    this.hideTypingIndicator();
    this.addMessage(response, 'bot');
    
    // Save to conversation history
    this.conversationHistory.push({ user: message, bot: response });
  }
  
  addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = text;
    
    messageDiv.appendChild(contentDiv);
    this.messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
  
  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chatbot-message bot-message';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    this.messagesContainer.appendChild(indicator);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
  
  hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }
  
  async generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simulate AI processing delay
    await this.delay(800 + Math.random() * 800);
    
    // Career advice patterns
    if (this.matchesPattern(message, ['career', 'path', 'choose', 'should i'])) {
      return this.getCareerAdvice(message);
    }
    
    // Job search help
    if (this.matchesPattern(message, ['job', 'find', 'search', 'looking for'])) {
      return this.getJobSearchAdvice(message);
    }
    
    // Resume help
    if (this.matchesPattern(message, ['resume', 'cv', 'curriculum'])) {
      return this.getResumeAdvice(message);
    }
    
    // Interview help
    if (this.matchesPattern(message, ['interview', 'prepare', 'questions'])) {
      return this.getInterviewAdvice(message);
    }
    
    // Skills development
    if (this.matchesPattern(message, ['skill', 'learn', 'course', 'training'])) {
      return this.getSkillsAdvice(message);
    }
    
    // Salary/compensation
    if (this.matchesPattern(message, ['salary', 'pay', 'compensation', 'money'])) {
      return this.getSalaryAdvice(message);
    }
    
    // Available jobs
    if (this.matchesPattern(message, ['available', 'openings', 'positions', 'vacancies'])) {
      return this.getAvailableJobs();
    }
    
    // Greeting
    if (this.matchesPattern(message, ['hello', 'hi', 'hey', 'greetings'])) {
      return this.getGreeting();
    }
    
    // Thanks
    if (this.matchesPattern(message, ['thank', 'thanks', 'appreciate'])) {
      return "You're very welcome! 😊 I'm here anytime you need career guidance. Is there anything else I can help you with?";
    }
    
    // Default response with suggestions
    return this.getDefaultResponse();
  }
  
  matchesPattern(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }
  
  getCareerAdvice(message) {
    const profile = this.userProfile;
    
    if (profile && profile.degree) {
      return `Based on your ${profile.degree} background, here are some career paths to consider:
      
<strong>🎯 Recommended Careers:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Data Analyst</strong> - High demand, great for analytical minds</li>
  <li><strong>Software Developer</strong> - Excellent growth opportunities</li>
  <li><strong>Business Analyst</strong> - Bridge between tech and business</li>
</ul>

<strong>💡 Next Steps:</strong>
<ol style="margin: 8px 0; padding-left: 20px;">
  <li>Complete your profile on the Home page</li>
  <li>Browse available jobs in the Careers section</li>
  <li>Check out learning resources to build skills</li>
</ol>

Would you like specific advice about any of these careers?`;
    }
    
    return `Great question! Career choice depends on several factors:

<strong>🎯 Key Considerations:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Interests</strong> - What topics excite you?</li>
  <li><strong>Skills</strong> - What are you naturally good at?</li>
  <li><strong>Values</strong> - Work-life balance, salary, impact?</li>
  <li><strong>Market demand</strong> - Job availability and growth</li>
</ul>

<strong>💡 Tip:</strong> Fill out your profile on the Home page to get personalized career matches!

What field interests you most?`;
  }
  
  getJobSearchAdvice(message) {
    return `Here's how to conduct an effective job search:

<strong>🔍 Job Search Strategy:</strong>
<ol style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Update your profile</strong> - Complete your skills and interests</li>
  <li><strong>Browse our Careers page</strong> - We have ${mockCompanies ? mockCompanies.length : 5} companies with openings</li>
  <li><strong>Use the search bar</strong> - Search by job title or company</li>
  <li><strong>Tailor applications</strong> - Customize your CV for each role</li>
  <li><strong>Follow up</strong> - Check application status regularly</li>
</ol>

<strong>🎯 Hot Jobs Right Now:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
  <li>Data Analyst (Remote)</li>
  <li>Software Developer (Hybrid)</li>
  <li>UX Designer (On-site)</li>
</ul>

Click on <strong>Careers</strong> in the menu to see all available positions!`;
  }
  
  getResumeAdvice(message) {
    return `Let me help you create a winning resume! 📄

<strong>✅ Resume Best Practices:</strong>
<ol style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Keep it concise</strong> - 1-2 pages maximum</li>
  <li><strong>Use action verbs</strong> - "Developed", "Managed", "Achieved"</li>
  <li><strong>Quantify achievements</strong> - "Increased efficiency by 30%"</li>
  <li><strong>Tailor to the job</strong> - Match keywords from job description</li>
  <li><strong>Include relevant skills</strong> - Technical and soft skills</li>
</ol>

<strong>📋 Key Sections:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
  <li>Contact Information</li>
  <li>Professional Summary (2-3 sentences)</li>
  <li>Work Experience (most recent first)</li>
  <li>Education</li>
  <li>Skills & Certifications</li>
</ul>

<strong>💡 Pro Tip:</strong> Upload your CV in the Resources section to keep it ready for quick applications!`;
  }
  
  getInterviewAdvice(message) {
    return `Interview preparation is key to success! 🎤

<strong>🎯 Before the Interview:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Research the company</strong> - Know their mission and values</li>
  <li><strong>Practice common questions</strong> - "Tell me about yourself"</li>
  <li><strong>Prepare questions</strong> - Show genuine interest</li>
  <li><strong>Dress appropriately</strong> - Professional attire</li>
  <li><strong>Test your tech</strong> - For virtual interviews</li>
</ul>

<strong>💬 Common Interview Questions:</strong>
<ol style="margin: 8px 0; padding-left: 20px;">
  <li>Why do you want this position?</li>
  <li>What are your strengths and weaknesses?</li>
  <li>Describe a challenge you overcame</li>
  <li>Where do you see yourself in 5 years?</li>
</ol>

<strong>✨ Remember:</strong> Be authentic, confident, and show enthusiasm!

Need help with specific interview questions?`;
  }
  
  getSkillsAdvice(message) {
    return `Building the right skills is crucial for career growth! 📚

<strong>🔥 In-Demand Skills 2025:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Technical:</strong> Python, SQL, JavaScript, Data Analysis</li>
  <li><strong>Design:</strong> Figma, UX/UI, Prototyping</li>
  <li><strong>Business:</strong> Project Management, Communication</li>
  <li><strong>Soft Skills:</strong> Problem-solving, Teamwork, Adaptability</li>
</ul>

<strong>📖 Learning Resources:</strong>
<ol style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Online Platforms:</strong> Coursera, Udemy, LinkedIn Learning</li>
  <li><strong>Free Resources:</strong> YouTube, freeCodeCamp, Khan Academy</li>
  <li><strong>Practice:</strong> Build projects, contribute to open source</li>
  <li><strong>Certifications:</strong> Google, Microsoft, AWS certificates</li>
</ol>

Check our <strong>Resources</strong> page for curated learning materials!

What skill would you like to develop?`;
  }
  
  getSalaryAdvice(message) {
    return `Let's talk about compensation! 💰

<strong>💵 Salary Negotiation Tips:</strong>
<ol style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Research market rates</strong> - Know your worth</li>
  <li><strong>Consider total compensation</strong> - Benefits, bonuses, equity</li>
  <li><strong>Wait for the offer</strong> - Don't mention numbers first</li>
  <li><strong>Be confident</strong> - Justify your value with achievements</li>
  <li><strong>Be flexible</strong> - Consider non-salary perks</li>
</ol>

<strong>📊 Average Entry-Level Salaries (2025):</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
  <li>Software Developer: $65,000 - $85,000</li>
  <li>Data Analyst: $55,000 - $75,000</li>
  <li>UX Designer: $60,000 - $80,000</li>
  <li>Business Analyst: $58,000 - $78,000</li>
</ul>

<strong>💡 Remember:</strong> Salary varies by location, experience, and company size!`;
  }
  
  getAvailableJobs() {
    const jobsCount = mockCompanies ? mockCompanies.reduce((acc, c) => acc + c.jobs.length, 0) : 10;
    
    return `We currently have <strong>${jobsCount}+ job openings</strong> from top companies! 🎉

<strong>🏢 Featured Companies:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Omnaly Digital</strong> - Data Analyst, UX Designer</li>
  <li><strong>Nexora Solutions</strong> - Software Developer, Business Analyst</li>
  <li><strong>Versalytics</strong> - Data Analyst, Digital Marketer</li>
  <li><strong>PixelPath Studio</strong> - UX Designer, Software Developer</li>
  <li><strong>CoreAxis Digital</strong> - Business Analyst, Data Analyst</li>
</ul>

<strong>📍 Work Arrangements:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
  <li>🏠 Remote positions available</li>
  <li>🏢 On-site opportunities</li>
  <li>🔄 Hybrid work options</li>
</ul>

Click on <strong>Careers</strong> in the navigation menu to browse all jobs and apply!`;
  }
  
  getGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Hello';
    
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    
    const name = this.userProfile?.name || 'there';
    
    return `${greeting}, ${name}! 👋

I'm your AI Career Assistant, here to help you navigate your career journey. I can assist with:

<ul style="margin: 8px 0; padding-left: 20px;">
  <li>🎯 Career guidance and path recommendations</li>
  <li>💼 Job search strategies and tips</li>
  <li>📄 Resume and cover letter advice</li>
  <li>🎤 Interview preparation</li>
  <li>📚 Skill development recommendations</li>
  <li>💰 Salary negotiation tips</li>
</ul>

What would you like to know about?`;
  }
  
  getDefaultResponse() {
    return `I'm here to help with your career questions! 🤔

I can assist you with:
<ul style="margin: 8px 0; padding-left: 20px;">
  <li><strong>Career advice</strong> - Finding the right path</li>
  <li><strong>Job search</strong> - Finding and applying for jobs</li>
  <li><strong>Resume help</strong> - Creating a winning CV</li>
  <li><strong>Interview prep</strong> - Acing your interviews</li>
  <li><strong>Skills development</strong> - Learning new skills</li>
  <li><strong>Salary guidance</strong> - Negotiation tips</li>
</ul>

Try asking me something like:
<ul style="margin: 8px 0; padding-left: 20px;">
  <li>"What career should I choose?"</li>
  <li>"How do I find a job?"</li>
  <li>"Help me with my resume"</li>
  <li>"What jobs are available?"</li>
</ul>

What would you like to know?`;
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CareerChatbot();
  });
} else {
  new CareerChatbot();
}
