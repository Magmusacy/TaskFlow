import { format } from 'date-fns';
import renderProject from '../project_component/project-display';

export default function displayTaskModal(task, status, project) {
    document.body.insertAdjacentHTML('afterbegin', `
        <div id="task-overlay" class="task-overlay">
            <div data-edit-task-id="${task.id}" id="task-display-modal" class="task-display-modal">
                <button id="close-modal" class="close-modal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>    
                </button>
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

    const closeModalButton = document.querySelector('#close-modal');
    const editTaskForm = document.querySelector('#edit-task-form');
    const completeTaskButton = document.querySelector(`[data-edit-task-id="${task.id}"] #completion-status`);
    console.log(completeTaskButton)
    completeTaskButton.addEventListener('click', (e) => {
        task.changeCompletionStatus();
        const status = task.isCompleted ? 'completed' : 'upcoming';
        refreshTaskModal(task, status, project);
    });

    editTaskForm.addEventListener('input', (e) => {
        e.preventDefault();
        task.title = editTaskForm.elements['title'].value;
        task.description = editTaskForm.elements['description'].value;
        task.dueDate = new Date(editTaskForm.elements['due-date'].value);
        const newPriority = +editTaskForm.elements['priority'].value;
        // Update priority color
        if (newPriority != task.priority) {
            task.priority = +editTaskForm.elements['priority'].value;
            refreshTaskModal(task, status, project)
        };
    });

    closeModalButton.addEventListener('click', () => {
        hideTaskModal();
        renderProject(project);
    });
}

function hideTaskModal() {
    const taskOverlay = document.querySelector('#task-overlay');
    taskOverlay.remove();
}

function refreshTaskModal(task, status, project) {
    hideTaskModal();
    displayTaskModal(task, status, project);
}