const careers=[
  {title:"Data Analyst",degrees:["Computer Science","Data Science","Statistics"],requiredSkills:["SQL","Excel","Python","Data Visualization"],description:"Analyze data and create insights to support decisions"},
  {title:"Software Developer",degrees:["Computer Science","Software Engineering","Information Technology"],requiredSkills:["JavaScript","Git","APIs","Algorithms"],description:"Design and build software applications"},
  {title:"UX Designer",degrees:["Design","Interaction Design","Human-Computer Interaction"],requiredSkills:["User Research","Figma","Prototyping","Usability Testing"],description:"Design user-centered digital experiences"},
  {title:"Business Analyst",degrees:["Business","Management","Economics"],requiredSkills:["Requirements Elicitation","Process Modeling","Communication","Stakeholder Management"],description:"Translate business needs into technical requirements"},
  {title:"Digital Marketer",degrees:["Marketing","Communications","Business"],requiredSkills:["SEO","Content Creation","Analytics","Paid Ads"],description:"Grow brands through digital channels"}
]

const mockCompanies=[
  {id:1,name:"Omnaly Digital",tagline:"Omni + Analyze",description:"A full-service digital solutions firm focused on insight-driven innovation",jobs:[{title:"Data Analyst",location:"Remote",type:"Full-time"},{title:"UX Designer",location:"Hybrid",type:"Full-time"}]},
  {id:2,name:"Nexora Solutions",tagline:"Next-Generation Software",description:"Modern, tech-forward, and professional; suggests next-generation software and strategy",jobs:[{title:"Software Developer",location:"On-site",type:"Full-time"},{title:"Business Analyst",location:"Remote",type:"Contract"}]},
  {id:3,name:"Versalytics",tagline:"Versatile + Analytics",description:"Perfect for a company bridging data, UX, and marketing intelligence",jobs:[{title:"Data Analyst",location:"Remote",type:"Full-time"},{title:"Digital Marketer",location:"Hybrid",type:"Part-time"}]},
  {id:4,name:"PixelPath Studio",tagline:"Design Direction & Data",description:"Creative and UX-oriented; implies clear design direction and data-informed experiences",jobs:[{title:"UX Designer",location:"On-site",type:"Full-time"},{title:"Software Developer",location:"Hybrid",type:"Full-time"}]},
  {id:5,name:"CoreAxis Digital",tagline:"Strategy & Precision",description:"Evokes strategy, precision, and balance — ideal for a data-driven business consultancy",jobs:[{title:"Business Analyst",location:"Remote",type:"Full-time"},{title:"Data Analyst",location:"On-site",type:"Full-time"}]}
]
const form=document.getElementById("profileForm")
const resultsEl=document.getElementById("results")
const chartEl=document.getElementById("skillChart")
const burgerBtn=document.getElementById("burgerBtn")
const leftPanel=document.getElementById("leftPanel")
let chartInstance=null
function normalize(text){
  return text.split(",").map(s=>s.trim()).filter(Boolean).map(s=>s.toLowerCase())
}

