import portfolioFactory from "../Model/portfolio";
import projectFactory from "../Model/project";
import todoItemFactory from "../Model/todoItem";

const getDummyPortfolio = () => {
  const portfolio = portfolioFactory("Dummy portfolio");

  const projectCount = 3;
  const maxTodoCount = 5;
  for (let iProject = 0; iProject < projectCount; iProject++) {
    const project = projectFactory(`Dummy project ${iProject + 1}`);

    const todoCount = Math.round(Math.random() * (maxTodoCount - 1)) + 1;
    for (let iTodo = 0; iTodo < todoCount; iTodo++) {
      const todo = todoItemFactory(`Dummy todo item ${iTodo + 1}`, "Dummy todo description");

      project.addTodoItem(todo);
    }
    portfolio.addProject(project);
  }

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
    }
  }
};

export { getDummyPortfolio, printPortfolioContents };
