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

    set dueDate(value) {
        if (value > Date.now()) {
            this.dueDate = value;
        } else {
            throw new Error('Due date must be set to a future date.')
        }
    }

    set priority(value) {
        if (value < 5 && value > 0) {
            this.priority = value;
        } else {
            throw new Error('Priority invalid, should be between 1 and 4');
        } 
    }

    changeCompletionStatus() {
        this.isCompleted = this.isCompleted ? false : true; 
    }
}