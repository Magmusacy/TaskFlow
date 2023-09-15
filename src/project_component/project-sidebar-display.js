import renderProject from './project-display';
import { saveProject, saveCurrentProjectId } from '../storage-handler';
import './project-styles.css';  
export const toggleSidebarButton = document.querySelector('#toggle-sidebar');
export let chosenProject;

export function toggleSidebar(app) {
    const projects = app.projects;
    const currentProject = app.currentProject;
    chosenProject = currentProject;
    toggleOverlay();
    switchMenuIcon();
    document.body.classList.toggle('hide-scroll');
    const headerElement = document.querySelector('header');
    const projectAside = document.querySelector('#project-aside');
    if (projectAside) {
        projectAside.remove();
        return;
    };

    headerElement.insertAdjacentHTML('afterend', 
    `
    <aside id="project-aside">
        <h2>Projects</h2>
        <ul id="project-container" class="project-container">
        </ul>
    </aside>
    `
    );

    const projectContainer = document.querySelector('#project-container');

    for (const project of projects) {
        projectContainer.insertAdjacentHTML('beforeend' ,`
            <li>
                <button data-project-id="${project.id}" ${currentProject === project ? 'class="current-project"' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>list-box-outline</title><path d="M11 15H17V17H11V15M9 7H7V9H9V7M11 13H17V11H11V13M11 9H17V7H11V9M9 11H7V13H9V11M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5M19 5H5V19H19V5M9 15H7V17H9V15Z" /></svg>
                    ${project.title}
                </button>
            </li>
        `);
    };

    projectContainer.insertAdjacentHTML('beforeend', `
        <form id="new-project-form" class="new-project-form">
            <label for="new-proimport renderProject from './project_component/project-display';
            ject-title" class="sr-only">New project title</label>
            <input id="new-project-title" type="text" placeholder="New project title" required>

            <input type="submit" value="Add new project">
        </form>
    `); 

    enableSidebarForm(app);
    enableSidebarButtons(app);
}

function toggleOverlay() {
    const headerElement = document.querySelector('header');
    const projectOverlay = document.querySelector('#project-overlay');
    if (projectOverlay) {
        projectOverlay.remove()
        return;
    };

    headerElement.insertAdjacentHTML('afterend', `<div id="project-overlay" class="project-overlay"></div>`);
}

function switchMenuIcon() {
    if (toggleSidebarButton.dataset.present === 'false') {
        toggleSidebarButton.dataset.present = 'true';
        toggleSidebarButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>';
    } else {
        toggleSidebarButton.dataset.present = 'false';
        toggleSidebarButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>';
    }
}

export function refreshSidebar(app) {
    toggleSidebar(app);
    toggleSidebar(app);
}

function enableSidebarForm(app) {
    const newProjectForm = document.querySelector('#new-project-form');
    if(!newProjectForm) {
        return;
    }

    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.elements['new-project-title'].value;
        const newProject = app.addProject(title);
        refreshSidebar(app);
        enableSidebarButtons(app);
        enableSidebarForm(app);
        saveProject(newProject);
    });
}

function enableSidebarButtons(app) {
    for (const projectButton of document.querySelectorAll('[data-project-id]')) {
        projectButton.addEventListener('click', (e) => {
            const newProjectId = +e.target.dataset.projectId;
            app.changeCurrentProject(newProjectId);
            renderProject(app.currentProject);
            toggleSidebar(app);
            saveCurrentProjectId(newProjectId);
        });
    };
}
