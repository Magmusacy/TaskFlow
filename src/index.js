import './normalize.css';
import './style.css';
import Task from './task_component/task.js';
import Project from './project_component/project.js';
import { renderTask } from './task_component/task-display';

const project1 = new Project('Testowy');
const testDate = new Date("2023-09-08 13:37");
const test1 = new Task('Do laundry', 'My clothes are stinky and I need to clean them', testDate, 1);
project1.addNewTask(test1);
console.log(project1);
test1.changeCompletionStatus();
console.log(test1);
console.log('Hello, World!');

renderTask(test1);