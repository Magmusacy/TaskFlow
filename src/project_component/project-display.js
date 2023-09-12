import renderTask from '../task_component/task-display';
import './project-styles.css';

export default function renderProject(project) {
    const projectTitle = document.querySelector('#project-title');
    projectTitle.textContent = project.title;
    clearTasks();

    for (const task of project.tasks) {
        renderTask(task, project);
    };
}

function clearTasks() {
    const upcomingTasks = document.querySelector('#upcoming-tasks');
    const completedTasks = document.querySelector('#completed-tasks');
    upcomingTasks.innerHTML = '';
    completedTasks.innerHTML = '';
}
