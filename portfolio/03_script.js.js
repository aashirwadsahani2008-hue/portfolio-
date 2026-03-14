// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Add Projects
const projectsContainer = document.getElementById('projects-container');
document.getElementById('add-project-btn').addEventListener('click', () => {
    const projectName = prompt("Enter project name:");
    const projectDesc = prompt("Enter project description:");
    if(projectName && projectDesc) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `<h3>${projectName}</h3><p>${projectDesc}</p>`;
        projectsContainer.appendChild(card);
    }
});

// Add Skills
const skillsContainer = document.getElementById('skills-container');
document.getElementById('add-skill-btn').addEventListener('click', () => {
    const skillName = prompt("Enter skill name:");
    if(skillName) {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerText = skillName;
        skillsContainer.appendChild(card);
    }
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    this.reset();
});