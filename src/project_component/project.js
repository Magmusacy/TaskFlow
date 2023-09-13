export default class Project {
    id;
    title;
    tasks = [];

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    addNewTask(task) {
        this.tasks.push(task);
    }
}