import { isToday, isPast } from "date-fns";

export class Task {
    constructor(title, dueDate, notes, priority, isComplete = false) {
        this.title = title;
        this.dueDate = dueDate;
        this.notes = notes;
        this.priority = priority;
        this.isComplete = isComplete;
    }

    isCompleteToggle() {
        this.isComplete = !this.isComplete;
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    updateDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }

    get isOverdue() {
        return isPast(this.dueDate);
    }

    get isDueToday() {
        return isToday(this.dueDate);
    }
}