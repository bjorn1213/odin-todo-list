const todoItemFactory = (
  inputTitle = "newTodoTitle",
  inputDescription = "newTodoDescription",
  inputDueDate = new Date().getDate(),
  inputPriority = "low"
) => {
  const validPriorities = ["high", "medium", "low"];

  let title = inputTitle;
  let description = inputDescription;
  let dueDate = inputDueDate;
  let priority = validPriorities.slice(-1);
  if (validPriorities.includes(inputPriority.toLowerCase())) {
    priority = inputPriority.toLowerCase();
  }

  let todoCompleted = false;

  const toggleCompleted = () => {
    todoCompleted = !todoCompleted;
  };

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;

  const setTitle = (newTitle) => {
    title = newTitle;
  };
  const setDescription = (newDescription) => {
    description = newDescription;
  };
  const setPriority = (newPriority) => {
    let success = false;
    if (validPriorities.includes(newPriority.toLowerCase())) {
      priority = inputPriority.toLowerCase();
      success = true;
    }
    return success;
  };
  const setDueDate = (newDueDate) => {
    dueDate = newDueDate;
  };

  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    toggleCompleted,
  };
};
