const initBtn = document.querySelector('.main');
const resetBtn = document.querySelector('.reset');
const timerOutput = document.querySelector('.time');

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

const startTimer = () => {
    time++;
    timerOutput.textContent = (time / 100).toFixed(2);
};

const resetTimer = () => {
    time = 0;
    active = false;
    initBtn.textContent = 'START';
    timerOutput.textContent = '---';
    clearInterval(intervalId);
};

initBtn.addEventListener('click', initTimer);
resetBtn.addEventListener('click', resetTimer);