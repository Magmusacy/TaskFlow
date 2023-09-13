import Project from './project_component/project';
import Task from './task_component/task';

export function saveProject(project) {
    localStorage.setItem(`project-${project.id}`, JSON.stringify(project));
}

export function saveCurrentProjectId(currentProjectId) {
    localStorage.setItem('current-project', JSON.stringify(currentProjectId));
}

export function loadProjects() {
    const projects = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith('project-')) continue;
        const parsedProject = JSON.parse(localStorage.getItem(key));
        const tasks = parsedProject.tasks.map((task) => {
            // Need to convert string to date since JSON doesn't support dates.
            task.dueDate = new Date(task.dueDate);
            return new Task(...Object.values(task));
        });
        const project = new Project(...Object.values(parsedProject));
        project.tasks = tasks;
        projects.push(project);
    };

    return projects;
}

export function loadCurrentProjectId() {
    return JSON.parse(localStorage.getItem('current-project'));
}
