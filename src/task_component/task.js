export default class Task {
    id;
    title;
    description;
    dueDate;
    priority;
    isCompleted;
    
    constructor(id, title, description, dueDate, priority, isCompleted = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = isCompleted;
    }

    changeCompletionStatus() {
        this.isCompleted = this.isCompleted ? false : true; 
    }
}