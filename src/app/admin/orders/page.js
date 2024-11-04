"use client";

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const accessToken = Cookies.get('accessToken');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log("Access Token:", accessToken);

                const response = await fetch('http://192.168.0.117:3001/orders', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                });

                console.log("Response status:", response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Response error body:", errorText);
                    throw new Error('Failed to fetch orders');
                }

                // Parse JSON only once
                const data = await response.json();
                setOrders(data);
                console.log("Fetched orders:", data);

            } catch (err) {
                setError(err.message);
                console.error("Error fetching orders:", err);
            }
        };

        fetchOrders();
    }, []);

    const acceptOrder = async (orderId) => {
        try {
            const response = await fetch(`http://192.168.0.117:3001/orders/${orderId}/accept`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to accept order: ${errorText}`);
            }

            const updatedOrder = await response.json();
            console.log('Order accepted:', updatedOrder);
            setOrders(orders.map(order => order._id === orderId ? updatedOrder : order));
            alert("Order accepted!");

        } catch (err) {
            console.error("Error accepting order:", err);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://192.168.0.117:3001/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete order: ${errorText}`);
            }

            setOrders(orders.filter(order => order._id !== orderId));
            console.log('Order deleted:', orderId);
            alert("Order deleted!");


        } catch (err) {
            console.error("Error deleting order:", err);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
            {error && <p className="text-red-500">{error}</p>}

            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Customer</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Total</th>
                        <th className="border px-4 py-2">Actions</th>
                        <th className="border px-4 py-2">Accept</th>
                        <th className="border px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td className="border px-4 py-2">{order.owner}</td>
                            <td className="border px-4 py-2">{order.status}</td>
                            <td className="border px-4 py-2">{order.total}$</td>

                            <td className="border px-4 py-2">
                                <button className="text-blue-500" onClick={() => console.log('View Details')}>View Details</button>
                            </td>

                            <td className="border px-4 py-2">
                                <button className="text-green-500" onClick={() => acceptOrder(order._id)}>Accept</button>
                            </td>
                            <td className="border px-4 py-2">
                                <button className="text-red-500" onClick={() => deleteOrder(order._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;

