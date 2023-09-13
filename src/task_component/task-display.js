import './task-styles.css';
import { format } from 'date-fns';
import displayTaskModal from './task-display-modal';
import { saveProject } from '../storage-handler';

export default function renderTask(task, project) {
    const status = task.isCompleted ? 'completed' : 'upcoming';
    const taskList = task.isCompleted ? document.querySelector('#completed-tasks') : document.querySelector('#upcoming-tasks');
    taskList.insertAdjacentHTML('beforeend', itemTemplate(task, status));
    enableTaskDisplay(task, status, project)
    enableCompletion(task, project)
}

function enableTaskDisplay(task, status, project) {
    const taskDiv = document.querySelector(`[data-task-id="${task.id}"]`);
    taskDiv.addEventListener('click', () => {
        displayTaskModal(task, status, project);
    });
}

function enableCompletion(task, project) {
    const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
    const completeButton = document.querySelector(`[data-task-id="${task.id}"] button`);
    completeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        taskElement.remove();
        task.changeCompletionStatus();
        renderTask(task, project);
        saveProject(project);
    });
}

function itemTemplate(task, status) {
    return `        
    <div data-task-id="${task.id}" class="task-item ${status}" role="button" tabindex="0">
        <div class="completion-status priority-${task.priority}">
            <button aria-label="complete task">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Completed mark</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
            </button>
        </div>
        <div class="title">${task.title}</div>
        <div class="description">${task.description}</div>
        <div class="due-date">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Calendar</title><path d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
            ${format(task.dueDate, "yyyy-MM-dd HH:mm")}
        </div>
    </div>
    `;
}
