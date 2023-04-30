const getBanner = () => {
  const banner = document.createElement("div");
  banner.classList.add("banner");

  banner.textContent = "Todo Application";
  return banner;
};

const createSidebarItem = (id, project) => {
  const item = document.createElement("div");

  item.classList.add("project-item");
  item.id = `project-${id}`;
  item.textContent = project.getProjectName();

  return item;
};

const getSidebar = (portfolio) => {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  const projects = portfolio.getProjects();
  for (const [id, project] of Object.entries(projects)) {
    sidebar.appendChild(createSidebarItem(id, project));
  }

  return sidebar;
};

const createTodoItem = (id, todo) => {
  const todoItem = document.createElement("div");

  todoItem.classList.add("todo-item");
  todoItem.id = `todo-${id}`;
  todoItem.textContent = todo.getTitle();

  return todoItem;
};

const getTodoOverview = (project) => {
  const overview = document.createElement("div");
  overview.classList.add("todo-overview");

  const todos = project.getTodoItems();
  for (const [id, todoItem] of Object.entries(todos)) {
    overview.appendChild(createTodoItem(id, todoItem));
  }

  return overview;
};

const getFullPage = (portfolio) => {
  const container = document.createElement("div");

  container.id = "container";
  container.appendChild(getBanner());
  container.appendChild(getSidebar(portfolio));

  const projects = portfolio.getProjects();
  const firstProject = Object.values(projects)[0]; // assumes at least 1 project in portfolio
  container.appendChild(getTodoOverview(firstProject));

  return container;
};

const generateFullPage = (portfolio) => {
  const container = getFullPage(portfolio);

  document.getElementsByTagName("body")[0].replaceChildren(container);
};

export { generateFullPage };
