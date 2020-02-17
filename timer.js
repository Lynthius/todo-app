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

let time = 0;
let active = false;
let intervalId;

const initTimer = () => {
    if (!active) {
        active = !active;
        initBtn.textContent = 'PAUSE';
        intervalId = setInterval(startTimer, 10);
    } else {
        active = !active;
        initBtn.textContent = 'START';
        clearInterval(intervalId);
    }
};

let newRecord = "";
let i = 1;
const startTimer = () => {
    time++;
    timerOutput.textContent = `${(time / 1000).toFixed(2)}`;
    newRecord = timerOutput.textContent;
};

const resetTimer = () => {
    time = 0;
    active = false;
    initBtn.textContent = 'START';
    timerOutput.textContent = '---';
    clearInterval(intervalId);

    if (!newRecord) return;

    const newLi = document.createElement("li");
    newLi.classList = "record__item";
    ul.insertBefore(newLi, ul.firstChild).innerHTML = `<span class="check-text"> Measurement ${i} is equal to <strong>${newRecord}</strong>`;
    newRecord = "";
    i++;
};

initBtn.addEventListener('click', initTimer);
resetBtn.addEventListener('click', resetTimer);