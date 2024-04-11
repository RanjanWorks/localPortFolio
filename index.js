let url = 'https://script.google.com/macros/s/AKfycbzK5AMJBgvOiEqRsdPAJf4vQScNModIYIkbM_fYaZGKIYdy5gxWxiVEttUrqkx06dQ_BA/exec';
let projects = document.getElementById('projects');
let input = document.getElementById('input');
let form = document.getElementById('form')
let allProjects = []; // Array to store fetched project data

async function fetchData() {
  const res = await fetch(url);
  const results = await res.json();
  allProjects = results.data; // Store fetched data for filtering

  // Optionally handle errors from the fetch request here
  if (!results.data) {
    console.error('Error fetching data.');
    return;
  }else{
    document.getElementById('load').style.display = "none"
  }

  renderProjects(allProjects); 
}

function renderProjects(data) {
  projects.innerHTML = ''; // Clear existing content before rendering

  data.forEach(d => {
    let projectData = `
    <a target="_blank" href="${d.LINK}" class="notification">
      <div class="notiglow"></div>
      <div class="notiborderglow"></div>
      <div class="notititle">${d.NAME.toUpperCase()}</div>
      <div class="notibody">${d.DESCRIPTION}</div>
    </a>`;

    projects.insertAdjacentHTML("beforeend", projectData);
  });
}

function filterProjects(searchTerm) {
  const filteredProjects = allProjects.filter(project => {
    const searchTextLower = searchTerm.toLowerCase();
    const projectNameLower = project.NAME.toLowerCase();
    const projectDescriptionLower = project.DESCRIPTION.toLowerCase();

    // Search in both name and description (case-insensitive)
    return projectNameLower.includes(searchTextLower) || projectDescriptionLower.includes(searchTextLower);
  });

  renderProjects(filteredProjects);
}




input.addEventListener('keyup', function() {
  const searchTerm = this.value;
  filterProjects(searchTerm);
});

fetchData();




