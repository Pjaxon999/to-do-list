import { Project } from "../utilities/project";

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
    }

}