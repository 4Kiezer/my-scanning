// src/components/Dashboard.js
import React from 'react';
import ScanComponent from './ScanComponent';

function Dashboard({ user }) {
    return (
        <div>
            <h2>Welcome, {user.username}</h2>

            <div>
                <h3>User Info</h3>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>

            <ScanComponent userId={user.id} />

            <div>
                <h3>Help</h3>
                <p>F1: Help option 1</p>
                <p>F2: Help option 2</p>
                <p>F3: Help option 3</p>
                <p>F4: Help option 4</p>
            </div>
        </div>
    );
}

export default Dashboard;