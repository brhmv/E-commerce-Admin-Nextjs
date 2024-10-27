"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        image: '',
        price: 0,
        rating: 0,
        likes: 0,
        reviews: 0,
        description: '',
        modelName: ''
    });
    const [showAddForm, setShowAddForm] = useState(false);

    const accessToken = Cookies.get('accessToken');



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://192.168.0.117:3001/products', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://192.168.0.117:3001/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://192.168.0.117:3001/products/${updatedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to edit product');
            }

            const updated = await response.json();
            setProducts(products.map(product => (product._id === updated._id ? updated : product)));
        } catch (error) {
            console.error("Failed to update product", error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        console.log(newProduct);

        console.log(accessToken);

        try {
            const response = await fetch('http://192.168.0.117:3001/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newProduct),
            });


            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            const createdProduct = await response.json();


            setProducts([...products, createdProduct]);

            setNewProduct({
                name: '',
                image: '',
                price: 0,
                rating: 0,
                likes: 0,
                reviews: 0,
                description: '',
                modelName: ''
            });

            setShowAddForm(false);
            console.log('Product added:', newProduct);
            alert("Product Added!");
        } catch (error) {
            alert(error.message)
            console.error("Failed to add product", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

            <div className="mb-4">
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-blue-500 text-white rounded-md p-2">
                    {showAddForm ? 'Hide Add Product Form' : 'Add New Product'}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleAddProduct} className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Model Name"
                        value={newProduct.modelName}
                        onChange={(e) => setNewProduct({ ...newProduct, modelName: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <button type="submit" className="bg-green-500 text-white rounded-md p-2 w-full">
                        Add Product
                    </button>
                </form>
            )}

            {editingProduct && (
                <form onSubmit={handleEditSubmit} className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Rating"
                        value={editingProduct.rating}
                        onChange={(e) => setEditingProduct({ ...editingProduct, rating: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Likes"
                        value={editingProduct.likes}
                        onChange={(e) => setEditingProduct({ ...editingProduct, likes: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Reviews"
                        value={editingProduct.reviews}
                        onChange={(e) => setEditingProduct({ ...editingProduct, reviews: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Model Name"
                        value={editingProduct.modelName}
                        onChange={(e) => setEditingProduct({ ...editingProduct, modelName: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-full">
                        Update Product
                    </button>
                </form>
            )}

            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Rating</th>
                        <th className="border px-4 py-2">Reviews</th>
                        <th className="border px-4 py-2">Likes</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">${product.price}</td>
                            <td className="border px-4 py-2">{product.rating}</td>
                            <td className="border px-4 py-2">{product.reviews}</td>
                            <td className="border px-4 py-2">{product.likes}</td>

                            <td className="border px-1 py-2 flex justify-center items-center">
                                <button className="text-blue-500 ml-4">Edit</button>

                                <button onClick={() => handleDelete(product._id)} className="text-red-500 ml-4">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsPage;

















