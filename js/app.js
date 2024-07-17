// DB SET UP
let db = JSON.parse(localStorage.getItem("db"));
if (db == null) {
  db = { duty_sections: [], students: [], roster: {} };
}

// FUNCTIONS
// FUNCTIONS
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.right_content > div').forEach(div => {
        div.style.display = 'none';
    });

    // Show the selected page
    document.getElementById(pageId).style.display = 'block';

    // Update the db with the current page
    db.show_page = pageId;
    localStorage.setItem("db", JSON.stringify(db));
}

// ON PAGE LOAD
window.onload = function () {
    // Render roster on initial load
    if (db !== null && Object.keys(db).length !== 0 && db.show_page) {
        showPage(db.show_page);
    } else {
        showPage('page_home');
    }

    // Render duty sections and students on load
    renderDutySections();
    renderStudents();
    loadStudentDutySections();
    displayNotes();
};

function parseDate(dateStr) {
  const parts = dateStr.match(/(\d{2})([A-Z]{3})(\d{4})/);
  const day = parseInt(parts[1], 10);
  const month = new Date(Date.parse(parts[2] + " 1, 2024")).getMonth();
  const year = parseInt(parts[3], 10);
  return new Date(year, month, day);
}
