"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const [updatedProduct, setUpdatedProduct] = useState({});

    const [newProduct, setNewProduct] = useState({
        name: '',
        gallery: '',
        price: 0,
        stock: 0,
        rating: 0.0,
        likes: 0,
        reviews: 0,
        description: '',
        modelName: ''
    });

    const [showAddForm, setShowAddForm] = useState(false);

    const accessToken = Cookies.get('accessToken');
    console.log("Access Token:", accessToken);


    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://192.168.0.117:3001/products', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                console.log("Fetched Products:", data.products);
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
            console.log("Deleting product with ID:", id);
            const response = await fetch(`http://192.168.0.117:3001/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete product: ${errorText}`);
            }

            setProducts(products.filter(product => product._id !== id));
            alert('Product deleted successfully!');
        } catch (error) {
            console.error("Failed to delete product", error);
            alert(error.message);
        }
    };


    const handleEdit = (product) => {
        setEditingProduct(product);
        setUpdatedProduct({ ...product });
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };


    const handleEditSubmit = async (e) => {
        e.preventDefault();

        console.log("Updated Product Data:", updatedProduct);
        console.log("Access Token:", accessToken);

        const productToUpdate = {
            ...updatedProduct,
            stock: updatedProduct.stock !== undefined ? updatedProduct.stock : 0, // Ensure stock is included
        };

        try {
            const response = await fetch(`http://192.168.0.117:3001/products/update/${updatedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(productToUpdate),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to edit product: ${errorText}`);
            }

            const updated = await response.json();
            setProducts(products.map(product => (product._id === updated._id ? updated : product)));
            setEditingProduct(null);
            alert('Product updated successfully!');
        } catch (error) {
            console.error("Failed to update product", error);
            alert(error.message);
        }
    };




    const handleAddProduct = async (e) => {
        e.preventDefault();

        console.log("New Product Data:", newProduct);
        console.log("Access Token before add:", accessToken);

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

            setProducts((prevProducts) => [...prevProducts, createdProduct]);

            setNewProduct({
                name: '',
                gallery: '',
                price: 0,
                description: '',
                modelName: '',
                stock: 0.0
            });


            setShowAddForm(false);
            console.log('Product added:', createdProduct);
            alert("Product Added!");
        } catch (error) {
            alert(error.message);
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
                <form onSubmit={handleAddProduct} className="mb-6 bg-lime-200 p-4 border rounded-md">
                    <h2 className="text-xl font-bold mb-4">Add New Product</h2>

                    <label className="block mb-2 font-bold" htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        required
                    />

                    <label className="block mb-2" htmlFor="gallery">Image URL</label>
                    <input
                        id="gallery"
                        type="text"
                        placeholder="Enter gallery URL"
                        value={newProduct.gallery}
                        onChange={(e) => setNewProduct({ ...newProduct, gallery: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        required
                    />

                    <label className="block mb-2" htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="Enter product price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        required
                    />

                    <label className="block mb-2" htmlFor="stock">Stock</label>
                    <input
                        id="stock"
                        type="number"
                        placeholder="Enter stock quantity"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        required
                    />

                    <label className="block mb-2" htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Enter product description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        required
                    />

                    <label className="block mb-2" htmlFor="modelName">Model Name</label>
                    <input
                        id="modelName"
                        type="text"
                        placeholder="Enter model name"
                        value={newProduct.modelName}
                        onChange={(e) => setNewProduct({ ...newProduct, modelName: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        required
                    />

                    <button type="submit" className="bg-green-500 text-white rounded-md p-2 w-full">
                        Add Product
                    </button>
                </form>
            )}



            {editingProduct && (
                <form onSubmit={handleEditSubmit} className="mb-6 max-w-lg mx-auto bg-lime-200 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>

                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={updatedProduct.name || ''}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />

                    <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={updatedProduct.image || ''}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />

                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                        type="number"
                        placeholder="Price"
                        value={updatedProduct.price || 0}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />

                    <label className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
                    <input
                        type="number"
                        placeholder="Stock Quantity"
                        value={updatedProduct.stock || 0}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock: parseInt(e.target.value) })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />

                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        placeholder="Product Description"
                        value={updatedProduct.description}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full h-20 resize-none"
                    />

                    <label className="block text-gray-700 text-sm font-bold mb-2">Model Name</label>
                    <input
                        type="text"
                        placeholder="Model Name"
                        value={updatedProduct.modelName}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, modelName: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />

                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="bg-red-500 text-white rounded-md p-2 w-1/2 font-semibold hover:bg-gray-600 transition duration-300 mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-md p-2 w-1/2 font-semibold hover:bg-blue-600 transition duration-300"
                        >
                            Update Product
                        </button>
                    </div>
                </form>

            )}

            <table className="min-w-full bg-white border mb-10">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Rating</th>
                        <th className="border px-4 py-2">Reviews</th>
                        <th className="border px-4 py-2">Likes</th>
                        <th className="border px-4 py-2">Stock</th>
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
                            <td className="border px-4 py-2">{product.stock}</td>

                            <td className="border px-1 py-2 flex justify-center items-center">
                                <button onClick={() => handleEdit(product)} className="text-blue-500 ml-4">Edit</button>

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