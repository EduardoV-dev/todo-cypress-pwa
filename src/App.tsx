import React from 'react';
import * as API from './api';
import { TodoItem } from './todo-item';

export type TTodo = {
    id?: string;
    name: string;
    done: boolean;
};

export const App = (): JSX.Element => {
    const [todoForm, setTodoForm] = React.useState<TTodo>({
        done: false,
        name: '',
    });
    const [isEditingTodo, setIsEditingTodo] = React.useState<boolean>(false);

    const [todos, setTodos] = React.useState<TTodo[]>([]);

    React.useEffect(() => {
        (async () => {
            const todos: TTodo[] = await API.getTodos();
            setTodos(todos);
        })();
    }, []);

    const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (todoForm.name === '') return;

        if (isEditingTodo) {
            API.updateTodo(todoForm);

            setTodos((prevTodos) =>
                prevTodos.map((prevTodo) =>
                    prevTodo.id === todoForm.id ? todoForm : prevTodo,
                ),
            );

            setIsEditingTodo(false);
        } else {
            const responseTodo: TTodo = await API.createTodo(todoForm);
            setTodos((prevTodos) => [responseTodo, ...prevTodos]);
        }

        setTodoForm({ name: '', done: false });
    };

    const handleDeleteTodo = async (todoId: string) => {
        await API.deleteTodo(todoId);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    };

    const editTodo = (todo: TTodo) => {
        setIsEditingTodo(true);
        setTodoForm(todo);
    };

    return (
        <>
            <h1>TODO APP</h1>

            <main>
                <section>
                    <h2>TODO FORM</h2>

                    <form onSubmit={handleAddTodo}>
                        <input
                            type="text"
                            onChange={(event) =>
                                setTodoForm((prevTodoForm) => ({
                                    ...prevTodoForm,
                                    name: event.target.value,
                                }))
                            }
                            value={todoForm.name}
                            placeholder="Add a new todo"
                        />

                        <button type="submit">
                            {isEditingTodo ? 'Edit' : 'Add'}
                        </button>
                    </form>
                </section>

                <section>
                    <h2>TODO LIST</h2>

                    <section>
                        {todos.length > 0 ? (
                            todos.map((todo: TTodo) => (
                                <TodoItem
                                    {...{ todo, editTodo }}
                                    key={todo.id}
                                    deleteTodo={handleDeleteTodo}
                                />
                            ))
                        ) : (
                            <p>No todos yet</p>
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};
