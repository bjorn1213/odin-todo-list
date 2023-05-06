import { add, format } from "date-fns";

const createBanner = (pageTitle) => {
  const banner = document.createElement("div");
  banner.classList.add("banner");

  banner.textContent = pageTitle;
  return banner;
};

const getProjectSidebarItemID = (projectID) => `project-${projectID}`;

const getProjectIDfromDOMID = (domID) => domID.slice(8);

const getTodoIDfromDOMID = (domID) => domID.slice(5);

const toggleActiveProject = (oldActiveID, newActiveID) => {
  const previousActiveDOMID = getProjectSidebarItemID(oldActiveID);
  document.getElementById(previousActiveDOMID).classList.toggle("active-project");

  const projectDOMID = getProjectSidebarItemID(newActiveID);
  document.getElementById(projectDOMID).classList.toggle("active-project");
};

const createSidebarItem = (id, project) => {
  const item = document.createElement("div");

  item.classList.add("project-item");
  item.id = getProjectSidebarItemID(id);
  item.textContent = project.getProjectName();

  return item;
};

const createSidebar = (projects, callbackFunction) => {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  const firstProjectID = Object.keys(projects)[0]; // assumes at least 1 project

  for (const [id, project] of Object.entries(projects)) {
    const sidebarItem = createSidebarItem(id, project);
    if (id === firstProjectID) {
      sidebarItem.classList.add("active-project");
    }
    sidebarItem.addEventListener("click", (event) => {
      const domID = event.target.id;
      callbackFunction(getProjectIDfromDOMID(domID));
    });

    sidebar.appendChild(sidebarItem);
  }

  return sidebar;
};

const createTodoItem = (
  id,
  todo,
  deleteTodoCallback,
  completeTodoCallback,
  priorityToggleCallback,
  titleEditCallback
) => {
  const todoItem = document.createElement("div");

  todoItem.classList.add("todo-item");
  todoItem.id = `todo-${id}`;

  const title = todo.getTitle();
  const titleDOM = document.createElement("div");
  titleDOM.classList.add("todo-title");
  titleDOM.textContent = title;
  titleDOM.addEventListener("click", (event) => {
    const domID = event.target.parentNode.id;
    titleEditCallback(getTodoIDfromDOMID(domID));
  });

  const dueDate = todo.getDueDate();
  const dueDateDOM = document.createElement("div");
  dueDateDOM.classList.add("todo-date");
  dueDateDOM.textContent = format(dueDate, "dd-MM-yyyy");

  const description = todo.getDescription();
  const descriptionDOM = document.createElement("div");
  descriptionDOM.classList.add("todo-description");
  descriptionDOM.textContent = description;

  const priority = todo.getPriority();
  const priorityDOM = document.createElement("div");
  priorityDOM.classList.add("todo-priority");
  priorityDOM.classList.add(`priority-${priority}`);
  priorityDOM.addEventListener("click", (event) => {
    const domID = event.target.parentNode.id;
    priorityToggleCallback(getTodoIDfromDOMID(domID));
  });

  const removeTodo = document.createElement("button");
  removeTodo.classList.add("btn-todo-remove");
  removeTodo.textContent = "Delete";
  removeTodo.addEventListener("click", (event) => {
    const domID = event.target.parentNode.parentNode.id;
    deleteTodoCallback(getTodoIDfromDOMID(domID));
  });

  const toggleComplete = document.createElement("button");
  toggleComplete.classList.add("btn-todo-toggle-complete");
  toggleComplete.addEventListener("click", (event) => {
    const domID = event.target.parentNode.parentNode.id;
    completeTodoCallback(getTodoIDfromDOMID(domID));
  });

  const completed = todo.getCompleted();
  if (completed) {
    priorityDOM.classList.add("todo-completed");
    toggleComplete.textContent = "To do";
  } else {
    toggleComplete.textContent = "Complete";
  }

  const todoBtnContainer = document.createElement("div");
  todoBtnContainer.classList.add("todo-btn-container");

  todoBtnContainer.append(toggleComplete, removeTodo);

  todoItem.append(titleDOM, dueDateDOM, priorityDOM, descriptionDOM, todoBtnContainer);

  return todoItem;
};

const createTodoContainer = () => {
  const todoContainer = document.createElement("div");
  todoContainer.id = "todo-overview";

  return todoContainer;
};

const replaceTodoOverview = (newOverview) => {
  const overview = document.getElementById("todo-overview");
  overview.replaceWith(newOverview);
};

const createContainer = () => {
  const container = document.createElement("div");
  container.id = "container";

  return container;
};

const replaceContainer = (newContainer) => {
  document.getElementsByTagName("body")[0].replaceChildren(newContainer);
};

const createAddTodoItemButton = (callbackFunction) => {
  const addTodoButton = document.createElement("button");
  addTodoButton.id = "add-todo-item";
  addTodoButton.textContent = "+";
  addTodoButton.addEventListener("click", () => callbackFunction());
  return addTodoButton;
};

function createTodoTitleEditor(originalTitle, callbackFunction) {
  const titleInput = document.createElement("input");
  titleInput.classList.add("todo-title-input");
  titleInput.value = originalTitle;

  const callback = (event) => {
    const newTitle = event.target.value;
    const domID = event.target.parentNode.id;
    const todoID = getTodoIDfromDOMID(domID);
    console.log(domID);
    callbackFunction(todoID, newTitle);
  };

  titleInput.addEventListener("focusout", callback);
  titleInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      callback(event);
    }
  });

  return titleInput;
}

function replaceElement(queryText, element) {
  try {
    document.querySelector(queryText).replaceWith(element);
  } catch (e) {
    e = 1;
  }
}

function removeElement(elementID) {
  document.getElementById(elementID).remove();
}

export {
  createBanner,
  createSidebar,
  createContainer,
  createTodoContainer,
  createTodoItem,
  createAddTodoItemButton,
  replaceContainer,
  toggleActiveProject,
  replaceElement,
  removeElement,
  replaceTodoOverview,
  createTodoTitleEditor,
};
