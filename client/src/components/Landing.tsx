import React, { useState } from 'react';
import Login from './auth/Login';
import Signup from './auth/Signup';

function Landing() {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className="flex w-full h-screen">
            <div className="w-1/2 max-w-xs mx-auto items-center flex relative">
                <div className="absolute inset-0 m-auto" style={{height: '300px'}}>
                    {isSignup && <Signup renderLogin={() => setIsSignup(false)} /> || <Login renderSignup={() => setIsSignup(true)} />}
                </div>
            </div>
            <div className="w-1/2 bg-green-400">
                
            </div>
        </div>
    )
}

export default Landing;
