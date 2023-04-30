import portfolioFactory from "../Model/portfolio";
import projectFactory from "../Model/project";
import todoItemFactory from "../Model/todoItem";

const dummyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque eu mauris condimentum venenatis. Phasellus vestibulum viverra sapien eu placerat. Etiam ultricies eleifend urna ac vehicula. Etiam eget nisl imperdiet dolor interdum egestas et nec nisi. Curabitur id enim quis sapien tempus porta et ut nibh. Phasellus mattis ullamcorper ligula non aliquet. Aliquam vestibulum maximus leo, nec pulvinar tellus facilisis eu. Donec porttitor gravida dictum. Nullam vitae egestas lectus, quis tincidunt augue. Cras at quam id metus placerat malesuada.
Ut sed tempus sem. Donec aliquet orci vel molestie blandit. Suspendisse gravida eleifend lacus, in varius est fermentum at. Ut vitae enim libero. Etiam libero ante, ullamcorper eget ex sed, blandit posuere velit. Proin consectetur nisi ut laoreet volutpat. Cras ornare lacus quam, quis fringilla justo iaculis ut. Donec dignissim vitae eros non semper. Donec sed accumsan quam, ac tincidunt nisi. Donec ultricies porttitor sem lobortis aliquam. Duis ut sodales tortor. Proin eu ligula felis. Integer ornare tristique fermentum.
Vestibulum posuere enim at turpis lacinia efficitur. Sed at dolor id est ullamcorper euismod quis quis dui. Phasellus odio enim, lacinia nec pulvinar eget, accumsan et nibh. Nam eleifend ultrices nulla, ut elementum dui vestibulum vel. In et massa mauris. Vestibulum vehicula velit ullamcorper vulputate finibus. Aliquam erat volutpat. Sed malesuada sem eu velit pretium, quis luctus tellus congue.
Curabitur tincidunt enim eu nisl iaculis, ut faucibus arcu posuere. Nullam gravida nunc in risus faucibus, non luctus quam fermentum. Proin eu turpis pulvinar, sagittis nibh eget, faucibus sem. Mauris vitae neque nec odio dignissim iaculis. In sem nibh, imperdiet eget dignissim non, sollicitudin euismod risus. Vestibulum nunc mi, tincidunt in massa quis, bibendum mollis nulla. Donec ultricies, mi at luctus aliquet, ipsum mauris congue tellus, eu rutrum metus eros nec ex. Maecenas in maximus nulla, ut ultricies neque.
Morbi id nunc quis sem congue elementum. Sed sit amet ipsum eu neque efficitur aliquet. Donec justo lorem, dapibus eu nunc quis, facilisis auctor augue. Maecenas id bibendum nisi. Maecenas interdum auctor pellentesque. Phasellus hendrerit ante sit amet viverra elementum. Nulla interdum dui sed lectus eleifend, eget ornare sapien tempus. Nunc dictum dapibus massa, et varius dui vehicula vel. Morbi sit amet aliquam enim. Phasellus nulla elit, lacinia nec tellus sed, dignissim imperdiet risus. Praesent molestie, justo in iaculis dictum, odio mauris sagittis quam, eget efficitur nisl diam ac ligula. Vestibulum facilisis augue vel dolor dapibus fermentum. Etiam at felis rhoncus, laoreet nunc eget, mattis justo. Nunc sit amet massa non nisi dignissim fringilla. Vivamus vulputate nibh tortor, quis imperdiet sem ullamcorper ut.`;

const getDummyPortfolio = () => {
  const portfolio = portfolioFactory("Dummy portfolio");

  const projectCount = 3;
  const maxTodoCount = 10;
  const minTodoCount = 5;
  for (let iProject = 0; iProject < projectCount; iProject++) {
    const project = projectFactory(`Dummy project ${iProject + 1}`);

    const todoCount = Math.round(Math.random() * (maxTodoCount - minTodoCount)) + minTodoCount;
    for (let iTodo = 0; iTodo < todoCount; iTodo++) {
      const todo = todoItemFactory(
        `Dummy todo item ${iTodo + 1}, for project ${iProject + 1}`,
        dummyText
      );

      project.addTodoItem(todo);
    }
    portfolio.addProject(project);
  }

  portfolio.setActiveProjectID(0);

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
      console.log(`${todo.getProject().getProjectName()}`);
    }
  }
};

export { getDummyPortfolio, printPortfolioContents };
