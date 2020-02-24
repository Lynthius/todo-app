// ACTUAL DATE
const h1 = document.querySelector(`h1[data-time="day"]`);
const h2 = document.querySelector(`h2[data-time="month"]`);

const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let today = new Date();
let dayNumber = today.getDay();
let monthNumber = today.getMonth();
let year = today.getFullYear();

h2.textContent = `${dayList[dayNumber]}, ${monthList[monthNumber]}, ${year}`;

const initBtn = document.querySelector('.main');
const resetBtn = document.querySelector('.reset');
const timerOutput = document.querySelector('.time');
const ul = document.querySelector(".times");

let time = JSON.parse(localStorage.getItem("time")) || 0;
let records = JSON.parse(localStorage.getItem("records")) || [];
let i = (JSON.parse(localStorage.getItem("i")) + 1) || 1;
let active = false;
let intervalId;

// window.onload = function() {
const initTimer = () => {
    if (!active) {
        active = !active;
        initBtn.textContent = 'PAUSE';
        intervalId = setInterval(startTimer, 10);
    } else {
        active = !active;
        initBtn.textContent = 'START';
        clearInterval(intervalId);
    };
};

let newRecord = "";

const startTimer = () => {
    timerOutput.textContent = (time / 100).toFixed(2);
    newRecord = timerOutput.textContent;
    localStorage.setItem("time", JSON.stringify(time));
    time++;
};

const resetTimer = () => {
    time = 0;
    active = false;
    initBtn.textContent = 'START';
    timerOutput.textContent = '---';
    clearInterval(intervalId);
    localStorage.removeItem("time")
    localStorage.setItem("i", JSON.stringify(i));

    if (!newRecord) return;

    const newLi = document.createElement("li");
    newLi.classList = "record__item";
    record = (ul.insertBefore(newLi, ul.firstChild).innerHTML = `<span class="check-text"> Measurement ${i} is equal to <strong>${newRecord}</strong>`);
    records.push(record);
    newRecord = "";
    i++;
    updateRecords(records, ul)
};

function updateRecords(records = [], ul) {
    ul.innerHTML = records.map((record) => {
        return record;
    }).join('');
    localStorage.setItem("records", JSON.stringify(records));
};

initBtn.addEventListener('click', initTimer);
resetBtn.addEventListener('click', resetTimer);

startTimer();
updateRecords(records, ul);