const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

/* Boton limpiar  */
const clearButton = document.getElementById("clearButton");

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if(!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState)
    task.textContent = value;
    tasksContainer.prepend(task);
    console.log(task);
    event.target.reset();

        // Guardar la tarea en localStorage
        let tasks;
        if(localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    
};

const changeTaskState = event => { 
    event.target.classList.toggle('done');
    clearButton.style.display = "flex";

    // Actualizar el estado de la tarea en localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskIndex = tasks.indexOf(event.target.textContent);
    if(event.target.classList.contains('done')) {
        tasks[taskIndex] = { text: tasks[taskIndex], done: true };
    } else {
        tasks[taskIndex] = { text: tasks[taskIndex], done: false };
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach( el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    });
    return [...toDo, ...done];
}

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el))
}

setDate();

document.getElementById("clearButton").addEventListener("click", () => {
    const tasks = tasksContainer.getElementsByClassName('task');
    Array.from(tasks).forEach(task => {
        if(task.classList.contains('done')) {
            tasksContainer.removeChild(task);
            clearButton.style.display = "none";
        } 
    });

    // Actualizar localStorage
    let storedTasks = JSON.parse(localStorage.getItem('tasks'));
    storedTasks = storedTasks.filter(taskData => {
        return typeof taskData === 'string' || !taskData.done;
    });
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    
});


const loadTasks = () => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(taskData => {
        const task = document.createElement('div');
        task.classList.add('task', 'roundBorder');
        task.addEventListener('click', changeTaskState)
        task.textContent = typeof taskData === 'string' ? taskData : taskData.text;
        if(typeof taskData !== 'string' && taskData.done) {
            task.classList.add('done');
        }
        tasksContainer.prepend(task);
    });
};

loadTasks();

    
 
     

     