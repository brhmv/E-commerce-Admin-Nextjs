const OrdersPage = () => {
    const orders = [
        { id: 1, customer: 'John Doe', status: 'Processing', total: 199.99 },
        { id: 2, customer: 'Jane Doe', status: 'Shipped', total: 299.99 },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Customer</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Total</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="border px-4 py-2">{order.customer}</td>
                            <td className="border px-4 py-2">{order.status}</td>
                            <td className="border px-4 py-2">${order.total}</td>
                            <td className="border px-4 py-2">
                                <button className="text-blue-500">View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;