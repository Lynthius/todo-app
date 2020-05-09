// Current date
const h1 = document.querySelector(`h1[data-time="day"]`);
const h2 = document.querySelector(`h2[data-time="month"]`);

function renderDate() {
  let today = new Date();
  let dayNumber = today.getDate();
  let month = today.toLocaleString('locale', {month: 'short'});
  let year = today.getFullYear();
  let day = today.toLocaleDateString('locale', {weekday: 'long'});

  h2.textContent = `${dayNumber} ${month}, ${year}`;
}
renderDate();

window.onload = function createCalendar() {
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

  document.querySelector(".calendar__current-month").innerHTML = `${monthList[month]} ${year}`;
  document.querySelector(".calendar__dates").appendChild(calendar);
};

function getCalendar(dayNumber, daysTotal) {
  const dayCurrent = new Date().getDate();
  const table = document.createElement("table");
  let tr = document.createElement("tr");
  var td = document.createElement("td");

  // Create row for the day letters
  for (var c = 0; c <= 6; c++) {
    var td = document.createElement("td");
    td.innerHTML = "SMTWTFS" [c];
    tr.appendChild(td);
  };
  table.appendChild(tr);

  // Create 2nd row for number of days
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

  // Create rest of the rows
  for (var r = 3; r <= 7; r++) {
    tr = document.createElement("tr");
    for (var c = 0; c <= 6; c++) {
      if (td.textContent == dayCurrent) {
        td.classList.add("calendar__dates--highlight-day");
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