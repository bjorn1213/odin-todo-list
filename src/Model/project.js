import { getInsertableID } from "./utility";

export default function projectFactory(inputProjectName = "newProjectName") {
  // Initialise main data
  let projectName = inputProjectName;
  let todoItems = {};

  // Define simple setters/getters
  const setProjectName = (newProjectName) => {
    projectName = newProjectName;
  };
  const getProjectName = () => projectName;
  const getTodoItems = () => todoItems;
  const getTodoByID = (todoID) => todoItems[todoID];

  // Implement adding/removing todo item logic
  const addTodoItem = (todoItem) => {
    const insertID = getInsertableID(todoItems);
    todoItems[insertID] = todoItem;
  };

  const removeTodoItem = (todoID) => {
    let success = false;
    if (todoID in todoItems) {
      delete todoItems[todoID];
      success = true;
    }

    return success;
  };

  return {
    setProjectName,
    getProjectName,
    getTodoItems,
    getTodoByID,
    addTodoItem,
    removeTodoItem,
  };
}
