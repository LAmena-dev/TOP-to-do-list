import "./styles.css";

const modals = document.querySelectorAll("dialog");
const openButtons = document.querySelectorAll("[data-open-modal]");
const closeButtons = document.querySelectorAll(".closeModal");

openButtons.forEach((button) => {
  const modalSelector = button.dataset.openModal;
  const modal = document.querySelector(modalSelector);
  button.addEventListener("click", () => modal.showModal());
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modals.forEach((modal) => {
      if (modal.open) modal.close();
    });
  });
});

class Tab {
  constructor(data) {
    this.name = data.name;
  }
}

function addTabToList(name) {
  tabs.push(new Tab({ name }));
}

const addTab = document.querySelector(".addTab");
addTab.addEventListener("click", (e) => {
  e.preventDefault();
  const tabName = document.querySelector("#tab").value;

  addTabToList(tabName);
  document.querySelector("dialog[open]").close();
});

const dueDate = document.querySelector("#dueDate");
dueDate.min = new Date().toISOString().split("T")[0];

class Task {
  constructor(data) {
    this.name = data.name;
    this.dueDate = data.dueDate;
    this.desc = data.desc;
    this.priority = data.priority;
  }
}

function addTaskToTab(name, date, desc, priority) {
  tasks.push(new Task({ name, dueDate: date, desc, priority }));
}

const addTask = document.querySelector(".addTask");
addTask.addEventListener("click", (e) => {
  e.preventDefault();
  const taskName = document.querySelector("#task").value;
  const dueDate = document.querySelector("#dueDate").value;
  const taskDesc = document.querySelector("#desc").value;
  const taskPriority = document.querySelector(
    'input[name="task_priority"]:checked'
  ).id;

  addTaskToTab(taskName, dueDate, taskDesc, taskPriority);
  document.querySelector("dialog[open]").close();
});

const tabs = [];
const tasks = [];
