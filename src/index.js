import "./View/assets/todo.css";
import "./View/assets/style.css";
import "./View/assets/fonts.css";

import { getDummyPortfolio, printPortfolioContents } from "./Controller/dataHandler";
import {
  createBanner,
  createSidebar,
  createTodoContainer,
  createContainer,
  replaceContainer,
  createTodoItem,
  toggleActiveProject,
  replaceTodoOverview,
} from "./View/viewModule";

const debug = false;

const mainPortfolio = getDummyPortfolio();

if (debug) {
  printPortfolioContents(mainPortfolio);
}

// functions
function removeTodo(todoID) {
  const portfolio = mainPortfolio;
  const project = portfolio.getProjectByID(portfolio.getActiveProjectID());

  project.removeTodoItem(todoID);
  const overview = createTodoOverview(project, removeTodo, toggleCompletedTodo);
  replaceTodoOverview(overview);
}

function toggleCompletedTodo(todoID) {
  const portfolio = mainPortfolio;
  const project = portfolio.getProjectByID(portfolio.getActiveProjectID());
  const todo = project.getTodoByID(todoID);

  todo.toggleCompleted();
  const overview = createTodoOverview(project, removeTodo, toggleCompletedTodo);
  replaceTodoOverview(overview);
}

const activateProject = (projectID) => {
  const portfolio = mainPortfolio;
  if (!(projectID in portfolio.getProjects())) {
    return;
  }

  const oldActiveProjectID = portfolio.getActiveProjectID();

  if (projectID === oldActiveProjectID) {
    return;
  }

  toggleActiveProject(oldActiveProjectID, projectID);
  portfolio.setActiveProjectID(projectID);

  const project = portfolio.getProjectByID(projectID);
  const overview = createTodoOverview(project, removeTodo, toggleCompletedTodo);
  replaceTodoOverview(overview);
};

function createTodoOverview(project) {
  const todoContainer = createTodoContainer();

  const todos = project.getTodoItems();
  for (const [id, todoItem] of Object.entries(todos)) {
    todoContainer.appendChild(createTodoItem(id, todoItem, removeTodo, toggleCompletedTodo));
  }

  return todoContainer;
}

// create page
const initialisePage = (portfolio) => {
  const projects = portfolio.getProjects();
  const firstProject = Object.values(projects)[0]; // assumes at least 1 project in portfolio

  const container = createContainer();
  const banner = createBanner("Todo Application");
  const sidebar = createSidebar(projects, activateProject);
  const overview = createTodoOverview(firstProject, removeTodo, toggleCompletedTodo);

  container.append(banner, sidebar, overview);
  replaceContainer(container);
};

initialisePage(mainPortfolio);
