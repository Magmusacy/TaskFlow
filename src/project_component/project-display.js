import Project from './project';
import { renderTask } from '../task_component/task-display';
import './project-styles.css';

const toggleSidebarButton = document.querySelector('#toggle-sidebar');

export function renderProject(project) {
    const projectTitle = document.querySelector('#project-title');
    projectTitle.textContent = project.title;

    for (const task of project.tasks) {
        renderTask(task);
    };
}

export function toggleSidebar() {
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
        <ul id="project-container">
            <li>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>list-box-outline</title><path d="M11 15H17V17H11V15M9 7H7V9H9V7M11 13H17V11H11V13M11 9H17V7H11V9M9 11H7V13H9V11M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5M19 5H5V19H19V5M9 15H7V17H9V15Z" /></svg>
                    Default Project
                </button>
            </li>
            <li>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>list-box-outline</title><path d="M11 15H17V17H11V15M9 7H7V9H9V7M11 13H17V11H11V13M11 9H17V7H11V9M9 11H7V13H9V11M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5M19 5H5V19H19V5M9 15H7V17H9V15Z" /></svg>
                    Test Project
                </button>
            </li>
        </ul>
    </aside>
    `
    );
}

function toggleDimBody() {
    const headerElement = document.querySelector('header');
    const dimBody = document.querySelector('#dim-body');
    if (dimBody) {
        dimBody.remove()
        return;
    };

    headerElement.insertAdjacentHTML('afterend', `<div id="dim-body"></div>`);
}

toggleSidebarButton.addEventListener('click', () => {
    toggleSidebar();
    toggleDimBody();
});