// Build a profile object from current form values
function getCurrentProfile(){
  const name=(document.getElementById("name")?.value||"Anonymous").trim()
  const degree=(document.getElementById("degree")?.value||"").trim()
  const interestsRaw=(document.getElementById("interests")?.value||"")
  const skillsRaw=(document.getElementById("skills")?.value||"")
  return {
    name,
    degree,
    interests: interestsRaw ? normalize(interestsRaw) : [],
    skills: skillsRaw ? normalize(skillsRaw) : []
  }
}
function scoreProfile(profile,career){
  const profSkills=profile.skills
  const required=career.requiredSkills.map(s=>s.toLowerCase())
  const matchCount=required.filter(s=>profSkills.includes(s)).length
  let score=0
  score+=matchCount*0.5
  const interestMatch=profile.interests.some(i=>career.title.toLowerCase().includes(i)||career.description.toLowerCase().includes(i))
  if(interestMatch)score+=0.2
  const degreeMatch=career.degrees.map(d=>d.toLowerCase()).includes(profile.degree.toLowerCase())
  if(degreeMatch)score+=0.3
  if(score>1)score=1
  return {score,matchCount,missing:required.filter(s=>!profSkills.includes(s))}
}
function renderResults(profile){
  const evaluated=careers.map(c=>{
    const r=scoreProfile(profile,c)
    return Object.assign({},c,r)
  }).sort((a,b)=>b.score-a.score)
  resultsEl.innerHTML=""
  evaluated.forEach((c,i)=>{
    const card=document.createElement("div")
    card.className="card"
    const requiredList=c.requiredSkills.slice(0,6).map(s=>`<li>${s}</li>`).join("")
    card.innerHTML=`<h3>${c.title}</h3><div class="meta">Match: ${Math.round(c.score*100)}%</div><p>${c.description}</p><div class="skills"><strong>Required skills:</strong><ul>${requiredList}</ul></div><div class="advice"><strong>Skill gap advice:</strong><p>${c.missing.length===0?"You have the key skills. Build projects to showcase them.":"Focus on: "+c.missing.slice(0,4).join(", ")}</p></div><div style="margin-top:8px"><button data-index="${i}" class="viewBtn">Show gap</button></div>`
    resultsEl.appendChild(card)
  })
  if(evaluated.length>0)updateChartForCareer(evaluated[0])
}
function updateChartForCareer(career){
  const matched=career.matchCount
  const missing=career.missing.length
  const data=[matched,missing]
  const cfg={
    type:"bar",
    data:{labels:["Matched","Missing"],datasets:[{label:"Skill counts",data:data,borderWidth:0}]},
    options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0}}}}
  }
  if(chartInstance){chartInstance.data.datasets[0].data=data;chartInstance.options=cfg.options;chartInstance.update();return}
  const ctx=chartEl.getContext("2d")
  chartInstance=new Chart(ctx,cfg)
}
document.addEventListener("click",e=>{
  if(e.target && e.target.classList.contains("viewBtn")){
    const idx=parseInt(e.target.getAttribute("data-index"),10)
    const cards=Array.from(resultsEl.children)
    const careerCardData=cards[idx]
    const title=careerCardData.querySelector("h3").textContent
    const careerObj=careers.find(c=>c.title===title)
    const profile=getCurrentProfile()
    const scored=scoreProfile(profile,careerObj)
    updateChartForCareer(scored)
  }
})
if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault()
    const p=getCurrentProfile()
    renderResults(p)
  })
}
const saveBtn=document.getElementById("saveBtn")
if(saveBtn){
  saveBtn.addEventListener("click",()=>{
    const p=getCurrentProfile()
    localStorage.setItem("careerMapperProfile",JSON.stringify(p))
    alert("Profile saved locally")
  })
}
window.addEventListener("load",()=>{
  const raw=localStorage.getItem("careerMapperProfile")
  if(raw){
    try{
      const p=JSON.parse(raw)
      const nameEl=document.getElementById("name")
      const degreeEl=document.getElementById("degree")
      const interestsEl=document.getElementById("interests")
      const skillsEl=document.getElementById("skills")
      if(nameEl) nameEl.value=p.name||""
      if(degreeEl) degreeEl.value=p.degree||""
      if(interestsEl) interestsEl.value=(p.interests||[]).join(", ")
      if(skillsEl) skillsEl.value=(p.skills||[]).join(", ")
      // Render immediately on load if results container exists
      if(resultsEl){
        renderResults({
          name:p.name||"Anonymous",
          degree:p.degree||"",
          interests:(p.interests||[]).map(s=>s.toLowerCase()),
          skills:(p.skills||[]).map(s=>s.toLowerCase())
        })
      }
    }catch(e){
      // ignore parsing errors
    }
  }
})
if(burgerBtn && leftPanel){
  burgerBtn.addEventListener("click",()=>{leftPanel.classList.toggle("show")})
}

// Load companies and jobs
function loadCompaniesAndJobs(){
  const jobsList=document.getElementById("jobsList")
  if(!jobsList)return
  jobsList.innerHTML=""
  mockCompanies.forEach(company=>{
    const companyCard=document.createElement("div")
    companyCard.className="company-card"
    companyCard.style.cssText="background:rgba(255,255,255,0.05);padding:16px;border-radius:12px;margin-bottom:16px;border:1px solid rgba(139,69,19,0.2);"
    let jobsHTML=""
    company.jobs.forEach((job,idx)=>{
      jobsHTML+=`<div class="job-item" style="background:rgba(255,255,255,0.03);padding:12px;border-radius:8px;margin-top:8px;border:1px solid rgba(139,69,19,0.15);">
        <h4 style="margin:0;color:#8B4513;">${job.title}</h4>
        <div style="font-size:13px;color:#2c3e50;margin:4px 0;">${job.location} • ${job.type}</div>
        <button class="applyJobBtn" data-company="${company.name}" data-job="${job.title}" style="margin-top:8px;padding:6px 12px;background:#8B4513;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px;">Apply Now</button>
      </div>`
    })
    companyCard.innerHTML=`<h3 style="margin:0;color:#8B4513;">${company.name}</h3>
      <div style="font-size:13px;color:#A0522D;font-style:italic;margin:4px 0;">${company.tagline}</div>
      <p style="color:#2c3e50;font-size:14px;margin:8px 0;">${company.description}</p>
      <div style="margin-top:12px;">${jobsHTML}</div>`
    jobsList.appendChild(companyCard)
  })
}

