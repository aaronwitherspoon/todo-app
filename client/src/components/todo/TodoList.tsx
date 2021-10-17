import React from 'react'
import axios, { AxiosResponse } from 'axios'

export interface Todo {
    _id: string;
    title: string;
    isCompleted: boolean;
}

interface TodoListProps {
    todos: Todo[];
    setTodos: (todo: Todo[]) => void;
}

function TodoList({todos, setTodos}: TodoListProps) {

    const markCompleted = (todo: Todo) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.put<AxiosResponse>(`/todo/${todo._id}`, {}, { headers: { token: token } })
                .then(res => {
                    if (res.status === 200) {
                        let  _todos = todos;
                        setTodos(_todos.filter(todo => res.data.todo._id !== todo._id));
                    }
                });
        }
    }

    return (
        <div>
            {todos.filter(todo => !todo.isCompleted).map(todo => (
                <div className="border border-gray-400 p-4 rounded-md mt-2 mt-2 flex justify-between items-center" key={todo._id}>
                    {todo.title}
                    <button className="py-2 px-3 bg-green-400 text-white rounded-md" onClick={() => markCompleted(todo)}>Done</button>
                </div>
            ))}
        </div>
    )
}

export default TodoList
