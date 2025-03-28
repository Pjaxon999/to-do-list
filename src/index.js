import { appState } from "./core/appState.js";
import "./styles/modern-normalize.css";
import "./styles/styles.css";
import { renderHome } from "./ui/homeUI.js";
import { renderProjects } from "./ui/projectUI.js";
import { renderToday } from "./ui/todayUI.js";
import { renderOverdue } from "./ui/overdueUI.js";
import { viewHandlers } from "./core/viewController.js";

// Initialize the App state, generates "Home" project
appState.init();
console.log("Home Project:", appState.projects.find(project => project.isHome));
viewHandlers();
renderHome();

// FOR TESTING, REMOVE BEFORE DEPLOYING!
window.appState = appState;
window.renderHome = renderHome;
window.renderProjects = renderProjects;
window.renderToday = renderToday;
window.renderOverdue = renderOverdue;
console.log("testing...testing...oh whatever...");