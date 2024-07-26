// Event listener for form submission
document.getElementById('submitCreateDutySectionForm').addEventListener('click', dslOnSubmit);

// Event listener for Monday date blur event to auto-populate other dates
document.getElementById('mon_date').addEventListener('blur', autoPopulateDates);

// Function to handle form submission
async function dslOnSubmit(event) {
    event.preventDefault();

    const formInputs = parseFormInputs();
    if (!formInputs) return;

    const { dates, schedules } = formInputs;
    const weekNumber = getWeekNumber(dates.mon);

    resetStudentStatus();
    ensureStudentStatus();

    try {
        const sunsetData = await fetchSunsetTimes(dates.mon, dates.sun);
        if (sunsetData.error) {
            alert('Fetch Sunset Times Error: ' + sunsetData.error);
            return;
        }

        const sunsetTimes = sunsetData.sunset_times;
        console.log('Fetched sunset times:', sunsetTimes);

        const roster = initializeDutyRoster(schedules, sunsetTimes, dates);
        console.log('Initialized roster with sunset times:', roster);

        const studentsByDutySection = getStudentsGroupedByDutySection();

        if (!db.roleAssignments) {
            db.roleAssignments = initializeRoleAssignments();
        }

        const starting_dsn = getStartingDutySection(weekNumber);

        assignRolesToRoster(roster, schedules, starting_dsn, studentsByDutySection, weekNumber, dates);

        saveRosterToDatabase(weekNumber, roster); // Added function definition below
        saveRoleAssignments();
        location.reload();
    } catch (error) {
        console.error('DSL On Submit Error:', error);
        alert('DSL On Submit Error: ' + error.message);
    }
}

// Function to save the roster to the database
function saveRosterToDatabase(weekNumber, roster) {
    if (!db.rosters) {
        db.rosters = {};
    }

    db.rosters[weekNumber] = { ...db.rosters[weekNumber], roster: roster };

    sessionStorage.setItem('db', JSON.stringify(db));
}

// Function to save Role Assignments
function saveRoleAssignments() {
    sessionStorage.setItem('db', JSON.stringify(db));
}

// Function to parse form inputs
function parseFormInputs() {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const dates = {};
    const schedules = {};

    for (const day of days) {
        const dateInput = document.getElementById(`${day}_date`);
        const scheduleInput = document.getElementById(`${day}_schedule`);

        if (!dateInput.value || !scheduleInput.value) {
            alert(`All fields for ${day.toUpperCase()} are required.`);
            return null;
        }

        dates[day] = dateInput.value;
        schedules[day] = parseInt(scheduleInput.value);
    }

    console.log('Parsed form inputs:', { dates, schedules });
    return { dates, schedules };
}

// Function to get the week number from a date string
function getWeekNumber(dateStr) {
    const parts = dateStr.match(/(\d{2})([A-Z]{3})(\d{4})/);
    if (!parts) {
        throw new Error(`Invalid date format: ${dateStr}`);
    }
    const day = parseInt(parts[1], 10);
    const month = new Date(Date.parse(parts[2] + " 1, 2024")).getMonth();
    const year = parseInt(parts[3], 10);
    const date = new Date(year, month, day);

    const firstJan = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstJan) / 86400000 + 1;

    return Math.ceil(pastDaysOfYear / 7);
}

// Function to initialize the duty roster with schedules and sunset times
function initializeDutyRoster(schedules, sunsetTimes, dates) {
    const roster = {};

    for (const day in schedules) {
        const date = dates[day];
        const sunsetTime = sunsetTimes[convertToYYYYMMDD(date)];
        roster[day] = {
            date: date,
            duty_section: '',
            assignments: {
                moow: [],
                rover: [],
                duty_driver: [],
                colors: []
            },
            sunset_time: sunsetTime,
            schedule: schedules[day],
            duty_section_name: '',
            duty_section_leader_name: '',
            duty_section_leader_number: '',
            specific_notes_for_duty_section: ''
        };
    }

    return roster;
}

