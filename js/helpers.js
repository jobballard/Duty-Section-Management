//
//
//
// Add event listener for the reset button
document.getElementById('resetRoleAssignments').addEventListener('click', resetRoleAssignments);

function resetRoleAssignments() {
    if (db && db.rosters) {
        delete db.rosters;
        localStorage.setItem('db', JSON.stringify(db));
        alert('Role assignments have been reset.');
        location.reload();
    } else {
        alert('No role assignments found to reset.');
    }
}
