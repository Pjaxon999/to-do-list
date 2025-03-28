import { format } from 'date-fns';

export function renderTaskCard(task) {
  return `
    <li class="card ${task.isComplete ? 'task-completed' : ''}" 
        data-task-id="${task.id}" 
        data-due-date="${task.dueDate.toISOString()}" 
        data-priority="${task.priority}">
      <div class="task-content">
        <h3>${task.title}</h3>
        <time datetime="${task.dueDate.toISOString()}">
          Due: ${format(task.dueDate, 'MMM dd, yyyy')}
        </time>
        ${task.notes ? `<p>${task.notes}</p>` : ''}
        <p>Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
        <div class="task-actions">
          <button 
            class="complete-btn" 
            data-action="toggle-task-complete" 
            aria-label="${task.isComplete ? 'Uncomplete' : 'Complete'} task"
          >
            ${task.isComplete ? '↻ Undo' : '✓ Complete'}
          </button>
          <button class="edit-btn" data-action="edit-task">✎ Edit Task</button>
          <button class="delete-btn" data-action="delete-task">X Delete Task</button>
        </div>
      </div>
    </li>
  `;
}