import { getInsertableID } from "./utility";

export default function projectPortfolioFactory(inputPortfolioName = "newPortfolioName") {
  // Initialise main data
  let portfolioName = inputPortfolioName;
  let projects = {};

  // Define simple setters/getters
  const setPortfolioName = (newPortfolioName) => {
    portfolioName = newPortfolioName;
  };
  const getPortfolioName = () => portfolioName;
  const getProjects = () => projects;

  // Implement adding/removing todo item logic
  const addProject = (project) => {
    const insertID = getInsertableID(projects);
    projects[insertID] = project;
  };

  const removeProject = (projectID) => {
    let success = false;
    if (projectID in projects) {
      delete projects[projectID];
      success = true;
    }

    return success;
  };

  return {
    setPortfolioName,
    getPortfolioName,
    getProjects,
    addProject,
    removeProject,
  };
}
