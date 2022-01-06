import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

window.addEventListener('load', async() => {
    displayTodos();
});

todoForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    // on submit, create a todo, reset the form, and display the todos
    const newForm = new FormData(todoForm);
    const todo = newForm.get('todo');
    await createTodo(todo);
    displayTodos();
    todoForm.reset();
});

async function displayTodos() {
    // fetch the todos
    const todos = await getTodos();
    // display the list of todos
    todosEl.textContent = '';
    for (const todo of todos) {
        const listItem = renderTodo(todo);
        todosEl.append(listItem);
        listenerGenerator(listItem, todo);
    }
    // be sure to give each todo an event listener

    // on click, complete that todo
}

const listenerGenerator = (listItem, todo) => {
    console.log(todo);
    listItem.addEventListener('click', async() => {
        await completeTodo(todo);
        displayTodos();
    });
};

// add an on load listener that fetches and displays todos on load

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async() => {
    // delete all todos
    deleteAllTodos();
    // then refetch and display the updated list of todos
    todosEl.textContent = '';
});
