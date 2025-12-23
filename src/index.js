import "./styles.css";

const dueDate = document.querySelector("#dueDate");
dueDate.min = new Date().toISOString().split("T")[0];

const modals = document.querySelectorAll("dialog");

// For assigning all current and future buttons and event listeners
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

// For building card elements
function elementBuilder(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls) el.classList.add(cls);
  if (text != null) {
    el.textContent = text;
  }

  return el;
}

// Tab Creation
const tabList = document.querySelector(".tabList");
const tabs = [];

class Tab {
  constructor(data) {
    this.tabID = data.tabID;
    this.tabName = data.tabName;
  }
}

function addTabToList(name) {
  const id = crypto.randomUUID();
  tabs.push(new Tab({ tabID: id, tabName: name }));
}

// Tab form add button
const addTab = document.querySelector(".addTab");
addTab.addEventListener("click", (e) => {
  e.preventDefault();
  const tabName = document.querySelector("#tab").value;

  addTabToList(tabName);
  console.log(tabs);

  const newTab = tabs[tabs.length - 1];
  tabLoader(newTab);

  document.querySelector("dialog[open]").close();
});

let tabLoader = (tab) => {
  const tabEntry = elementBuilder("div", "tabEntry");
  tabEntry.dataset.tabID = tab.tabID;

  const tabBtn = elementBuilder("button", "tab", tab.tabName);

  const tabRemoveBtn = elementBuilder("button", "tabRemoveBtn", "Remove");
  tabRemoveBtn.addEventListener("click", () => {
    tabEntry.remove();
    const index = tabs.findIndex(
      (tabToRemove) => (tabToRemove.tabID = tab.tabID)
    );
    if (index !== -1) tabs.splice(index, 1);
  });
  tabEntry.append(tabBtn, tabRemoveBtn);
  tabList.append(tabEntry);
};

let tabListLoader = () => {
  tabs.forEach((tabList) => {
    tabLoader(tabList);
  });
};

// Task creation
const taskContainer = document.querySelector(".taskContainer");
const tasks = [];

class Task {
  constructor(data) {
    this.taskID = data.taskID;
    this.taskName = data.taskName;
    this.taskDueDate = data.taskDueDate;
    this.taskDesc = data.taskDesc;
    this.taskPriority = data.taskPriority;
  }
}

function addTaskToTab(name, date, desc, priority) {
  const id = crypto.randomUUID();
  return tasks.push(
    new Task({
      taskID: id,
      taskName: name,
      taskDueDate: date,
      taskDesc: desc,
      taskPriority: priority,
    })
  );
}

// Task form add button
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
  console.log(tasks);

  const newTask = tasks[tasks.length - 1];
  taskLoader(newTask);

  document.querySelector("dialog[open]").close();
});

let taskLoader = (task) => {
  const card = elementBuilder("article", "card");
  card.dataset.taskID = task.taskID;

  const taskCheckbox = elementBuilder("input", "taskCheckbox");
  taskCheckbox.type = "checkbox";
  const taskName = elementBuilder("h2", "taskName", task.taskName);
  const taskDesc = elementBuilder("div", "taskDesc", task.taskDesc);
  const cardFooter = elementBuilder("div", "cardFooter");
  const taskDueDate = elementBuilder("p", "taskDueDate", task.dueDate);
  const taskPriority = elementBuilder(
    "button",
    "taskPriority",
    task.taskPriority
  );

  const taskRemoveBtn = elementBuilder("button", "taskRemoveBtn", "Remove");
  taskRemoveBtn.addEventListener("click", () => {
    card.remove();
    const index = tasks.findIndex(
      (taskToRemove) => (taskToRemove.taskID = task.taskID)
    );
    if (index !== -1) tasks.splice(index, 1);
  });

  cardFooter.append(taskDueDate, taskPriority, taskRemoveBtn);
  card.append(taskCheckbox, taskName, taskDesc, cardFooter);

  taskContainer.append(card);
};

let taskListLoader = () => {
  tasks.forEach((taskContainer) => {
    taskLoader(taskContainer);
  });
};

tabListLoader();
taskListLoader();
