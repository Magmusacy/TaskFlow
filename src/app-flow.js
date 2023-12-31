import Project from './project_component/project';
import Task from './task_component/task';

export let projects = [new Project(0, 'Default Project')];
export let currentProject = projects[0];

export function lastTaskId() {
    return currentProject.tasks.at(-1) ? currentProject.tasks.at(-1).id : 0
}

export function loadProjects(savedProjects) {
    projects = savedProjects;
}

export function addProject(title) {
    const newId = projects.at(-1).id + 1;
    const newProject = new Project(newId, title);
    projects.push(newProject);
    return newProject;
}

export function addTask(title, description, dueDate, priority) {
    const newTaskId = lastTaskId() + 1;
    const newTask = new Task(newTaskId, title, description, dueDate, priority);
    currentProject.addNewTask(newTask);
    return newTask;
}

export function changeCurrentProject(newCurrProjectId) {
    currentProject = projects.find(project => project.id === newCurrProjectId);
}
