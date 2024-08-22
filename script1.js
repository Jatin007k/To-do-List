document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks from localStorage
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = task;

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editTask(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            taskItem.appendChild(taskText);
            taskItem.appendChild(editBtn);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    };

    // Add task
    const addTask = () => {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    // Edit task
    const editTask = (index) => {
        const newTask = prompt('Edit your task:', tasks[index]);
        if (newTask !== null) {
            tasks[index] = newTask.trim();
            saveTasks();
            renderTasks();
        }
    };

    // Delete task
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Initial render
    renderTasks();
});
