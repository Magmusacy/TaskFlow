import { format } from 'date-fns';
import renderProject from '../project_component/project-display';
import { saveProject } from '../storage-handler';

export default function displayTaskModal(task, project) {
    const status = task.isCompleted ? 'completed' : 'upcoming';
    document.body.classList.add('hide-scroll');
    document.body.insertAdjacentHTML('afterbegin', `
        <div id="task-overlay" class="task-overlay">
            <div data-edit-task-id="${task.id}" id="task-display-modal" class="task-display-modal">
                <div class="buttons">
                    <button id="task-delete" class="task-delete">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete button</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                    </button>
                    <button id="close-modal" class="close-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>    
                    </button>
                </div>

                <form id="edit-task-form" class="task-display ${status}"> 
                    <div id="completion-status" class="completion-status priority-${task.priority}">
                        <button aria-label="complete task" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Completed mark</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                        </button>
                    </div>

                    <div>
                        <label for="title" class="sr-only">Title</label>
                        <input id="title" type="text" class="title" value="${task.title}" placeholder="Title">
                    </div>
                    
                    <div>
                        <label for="description" class="sr-only">Description</label>
                        <textarea id="description" class="description" placeholder="Description">${task.description}</textarea>
                    </div>
                    
                    <div>
                        <label for="due-date">Due Date</label>
                        <input id="due-date" type="datetime-local" name="dueDate" value="${format(task.dueDate, "yyyy-MM-dd'T'HH:mm")}" required>
                    </div>

                    <div>
                        <label for="priority">Priority</label>
                        <input id="priority" type="number" max="4" min="1" value="${task.priority}" required>
                    </div>
                </form>
            </div>
        </div>
    `);

    enableDeleteTaskButton(task, project);
    enableCompleteTaskButton(task, project);
    enableEditTaskForm(task, project);
    enableCloseModalButton(project);
}

function enableDeleteTaskButton(task, project) {
    const deleteTaskButton = document.querySelector(`[data-edit-task-id="${task.id}"] #task-delete`);

    deleteTaskButton.addEventListener('click', () => {
        project.deleteTask(task.id);
        saveProject(project);
        hideTaskModal();
        renderProject(project);
    });
}

function enableCompleteTaskButton(task, project) {
    const completeTaskButton = document.querySelector(`[data-edit-task-id="${task.id}"] #completion-status`);

    completeTaskButton.addEventListener('click', () => {
        task.changeCompletionStatus();
        refreshTaskModal(task, project);
        saveProject(project);
    });
}

function enableEditTaskForm(task, project) {
    const editTaskForm = document.querySelector('#edit-task-form');

    editTaskForm.addEventListener('input', (e) => {
        e.preventDefault();
        task.title = editTaskForm.elements['title'].value;
        task.description = editTaskForm.elements['description'].value;
        task.dueDate = new Date(editTaskForm.elements['due-date'].value);
        const newPriority = +editTaskForm.elements['priority'].value;
        // Update priority color
        if (newPriority != task.priority) {
            task.priority = +editTaskForm.elements['priority'].value;
            refreshTaskModal(task, project);
        };

        saveProject(project);
    });
}

function enableCloseModalButton(project) {
    const closeModalButton = document.querySelector('#close-modal');

    closeModalButton.addEventListener('click', () => {
        hideTaskModal();
        renderProject(project);
    });
}

function hideTaskModal() {
    document.body.classList.remove('hide-scroll');
    const taskOverlay = document.querySelector('#task-overlay');
    taskOverlay.remove();
}

function refreshTaskModal(task, project) {
    hideTaskModal();
    displayTaskModal(task, project);
}