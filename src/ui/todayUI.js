import { appState } from "../core/appState";
import  { Task } from "../utilities/task";
import { renderTaskCard } from "./taskRenderer";

export function renderToday() {
    // grab the content div, replace the content inside it
    const content = document.getElementById("main-content");
    content.replaceChildren();

    // Get all the tasks, then filter for the ones due today
    const allTasks = appState.projects.flatMap(project => project.tasks);
    const todayTasks = allTasks.filter(task => task.isDueToday);

    // Create Task Card elements
    const taskCards = todayTasks.map(task => renderTaskCard(task)).join('');

    // If there are no tasks due today
    const noTasksDueToday = `
    <div class="card">
        <h4>No tasks due today. Get out there and have fun!</h4>
    </div>
    `;

    // Muster the template
    const template = `
    <div class="content-heading">
        <h2>Tasks Due Today</h2>
    </div>
    <ul role="list">
        ${todayTasks.length ? taskCards : noTasksDueToday}
    </ul>
    `;

    // Inject HTML
    content.innerHTML = template;
}