import "./View/assets/todo.css";
import "./View/assets/style.css";
import "./View/assets/fonts.css";

import { getDummyPortfolio, printPortfolioContents } from "./Controller/dataHandler";
import {
  createBanner,
  createSidebar,
  createTodoContainer,
  createContainer,
  createAddTodoItemButton,
  createTodoItem,
  replaceContainer,
  toggleActiveProject,
  replaceTodoOverview,
  removeElement,
  replaceElement,
  createTodoTitleEditor,
} from "./View/viewModule";
import todoItemFactory from "./Model/todoItem";

const debug = false;

const mainPortfolio = getDummyPortfolio();

if (debug) {
  printPortfolioContents(mainPortfolio);
}

// functions
function activateProject(projectID) {
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
  const overview = createTodoOverview(project);
  replaceTodoOverview(overview);
}

// todo callbacks
function todoPrioritySwitch(todoID) {
  const todoItem = mainPortfolio.getActiveProject().getTodoByID(todoID);
  todoItem.switchPriority();

  refreshTodoItem(todoID);
}

function removeTodo(todoID) {
  const project = mainPortfolio.getActiveProject();

  const todoElementID = project.getTodoByID(todoID).getCssIDValue();
  project.removeTodoItem(todoID);
  removeElement(todoElementID);
}

function toggleCompletedTodo(todoID) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);

  todo.toggleCompleted();
  refreshTodoItem(todoID);
}

function toggleTodoTitleEdit(todoID) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);
  const inputNode = createTodoTitleEditor(todo.getTitle(), updateTodoTitle);

  replaceElement(`#${todo.getCssIDValue()} > .todo-title`, inputNode);
}

function updateTodoTitle(todoID, newTitle) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);
  todo.setTitle(newTitle);
  refreshTodoItem(todoID);
}

function getTodoDOM(todoID, todoItem) {
  return createTodoItem(
    todoID,
    todoItem,
    removeTodo,
    toggleCompletedTodo,
    todoPrioritySwitch,
    toggleTodoTitleEdit
  );
}

function addDefaultTodoItem() {
  const todoItem = todoItemFactory("New todo", "Description");
  const project = mainPortfolio.getProjectByID(mainPortfolio.getActiveProjectID());
  project.addTodoItem(todoItem);

  const overview = createTodoOverview(project);
  replaceTodoOverview(overview);
}

function refreshTodoItem(todoID) {
  const todoItem = mainPortfolio.getActiveProject().getTodoByID(todoID);
  const todoDOM = getTodoDOM(todoID, todoItem);

  replaceElement(`#${todoItem.getCssIDValue()}`, todoDOM);
}

function createTodoOverview(project) {
  const todoContainer = createTodoContainer();

  const todos = project.getTodoItems();
  for (const [id, todoItem] of Object.entries(todos)) {
    const todoDOM = getTodoDOM(id, todoItem);
    todoItem.setCssIDValue(todoDOM.id);
    todoContainer.appendChild(todoDOM);
  }
  todoContainer.appendChild(createAddTodoItemButton(addDefaultTodoItem));

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