// Handle job application with CV upload
document.addEventListener("click",e=>{
  if(e.target.classList.contains("applyJobBtn")){
    const company=e.target.getAttribute("data-company")
    const job=e.target.getAttribute("data-job")
    showApplicationModal(company,job)
  }
})

function showApplicationModal(company,job){
  const existingModal=document.getElementById("applicationModal")
  if(existingModal)existingModal.remove()
  const modal=document.createElement("div")
  modal.id="applicationModal"
  modal.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:1000;"
  modal.innerHTML=`<div style="background:#fff;padding:24px;border-radius:12px;max-width:500px;width:90%;box-shadow:0 4px 20px rgba(0,0,0,0.3);">
    <h3 style="margin:0 0 16px 0;color:#8B4513;">Apply for ${job}</h3>
    <p style="color:#2c3e50;margin:0 0 16px 0;">Company: <strong>${company}</strong></p>
    <form id="applicationForm">
      <label style="display:block;margin-bottom:8px;color:#8B4513;font-weight:600;">Full Name</label>
      <input type="text" id="appName" required style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;margin-bottom:12px;">
      <label style="display:block;margin-bottom:8px;color:#8B4513;font-weight:600;">Email</label>
      <input type="email" id="appEmail" required style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;margin-bottom:12px;">
      <label style="display:block;margin-bottom:8px;color:#8B4513;font-weight:600;">Upload CV/Resume</label>
      <input type="file" id="appCV" accept=".pdf,.doc,.docx" required style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;margin-bottom:12px;">
      <label style="display:block;margin-bottom:8px;color:#8B4513;font-weight:600;">Cover Letter (Optional)</label>
      <textarea id="appCover" rows="4" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;margin-bottom:16px;resize:vertical;"></textarea>
      <div style="display:flex;gap:8px;">
        <button type="submit" style="flex:1;padding:10px;background:#8B4513;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;">Submit Application</button>
        <button type="button" id="closeModal" style="padding:10px 20px;background:#ccc;color:#333;border:none;border-radius:6px;cursor:pointer;font-weight:600;">Cancel</button>
      </div>
    </form>
  </div>`
  document.body.appendChild(modal)
  document.getElementById("closeModal").addEventListener("click",()=>modal.remove())
  modal.addEventListener("click",e=>{if(e.target===modal)modal.remove()})
  document.getElementById("applicationForm").addEventListener("submit",e=>{
    e.preventDefault()
    const name=document.getElementById("appName").value
    const email=document.getElementById("appEmail").value
    const cv=document.getElementById("appCV").files[0]
    const cover=document.getElementById("appCover").value
    if(cv){
      alert(`✓ Application submitted successfully!\\n\\nCompany: ${company}\\nPosition: ${job}\\nName: ${name}\\nEmail: ${email}\\nCV: ${cv.name}`)
      modal.remove()
    }else{
      alert("Please upload your CV/Resume")
    }
  })
}

// Load companies when careers page is clicked
let companiesLoaded=false
document.addEventListener("click",e=>{
  if(e.target.getAttribute("data-page")==="careers"){
    setTimeout(()=>{
      if(!companiesLoaded){
        loadCompaniesAndJobs()
        companiesLoaded=true
      }
    },100)
  }
})

