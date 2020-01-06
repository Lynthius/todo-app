// ACTUAL DATE
const h1 = document.querySelector(`h1[data-time="day"]`);
const h2 = document.querySelector(`h2[data-time="month"]`);

const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let today = new Date();
let dayNumber = today.getDay();
let monthNumber = today.getMonth();
let year = today.getFullYear();

h1.textContent = dayList[dayNumber];
h2.textContent = `${monthList[monthNumber]}, ${year}`;


// TO-DO-LIST
const input = document.querySelector(".input");
const form = document.querySelector(".add-form");
const ul = document.querySelector(".tasks")
const doneArray = [];
let newTask;

// ADD TASK
const addTask = (e) => {
    e.preventDefault();
    newTask = input.value;
    if (!newTask) return;
    const newLi = document.createElement("li");
    newLi.classList = "tasks__item";
    ul.appendChild(newLi).innerHTML = '<input class="checkbox tasks__checkbox" type="checkbox" value="false">' + newTask;
    input.value = "";
    console.log(newTask);
    newLi.addEventListener("change", checkTask);
};

// CHECK AND UNCHECK TASK
const checkTask = (e) => {
    const clickedTask = e.target.parentNode;
    let checkBox = clickedTask.querySelector(".checkbox").checked;
    console.log(checkBox);
    if (!checkBox) {
        clickedTask.style.textDecoration = "none";
        clickedTask.style.color = "black";
        checkBox = !checkBox;
    } else {
        clickedTask.style.textDecoration = "line-through";
        clickedTask.style.color = "grey";
        checkBox = !checkBox;
    };
};

// ARCHIVE - ADD TO DONE SECTION
// doneArray.push(clickedTask.textContent);


form.addEventListener("submit", addTask);