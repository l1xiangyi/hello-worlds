const prList = document.getElementById('prs');
const refreshButton = document.getElementById('refresh');

async function fetchAndDisplayPRs() {
  const apiUrl = 'https://api.github.com/repos/openshift/console/pulls?per_page=10&state=all';
  const response = await fetch(apiUrl);
  const data = await response.json();
  
  data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  prList.innerHTML = '';

  data.forEach(pr => {
    const li = document.createElement('li');
    li.textContent = `#${pr.number}: ${pr.title} - ${pr.created_at}`;
    prList.appendChild(li);
  });
}

refreshButton.addEventListener('click', fetchAndDisplayPRs);

fetchAndDisplayPRs();
