import React, { FormEvent, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

declare module 'axios' {
    interface AxiosInstance {
      (config: AxiosRequestConfig): Promise<any>
    }
  }

interface LoginProps {
    renderSignup: () => void;
}

function Login({renderSignup}: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        axios.post<AxiosResponse>('/login', {
                username: username,
                password: password
            }).then(res => {
                if (res.status === 200) {
                    const token = res.data.token;
                    if (token) localStorage.setItem('token', token);
                    window.location.href = '/dashboard';
                } else {
                    
                }
            });
    }

    return (
        <div style={{height: '300px'}}>
            <form onSubmit={handleSubmit}>
                <h1 className="text-green-400 text-center font-bold">Login</h1>
                <div className="mb-4">
                    <label>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="text" placeholder="username"></input>
                </div>
                <div className="mb-4">
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="password"></input>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p>No account? <span className="text-green-400 cursor-pointer" onClick={renderSignup}>Sign up here</span></p>
                    </div>
                    <button className="px-6 py-3 rounded-lg font-bold bg-green-400 text-white">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
