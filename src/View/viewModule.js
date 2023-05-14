import { format } from "date-fns";

// general page components
const createBanner = (pageTitle) => {
  const banner = document.createElement("div");
  banner.classList.add("banner");

  banner.textContent = pageTitle;
  return banner;
};

const createContainer = () => {
  const container = document.createElement("div");
  container.id = "container";

  return container;
};

const replaceContainer = (newContainer) => {
  document.getElementsByTagName("body")[0].replaceChildren(newContainer);
};

// utility
const getProjectSidebarItemID = (projectID) => `project-${projectID}`;

const getProjectIDfromDOMID = (domID) => domID.slice(8);

const getTodoIDfromDOMID = (domID) => domID.slice(5);

function replaceElement(queryText, element) {
  try {
    document.querySelector(queryText).replaceWith(element);
  } catch (e) {
    // eslint-disable-next-line no-ex-assign
    e = 1;
  }
}

function removeElement(elementID) {
  document.getElementById(elementID).remove();
}

// project level
const toggleActiveProject = (oldActiveID, newActiveID) => {
  const previousActiveDOMID = getProjectSidebarItemID(oldActiveID);
  document.getElementById(previousActiveDOMID).classList.toggle("active-project");

  const projectDOMID = getProjectSidebarItemID(newActiveID);
  document.getElementById(projectDOMID).classList.toggle("active-project");
};

const createSidebarItem = (projectID, project, isActive, activateCallback) => {
  const item = document.createElement("div");

  item.classList.add("project-item");
  item.id = getProjectSidebarItemID(projectID);
  item.textContent = project.getProjectName();

  if (isActive) {
    item.classList.add("active-project");
  }

  item.addEventListener("click", (event) => {
    const domID = event.target.id;
    activateCallback(getProjectIDfromDOMID(domID));
  });

  return item;
};

const createProjectContainer = () => {
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("sidebar");

  return projectContainer;
};

// todo level
const createTodoContainer = () => {
  const todoContainer = document.createElement("div");
  todoContainer.id = "todo-overview";

  return todoContainer;
};

const createTodoItem = (
  id,
  todo,
  deleteTodoCallback,
  completeTodoCallback,
  priorityToggleCallback,
  titleEditCallback,
  dateEditCallback,
  descriptionEditCallback
) => {
  const todoItem = document.createElement("div");

  todoItem.classList.add("todo-item");
  todoItem.id = `todo-${id}`;

  const title = todo.getTitle();
  const titleDOM = document.createElement("div");
  titleDOM.classList.add("todo-title");
  titleDOM.textContent = title;
  titleDOM.addEventListener("dblclick", (event) => {
    const domID = event.target.parentNode.id;
    titleEditCallback(getTodoIDfromDOMID(domID));
  });

  const dueDate = todo.getDueDate();
  const dueDateDOM = document.createElement("div");
  dueDateDOM.classList.add("todo-date");
  dueDateDOM.textContent = format(dueDate, "dd-MM-yyyy");
  dueDateDOM.addEventListener("dblclick", (event) => {
    const domID = event.target.parentNode.id;
    dateEditCallback(getTodoIDfromDOMID(domID));
  });

  const description = todo.getDescription();
  const descriptionDOM = document.createElement("div");
  descriptionDOM.classList.add("todo-description");
  descriptionDOM.textContent = description;
  descriptionDOM.addEventListener("dblclick", (event) => {
    const domID = event.target.parentNode.id;
    descriptionEditCallback(getTodoIDfromDOMID(domID));
  });

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

const replaceTodoOverview = (newOverview) => {
  const overview = document.getElementById("todo-overview");
  overview.replaceWith(newOverview);
};

const createAddTodoItemButton = (callbackFunction) => {
  const addTodoButton = document.createElement("button");
  addTodoButton.id = "add-todo-item";
  addTodoButton.textContent = "+";
  addTodoButton.addEventListener("click", () => callbackFunction());
  return addTodoButton;
};

// todo editors
function createTodoDescriptionEditor(originalDescription, callbackFunction) {
  const descriptionInput = document.createElement("textarea");
  descriptionInput.classList.add("todo-description-input");
  descriptionInput.value = originalDescription;

  const callback = (event) => {
    const newDescription = event.target.value;
    const domID = event.target.parentNode.id;
    const todoID = getTodoIDfromDOMID(domID);
    console.log(domID);
    callbackFunction(todoID, newDescription);
  };

  descriptionInput.addEventListener("focusout", callback);
  descriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      callback(event);
    }
  });

  return descriptionInput;
}
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

function createTodoDateEditor(originalDate, callbackFunction) {
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.classList.add("todo-date-input");
  dateInput.valueAsDate = originalDate;

  const callback = (event) => {
    const newDate = event.target.value;
    const domID = event.target.parentNode.id;
    const todoID = getTodoIDfromDOMID(domID);
    console.log(domID);
    callbackFunction(todoID, newDate);
  };

  dateInput.addEventListener("focusout", callback);
  dateInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      callback(event);
    }
  });

  return dateInput;
}

// export
export {
  createBanner,
  createProjectContainer,
  createSidebarItem,
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
  createTodoDateEditor,
  createTodoDescriptionEditor,
};
