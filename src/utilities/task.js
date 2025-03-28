import { isToday, isPast } from "date-fns";

export class Task {
    constructor(title, dueDate, notes, priority, projectId, id = crypto.randomUUID(), isComplete = false) {
        this.title = title;
        const [year, month, day] = dueDate.split('-');
        this.dueDate = new Date(year, month - 1, day);
        this.notes = notes;
        this.priority = priority;
        this.projectId = projectId;
        this.id = id;
        this.isComplete = isComplete;
    }

    isCompleteToggle() {
        this.isComplete = !this.isComplete;
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    updateDueDate(newDueDate) {
        const [year, month, day] = newDueDate.split('-');
        this.dueDate = new Date(year, month - 1, day);
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }

    updateNotes(newNotes) {
        this.notes = newNotes;
    }

    get isOverdue() {
        return isPast(this.dueDate) && !isToday(this.dueDate);
    }

    get isDueToday() {
        return isToday(this.dueDate);
    }
}