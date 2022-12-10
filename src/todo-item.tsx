import React from 'react';
import { updateTodo } from './api';
import { TTodo } from './App';

type TProps = {
    deleteTodo: (todoId: string) => void;
    editTodo: (todo: TTodo) => void;
    todo: TTodo;
};

export const TodoItem = ({ deleteTodo, editTodo, todo }: TProps) => {
    const [isDone, setIsDone] = React.useState<boolean>(todo.done);

    const handleDoneChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setIsDone(event.target.checked);
        await updateTodo({
            ...todo,
            done: event.target.checked,
        });
    };

    return (
        <article className="todo-item" key={todo.id}>
            <span>{todo.name}</span>

            <div>
                <label>
                    <input
                        type="checkbox"
                        defaultChecked={todo.done}
                        onChange={handleDoneChange}
                    />

                    {isDone ? 'Done' : 'Todo'}
                </label>

                <button
                    type="button"
                    className="green"
                    onClick={() => editTodo(todo)}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="red"
                    onClick={() => deleteTodo(todo.id!)}
                >
                    Delete
                </button>
            </div>
        </article>
    );
};
