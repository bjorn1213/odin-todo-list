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

  // Implement adding/removing todo item logic
  const getInsertableID = () => {
    const itemCount = Object.keys(todoItems).length;
    let returnID = itemCount + 1;

    if (itemCount === 0) {
      returnID = 0;
    } else {
      for (let i = 0; i < itemCount; i++) {
        if (!(i in todoItems)) {
          returnID = i;
          break;
        }
      }
      returnID = itemCount + 1;
    }

    return returnID;
  };

  const addTodoItem = (todoItem) => {
    const insertID = getInsertableID();

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
    addTodoItem,
    removeTodoItem,
  };
}
