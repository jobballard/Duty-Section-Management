document.addEventListener('DOMContentLoaded', () => {
  loadNotesForEditing();
  displayNotes();
});

document.getElementById('addNoteForm').addEventListener('submit', saveNote);
document.getElementById('noteSelector').addEventListener('change', loadNoteContent);
document.getElementById('deleteNoteButton').addEventListener('click', deleteNote);

function loadNotesForEditing() {
  const noteSelector = document.getElementById('noteSelector');
  let notes = JSON.parse(sessionStorage .getItem('additional_notes')) || [];

  noteSelector.innerHTML = '<option value="">--Select a note--</option>';
  notes.forEach((note, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `Note ${index + 1}`;
      noteSelector.appendChild(option);
  });
}

function loadNoteContent() {
  const noteSelector = document.getElementById('noteSelector');
  const noteContent = document.getElementById('noteContent');
  let notes = JSON.parse(sessionStorage .getItem('additional_notes')) || [];

  const selectedIndex = noteSelector.value;
  if (selectedIndex) {
      noteContent.value = notes[selectedIndex];
  } else {
      noteContent.value = '';
  }
}

function saveNote(event) {
  event.preventDefault();

  const noteSelector = document.getElementById('noteSelector');
  const noteContent = document.getElementById('noteContent').value;

  if (!noteContent.trim()) {
      alert('Note content cannot be empty.');
      return;
  }

  let notes = JSON.parse(sessionStorage .getItem('additional_notes')) || [];

  if (noteSelector.value) {
      notes[noteSelector.value] = noteContent;
      alert('Note updated successfully!');
  } else {
      notes.push(noteContent);
      alert('Note added successfully!');
  }

  sessionStorage .setItem('additional_notes', JSON.stringify(notes));

  noteContent.value = '';
  noteSelector.value = ''; // Clear the selector
  loadNotesForEditing();
  displayNotes();
}

function deleteNote() {
  const noteSelector = document.getElementById('noteSelector');
  const selectedIndex = noteSelector.value;

  if (!selectedIndex) {
      alert('Please select a note to delete.');
      return;
  }

  let notes = JSON.parse(sessionStorage .getItem('additional_notes')) || [];
  notes.splice(selectedIndex, 1);
  sessionStorage .setItem('additional_notes', JSON.stringify(notes));

  alert('Note deleted successfully!');

  document.getElementById('noteContent').value = '';
  noteSelector.value = ''; // Clear the selector
  loadNotesForEditing();
  displayNotes();
}

function displayNotes() {
  const notesContainer = document.getElementById('notesContainer');
  let notes = JSON.parse(sessionStorage .getItem('additional_notes')) || [];

  if (notes.length === 0) {
      notesContainer.innerHTML = '<p>No notes available.</p>';
  } else {
      notesContainer.innerHTML = notes.map((note, index) => `<p><strong>Note ${index + 1}:</strong> ${note}</p>`).join('');
  }
}
