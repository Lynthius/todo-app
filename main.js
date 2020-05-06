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

let items = JSON.parse(localStorage.getItem("items")) || [];

function addTask(e) {
    e.preventDefault();
    var id = generateID();
    var id = id ? id : generateID();
    var color = "black";
    var decoration = "none";
    var check = "";
    const text = (this.querySelector("input")).value;

    const item = {
        text,
        id: id,
        color: color,
        decoration: decoration,
        check: check
    };

    if (text) {
        items.push(item);
        updateTasks(items, ul);
        this.reset();
        localStorage.setItem("items", JSON.stringify(items));
    };
};

function updateTasks(tasks = [], tasksList) {
    tasksList.innerHTML = tasks.map((task, i) => {
        var id = id ? id : generateID();
        return `<li>
        <label class="tasks__label" style="text-decoration: ${task.decoration}; color: ${task.color}">
        <input class="checkbox tasks__checkbox" type="checkbox" ${task.check} data-index = ${i} data-id=${id}>
        <span class="checkbox-custom"></span><span class="check-text">${task.text}</span>
        </label>
        <li>`
    }).join('');
};

form.addEventListener("submit", addTask);

function generateID() {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randLetter + Date.now();
};

// ADD AND REMOVE AND CLEAR TASK
function checkTask(e) {
    const clickedTask = e.target.parentNode;
    const index = e.target.dataset.index;
    const idTask = e.target.dataset.id;
    const checkBox = clickedTask.querySelector(".checkbox").checked;

    items[index].id = idTask;

    if (!checkBox) {
        clickedTask.style.textDecoration = "none";
        clickedTask.style.color = "black";
        color = "black";
        items[index].color = "black";
        items[index].decoration = "none";
        items[index].check = "";
    } else {
        clickedTask.style.textDecoration = "line-through";
        clickedTask.style.color = "grey";
        color = "grey";
        items[index].color = "grey";
        items[index].decoration = "line-through";
        items[index].check = "checked";
    };

    localStorage.setItem("items", JSON.stringify(items));
    updateTasks(items, ul);
};

const archiveIcon = document.querySelector(".archive");

function archiveTask() {
    for (var i = 0; i < items.length; i++) {
        let obj = items[i];
        if ((obj.check) === "checked") {
            items.splice(i, 1);
        };
    };
    localStorage.setItem("items", JSON.stringify(items));
    updateTasks(items, ul);
};

archiveIcon.addEventListener("click", archiveTask);
ul.addEventListener("change", checkTask);

updateTasks(items, ul);