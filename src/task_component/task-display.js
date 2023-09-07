import './task-styles.css';

export function renderTask(task) {
    const taskContainer = document.querySelector('#task-container');
    taskContainer.insertAdjacentHTML(
        'beforeend',
        `        
        <div class="task-item">
            <div class="completion-status priority-${task.priority}">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Completed mark</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                </button>
            </div>
            <div class="title">${task.title}</div>
            <div class="description">${task.description}</div>
            <div class="due-date">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Calendar</title><path d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
                ${task.dueDate}
            </div>
        </div>
        ` 
    );
}