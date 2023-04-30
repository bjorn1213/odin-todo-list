export default function todoItemFactory(
  inputTitle = "newTodoTitle",
  inputDescription = "newTodoDescription",
  inputDueDate = new Date().getDate(),
  inputPriority = "low"
) {
  const validPriorities = ["high", "medium", "low"];

  // Parse inputs
  let title = inputTitle;
  let description = inputDescription;
  let dueDate = inputDueDate;
  let priority = validPriorities.slice(-1);
  let project;
  if (validPriorities.includes(inputPriority.toLowerCase())) {
    priority = inputPriority.toLowerCase();
  }

  // Set to uncompleted, and implement toggle
  let todoCompleted = false;
  const toggleCompleted = () => {
    todoCompleted = !todoCompleted;
  };

  // Define getters & setters
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
  const getProject = () => project;

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
  const setProject = (newProject) => {
    project = newProject;
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
    setProject,
    getProject,
    toggleCompleted,
  };
}
