export default class Project {
    title;
    #tasks = [];

    constructor(title) {
        this.title = title;
    }

    get tasks() {
        return this.#tasks;
    }

    addNewTask(task) {
        this.#tasks.push(task);
    }
}