import { Task } from "./task.js";

export class Project {
    constructor(name){
        this.name = name;
        this.tasks = [];
    }

    addTask(taskData) {
        const task = new Task(
            taskData.title,
            taskData.dueDate,
            taskData.notes,
            taskData.priority,
            taskData.isComplete
        );
        this.tasks.push(task);
    }
}