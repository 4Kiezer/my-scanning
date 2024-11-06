// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData); // Store user details after successful login
    };

    return (
        <div>
            {user ? (
                <Dashboard user={user} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;