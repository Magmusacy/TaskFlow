import './normalize.css';
import './style.css';
import * as appFlow from './app-flow';
import './project_component/project-display';
import renderProject from './project_component/project-display';
import renderTask from './task_component/task-display';
import { toggleSidebarButton, toggleSidebar } from './project_component/project-sidebar-display';
import { saveProject, saveCurrentProjectId, loadProjects, loadCurrentProjectId } from './storage-handler';

const savedProjects = loadProjects();
if (savedProjects.length) {
    appFlow.loadProjects(savedProjects);
    appFlow.changeCurrentProject(loadCurrentProjectId());
} else {
    appFlow.addTask('Test1', 'Tedst2', new Date('2024-09-29T19:20'), 2)
    appFlow.addTask('Test1', 'Tedst2', new Date('2024-09-29T19:20'), 2)
    appFlow.addTask('Test1', 'Tedst2', new Date('2024-09-29T19:20'), 2)
    appFlow.addTask('Test1', 'Tedst2', new Date('2024-09-29T19:20'), 2)
    appFlow.addTask('Test1', 'Tedst2', new Date('2024-09-29T19:20'), 2)
    appFlow.addTask('Test1', 'Tedst2', new Date('2024-09-29T19:20'), 2)
    for (const project of appFlow.projects) {
        saveProject(project);
        saveCurrentProjectId(appFlow.currentProject.id);
    }
};

renderProject(appFlow.currentProject);

const newTaskForm = document.querySelector('#new-task-form');
newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.target.elements['title'].value;
    const description = e.target.elements['description'].value;
    const dueDate = new Date(e.target.elements['due-date'].value);
    const priority = +e.target.elements['priority'].value;

    const newTask = appFlow.addTask(title, description, dueDate, priority);
    renderTask(newTask, appFlow.currentProject);
    saveProject(appFlow.currentProject);
    e.target.reset();
});

toggleSidebarButton.addEventListener('click', () => {
    toggleSidebar(appFlow);
});
