import portfolioFactory from "../Model/portfolio";
import projectFactory from "../Model/project";
import todoItemFactory from "../Model/todoItem";

const dummyText = `Dummytext`;
const portfolioStorageKey = "portfolioJSON";

const getDummyPortfolio = () => {
  const portfolio = portfolioFactory("Dummy portfolio");

  const projectCount = 3;
  const maxTodoCount = 10;
  const minTodoCount = 5;
  for (let iProject = 0; iProject < projectCount; iProject++) {
    const project = projectFactory(`Dummy project ${iProject + 1}`);

    const todoCount = Math.round(Math.random() * (maxTodoCount - minTodoCount)) + minTodoCount;
    for (let iTodo = 0; iTodo < todoCount; iTodo++) {
      const todo = todoItemFactory(
        `Dummy todo item ${iTodo + 1}, for project ${iProject + 1}`,
        dummyText
      );

      project.addTodoItem(todo);
    }
    portfolio.addProject(project);
  }

  portfolio.setActiveProjectID(0);

  portfolioToJSON(portfolio);

  return portfolio;
};

const getEmptyPortfolio = () => {
  const portfolio = portfolioFactory("Todo portfolio");

  const project = projectFactory("Project 1");
  portfolio.addProject(project);

  portfolio.setActiveProjectID(0);

  return portfolio;
};

const printPortfolioContents = (portfolio) => {
  console.log(portfolio.getPortfolioName());

  const projects = portfolio.getProjects();
  const projectCount = Object.keys(projects).length;

  for (let i = 0; i < projectCount; i++) {
    const project = projects[i];

    const todos = project.getTodoItems();
    const todoCount = Object.keys(todos).length;

    for (let j = 0; j < todoCount; j++) {
      const todo = todos[j];
      console.log(`${project.getProjectName()} - ${todo.getTitle()}`);
      console.log(`${todo.getProject().getProjectName()}`);
    }
  }
};

function todoToPlain(todo) {
  // turn a todo object into a plain object for JSONifying
  let todoObject = {};

  todoObject.title = todo.getTitle();
  todoObject.description = todo.getDescription();
  todoObject.dueDate = todo.getDueDate();
  todoObject.priority = todo.getPriority();
  todoObject.isCompleted = todo.getCompleted();

  return todoObject;
}

function projectToPlain(project) {
  // turn a project object into a plain object for JSONifying
  let projectObject = {};

  projectObject.projectName = project.getProjectName();
  projectObject.todoItems = {};

  const todos = project.getTodoItems();
  for (let [todoID, todo] of Object.entries(todos)) {
    projectObject.todoItems[todoID] = todoToPlain(todo);
  }

  return projectObject;
}

function portfolioToJSON(portfolio) {
  let portfolioObject = {};

  portfolioObject.portfolioName = portfolio.getPortfolioName();

  portfolioObject.projects = {};
  const projects = portfolio.getProjects();
  for (let [projectID, project] of Object.entries(projects)) {
    portfolioObject.projects[projectID] = projectToPlain(project);
  }

  console.log(JSON.parse(JSON.stringify(portfolioObject)));

  return JSON.stringify(portfolioObject);
}

function portfolioFromJSON(portfolioJSON) {
  const plainPortfolio = JSON.parse(portfolioJSON);
  let portfolio = portfolioFactory(plainPortfolio.portfolioName);

  for (let [projectID, projectPlain] of Object.entries(plainPortfolio.projects)) {
    const project = projectFactory(projectPlain.projectName);

    for (let [todoID, todoPlain] of Object.entries(projectPlain.todoItems)) {
      const todo = todoItemFactory(
        todoPlain.title,
        todoPlain.description,
        todoPlain.dueDate,
        todoPlain.priority
      );
      if (todoPlain.isCompleted) {
        todo.toggleCompleted();
      }

      project.addTodoItem(todo);
    }
    portfolio.addProject(project);
  }

  portfolio.setActiveProjectID(0);
  return portfolio;
}

function savePortfolioToStorage(portfolio) {
  const portfolioJSON = portfolioToJSON(portfolio);
  localStorage.setItem(portfolioStorageKey, portfolioJSON);
}

function loadPortfolioFromStorage() {
  let portfolio;
  if (!localStorage.getItem(portfolioStorageKey)) {
    portfolio = getEmptyPortfolio();
    savePortfolioToStorage(portfolio);
  } else {
    const portfolioJSON = localStorage.getItem(portfolioStorageKey);
    portfolio = portfolioFromJSON(portfolioJSON);
  }
  return portfolio;
}

export {
  getDummyPortfolio,
  printPortfolioContents,
  loadPortfolioFromStorage,
  savePortfolioToStorage,
};
