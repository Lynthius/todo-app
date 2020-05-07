// ACTUAL DATE
const h1 = document.querySelector(`h1[data-time="day"]`);
const h2 = document.querySelector(`h2[data-time="month"]`);

const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let today = new Date();
let dayNumber = today.getDay();
let monthNumber = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();

h1.textContent = dayList[dayNumber];
h2.textContent = `${day} ${monthList[monthNumber]}, ${year}`;

// TO-DO-LIST
const input = document.querySelector(".input");
const form = document.querySelector(".add-form");
const ul = document.querySelector(".tasks")

let items = JSON.parse(localStorage.getItem("items")) || [];

function addTask(e) {
    e.preventDefault();
    var id = generateID();
    var id = id ? id : generateID();
    const text = (this.querySelector('input')).value;
    const item = {
        text,
        id: id
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
        <label class="tasks__label">
        <input class="checkbox tasks__checkbox" type="checkbox" value="false" data-index = ${i} data-id=${id}>
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

    items[index].id = idTask;

    let checkBox = clickedTask.querySelector(".checkbox").checked;

    if (!checkBox) {
        clickedTask.style.textDecoration = "none";
        clickedTask.style.color = "black";
    } else {
        clickedTask.style.textDecoration = "line-through";
        clickedTask.style.color = "grey";
    };

    const archiveIcon = document.querySelector(".archive");

    function archiveTask() {
        if (!(clickedTask.style.textDecoration === "line-through")) return;
        var removeIndex = items.map(function (item) {
            return item.id;
        }).indexOf(idTask);

        for (var i = 0; i < items.length; i++) {
            var obj = items[i];

            if (idTask.indexOf(obj.id) !== -1) {
                items.splice(removeIndex, 1);
            };
            localStorage.setItem("items", JSON.stringify(items));
            updateTasks(items, ul);
        };
    };
    archiveIcon.addEventListener("click", archiveTask);
    console.log(items);
};

ul.addEventListener("change", checkTask);

updateTasks(items, ul);