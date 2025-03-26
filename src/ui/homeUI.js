import { appState } from "../core/appState";
import { renderTaskCard } from "./taskRenderer";

export function renderHome() {
    // Need the content div to append content to
    const content = document.getElementById('main-content');
    content.replaceChildren();

    // Get data for "Home" project
    const homeProject = appState.projects.find(project => project.isHome === true);
    const tasks = homeProject.tasks;

    // Create Elements to Render the tab, write HTML
    const taskCards = tasks.map(task => renderTaskCard(task)).join('');

    // If there are no tasks
    const noTaskHandler = `
    <div class="card">
        <h4>No tasks in Home project. Enjoy your free time! 🎉</h4>
    </div>
    `;

    // Template, Assemble!
    const template = `
    <div class="content-heading">
        <h2>Home</h2>
        <button class="adder" id="add-task-btn" data-action="open-task-modal">+ Add Task </button>
    </div>
    
    <ul role="list">
        ${tasks.length ? taskCards : noTaskHandler}
    </ul>
    `;

    // Inject HTML
    content.innerHTML = template;
}