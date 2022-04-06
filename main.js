// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const clearEl = document.querySelector('.clear');

// STORAGE
// Check if todos already in LS
function checkTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  console.log(todos);
  return todos;
}
// Save todos to local storage
function addToLS(todo) {
  const todos = checkTodos();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Update UI from LS
function getTodosFromLS() {
  const todos = checkTodos();
  console.log(todos);

  todos.forEach((todo) => {
    // TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const inputValue = todo;

    todoDiv.innerHTML = `
      <li class="todo-item">${inputValue}</li>
      <button class="complete-btn">
      <i class="fas fa-check"></i>
      </button>
      <button class="trash-btn">
      <i class="fas fa-trash"></i>
      </button>
      `;

    // APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

// REMOVE FROM LS
function removeLSTodo(todo) {
  const todos = checkTodos();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem('todos', JSON.stringify(todos));
}

// FUNCTIONS
function addTodo(event) {
  event.preventDefault();

  //   check if input is empty
  if (todoInput.value === '') {
    alert('Please, add a todo');
  } else {
    // TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const inputValue = todoInput.value;

    todoDiv.innerHTML = `
      <li class="todo-item">${inputValue}</li>
      <button class="complete-btn">
      <i class="fas fa-check"></i>
      </button>
      <button class="trash-btn">
      <i class="fas fa-trash"></i>
      </button>
      `;

    // APPEND TO LIST
    todoList.appendChild(todoDiv);

    //   ADD TODO TO LOCAL STORAGE
    addToLS(inputValue);
  }

  //   clear Todo INPUT VALUE
  todoInput.value = '';
}

// DELETE FUNCTION
function deleteCheck(e) {
  const item = e.target;
  const todo = e.target.parentElement;

  //   Delete Todo
  if (item.classList.contains('trash-btn')) {
    //   animation
    todo.classList.add('fall');
    removeLSTodo(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }
  //   CHECK MARK
  if (item.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
  }
}

// FILTER TODO
function filterTodos(e) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;

      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

// EVENT LISTENERS
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);
document.addEventListener('DOMContentLoaded', getTodosFromLS);

clearEl.addEventListener('click', () => {
  location.reload();
  localStorage.clear();
});
