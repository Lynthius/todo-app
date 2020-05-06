// ACTUAL DATE
const h1 = document.querySelector(`h1[data-time="day"]`);
const h2 = document.querySelector(`h2[data-time="month"]`);

const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let today = new Date();
let dayNumber = today.getDay();
let monthNumber = today.getMonth();
let year = today.getFullYear();

h2.textContent = `${monthList[monthNumber]}, ${year}`;

window.onload = function () {
    const calendarDate = new this.Date();
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = calendarDate.getMonth();
    const year = calendarDate.getFullYear();

    const firstDate = `${monthList[month]}, ${1} ${year}`;
    const tempDate = new this.Date(firstDate).toDateString();
    const firstDay = tempDate.substring(0, 3);
    const dayNumber = dayList.indexOf(firstDay);

    const daysTotal = new this.Date(year, month + 1, 0).getDate();
    const calendar = this.getCalendar(dayNumber, daysTotal);

    document.querySelector(".calendar__current-date").innerHTML = `${monthList[month]} ${year}`;
    document.getElementById("calendar__dates").appendChild(calendar);
};

function getCalendar(dayNumber, daysTotal) {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    const dayCurrent = new Date().getDate();

    // create row for the day letters
    for (var c = 0; c <= 6; c++) {
        var td = document.createElement("td");
        td.innerHTML = "SMTWTFS" [c];
        tr.appendChild(td);
    };
    table.appendChild(tr);

    // create 2nd row for number of days
    tr = document.createElement("tr");
    var c;
    for (var c = 0; c <= 6; c++) {
        if (c == dayNumber) {
            break;
        };
        var td = document.createElement("td");
        td.innerHTML = "";
        tr.appendChild(td);
    };

    var count = 1;
    for (; c <= 6; c++) {
        var td = document.createElement("td");
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);

    // create rest of the rows
    for (var r = 3; r <= 7; r++) {
        tr = document.createElement("tr");
        for (var c = 0; c <= 6; c++) {
            if (td.textContent == dayCurrent) {
                td.classList.add("current-day");
                console.log(dayCurrent);
            };
            if (count > daysTotal) {
                table.appendChild(tr);
                return table;
            };
            var td = document.createElement("td");
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        };
        table.appendChild(tr);
    };
    return table;
};