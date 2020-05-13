// Current date
const h1 = document.querySelector(`h1[data-time="day"]`);
const h2 = document.querySelector(`h2[data-time="month"]`);

function renderDate() {
  let today = new Date();
  let dayNumber = today.getDate();
  let month = today.toLocaleString('locale', {month: 'short'});
  let year = today.getFullYear();
  let day = today.toLocaleDateString('locale', {weekday: 'long'});

  h1.textContent = `${day}`;
  h2.textContent = `${dayNumber} ${month}, ${year}`;
}
renderDate();

// Todo list
const input = document.querySelector(".input");
const form = document.querySelector(".add-form");
const ul = document.querySelector(".tasks");
const archiveIcon = document.querySelector(".archive");

let items = JSON.parse(localStorage.getItem("items")) || [];

function updateLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
  updateTasks(items, ul);
};

function addTask(e) {
  e.preventDefault();
  const text = (this.querySelector('input')).value;

  const item = {
    text: text,
    classItem: "",
    check: ""
  };

  if (text) {
    items.unshift(item);
    this.reset();
    updateLocalStorage()
  };
};

form.addEventListener("submit", addTask);

function updateTasks(tasks = [], tasksList) {
  tasksList.innerHTML = tasks.map((task, i) => {
    let id = generateID();
    return `<li class="tasks__label ${task.classItem}">
        <label>
        <input class="checkbox tasks__checkbox" type="checkbox" ${task.check} data-index = ${i} data-id=${id}>
        <span class="checkbox-custom"></span><span class="check-text">${task.text}</span>
        </label>
        </li>`
  }).join('');
};

function generateID() {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
};

function checkTask(e) {
  const clickedTask = e.target.parentNode;
  const index = e.target.dataset.index;
  let checkBox = clickedTask.querySelector(".checkbox").checked;

  if (!checkBox) {
    clickedTask.classList.remove("checked");
    items[index].classItem = "";
    items[index].check = "";
  } else {
    clickedTask.classList.add("checked");
    items[index].classItem = "checked";
    items[index].check = "checked";
  };
  updateLocalStorage();
};

ul.addEventListener("change", checkTask);

function archiveTask() {
  for (let i = 0; i < items.length; i++) {
    if (items[i].check == "checked") {
      items.splice(i, 1);
      updateLocalStorage();
      archiveTask();
    };
  };
};

archiveIcon.addEventListener("click", archiveTask);
updateTasks(items, ul);