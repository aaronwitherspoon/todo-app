import React from 'react'
import Logout from './auth/Logout'

function Navbar() {
    return (
        <div className="flex justify-between bg-green-400 p-8 text-white">
            <p className="font-bold text-lg">Todo</p>
            <Logout />
        </div>
    )
}

export default Navbar
