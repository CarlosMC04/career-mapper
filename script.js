const careers=[
  {title:"Data Analyst",degrees:["Computer Science","Data Science","Statistics"],requiredSkills:["SQL","Excel","Python","Data Visualization"],description:"Analyze data and create insights to support decisions"},
  {title:"Software Developer",degrees:["Computer Science","Software Engineering","Information Technology"],requiredSkills:["JavaScript","Git","APIs","Algorithms"],description:"Design and build software applications"},
  {title:"UX Designer",degrees:["Design","Interaction Design","Human-Computer Interaction"],requiredSkills:["User Research","Figma","Prototyping","Usability Testing"],description:"Design user-centered digital experiences"},
  {title:"Business Analyst",degrees:["Business","Management","Economics"],requiredSkills:["Requirements Elicitation","Process Modeling","Communication","Stakeholder Management"],description:"Translate business needs into technical requirements"},
  {title:"Digital Marketer",degrees:["Marketing","Communications","Business"],requiredSkills:["SEO","Content Creation","Analytics","Paid Ads"],description:"Grow brands through digital channels"}
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
