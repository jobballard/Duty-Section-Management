document.getElementById('importDbForm').addEventListener('submit', importDb);

function importDb(event) {
    event.preventDefault();

    const dbContent = document.getElementById('dbContent').value;

    if (!dbContent.trim()) {
        alert('DB content cannot be empty.');
        return;
    }

    try {
        const parsedDb = JSON.parse(dbContent);
        localStorage.setItem('db', JSON.stringify(parsedDb));
        alert('DB imported successfully!');
        document.getElementById('dbContent').value = '';
        displayDb();
    } catch (error) {
        alert('Invalid DB content. Please ensure it is in correct JSON format.');
    }
}

function displayDb() {
    const dbContainer = document.getElementById('dbContainer');
    const db = JSON.parse(localStorage.getItem('db')) || {};

    dbContainer.innerHTML = `<pre>${JSON.stringify(db, null, 2)}</pre>`;
}

// Call displayDb on page load to show current db content
document.addEventListener('DOMContentLoaded', displayDb);

function exportDb() {
    const db = localStorage.getItem('db');
    if (!db) {
        alert('No DB content available to export.');
        return;
    }

    const blob = new Blob([db], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'db_backup.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Add export button dynamically
const exportButton = document.createElement('button');
exportButton.textContent = 'Export DB';
exportButton.className = 'button is-link';
exportButton.addEventListener('click', exportDb);
document.getElementById('dbContainerButton').appendChild(exportButton);
