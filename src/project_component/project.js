export default class Project {
    id;
    title;
    #tasks = [];

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    get tasks() {
        return this.#tasks;
    }

    addNewTask(task) {
        this.#tasks.push(task);
    }
}