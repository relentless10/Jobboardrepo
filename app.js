//select all elements 

const btnAdd = document.querySelector("#btnAdd");
const btnClose = document.querySelector("#btnClose");
const btnCancel = document.querySelector("#btnCancel");
const btnSave = document.querySelector("#btnSave");
const modalOverlay = document.querySelector("#modalOverlay");
const modalTitle = document.querySelector("#modalTitle");
const fieldCompany = document.querySelector("#fieldCompany");
const fieldRole = document.querySelector("#fieldRole"); 
const fieldUrl = document.querySelector("#fieldUrl");
const fieldStatus =  document.querySelector("#fieldStatus");

const fieldNotes = document.querySelector("#fieldNotes");
const jobsList = document.querySelector("#jobsList");
const emptyState = document.querySelector("#emptyState");
const statTotal = document.querySelector("#statTotal");
const statApplied = document.querySelector("#statApplied");
const statInterview =  document.querySelector("#statInterview");
const statOffer = document.querySelector("#statOffer");
const statRejected = document.querySelector("#statRejected");


const filterbtn = document.querySelectorAll(".filter-btn");


//set current job and filter to null

let currentJobId = null
let currentFilter = "all"


//render jobs function 

function renderJobs(jobs) {
 
  jobsList.innerHTML = ""
  
  //show and hide empty state if jobs list is empty 
  if (jobs.length === 0) {
    //show empty state 
    emptyState.style.display = "block"
    return 
  } else {
    //hide empty state 
    emptyState.style.display = "none"
  }
  
  jobs.forEach((job)  => {
    
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";

// Set jobcard innerHTML to show: company, role, status badge, date, notes, URL, edit button, delete button 
   
    jobCard.innerHTML = `
    <div class = "job-top"> 
      <div class = "job-info"> 
        <span class = "job-company"> ${job.company} </span>
        <span class = "job-role"> ${job.role}</span>
      </div>
      <div class="job-right">
          <span class="badge badge-${job.status}">${job.status}</span>
      </div>
    </div>
    
    <div class="job-bottom">
        <span class="job-date">${job.created_at}</span>
    <div class="job-actions">
      <button class="btn-edit">Edit</button>
      <button class="btn-delete">Delete</button>
    </div>
     </div>
    <div class="job-url"><a href="${job.url}">${job.url}</a></div>
    <div class="job-notes">${job.notes}</div>
    `;
      
    jobsList.append(jobCard)
 
  attachCardListeners(jobCard, job);
  });
  
  updateStats(jobs);
}

// edit and delete event listeners 
function attachCardListeners(jobCard, job) {
  
    // from the append jobcard for each 
    const editBtn = jobCard.querySelector(".btn-edit");
    const deleteBtn = jobCard.querySelector(".btn-delete");
  
    editBtn.addEventListener("click", () => {
      currentJobId = job.id;
      modalTitle.textContent = "Edit Application";
      fieldCompany.value = job.company;
      fieldRole.value = job.role;
      fieldUrl.value = job.url;
      fieldStatus.value = job.status;
      fieldNotes.value = job.notes;
      modalOverlay.classList.remove("hidden");
  });

  deleteBtn.addEventListener("click", async () => {
    await fetch(`https://jobboardrepo.onrender.com/jobs${job.id}`, {
    method: "DELETE"
    });
    fetchjobs();
  });
  
};


//update stats

function updateStats(jobs) {
      //  after forEach closes, update stats
statTotal.textContent     = jobs.length;
statApplied.textContent   = jobs.filter(j => j.status === "applied").length;
statInterview.textContent = jobs.filter(j => j.status === "interview").length;
statOffer.textContent     = jobs.filter(j => j.status === "offer").length;
statRejected.textContent  = jobs.filter(j => j.status === "rejected").length;
  
};


//async function for fetchjobs()

async function fetchjobs() {
 try {
   const getHttp = await fetch("https://jobboardrepo.onrender.com/jobs");
  const data = await getHttp.json();
   
   const filtered = currentFilter === "all" ? data : data.filter(job => job.status === currentFilter);
   
   renderJobs(filtered)
   
 } catch (err) {
   throw err
 }
  
}

//

btnAdd.addEventListener("click" , ()=>  {
  //clear all Fields 
  fieldCompany.value = "";
  fieldRole.value = "";
  fieldStatus.value = "";
  fieldNotes.value = "";
  fieldUrl.value = "";
  
  currentJobId = null
  modalTitle.textContent = "Add Application";
  
  modalOverlay.classList.remove("hidden");
  

});


btnClose.addEventListener("click",() =>{
  modalOverlay.classList.add("hidden")
});

btnCancel.addEventListener("click", () => {
  modalOverlay.classList.add("hidden")
  
});

filterbtn.forEach( clickedbtn =>{
  clickedbtn.addEventListener("click",() => {
    // remove active class 
      filterbtn.forEach( btn => { btn.classList.remove("active") });
      
      clickedbtn.classList.add("active");
      
      currentFilter = clickedbtn.dataset.filter;
    fetchjobs();
  })
});

  
btnSave.addEventListener("click", async () => {
  const companyValue = fieldCompany.value;
  const roleValue    = fieldRole.value;
  const statusValue  = fieldStatus.value;
  const notesValue   = fieldNotes.value;
  const urlValue     = fieldUrl.value;

  if (companyValue === "" || roleValue === "") return;

  if (currentJobId === null) {
    await fetch("https://jobboardrepo.onrender.com/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: companyValue,
        role: roleValue,
        url: urlValue,
        status: statusValue,
        notes: notesValue
      })
    });
  } else {
    await fetch(`https://jobboardrepo.onrender.com/jobs${currentJobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: companyValue,
        role: roleValue,
        url: urlValue,
        status: statusValue,
        notes: notesValue
      })
    });
  }

  modalOverlay.classList.add("hidden");
  fetchjobs();
});
  



// — bottom of file
fetchjobs();