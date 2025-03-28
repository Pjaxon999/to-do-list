import { appState } from '../core/appState';
import { renderHome } from "../ui/homeUI";
import { renderProjects } from "../ui/projectUI";
import { renderToday } from "../ui/todayUI";
import { renderOverdue } from "../ui/overdueUI";
import { format } from 'date-fns';

// Helper Functions

// Find a task by matching the project and taskid. If there is no projectid, search the home project
function findTask(taskId, projectId) {
    return projectId
        ? appState.projects.find(project => project.id === projectId)?.tasks.find(task => task.id === taskId)
        : appState.projects.find(project => project.isHome).tasks.find(task => task.id === taskId);
}

// Prevent default task form behavior, grab the form data, pass the data into new task, re render
function handleTaskFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const modal = document.getElementById('task-modal');
    const projectId = modal.dataset.projectId; 
    const isEditing = !!modal.dataset.editingTaskId;
    const taskData = {
        title: formData.get('title'),
        dueDate: formData.get('due-date'),
        notes: formData.get('notes'),
        priority: formData.get('priority') || 'medium'
    };

    if (isEditing) {
        const taskId = modal.dataset.editingTaskId;
        const task = projectId 
            ? appState.projects.find(project => project.id === projectId)?.tasks.find(task => task.id === taskId)
            : appState.projects.find(project => project.isHome).tasks.find(task => task.id === taskId);

        if (task) {
            task.updateTitle(taskData.title);
            task.updateDueDate(taskData.dueDate);
            task.updateNotes(taskData.notes);
            task.updatePriority(taskData.priority);
        }
    } else {
        if (projectId) {
            const project = appState.projects.find(project => project.id === projectId);
            project?.addTask(taskData);
        } else {
            const home = appState.projects.find(project => project.isHome);
            home.addTask(taskData);
        }
    }

    // Reset and cleanup
    delete modal.dataset.editingTaskId;
    renderActiveTab();
    closeModal();
    e.target.reset();
}

// Prevent defualt project form behavior, grab the form data, create new project, re render
function handleProjectFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    appState.addProject(formData.get('project-name'));
    renderActiveTab();
    closeModal();
    e.target.reset();
  }

// Manage the state of the modal dialog forms
let currentModal = null;

// Opens the task modal, associates it with the projectId, updates current modal
function handleOpenTaskModal(projectId) {
    const modal = document.getElementById('task-modal');
    delete modal.dataset.editingTaskId;
    modal.dataset.projectId = projectId || '';
    modal.showModal();
    currentModal = modal;
}

// Opens the project modal, updates the current modal
function handleOpenProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.showModal();
    currentModal = modal;
}

function handleEditTask(taskId, projectId) {
    const task = findTask(taskId, projectId);
    if (!task) return;
  
    const modal = document.getElementById('task-modal');
    const form = document.getElementById('task-form');
  
    // Store editing context
    modal.dataset.projectId = projectId || '';
    modal.dataset.editingTaskId = taskId;
  
    // Populate form fields
    document.getElementById('task-id').value = taskId;
    form.elements.title.value = task.title;
    form.elements['due-date'].value = format(task.dueDate, 'yyyy-MM-dd');
    form.elements.notes.value = task.notes || '';
    
    // Set priority radio
    const priorityRadio = form.querySelector(`input[value="${task.priority}"]`);
    if (priorityRadio) priorityRadio.checked = true;
  
    modal.showModal();
}

// Close modals after use
function closeModal() {
    const taskModal = document.getElementById('task-modal');
    const projectModal = document.getElementById('project-modal');
    
    if (taskModal) {
        taskModal.close();
        taskModal.classList.remove('modal-open');
    }
    if (projectModal) {
        projectModal.close();
        projectModal.classList.remove('modal-open');
    }

    delete taskModal?.dataset.projectId;
    delete taskModal?.dataset.editingTaskId;
    delete projectModal?.dataset.projectId;
    delete projectModal?.dataset.editingTaskId;

    currentModal = null;
}

// Conditionally render based on whichever tab is currently considered active 
function renderActiveTab() {
    switch(appState.currentView.toLowerCase()) {
    case 'home': 
        renderHome();
        break;
    case 'projects':
        renderProjects();
        break;
    case 'today':
        renderToday();
        break;
    case 'overdue':
        renderOverdue();
        break;
    default:
        alert("something has borken horribly, please try again");
    }
}

