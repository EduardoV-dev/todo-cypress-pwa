import { TTodo } from './App';

const BASE_URL = import.meta.env.VITE_API_URL;
const TODOS_ENDPOINT = `${BASE_URL}/todos`;

export const getTodos = () => fetch(TODOS_ENDPOINT).then((res) => res.json());

export const createTodo = (todo: TTodo) =>
    fetch(TODOS_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    }).then((res) => res.json());

export const updateTodo = (todo: TTodo) =>
    fetch(`${TODOS_ENDPOINT}/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    }).then((res) => res.json());

export const deleteTodo = (id: string) =>
    fetch(`${TODOS_ENDPOINT}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
