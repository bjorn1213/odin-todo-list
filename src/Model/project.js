export default function projectFactory(inputProjectName = "newProjectName") {
  // Initialise main data
  let projectName = inputProjectName;
  let todoItems = {};
  let highestUnusedID = 0;
  let cssIDValue;

  // Define simple setters/getters
  const setProjectName = (newProjectName) => {
    projectName = newProjectName;
  };
  const getProjectName = () => projectName;
  const getTodoItems = () => todoItems;
  const getTodoByID = (todoID) => todoItems[todoID];

  // Implement adding/removing todo item logic
  const addTodoItem = (todoItem) => {
    const insertID = highestUnusedID++;
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

  const setCssIDValue = (newCssIDValue) => {
    cssIDValue = newCssIDValue;
  };
  const getCssIDValue = () => cssIDValue;

  return {
    setProjectName,
    getProjectName,
    getTodoItems,
    getTodoByID,
    addTodoItem,
    removeTodoItem,
    getCssIDValue,
    setCssIDValue,
  };
}
