// Current date
const h1 = document.querySelector(`h1[data-time="day"]`);
const h2 = document.querySelector(`h2[data-time="month"]`);

function renderDate() {
  let today = new Date();
  let dayNumber = today.getDate();
  let month = today.toLocaleString('locale', {month: 'short'});
  let year = today.getFullYear();
  let day = today.toLocaleDateString('locale', {weekday: 'long'});

  h2.textContent = `${day}, ${dayNumber} ${month}, ${year}`;
}
renderDate();

const initBtn = document.querySelector('.buttons__main');
const resetBtn = document.querySelector('.buttons__reset');
const timerOutput = document.querySelector('.stoper__time');
const ul = document.querySelector(".records__list");
const archiveIcon = document.querySelector(".archive");

let now = JSON.parse(localStorage.getItem("time")) || 0;
let records = JSON.parse(localStorage.getItem("records")) || [];
let i = (JSON.parse(localStorage.getItem("i")) + 1) || 1;
let active = false;
let intervalId;

const initTimer = () => {
  if (!active) {
    active = !active;
    initBtn.textContent = 'PAUSE';
    intervalId = setInterval(startTimer, 1000);
  } else {
    active = !active;
    initBtn.textContent = 'START';
    clearInterval(intervalId);
  };
};

let newRecord = "";

const startTimer = () => {
  var time = now;
  var hours = Math.floor(time / 3600);
  time -= hours * 3600;
  var mins = Math.floor(time / 60);
  time -= mins * 60;
  var secs = time;

  // Update the display timer
  if (hours < 10) {
    hours = +hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }
  timerOutput.innerHTML = hours + "." + mins + "." + secs;

  newRecord = timerOutput.textContent;
  localStorage.setItem("time", JSON.stringify(now));
  now++;
};

function resetTimer(e) {
  now = 0;
  active = false;
  initBtn.textContent = 'START';
  timerOutput.textContent = '0.00.00';
  clearInterval(intervalId);
  localStorage.removeItem("time")
  localStorage.setItem("i", JSON.stringify(i));

  if (!newRecord) return;
  record = document.createElement('div');
  record.innerHTML = `<li> Measurement ${i} is equal to <strong>${newRecord}</strong></li>`;
  ul.appendChild(record);
  newRecord = "";
  i++;
  records.push(record.innerHTML);
  updateRecords(records, ul);
};

function updateRecords(records = [], ul) {
  ul.innerHTML = records.map((record) => {
    console.log(record);
    return record;
  }).join('');
  localStorage.setItem("records", JSON.stringify(records));
};

initBtn.addEventListener('click', initTimer);
resetBtn.addEventListener('click', resetTimer);

function archiveRecords() {
  records = [];
  i = 1;
  localStorage.removeItem("records");
  localStorage.removeItem("i");
  updateRecords(records, ul);
};

archiveIcon.addEventListener("click", archiveRecords);

startTimer();
updateRecords(records, ul);