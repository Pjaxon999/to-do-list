import { appState } from "../core/appState";
import  { Task } from "../utilities/task";
import { renderTaskCard } from "./taskRenderer";

export function renderOverdue() {
    // Grab content div, empty out content
    const content = document.getElementById("main-content");
    content.replaceChildren();

    // Get all the tasks, then filter for the overdue tasks
    const allTasks = appState.projects.flatMap(project => project.tasks);
    const overdueTasks = allTasks.filter(task => task.isOverdue);

    // Create task cards
    const taskCards = overdueTasks.map(task => renderTaskCard(task)).join('');

    // If there are no overdue tasks
    const noOverdueTasks = `
    <div class="card">
        <h4>No overdue tasks! Way to keep on top of things!</h4>
    </div>
    `;

    // Behold, The Template of Destiny!
    const template = `
    <div class="content-heading">
        <h2>Overdue Tasks</h2>
    </div>
    <ul role="list">
        ${overdueTasks.length ? taskCards : noOverdueTasks}
    </ul>
    `;

    // Inject HTML
    content.innerHTML = template;
}