// Action handlers

// Toggle the collapse state for collapisble content then re render
function handleCollapseToggle(projectId) {
    const project = appState.projects.find(p => p.id === projectId);
    if (project) project.collapsed = !project.collapsed;
    renderActiveTab();
}

// Delete project, then only re render if projects is the active tab
function handleDeleteProject(projectId) {
    appState.projects = appState.projects.filter(project => project.id !== projectId);
    if (appState.currentView === 'projects') renderActiveTab();
}

// Toggle tasks being marked complete and completed tasks to be uncomplete, then re render 
function handleTaskComplete(taskId, projectId) {
    const task = findTask(taskId, projectId);
    if (task) {
        task.isCompleteToggle();
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        
        if (taskElement) {
            if (task.isComplete) {
                taskElement.classList.add('task-complete');
            } else {
                taskElement.classList.remove('task-complete');
            }
        }
    }
    
    renderActiveTab();
}

// Delete tasks by finding the project associated with the task, filtering out the task to delete, re rendering the active tab
function handleDeleteTask(taskId, projectId) {
    if (projectId) {
        const project = appState.projects.find(project => project.id === projectId);
        project.tasks = project.tasks.filter(task => task.id !== taskId);
    } else {
        appState.projects.find(p => p.isHome).tasks = appState.projects.find(p => p.isHome).tasks.filter(task => task.id !== taskId);
    }
    renderActiveTab();
}

// Handle event listeners
export function viewHandlers() {
    // Grab the main content div so that event listeners can be added to generated buttons
    const mainContent = document.getElementById('main-content');

    // Add event listeners to nav buttons, render appropriate page when clicked, add active class to button
    document.addEventListener('click', (e) => {
        const navButton = e.target.closest('[data-view]');
        if (navButton) {
            appState.currentView = navButton.dataset.view;
            renderActiveTab();
        }
    });

    // Event listener for modals
    document.addEventListener('click', e => {
        if (e.target === currentModal || e.target.closest('.close-modal')) {
            closeModal();
        }
    });

    // Form Submissions
    const taskForm = document.getElementById('task-form');
    const projectForm = document.getElementById('project-form');
    const taskConfirmBtn = document.getElementById('task-modal').querySelector('#confirm-btn');
    const projectConfirmBtn = document.getElementById('project-modal').querySelector('#confirm-btn');

    taskForm.addEventListener('submit', handleTaskFormSubmit);
    projectForm.addEventListener('submit', handleProjectFormSubmit);

    taskConfirmBtn.addEventListener('click', (e) => {
        if (taskForm.checkValidity()) {
            // Create an event-like object that mimics a form submission
            const fakeEvent = {
                preventDefault: () => {},
                target: taskForm
            };
            handleTaskFormSubmit(fakeEvent);
        } else {
            taskForm.reportValidity();
        }
    });

    projectConfirmBtn.addEventListener('click', (e) => {
        if (projectForm.checkValidity()) {
            // Create an event-like object that mimics a form submission
            const fakeEvent = {
                preventDefault: () => {},
                target: projectForm
            };
            handleProjectFormSubmit(fakeEvent);
        } else {
            projectForm.reportValidity();
        }
    });


    // Handle different actions for adding/editing/deleting tasks or projects
    mainContent.addEventListener('click', (e) => {
        const action = e.target.closest('[data-action]')?.dataset.action;
        if (!action) return;

        const projectId = e.target.closest('[data-project-id]')?.dataset.projectId;
        const taskId = e.target.closest('[data-task-id]')?.dataset.taskId;

        switch (action) {
            case 'toggle-collapse':
                handleCollapseToggle(projectId);
                break;
            case 'delete-project':
                handleDeleteProject(projectId);
                break;
            case 'toggle-task-complete':
                handleTaskComplete(taskId, projectId);
                break;
            case 'delete-task':
                handleDeleteTask(taskId, projectId);
                break;
            case 'open-task-modal':
                handleOpenTaskModal(projectId);
                break;
            case 'open-project-modal':
                handleOpenProjectModal();
                break;
            case 'edit-task':
                handleEditTask(taskId, projectId);
                break;
        }
    });
}