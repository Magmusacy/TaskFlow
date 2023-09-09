import Project from './project_component/project';
import Task from './task_component/task';

export const projects = [new Project(0, 'Default Project')];
export let currentProject = projects[0];

export function lastTaskId() {
    return currentProject.tasks.at(-1) ? currentProject.tasks.at(-1).id : 0
}

function addProject(title) {
    const newId = projects.at(-1).id + 1;
    projects.push(new Project(newId, title));
}

function changeCurrentProject(newCurrProjectId) {
    currentProject = projects.find(project => project.id === newCurrProjectId);
}
