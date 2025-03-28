import { Project } from "../utilities/project";
import { Task } from "../utilities/task";
import { format } from "date-fns";

export const appState = {
    // store projects and the current active tab
    projects: [],
    currentView: 'home',

    addProject(name) {
        let projectToAdd = new Project(name);
        this.projects.push(projectToAdd);
    },

    // have a "Home" project by default, only if there are no projects
    init() {
        if (this.projects.length === 0) {
            const homeProject = new Project("Home", crypto.randomUUID(), true);
            this.projects.push(homeProject);
            this.currentProjectId = homeProject.id;
        }
    },

    // Save all appState information as a string for localStorage
    save() {
        const data = {
          projects: this.projects.map(project => ({
            name: project.name,
            id: project.id,
            isHome: project.isHome,
            tasks: project.tasks.map(task => ({
              title: task.title,
              dueDate: format(task.dueDate, 'yyyy-MM-dd'), // Convert Date → string
              notes: task.notes,
              priority: task.priority,
              projectId: task.projectId,
              id: task.id,
              isComplete: task.isComplete
            })),
            collapsed: project.collapsed
          })),
          currentView: this.currentView
        };
        localStorage.setItem('todoAppData', JSON.stringify(data));
      },
    // Attempt to load appState from localStorage, if there's no saved data for some reason, restart the app
    load() {
    const savedData = JSON.parse(localStorage.getItem('todoAppData'));
    if (!savedData) return this.init();

    this.projects = savedData.projects.map(projectData => {
        const project = new Project(
        projectData.name,
        projectData.id,
        projectData.isHome
        );
        project.tasks = projectData.tasks.map(taskData => 
        new Task(
            taskData.title,
            taskData.dueDate,
            taskData.notes,
            taskData.priority,
            taskData.projectId,
            taskData.id,
            taskData.isComplete
        )
        );
        project.collapsed = projectData.collapsed;
        return project;
    });
    this.currentView = savedData.currentView || 'home';
    }
}