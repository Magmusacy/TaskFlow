import './normalize.css';
import './style.css';
import * as appFlow from './app-flow';
import './project_component/project-display';
import { renderProject } from './project_component/project-display';
import { renderTask } from './task_component/task-display';
import { toggleSidebarButton, toggleSidebar, refreshSidebar } from './project_component/project-sidebar-display';
 
function enableSidebarButtons() {
    for (const projectButton of document.querySelectorAll('[data-project-id]')) {
        projectButton.addEventListener('click', (e) => {
            const newProjectId = +e.target.dataset.projectId;
            appFlow.changeCurrentProject(newProjectId);
            renderProject(appFlow.currentProject);
            toggleSidebar(appFlow.projects, appFlow.currentProject);
        });
    };
}

function enableSidebarForm() {
    const newProjectForm = document.querySelector('#new-project-form');

    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.elements['new-project-title'].value;
        appFlow.addProject(title);
        refreshSidebar(appFlow.projects, appFlow.currentProject);
        enableSidebarButtons();
        enableSidebarForm();
    });
}

const newTaskForm = document.querySelector('#new-task-form');
newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.target.elements['title'].value;
    const description = e.target.elements['description'].value;
    const dueDate = new Date(e.target.elements['due-date'].value);
    const priority = +e.target.elements['priority'].value;

    const newTask = appFlow.addTask(title, description, dueDate, priority);
    renderTask(newTask);
    e.target.reset();
});

toggleSidebarButton.addEventListener('click', () => {
    toggleSidebar(appFlow.projects, appFlow.currentProject);
    enableSidebarButtons();
    enableSidebarForm();
});

