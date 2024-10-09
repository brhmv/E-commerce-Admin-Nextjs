"use client";
import { useState } from 'react';

const ProductsPage = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Laptop', price: 999 },
        { id: 2, name: 'Phone', price: 599 },
    ]);

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">${product.price}</td>
                            <td className="border px-4 py-2">
                                <button className="text-blue-500">Edit</button>
                                <button onClick={() => handleDelete(product.id)} className="text-red-500 ml-4">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsPage;
