import './task-styles.css';
import { format } from 'date-fns';
import displayTaskModal from './task-display-modal';
import { saveProject } from '../storage-handler';

export default function renderTask(task, project) {
    const status = task.isCompleted ? 'completed' : 'upcoming';
    const taskList = task.isCompleted ? document.querySelector('#completed-tasks') : document.querySelector('#upcoming-tasks');
    taskList.insertAdjacentHTML('beforeend', itemTemplate(task, status));
    enableTaskDisplay(task, project);
    enableCompletion(task, project);
    enableDelete(task, project);
}

function enableTaskDisplay(task, project) {
    const taskElement = getTaskElement(task);
    taskElement.addEventListener('click', () => {
        displayTaskModal(task, project);
    });
}

function enableCompletion(task, project) {
    const taskElement = getTaskElement(task);
    const completeButton = document.querySelector(`[data-task-id="${task.id}"] #task-complete`);
    completeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        taskElement.remove();
        task.changeCompletionStatus();
        renderTask(task, project);
        saveProject(project);
    });
}

function enableDelete(task, project) {
    const taskElement = getTaskElement(task);
    const deleteButton = document.querySelector(`[data-task-id="${task.id}"] #task-delete`);
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        taskElement.remove();
        project.deleteTask(task.id);
        saveProject(project);
    });
}

function getTaskElement(task) {
    return document.querySelector(`[data-task-id="${task.id}"]`);
}

function itemTemplate(task, status) {
    return `        
    <div data-task-id="${task.id}" class="task-item ${status}" role="button" tabindex="0">
        <div class="completion-status priority-${task.priority}">
            <button id="task-complete" aria-label="complete task">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Completed mark</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
            </button>
        </div>
        <div class="title">${task.title}</div>
        <div class="description">${task.description}</div>
        <div class="due-date">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Calendar</title><path d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
        ${format(task.dueDate, "yyyy-MM-dd HH:mm")}
        </div>
        <div class="task-delete">
            <button id="task-delete" aria-label="delete task">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete button</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
            </button>
        </div>
    </div>
    `;
}
