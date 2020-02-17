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
let newTask;
let i = 0;

// const newTab = (e) => {
//     e.preventDefault()
{
    /* <label class="tasks__label"></label> */
}
// }

// ADD TASK
const addTask = (e) => {
    e.preventDefault();
    newTask = input.value;
    if (!newTask) return;
    const newLi = document.createElement("li");
    newLi.classList = "tasks__item";
    ul.appendChild(newLi).innerHTML = `<label class="tasks__label"><input class="checkbox tasks__checkbox" type="checkbox" value="false" data-key=${i}><span class="checkbox-custom"></span><span class="check-text">${newTask}</span></label>`;
    i++;
    input.value = "";
    newLi.addEventListener("change", checkTask);
};
form.addEventListener("submit", addTask);

// ADD AND REMOVE AND CLEAR TASK
const checkTask = (e) => {
    const clickedTask = e.target.parentNode;
    console.log(clickedTask);

    let checkBox = clickedTask.querySelector(".checkbox").checked;
    console.log(checkBox);

    if (!checkBox) {
        clickedTask.style.textDecoration = "none";
        clickedTask.style.color = "black";
    } else {
        clickedTask.style.textDecoration = "line-through";
        clickedTask.style.color = "grey";
    };

    // CLEAR LIST
    const archiveIcon = document.querySelector(".archive");
    const archiveTask = () => {
        console.log(checkBox);
        if (clickedTask.style.color === "grey" && clickedTask.style.textDecoration === "line-through") {
            clickedTask.remove();
        };
    };
    archiveIcon.addEventListener("click", archiveTask);
};