document.addEventListener('DOMContentLoaded', () => {
  renderCreatedRosters();
});

function renderCreatedRosters() {
  const createdRostersContainer = document.getElementById('createdRostersContainer');

  // Clear existing content
  createdRostersContainer.innerHTML = '';

  // Check if rosters exist in the database
  if (!db.rosters || Object.keys(db.rosters).length === 0) {
      createdRostersContainer.innerHTML = '<p>No rosters available.</p>';
      return;
  }

  // Loop through rosters and render them
  Object.keys(db.rosters).forEach(weekNumber => {
      const roster = db.rosters[weekNumber];
      const mondayDate = getMondayDate(weekNumber);

      const rosterElement = document.createElement('div');
      rosterElement.className = 'columns border_bottom_gray';
      rosterElement.innerHTML = `
          <div class="column is-3"><span style="font-weight: bold;">Date of Monday: ${mondayDate}</span></div>
          <div class="column is-2">Week of the year: ${weekNumber}</div>
          <div class="column has-text-right is-2">
              <button class="button is-small" onclick="viewRoster(${weekNumber})">View</button>
          </div>
      `;
      createdRostersContainer.appendChild(rosterElement);
  });
}

function getMondayDate(weekNumber) {
  const firstJan = new Date(new Date().getFullYear(), 0, 1);
  const days = (weekNumber - 1) * 7;
  const mondayDate = new Date(firstJan.setDate(firstJan.getDate() + days));

  const day = ('0' + mondayDate.getDate()).slice(-2);
  const month = mondayDate.toLocaleString('default', { month: 'short' }).toUpperCase();
  const year = mondayDate.getFullYear();

  return `${day}${month}${year}`;
}

function viewRoster(weekNumber) {
  // Save the selected week number to the database
  db.selectedRoster = weekNumber;
  localStorage.setItem('db', JSON.stringify(db));

  // Open the roster view page in a new tab
  window.open('page.html', '_blank');
}
