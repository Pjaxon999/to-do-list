import { Task } from "./task.js";

export class Project {
    constructor(name, id = crypto.randomUUID(), isHome = false, collapsed = true){
        this.name = name;
        this.id = id;
        this.isHome = isHome;
        this.tasks = [];
        this.collapsed = collapsed;
    }

    addTask(taskData) {
        const task = new Task(
            taskData.title,
            taskData.dueDate,
            taskData.notes || "",
            taskData.priority || "medium",
            this.id,
        );
        this.tasks.push(task);
    }
}