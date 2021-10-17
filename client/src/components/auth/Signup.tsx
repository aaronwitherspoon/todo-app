import React, { FormEvent, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';

interface SignupProps {
    renderLogin: () => void;
}

function Signup({renderLogin}: SignupProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        axios.post<AxiosResponse>('/signup', {
                username: username,
                password: password
            }).then(res => {
                if (res.status === 200) {
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
            });
    }

    useEffect(() => {
        if (password.length > 0) {
            password === confirmPassword ? setIsDisabled(false) : setIsDisabled(true);
        }
        else setIsDisabled(true);
    }, [password, confirmPassword])

    return (
        <div style={{height: '300px'}}>
            <form onSubmit={handleSubmit}>
                <h1 className="text-green-400 text-center font-bold">Sign Up</h1>
                <div className="mb-4">
                    <label>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="text" placeholder="username"></input>
                </div>
                <div className="mb-4">
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="password"></input>
                </div>
                <div className="mb-4">
                    <label>Confirm Password</label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="confirm password"></input>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p>Have an account? <span className="text-green-400 cursor-pointer" onClick={renderLogin}>Log in here</span></p>
                    </div>
                    <button className={`px-6 py-3 rounded-lg font-bold text-white ${isDisabled ? "bg-gray-400" : "bg-green-400"}`} type="submit" disabled={isDisabled}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
