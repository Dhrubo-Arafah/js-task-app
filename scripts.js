let taskForm = document.getElementById('taskForm')
let taskInput = document.getElementById('taskInput')
let taskList = document.getElementById('taskList')

document.addEventListener('DOMContentLoaded', getTasks)

function newList(task) {
    let li = document.createElement('li');
    let listText = document.createTextNode(task)

    let a = document.createElement('a');
    a.setAttribute('href', '#')
    a.appendChild(document.createTextNode('X'))

    li.appendChild(listText)
    li.appendChild(a)
    return li;
    // taskList.appendChild(li);
}

taskForm.addEventListener('submit', (e) => {
    let task = taskInput.value.trim();
    if (task === '') {
        alert('Add a task!')
    } else {
        let li = newList(task);
        taskList.appendChild(li)
        storeInLocalStorage(task);
        taskInput.value = '';
    }
    e.preventDefault()
})

function storeInLocalStorage(task) {
    let tasks = getData()
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function getData() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    return tasks;
}

function getTasks() {
    let tasks = getData();
    
    tasks.forEach(task => {
        let li = newList(task);
        taskList.appendChild(li);
    });
}

let clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    taskList.innerHTML = "";
    localStorage.clear();
})

document.getElementById('filter').addEventListener('keyup', (e) => {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
})

taskList.addEventListener('click', removeTask)

function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        let li = e.target.parentElement;
        let tasks = getData();
        li.removeChild(li.lastChild);
        li.remove();
        tasks.forEach((task, index) => {
            if (li.textContent.trim() === task) {
                console.log(li.textContent.trim())
                console.log(task)
                tasks.splice(index, 1)
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    
}