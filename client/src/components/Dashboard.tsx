import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios, { AxiosResponse } from 'axios';
import TodoForm from './todo/TodoForm';
import TodoList, { Todo } from './todo/TodoList';

function Dashboard() {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get<AxiosResponse>('/todos', { headers: { token: token }})
                .then(res => {
                    if (res.data.todos) {
                        setTodoList(res.data.todos)
                    }
                });
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto pt-12">
                <TodoForm todos={todoList} setTodos={setTodoList} />
                <TodoList todos={todoList} setTodos={setTodoList} />
            </div>
        </div>
    )
}

export default Dashboard
