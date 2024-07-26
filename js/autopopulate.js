function autoPopulateDates() {
    const mondayDate = document.getElementById('mon_date').value;
    const days = ['tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    if (isValidDate(mondayDate)) {
        let currentDate = parseDate(mondayDate);

        for (const day of days) {
            currentDate.setDate(currentDate.getDate() + 1);
            const dayElement = document.getElementById(`${day}_date`);
            dayElement.value = formatDate(currentDate);
            dayElement.setAttribute('readonly', true);
        }
    } else {
        alert('Please enter a valid date in the format DDMMMYYYY (e.g., 31JAN2024).');
    }
}

function isValidDate(dateStr) {
    const parts = dateStr.match(/(\d{2})([A-Z]{3})(\d{4})/);
    if (!parts) return false;
    const day = parseInt(parts[1], 10);
    const month = new Date(Date.parse(parts[2] + " 1, 2024")).getMonth();
    const year = parseInt(parts[3], 10);
    const date = new Date(year, month, day);
    return !isNaN(date);
}

function parseDate(dateStr) {
    if (!dateStr) return null;  // Return null if dateStr is undefined or empty
    const parts = dateStr.match(/(\d{2})([A-Z]{3})(\d{4})/);
    if (!parts) {
        console.error('Failed to parse date:', dateStr);
        return null;
    }
    const day = parseInt(parts[1], 10);
    const month = new Date(Date.parse(parts[2] + " 1, 2024")).getMonth();
    const year = parseInt(parts[3], 10);
    return new Date(year, month, day);
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day}${month}${year}`;
}
