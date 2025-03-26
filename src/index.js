import { appState } from "./core/appState.js";
import "./styles/modern-normalize.css";
import "./styles/styles.css";
import { renderHome } from "./ui/homeUI.js";
import { renderProjects } from "./ui/projectUI.js"

// Initialize the App state, generates "Home" project
appState.init();
renderHome();
renderProjects();

// FOR TESTING, REMOVE BEFORE DEPLOYING!
window.appState = appState;
window.renderHome = renderHome;
window.renderProjects = renderProjects;
console.log("testing...testing...oh whatever...");