// script.js

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDateTime = document.getElementById('task-datetime');
const taskList = document.getElementById('task-list');

// Function to create a task
function createTaskElement(task, dueDate) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const taskContent = document.createElement('div');
  taskContent.innerHTML = `<span>${task}</span> ${
    dueDate ? `<small>${new Date(dueDate).toLocaleString()}</small>` : ''
  }`;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  // Complete button
  const completeButton = document.createElement('button');
  completeButton.className = 'complete';
  completeButton.textContent = 'Complete';
  completeButton.onclick = () => toggleComplete(li);

  // Edit button
  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.textContent = 'Edit';
  editButton.onclick = () => editTask(li);

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => li.remove();

  actions.append(completeButton, editButton, deleteButton);

  li.append(taskContent, actions);
  return li;
}

// Add task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = taskInput.value.trim();
  const dueDate = taskDateTime.value;

  if (task) {
    const taskElement = createTaskElement(task, dueDate);
    taskList.appendChild(taskElement);
    taskInput.value = '';
    taskDateTime.value = '';
  }
});

// Toggle task completion
function toggleComplete(taskElement) {
  taskElement.classList.toggle('completed');
}

// Edit task
function editTask(taskElement) {
  const taskContent = taskElement.querySelector('span');
  const currentTask = taskContent.textContent;

  const newTask = prompt('Edit your task:', currentTask);
  if (newTask !== null && newTask.trim() !== '') {
    taskContent.textContent = newTask.trim();
  }
}
