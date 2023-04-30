import "./View/assets/todo.css";
import "./View/assets/style.css";

import { getDummyPortfolio, printPortfolioContents } from "./Controller/dataHandler";
import { generateFullPage } from "./View/viewModule";

const debug = false;

const portfolio = getDummyPortfolio();
if (debug) {
  printPortfolioContents(portfolio);
}

generateFullPage(portfolio);
