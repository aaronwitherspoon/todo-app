import React from 'react'

function Logout() {
    return (
        <p onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
        }} className="cursor-pointer">Logout</p>
    )
}

export default Logout