// Job search functionality in header
const jobSearchInput=document.getElementById("jobSearchInput")
const jobSearchResults=document.getElementById("jobSearchResults")
if(jobSearchInput && jobSearchResults){
  jobSearchInput.addEventListener("input",e=>{
    const query=e.target.value.toLowerCase().trim()
    if(query.length<2){
      jobSearchResults.style.display="none"
      jobSearchResults.innerHTML=""
      return
    }
    const matches=[]
    mockCompanies.forEach(company=>{
      const companyMatch=company.name.toLowerCase().includes(query)||company.description.toLowerCase().includes(query)
      company.jobs.forEach(job=>{
        const jobMatch=job.title.toLowerCase().includes(query)
        if(companyMatch||jobMatch){
          matches.push({company:company.name,job:job.title,location:job.location,type:job.type})
        }
      })
    })
    if(matches.length===0){
      jobSearchResults.style.display="block"
      jobSearchResults.innerHTML='<p style="color:#2c3e50;font-size:14px;padding:12px;">No jobs found matching your search.</p>'
      return
    }
    let html='<div style="padding:8px;">'
    matches.forEach(match=>{
      html+=`<div style="background:#f9f9f9;padding:10px;border-radius:6px;margin-bottom:8px;border:1px solid #ddd;">
        <div style="font-weight:600;color:#8B4513;">${match.job}</div>
        <div style="font-size:13px;color:#2c3e50;margin:2px 0;">${match.company}</div>
        <div style="font-size:12px;color:#A0522D;">${match.location} • ${match.type}</div>
        <button class="applyJobBtn" data-company="${match.company}" data-job="${match.job}" style="margin-top:6px;padding:5px 10px;background:#8B4513;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:600;font-size:12px;">Apply</button>
      </div>`
    })
    html+='</div>'
    jobSearchResults.innerHTML=html
    jobSearchResults.style.display="block"
  })
  jobSearchInput.addEventListener("focus",()=>{
    if(jobSearchInput.value.trim().length>=2){
      jobSearchResults.style.display="block"
    }
  })
  document.addEventListener("click",e=>{
    if(!jobSearchInput.contains(e.target)&&!jobSearchResults.contains(e.target)){
      jobSearchResults.style.display="none"
    }
  })
}

// Auto-load companies on page load
window.addEventListener("load",()=>{
  setTimeout(()=>{
    if(document.getElementById("jobsList")&&!companiesLoaded){
      loadCompaniesAndJobs()
      companiesLoaded=true
    }
  },500)
})

// CV Upload Handler
const cvUploadForm=document.getElementById("cvUploadForm")
const cvUploadMessage=document.getElementById("cvUploadMessage")
if(cvUploadForm&&cvUploadMessage){
  cvUploadForm.addEventListener("submit",e=>{
    e.preventDefault()
    const name=document.getElementById("cvName").value.trim()
    const email=document.getElementById("cvEmail").value.trim()
    const file=document.getElementById("cvFile").files[0]
    if(!file){
      cvUploadMessage.style.display="block"
      cvUploadMessage.style.background="rgba(255,107,107,0.1)"
      cvUploadMessage.style.color="#ff6b6b"
      cvUploadMessage.style.border="1px solid #ff6b6b"
      cvUploadMessage.textContent="✗ Please select a CV file to upload"
      return
    }
    if(file.size>5*1024*1024){
      cvUploadMessage.style.display="block"
      cvUploadMessage.style.background="rgba(255,107,107,0.1)"
      cvUploadMessage.style.color="#ff6b6b"
      cvUploadMessage.style.border="1px solid #ff6b6b"
      cvUploadMessage.textContent="✗ File size must be less than 5MB"
      return
    }
    const cvData={name,email,fileName:file.name,fileSize:file.size,uploadDate:new Date().toISOString()}
    localStorage.setItem("userCV",JSON.stringify(cvData))
    cvUploadMessage.style.display="block"
    cvUploadMessage.style.background="rgba(139,69,19,0.1)"
    cvUploadMessage.style.color="#8B4513"
    cvUploadMessage.style.border="1px solid #8B4513"
    cvUploadMessage.innerHTML=`✓ CV uploaded successfully!<br><small>File: ${file.name} (${(file.size/1024).toFixed(1)}KB)</small>`
    setTimeout(()=>{cvUploadMessage.style.display="none"},5000)
  })
  const savedCV=localStorage.getItem("userCV")
  if(savedCV){
    try{
      const cvData=JSON.parse(savedCV)
      document.getElementById("cvName").value=cvData.name||""
      document.getElementById("cvEmail").value=cvData.email||""
      if(cvData.fileName){
        cvUploadMessage.style.display="block"
        cvUploadMessage.style.background="rgba(139,69,19,0.05)"
        cvUploadMessage.style.color="#8B4513"
        cvUploadMessage.style.border="1px solid rgba(139,69,19,0.2)"
        cvUploadMessage.innerHTML=`📄 Previously uploaded: <strong>${cvData.fileName}</strong><br><small>Uploaded on ${new Date(cvData.uploadDate).toLocaleDateString()}</small>`
      }
    }catch(e){}
  }
}
