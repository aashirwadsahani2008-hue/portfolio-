const form = document.getElementById('portfolioForm');
const themeToggle = document.getElementById('themeToggle');
const exportBtn = document.getElementById('exportBtn');
const themeInput = document.getElementById('inputTheme');
const root = document.documentElement;

function toList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function updatePreview() {
  const data = {
    name: document.getElementById('inputName').value,
    headline: document.getElementById('inputHeadline').value,
    bio: document.getElementById('inputBio').value,
    email: document.getElementById('inputEmail').value,
    theme: themeInput.value,
    skills: toList(document.getElementById('inputSkills').value),
    projects: [
      {
        title: document.getElementById('inputProject1Title').value,
        description: document.getElementById('inputProject1Desc').value,
      },
      {
        title: document.getElementById('inputProject2Title').value,
        description: document.getElementById('inputProject2Desc').value,
      },
    ].filter((project) => project.title || project.description),
  };

  document.getElementById('previewName').textContent = data.name;
  document.getElementById('previewHeadline').textContent = data.headline;
  document.getElementById('previewBio').textContent = data.bio;

  const emailLink = document.getElementById('previewEmail');
  emailLink.textContent = data.email;
  emailLink.href = `mailto:${data.email}`;

  const skillsEl = document.getElementById('previewSkills');
  skillsEl.innerHTML = '';
  data.skills.forEach((skill) => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsEl.appendChild(li);
  });

  const projectsEl = document.getElementById('previewProjects');
  projectsEl.innerHTML = '';
  data.projects.forEach((project) => {
    const card = document.createElement('article');
    card.innerHTML = `<h5>${project.title || 'Untitled Project'}</h5><p>${project.description || 'Add a description to highlight impact.'}</p>`;
    projectsEl.appendChild(card);
  });

  root.style.setProperty('--accent', data.theme);
  return data;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updatePreview();
});

themeInput.addEventListener('input', updatePreview);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

exportBtn.addEventListener('click', () => {
  const data = updatePreview();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'portfolio-data.json';
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
});

updatePreview();
