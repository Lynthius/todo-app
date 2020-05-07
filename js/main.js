// ACTUAL DATE
const h1 = document.querySelector(`h1[data-time="day"]`);
const h2 = document.querySelector(`h2[data-time="month"]`);

function renderDate() {
  let today = new Date();
  let dayNumber = today.getDate();
  let month = today.toLocaleString('locale', {
    month: 'short'
  });
  let year = today.getFullYear();
  let day = today.toLocaleDateString('locale', {
    weekday: 'long'
  });

  h1.textContent = `${day}`;
  h2.textContent = `${dayNumber} ${month}, ${year}`;
}
renderDate();

// TO-DO-LIST
const input = document.querySelector(".input");
const form = document.querySelector(".add-form");
const ul = document.querySelector(".tasks");

let items = JSON.parse(localStorage.getItem("items")) || [];

function updateLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
  updateTasks(items, ul);
};

function addTask(e) {
  e.preventDefault();
  const text = (this.querySelector('input')).value;
  // var check = "";
  const item = {
    text,
    check
  };

  if (text) {
    items.push(item);
    this.reset();
    updateLocalStorage()
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
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
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
    clickedTask.classList.remove("checked");
  } else {
    clickedTask.classList.add("checked");
  };
  
  const archiveIcon = document.querySelector(".archive");

  function archiveTask() {
    if (!(clickedTask.classList.contains("checked"))) return;
    const removeIndex = items.map(function (item) {
      return item.id;
    }).indexOf(idTask);

    for (let i = 0; i < items.length; i++) {
      const obj = items[i];

      if (idTask.indexOf(obj.id) !== -1) {
        items.splice(removeIndex, 1);
      };
      updateLocalStorage()
    };
  };
  archiveIcon.addEventListener("click", archiveTask);
};

ul.addEventListener("change", checkTask);
updateTasks(items, ul);