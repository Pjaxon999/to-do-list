import { appState } from "./utilities/appState.js"
import "./styles/modern-normalize.css";
import "./styles/styles.css";
appState.init();
console.log("testing...testing...oh whatever...")

window.appState = appState;