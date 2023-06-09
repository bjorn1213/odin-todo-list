import "./View/assets/todo.css";
import "./View/assets/style.css";
import "./View/assets/fonts.css";

import { parse, isValid as isValidDate } from "date-fns";

import {
  printPortfolioContents,
  loadPortfolioFromStorage,
  savePortfolioToStorage,
} from "./Controller/dataHandler";
import {
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
  replaceProjectOverview,
  createTodoTitleEditor,
  createTodoDateEditor,
  createTodoDescriptionEditor,
  createAddProjectButton,
  createProjectNameEditor,
} from "./View/viewModule";
import todoItemFactory from "./Model/todoItem";
import projectFactory from "./Model/project";

const debug = false;

const mainPortfolio = loadPortfolioFromStorage();

if (debug) {
  printPortfolioContents(mainPortfolio);
}

// TODO ITEM SECTION
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

  savePortfolioToStorage(mainPortfolio);
}

function toggleCompletedTodo(todoID) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);

  todo.toggleCompleted();
  refreshTodoItem(todoID);
}

// -- field editing
function toggleTodoTitleEdit(todoID) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);
  const inputNode = createTodoTitleEditor(todo.getTitle(), updateTodoTitle);

  replaceElement(`#${todo.getCssIDValue()} > .todo-title`, inputNode);
  inputNode.focus();
}

function updateTodoTitle(todoID, newTitle) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);
  todo.setTitle(newTitle);
  refreshTodoItem(todoID);
}

function toggleTodoDescriptionEdit(todoID) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);
  const inputNode = createTodoDescriptionEditor(todo.getDescription(), updateTodoDescription);

  replaceElement(`#${todo.getCssIDValue()} > .todo-description`, inputNode);
  inputNode.focus();
}

function updateTodoDescription(todoID, newDescription) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);
  todo.setDescription(newDescription);
  refreshTodoItem(todoID);
}

function toggleTodoDateEdit(todoID) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);
  const inputNode = createTodoDateEditor(todo.getDueDate(), updateTodoDate);

  replaceElement(`#${todo.getCssIDValue()} > .todo-date`, inputNode);
  inputNode.focus();
}

function updateTodoDate(todoID, newDate) {
  const todo = mainPortfolio.getActiveProject().getTodoByID(todoID);
  const parsedDate = parse(newDate, "yyyy-mm-dd", new Date());

  if (isValidDate(parsedDate)) {
    todo.setDueDate(parsedDate);
  }

  refreshTodoItem(todoID);
}

// -- DOM related
function getTodoDOM(todoID, todoItem) {
  return createTodoItem(
    todoID,
    todoItem,
    removeTodo,
    toggleCompletedTodo,
    todoPrioritySwitch,
    toggleTodoTitleEdit,
    toggleTodoDateEdit,
    toggleTodoDescriptionEdit
  );
}

function refreshTodoItem(todoID) {
  const todoItem = mainPortfolio.getActiveProject().getTodoByID(todoID);
  const todoDOM = getTodoDOM(todoID, todoItem);

  replaceElement(`#${todoItem.getCssIDValue()}`, todoDOM);
  savePortfolioToStorage(mainPortfolio);
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

  savePortfolioToStorage(mainPortfolio);
  return todoContainer;
}

function addDefaultTodoItem() {
  const todoItem = todoItemFactory("New todo", "Description");
  const project = mainPortfolio.getProjectByID(mainPortfolio.getActiveProjectID());
  project.addTodoItem(todoItem);

  const overview = createTodoOverview(project);
  replaceTodoOverview(overview);
}

// PROJECT SECTION

function removeProject(projectID) {
  const project = mainPortfolio.getProjectByID(projectID);
  const projectElementID = project.getCssIDValue();
  mainPortfolio.removeProject(projectID);
  removeElement(projectElementID);

  savePortfolioToStorage(mainPortfolio);
}

// -- DOM related
function getProjectDOM(projectID, project) {
  return createSidebarItem(
    projectID,
    project,
    mainPortfolio.getActiveProjectID() === Number(projectID), // indicate if project is active
    activateProject,
    removeProject,
    toggleProjectNameEdit
  );
}

function createProjectOverview() {
  const projectContainer = createProjectContainer();
  const projects = mainPortfolio.getProjects();

  for (const [projectID, project] of Object.entries(projects)) {
    const projectDOM = getProjectDOM(projectID, project);
    project.setCssIDValue(projectDOM.id);
    projectContainer.appendChild(projectDOM);
  }
  projectContainer.appendChild(createAddProjectButton(addEmptyProject));

  return projectContainer;
}

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

function addEmptyProject() {
  const project = projectFactory("projectName");
  const projectID = mainPortfolio.addProject(project);
  project.setProjectName(`Project ${projectID + 1}`);

  const projectOverview = createProjectOverview();
  replaceProjectOverview(projectOverview);
  activateProject(projectID);
}

function refreshProject(projectID) {
  const project = mainPortfolio.getProjectByID(projectID);
  const projectDOM = getProjectDOM(projectID, project);

  projectDOM.classList.add("active-project");

  replaceElement(`#${project.getCssIDValue()}`, projectDOM);
  savePortfolioToStorage(mainPortfolio);
}

// -- field editing
function toggleProjectNameEdit(projectID) {
  const project = mainPortfolio.getProjectByID(projectID);
  const inputNode = createProjectNameEditor(project.getProjectName(), updateProjectName);

  replaceElement(`#${project.getCssIDValue()} > div`, inputNode);
  inputNode.focus();
}

function updateProjectName(projectID, newName) {
  const project = mainPortfolio.getProjectByID(projectID);
  if (newName.length > 1) {
    project.setProjectName(newName);
  }
  refreshProject(projectID);
}

// create page
const initialisePage = (portfolio) => {
  const projects = portfolio.getProjects();
  const firstProject = Object.values(projects)[0]; // assumes at least 1 project in portfolio

  const container = createContainer();
  const banner = createBanner("Todo Application");
  const sidebar = createProjectOverview();
  const overview = createTodoOverview(firstProject);

  container.append(banner, sidebar, overview);
  replaceContainer(container);
};

initialisePage(mainPortfolio);
