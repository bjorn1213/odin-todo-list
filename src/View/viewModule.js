const createBanner = (pageTitle) => {
  const banner = document.createElement("div");
  banner.classList.add("banner");

  banner.textContent = pageTitle;
  return banner;
};

const getProjectSidebarItemID = (projectID) => `project-${projectID}`;

const getProjectIDfromDOMID = (domID) => domID.slice(8);

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

const createTodoItem = (id, todo) => {
  const todoItem = document.createElement("div");

  todoItem.classList.add("todo-item");
  todoItem.id = `todo-${id}`;

  const title = todo.getTitle();
  const titleDOM = document.createElement("div");
  titleDOM.classList.add("todo-title");
  titleDOM.textContent = title;

  const dueDate = todo.getDueDate();
  const dueDateDOM = document.createElement("div");
  dueDateDOM.classList.add("todo-date");
  dueDateDOM.textContent = dueDate;

  const description = todo.getDescription();
  const descriptionDOM = document.createElement("div");
  descriptionDOM.classList.add("todo-description");
  descriptionDOM.textContent = description;

  const priority = todo.getPriority();
  const priorityDOM = document.createElement("div");
  priorityDOM.classList.add("todo-priority");
  priorityDOM.classList.add(`priority-${priority}`);

  const completed = todo.getCompleted();
  if (completed) {
    priorityDOM.classList.add("todo-completed");
  }

  todoItem.append(titleDOM, dueDateDOM, priorityDOM, descriptionDOM);

  return todoItem;
};

const createTodoOverview = (project) => {
  const overview = document.createElement("div");
  overview.id = "todo-overview";

  const todos = project.getTodoItems();
  for (const [id, todoItem] of Object.entries(todos)) {
    overview.appendChild(createTodoItem(id, todoItem));
  }

  return overview;
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

export {
  createBanner,
  createSidebar,
  createContainer,
  createTodoOverview,
  replaceContainer,
  toggleActiveProject,
  replaceTodoOverview,
};
