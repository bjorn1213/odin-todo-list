export default function todoItemFactory(
  inputTitle = "newTodoTitle",
  inputDescription = "newTodoDescription",
  inputDueDate = new Date(Date.now()),
  inputPriority = "low"
) {
  const validPriorities = ["low", "medium", "high"];

  // Parse inputs
  let title = inputTitle;
  let description = inputDescription;
  let dueDate = inputDueDate;
  let priority = validPriorities.slice(-1);
  if (validPriorities.includes(inputPriority.toLowerCase())) {
    priority = inputPriority.toLowerCase();
  }

  let cssIDValue;

  // Set to uncompleted, and implement toggle
  let isCompleted = false;
  const toggleCompleted = () => {
    isCompleted = !isCompleted;
  };
  const getCompleted = () => isCompleted;

  // Define getters & setters
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();

  const setTitle = (newTitle) => {
    title = newTitle;
  };
  const setDescription = (newDescription) => {
    description = newDescription;
  };
  const setPriority = (newPriority) => {
    let success = false;
    if (validPriorities.includes(newPriority.toLowerCase())) {
      priority = newPriority.toLowerCase();
      success = true;
    }
    return success;
  };

  const switchPriority = () => {
    // dont change priority if task is completed
    if (isCompleted) {
      return;
    }

    const currentPriorityIndex = validPriorities.indexOf(priority);
    let newPriorityIndex;

    if (currentPriorityIndex === validPriorities.length - 1) {
      newPriorityIndex = 0;
    } else {
      newPriorityIndex = currentPriorityIndex + 1;
    }

    setPriority(validPriorities[newPriorityIndex]);
  };

  const setCssIDValue = (newCssIDValue) => {
    cssIDValue = newCssIDValue;
  };
  const getCssIDValue = () => cssIDValue;

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
    getCompleted,
    switchPriority,
    toggleCompleted,
    getCssIDValue,
    setCssIDValue,
  };
}