// Function to convert date from DDMMMYYYY to YYYY-MM-DD format
function convertToYYYYMMDD(dateStr) {
    const parts = dateStr.match(/(\d{2})([A-Z]{3})([0-9]{4})/);
    if (!parts) {
        console.error('Failed to parse date:', dateStr);
        return null;
    }
    const day = parts[1];
    const month = {
        JAN: '01', FEB: '02', MAR: '03', APR: '04',
        MAY: '05', JUN: '06', JUL: '07', AUG: '08',
        SEP: '09', OCT: '10', NOV: '11', DEC: '12'
    }[parts[2].toUpperCase()];
    const year = parts[3];
    if (!day || !month || !year) {
        console.error('Invalid date components:', { day, month, year });
        return null;
    }
    return `${year}-${month}-${day}`;
}

// Function to reset student status
function resetStudentStatus() {
    db.students.forEach(student => {
        student.status = 5;
    });
}

// Function to ensure all students have a status property
function ensureStudentStatus() {
    db.students.forEach(student => {
        if (!student.hasOwnProperty('status')) {
            student.status = 5;
        }
    });
    sessionStorage.setItem('db', JSON.stringify(db));
}

// Function to get the starting duty section based on the previous week
function getStartingDutySection(weekNumber) {
    const lastWeekNumber = weekNumber - 1;
    if (db.rosters && db.rosters[lastWeekNumber]) {
        return getNextDutySection(db.rosters[lastWeekNumber].roster.sun.duty_section);
    } else {
        return db.duty_sections[0].dsn;
    }
}

// Function to get the next duty section
function getNextDutySection(currentDsn) {
    const currentIndex = db.duty_sections.findIndex(section => section.dsn === currentDsn);
    return db.duty_sections[(currentIndex + 1) % db.duty_sections.length].dsn;
}

// Function to group students by duty section
function getStudentsGroupedByDutySection() {
    const studentsByDutySection = {};
    db.duty_sections.forEach(dutySection => {
        studentsByDutySection[dutySection.dsn] = getStudentsByDutySection(dutySection.dsn);
    });
    return studentsByDutySection;
}

// Function to get students by duty section
function getStudentsByDutySection(dutySection) {
    return db.students.filter(student => String(student.dutySection) === String(dutySection));
}

// Function to initialize role assignments
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

// Function to assign roles to the roster
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
        const students = studentsByDutySection[dutySection].filter(student => {
            const gradDate = student.gradDate;
            if (!gradDate) return true; // Consider students without a graduation date as eligible
            const parsedGradDate = parseDate(gradDate);
            const parsedDayDate = parseDate(dates[day]);
            return parsedGradDate && parsedDayDate && parsedGradDate > parsedDayDate;
        });
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

// Function to initialize assigned counts
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

// Function to assign roles
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

// Function to assign a specific role
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

// Function to fetch sunset times
async function fetchSunsetTimes(startDate, endDate) {
    const latitude = 34.153402513535646;
    const longitude = -119.20478946579799;

    // Convert date format from DDMMMYYYY to YYYY-MM-DD
    const convertDate = (date) => {
        const months = {
            JAN: '01', FEB: '02', MAR: '03', APR: '04',
            MAY: '05', JUN: '06', JUL: '07', AUG: '08',
            SEP: '09', OCT: '10', NOV: '11', DEC: '12'
        };
        const day = date.slice(0, 2);
        const month = months[date.slice(2, 5).toUpperCase()];
        const year = date.slice(5);
        return `${year}-${month}-${day}`;
    };

    const start = convertDate(startDate);
    const end = convertDate(endDate);
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date_start=${start}&date_end=${end}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error('Failed to fetch data');
        }

        const sunsetTimes = {};
        data.results.forEach(day => {
            const date = day.date;
            const [time, meridian] = day.sunset.split(' ');
            let [hours, minutes] = time.split(':');
            hours = parseInt(hours);
            if (meridian === 'PM' && hours !== 12) hours += 12;
            if (meridian === 'AM' && hours === 12) hours = 0;
            sunsetTimes[date] = `${String(hours).padStart(2, '0')}:${minutes}`;
        });

        return {
            date_range: [start, end],
            sunset_times: sunsetTimes
        };
    } catch (error) {
        console.error('Fetch Sunset Times Error:', error);
        return { error: error.message };
    }
}
