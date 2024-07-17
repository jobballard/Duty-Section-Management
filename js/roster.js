document.getElementById('submitCreateDutySectionForm').addEventListener('click', dslOnSubmit);

// Function to get students by duty section
function getStudentsByDutySection(dutySection) {
    return db.students.filter(student => String(student.dutySection) === String(dutySection));
}

function dslOnSubmit(event) {
    event.preventDefault();

    const formInputs = parseFormInputs();
    if (!formInputs) return;

    const { dates, schedules, sunsetTimes } = formInputs;
    const weekNumber = getWeekNumber(dates.mon);

    resetStudentStatus();
    ensureStudentStatus();

    if (!db.rosters) {
        db.rosters = {};
    }

    const lastWeekNumber = weekNumber - 1;
    let starting_dsn;
    if (db.rosters[lastWeekNumber]) {
        starting_dsn = getNextDutySection(db.rosters[lastWeekNumber].roster.sun.duty_section);
    } else {
        starting_dsn = db.duty_sections[0].dsn;
    }

    const roster = initializeDutyRoster(schedules, sunsetTimes, dates);
    const studentsByDutySection = getStudentsGroupedByDutySection();

    if (!db.roleAssignments) {
        db.roleAssignments = initializeRoleAssignments();
    }

    assignRolesToRoster(roster, schedules, starting_dsn, studentsByDutySection, weekNumber, dates);

    saveRosterToDatabase(weekNumber, roster);
    saveRoleAssignments();
    location.reload();
}

function parseFormInputs() {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const dates = {};
    const schedules = {};
    const sunsetTimes = {};

    for (const day of days) {
        const dateInput = document.getElementById(`${day}_date`);
        const scheduleInput = document.getElementById(`${day}_schedule`);
        const sunsetInput = document.getElementById(`${day}_sunset`);

        if (!dateInput.value || !scheduleInput.value || !sunsetInput.value) {
            alert(`All fields for ${day.toUpperCase()} are required.`);
            return null;
        }

        dates[day] = dateInput.value;
        schedules[day] = parseInt(scheduleInput.value);
        sunsetTimes[day] = sunsetInput.value;
    }

    return { dates, schedules, sunsetTimes };
}

function getWeekNumber(dateStr) {
    const parts = dateStr.match(/(\d{2})([A-Z]{3})(\d{4})/);
    const day = parseInt(parts[1], 10);
    const month = new Date(Date.parse(parts[2] + " 1, 2024")).getMonth();
    const year = parseInt(parts[3], 10);
    const date = new Date(year, month, day);

    const firstJan = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstJan) / 86400000 + 1;

    return Math.ceil(pastDaysOfYear / 7);
}

function initializeDutyRoster(schedules, sunsetTimes, dates) {
    const roster = {};

    for (const day in schedules) {
        roster[day] = {
            date: dates[day],
            duty_section: '',
            assignments: {
                moow: [],
                rover: [],
                duty_driver: [],
                colors: []
            },
            sunset_time: sunsetTimes[day],
            schedule: schedules[day],
            duty_section_name: '',
            duty_section_leader_name: '',
            duty_section_leader_number: '',
            specific_notes_for_duty_section: ''
        };
    }

    return roster;
}

function resetStudentStatus() {
    db.students.forEach(student => {
        student.status = 5;
    });
}

function ensureStudentStatus() {
    db.students.forEach(student => {
        if (!student.hasOwnProperty('status')) {
            student.status = 5;
        }
    });
    sessionStorage .setItem('db', JSON.stringify(db));
}

function saveRosterToDatabase(weekNumber, roster) {
    if (!db.rosters) {
        db.rosters = {};
    }

    db.rosters[weekNumber] = { ...db.rosters[weekNumber], roster: roster };

    sessionStorage .setItem('db', JSON.stringify(db));
}

function saveRoleAssignments() {
    sessionStorage .setItem('db', JSON.stringify(db));
}

function getStudentsGroupedByDutySection() {
    const studentsByDutySection = {};
    db.duty_sections.forEach(dutySection => {
        studentsByDutySection[dutySection.dsn] = getStudentsByDutySection(dutySection.dsn);
    });
    return studentsByDutySection;
}

function getNextDutySection(currentDsn) {
    const currentIndex = db.duty_sections.findIndex(section => section.dsn === currentDsn);
    return db.duty_sections[(currentIndex + 1) % db.duty_sections.length].dsn;
}

function initializeRoleAssignments() {
    const roleAssignments = {};
    db.duty_sections.forEach(dutySection => {
        roleAssignments[dutySection.dsn] = {};
        db.students.forEach(student => {
            if (String(student.dutySection) === String(dutySection.dsn)) {
                roleAssignments[dutySection.dsn][student.name] = {
                    moow: 0,
                    rover: 0,
                    duty_driver: 0,
                    colors: 0
                };
            }
        });
    });
    return roleAssignments;
}

