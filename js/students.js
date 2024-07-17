// Form submission handler
document.getElementById('submitStudentForm').addEventListener('click', studentOnSubmit);

// Function to handle form submission
function studentOnSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const studentName = document.getElementById('student_name').value.trim();
    const gradDate = document.getElementById('grad_date').value.trim();
    const studentDutySection = document.getElementById('student_duty_section_select').value;
    const studentCanDrive = document.getElementById('student_can_drive_select').value;
    const studentIsLLD = document.getElementById('student_is_lld').value === 'Yes'; // Check if LLD is selected

    // Validation logic
    if (!studentName || !gradDate || !studentDutySection) {
        alert('Please fill out all required fields.');
        return;
    }

    // Call function to add student to data structure
    addStudent(studentName, gradDate, studentDutySection, studentCanDrive, studentIsLLD);

    // Reset form
    document.getElementById('addStudentForm').reset();
}

// Function to add student to data structure (db)
function addStudent(name, gradDate, dutySection, canDrive, isLLD) {
    // Initialize db if not already present
    db.students = db.students || [];

    // Create new student object
    const newStudent = {
        name,
        gradDate,
        dutySection,
        canDrive,
        isLLD,
        status: isLLD ? 6 : 5 // Set status based on LLD selection
    };

    // Add new student to array
    db.students.push(newStudent);

    // Save to local storage
    sessionStorage .setItem('db', JSON.stringify(db));

    // Optionally, update UI or trigger re-rendering
    renderStudents();
    loadStudentDutySections(); // Ensure duty sections are updated after adding a student
}

// Function to render students (update UI)
function renderStudents() {
    const studentsContainer = document.getElementById('studentsContainer');

    // Clear existing content
    studentsContainer.innerHTML = '';

    // Check if students exist in db
    if (!db.students || db.students.length === 0) {
        studentsContainer.innerHTML = '<p>No students available.</p>';
        return;
    }

    // Loop through students and render them
    db.students.forEach((student, index) => {
        const isLldText = student.isLLD ? 'Yes' : 'No'; // Determine LLD text
        const studentElement = document.createElement('div');
        studentElement.innerHTML = `
            <div class="columns border_bottom_gray">
                <div class="column is-3"><span style="font-weight: bold;">${student.name}</span></div>
                <div class="column is-2">Grad Date: ${student.gradDate}</div>
                <div class="column is-2">Duty Section: ${student.dutySection}</div>
                <div class="column is-2">Can Drive: ${student.canDrive}</div>
                <div class="column is-1">Status: ${student.status}</div>
                <div class="column is-1">LLD: ${isLldText}</div>
                <div class="column has-text-right is-2">
                    <button class="button is-small" onclick="editStudent(${index})">Edit</button>&nbsp; 
                    <button class="button is-small" onclick="deleteStudent(${index})">Delete</button>
                </div>
            </div>
        `;
        studentsContainer.appendChild(studentElement);
    });
}

// Function to edit student
function editStudent(index) {
    const student = db.students[index];
    document.getElementById('student_name').value = student.name;
    document.getElementById('grad_date').value = student.gradDate;
    document.getElementById('student_duty_section_select').value = student.dutySection;
    document.getElementById('student_can_drive_select').value = student.canDrive;
    document.getElementById('student_is_lld').value = student.isLLD ? 'Yes' : 'No'; // Set LLD selection

    // Add an event listener to update the student
    const submitButton = document.getElementById('submitStudentForm');
    submitButton.removeEventListener('click', studentOnSubmit); // Remove previous listener
    submitButton.textContent = 'Update'; // Change button text to Update

    // Add event listener for update action
    submitButton.addEventListener('click', function updateStudent(event) {
        event.preventDefault();

        // Update student object
        db.students[index].name = document.getElementById('student_name').value.trim();
        db.students[index].gradDate = document.getElementById('grad_date').value.trim();
        db.students[index].dutySection = document.getElementById('student_duty_section_select').value;
        db.students[index].canDrive = document.getElementById('student_can_drive_select').value;
        db.students[index].isLLD = document.getElementById('student_is_lld').value === 'Yes';
        db.students[index].status = db.students[index].isLLD ? 6 : 5;

        // Save updated db to local storage
        sessionStorage .setItem('db', JSON.stringify(db));

        // Reset form and re-render students
        document.getElementById('addStudentForm').reset();
        submitButton.textContent = 'Submit'; // Change button text back to Submit
        submitButton.removeEventListener('click', updateStudent); // Remove update listener
        submitButton.addEventListener('click', studentOnSubmit); // Reattach original submit listener

        renderStudents(); // Re-render students list
    });
}

// Function to delete student
function deleteStudent(index) {
    db.students.splice(index, 1);
    sessionStorage .setItem('db', JSON.stringify(db));
    renderStudents();
}

// Function to load duty section options dynamically
function loadStudentDutySections() {
    const studentDutySectionSelect = document.getElementById('student_duty_section_select');

    // Clear existing options
    studentDutySectionSelect.innerHTML = '';

    // Check if duty sections exist in db
    if (!db.duty_sections || db.duty_sections.length === 0) {
        studentDutySectionSelect.innerHTML = '<option>No duty sections available</option>';
        return;
    }

    // Loop through duty sections and create options
    db.duty_sections.forEach((section) => {
        const option = document.createElement('option');
        option.value = section.dsn;
        option.text = `Section ${section.dsn} - ${section.dsl}`;
        studentDutySectionSelect.appendChild(option);
    });
}

// Ensure duty sections are loaded initially
loadStudentDutySections();

// Render students initially
renderStudents();
