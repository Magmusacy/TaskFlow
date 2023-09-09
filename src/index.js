import './normalize.css';
import './style.css';
import Project from './project_component/project';
import Task from './task_component/task';
import * as appFlow from './app-flow';
import './project_component/project-display';
import { renderTask } from './task_component/task-display';

const newTaskForm = document.querySelector('#new-task-form');
newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.target.elements['title'].value;
    const description = e.target.elements['description'].value;
    const dueDate = new Date(e.target.elements['due-date'].value);
    const priority = +e.target.elements['priority'].value;

    const newTaskId = appFlow.lastTaskId() + 1;
    const newTask = new Task(newTaskId, title, description, dueDate, priority);
    appFlow.currentProject.addNewTask(newTask);
    renderTask(newTask);
});