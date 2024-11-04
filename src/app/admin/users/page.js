"use client";

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const accessToken = Cookies.get('accessToken');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://192.168.0.117:3001/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data.users);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, [accessToken]);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://192.168.0.117:3001/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }


            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));

            alert("User Deleted!");

        } catch (err) {
            setError(err.message);
            console.error("Error deleting user:", err);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
            {error && <p className="text-red-500">{error}</p>}
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">UserName</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">PasswordHash</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.passwordHash}</td>
                            <td className="border px-4 py-2">{user.isAdmin ? "admin" : "user"}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="text-red-500 ml-4"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default UsersPage;
