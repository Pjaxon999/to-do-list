import { appState } from "../core/appState";
import { renderTaskCard } from "./taskRenderer";

export function renderProjects(){
    // Get the content div and empty it
    const content = document.getElementById('main-content');
    content.replaceChildren();

    // get projects from the appState, filter out the Home project (it has it's own tab)
    const filteredProjects = appState.projects.filter(project => !project.isHome);

    // If there are no projects, return this
    const noProjectsHandler = `
    <div class="card">
        <h4>No Projects to display!</h4>
    </div>
    `;

    // If there are no tasks in a project, return this
    const noTaskHandler = `
    <div class="card">
        <h4>No tasks to display in this project</h4>
        <button class="adder" data-action="open-task-modal"> + Add Task </button>
    </div>
    `;

    // If there are tasks in the project, incorporate task cards
    function renderProjectTasks(tasks) {
        if (!tasks.length) return noTaskHandler;
        return `
          <ul class="project-tasks">
            ${tasks.map(task => renderTaskCard(task)).join('')}
          </ul>
        `;
    }

    // Create HTML to render
    const projectCards = filteredProjects.map(project => `
        <li class="card" data-project-id="${project.id}">
        <div>
            <h3>${project.name}</h3>
            <button class="collapsible" data-action="toggle-collapse" aria-label="${project.collapsed ? 'Expand' : 'Collapse'} tasks">
                ${project.collapsed ? '↓ Show' : '↑ Hide'} Tasks
            </button>
            <button class="delete-btn" data-action="delete-project">X Delete Project</button> 
            <div class="collapsible-content" ${project.collapsed ? 'hidden' : ''}>
                ${renderProjectTasks(project.tasks)}
                <button class="adder" data-action="open-task-modal">+ Add Task </button>
            </div>
        </div>
        </li>        
        `).join('');

    // Assemble the Template
    const template = `
    <div class="content-heading">
        <h2>Your Projects</h2>
        <button class="adder" id="add-project-btn" data-action="open-project-modal">+ Add Project</button>
    </div>
    
    <ul role="list">
        ${filteredProjects.length ? projectCards: noProjectsHandler}
    </ul>
    `;

    // Inject HTML
    content.innerHTML = template;
}