import { getInsertableID } from "./utility";

export default function portfolioFactory(inputPortfolioName = "newPortfolioName") {
  // Initialise main data
  let portfolioName = inputPortfolioName;
  let projects = {};
  let activeProjectID;
  let highestUnusedID = 0;

  // Define simple setters/getters
  const setPortfolioName = (newPortfolioName) => {
    portfolioName = newPortfolioName;
  };
  const getPortfolioName = () => portfolioName;
  const getProjects = () => projects;
  const setActiveProjectID = (projectID) => {
    if (projectID in projects) {
      activeProjectID = projectID;
    }
  };
  const getActiveProjectID = () => activeProjectID;

  // Implement adding/removing todo item logic
  const addProject = (project) => {
    const insertID = highestUnusedID++;
    projects[insertID] = project;

    // make added project active in case it's the first
    if (Object.keys(projects).length === 1) {
      activeProjectID = insertID;
    }
  };

  const removeProject = (projectID) => {
    let success = false;
    if (projectID in projects && projectID !== activeProjectID) {
      delete projects[projectID];
      success = true;
    }

    return success;
  };

  const getProjectByID = (projectID) => {
    let project;
    if (projectID in projects) {
      project = projects[projectID];
    }

    return project;
  };

  const getActiveProject = () => projects[activeProjectID];

  return {
    setPortfolioName,
    getPortfolioName,
    setActiveProjectID,
    getActiveProjectID,
    getActiveProject,
    getProjects,
    addProject,
    getProjectByID,
    removeProject,
  };
}
