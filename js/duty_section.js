// Form submission handler
document.getElementById('submitAddDutySectionForm').addEventListener('click', addDutySectionFormOnSubmit);

function addDutySectionFormOnSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const dsn = document.getElementById('dsn').value.trim();
    const dsl = document.getElementById('dsl').value.trim();
    const dsl_number = document.getElementById('dsl_number').value.trim();
    const ds_notes = document.getElementById('ds_notes').value.trim();

    // Validation logic
    if (!dsn || !dsl || !dsl_number) {
        alert('Please fill out all required fields.');
        return;
    }

    // Call function to add duty section to data structure
    addDutySection(dsn, dsl, dsl_number, ds_notes);

    // Reset form
    document.getElementById('addDutySectionForm').reset();
}

// Function to add duty section to data structure (db)
function addDutySection(dsn, dsl, dsl_number, ds_notes) {
    // Initialize db if not already present
    db.duty_sections = db.duty_sections || [];

    // Create new duty section object
    const newDutySection = {
        dsn,
        dsl,
        dsl_number,
        ds_notes
    };

    // Add new duty section to array
    db.duty_sections.push(newDutySection);

    // Save to local storage
    sessionStorage .setItem('db', JSON.stringify(db));

    // Optionally, update UI or trigger re-rendering
    renderDutySections();
}

// Function to render duty sections (update UI)
function renderDutySections() {
    const dutySectionsContainer = document.getElementById('dutySectionsContainer');

    // Clear existing content
    dutySectionsContainer.innerHTML = '';

    // Check if duty_sections exist in db
    if (!db.duty_sections || db.duty_sections.length === 0) {
        dutySectionsContainer.innerHTML = '<p>No duty sections available.</p>';
        return;
    }

    // Loop through duty sections and render them
    db.duty_sections.forEach((section, index) => {
        const sectionElement = document.createElement('div');
        sectionElement.innerHTML = `
            <hr>
            <span style="font-weight: bold;">Section ${section.dsn}</span><br>
            Leader: ${section.dsl}<br>
            Phone: ${section.dsl_number}<br>
            Notes: ${section.ds_notes}<br>
            <button onclick="editDutySection(${index})">Edit</button> 
            <button onclick="deleteDutySection(${index})">Delete</button>
        `;
        dutySectionsContainer.appendChild(sectionElement);
    });
}

function editDutySection(index) {
    const section = db.duty_sections[index];
    document.getElementById('dsn').value = section.dsn;
    document.getElementById('dsl').value = section.dsl;
    document.getElementById('dsl_number').value = section.dsl_number;
    document.getElementById('ds_notes').value = section.ds_notes;

    // Remove the current section and re-add after editing
    deleteDutySection(index);
}

function deleteDutySection(index) {
    db.duty_sections.splice(index, 1);
    sessionStorage .setItem('db', JSON.stringify(db));
    renderDutySections();
}
