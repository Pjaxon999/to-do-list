import { Project } from "../utilities/project";

export const appState = {
    // store projects and set the active project to home by default
    projects: [],
    currentProjectId: null,

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