import "./styles/modern-normalize.css";
import "./styles/styles.css";
import { appState } from "./core/appState.js";
import { renderHome } from "./ui/homeUI.js";
import { viewHandlers } from "./core/viewController.js";

// Initialize the App state, generates "Home" project
appState.init();
appState.load();
viewHandlers();
renderHome();