function assignRolesToRoster(roster, schedules, starting_dsn, studentsByDutySection, weekNumber, dates) {
    const scheduleRequirements = {
        1: { moow: 2, rover: 3, duty_driver: 2, colors: 2 },
        2: { moow: 3, rover: 6, duty_driver: 2, colors: 2 },
        3: { moow: 4, rover: 6, duty_driver: 2, colors: 2 },
        4: { moow: 3, rover: 4, duty_driver: 2, colors: 2 }
    };

    const dutySections = db.duty_sections;
    let dutySectionIndex = db.duty_sections.findIndex(section => section.dsn == starting_dsn);
    if (dutySectionIndex === -1) dutySectionIndex = 0;

    const assignedCounts = initializeAssignedCounts(studentsByDutySection, weekNumber);

    for (const day in roster) {
        const schedule = schedules[day];
        const requirements = scheduleRequirements[schedule];
        const dutySection = dutySections[dutySectionIndex % dutySections.length].dsn;
        const students = studentsByDutySection[dutySection].filter(student => !student.gradDate || parseDate(student.gradDate) > parseDate(dates[day]));
        const assignments = assignDayRoles(requirements, students, assignedCounts[dutySection], dutySection);

        roster[day].duty_section = dutySection;
        roster[day].assignments = assignments;
        roster[day].duty_section_name = dutySections[dutySectionIndex % dutySections.length].dsn;
        roster[day].duty_section_leader_name = dutySections[dutySectionIndex % dutySections.length].dsl;
        roster[day].duty_section_leader_number = dutySections[dutySectionIndex % dutySections.length].dsl_number;
        roster[day].specific_notes_for_duty_section = dutySections[dutySectionIndex % dutySections.length].ds_notes;

        dutySectionIndex = (dutySectionIndex + 1) % dutySections.length;
    }
}

function initializeAssignedCounts(studentsByDutySection, weekNumber) {
    const assignedCounts = {};
    for (const dutySection in studentsByDutySection) {
        assignedCounts[dutySection] = {};
        studentsByDutySection[dutySection].forEach(student => {
            if (!db.roleAssignments[dutySection]) {
                db.roleAssignments[dutySection] = {};
            }
            assignedCounts[dutySection][student.name] = db.roleAssignments[dutySection][student.name] || {
                moow: 0,
                rover: 0,
                duty_driver: 0,
                colors: 0
            };
        });
    }
    return assignedCounts;
}

function assignDayRoles(requirements, students, assignedCounts, dutySection) {
    const assignments = {
        moow: [],
        rover: [],
        duty_driver: [],
        colors: []
    };

    const assignedStudents = [];

    assignRole(assignments, 'colors', requirements.colors, students, assignedCounts, assignedStudents, dutySection, student => student.status !== 6);
    assignRole(assignments, 'duty_driver', requirements.duty_driver, students, assignedCounts, assignedStudents, dutySection, student => student.canDrive === 'Yes' && student.status !== 6);
    assignRole(assignments, 'moow', requirements.moow, students, assignedCounts, assignedStudents, dutySection, student => true);
    assignRole(assignments, 'rover', requirements.rover, students, assignedCounts, assignedStudents, dutySection, student => true);

    return assignments;
}

function assignRole(assignments, role, count, students, assignedCounts, assignedStudents, dutySection, conditionFn) {
    let sortedStudents = students.filter(conditionFn).slice().sort((a, b) => assignedCounts[a.name][role] - assignedCounts[b.name][role]);

    for (let i = 0; i < count; i++) {
        let studentAssigned = false;

        for (let j = 0; j < sortedStudents.length; j++) {
            const student = sortedStudents[j];
            if (!assignedStudents.includes(student.name)) {
                assignments[role].push(student.name);
                assignedStudents.push(student.name);
                assignedCounts[student.name][role]++;
                studentAssigned = true;
                break;
            }
        }

        if (!studentAssigned) {
            sortedStudents = students.filter(conditionFn).slice().sort((a, b) => assignedCounts[a.name][role] - assignedCounts[b.name][role]);
            for (let j = 0; j < sortedStudents.length; j++) {
                const student = sortedStudents[j];
                if (!assignedStudents.includes(student.name)) {
                    assignments[role].push(student.name);
                    assignedStudents.push(student.name);
                    assignedCounts[student.name][role]++;
                    break;
                }
            }
        }
    }
}

function parseDate(dateStr) {
    const parts = dateStr.match(/(\d{2})([A-Z]{3})(\d{4})/);
    if (!parts) return null;
    const day = parseInt(parts[1], 10);
    const month = new Date(Date.parse(parts[2] + " 1, 2024")).getMonth();
    const year = parseInt(parts[3], 10);
    return new Date(year, month, day);
}
