import React, { FormEvent, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Todo } from './TodoList';

interface TodoFormProps {
    todos: Todo[];
    setTodos: (todo: Todo[]) => void;
}

function TodoForm({todos, setTodos}: TodoFormProps) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token && title.length > 0) {
            axios.post<AxiosResponse>('/todo', { title: title }, { headers: { token: token } } )
                .then(res => {
                    if (res.status === 200 && res.data.todo) {
                        let todo = res.data.todo;
                        setTodos([...todos, todo]);
                        setTitle("");
                    }
                });
        }
    }

    return (
        <div>
            <h1 className="font-bold text-green-400 text-center text-xl mb-10">My Todos Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center mb-16 justify-center">
                    <input className="w-full border border-gray-400 p-2 mr-4 rounded-md" type="text" placeholder="add todo" onChange={e => setTitle(e.target.value)} value={title} />
                    <button className="py-2 px-3 bg-green-400 text-white rounded-md">Add</button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm