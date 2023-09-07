export default class Task {
    title;
    description;
    #dueDate;
    #priority;
    isCompleted = false;
    
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    set dueDate(value) {
        console.log(value === Date.now(), Date.now());
        if (value > Date.now()) {
            this.#dueDate = value;
        } else {
            throw new Error('Due date must be set to a future date.')
        }
    }

    get dueDate() {
        return this.#dueDate;
    }

    set priority(value) {
        if (value < 5 && value > 0) {
            this.#priority = value;
        } else {
            throw new Error('Priority invalid, should be between 1 and 4');
        } 
    }

    get priority() {
        return this.#priority;
    }

    changeCompletionStatus() {
        this.isCompleted = this.isCompleted ? false : true; 
    }
}