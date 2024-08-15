// client/src/components/ProductForm.js
import axios from 'axios';
import { useState } from 'react';

function ProductForm() {
    const [productData, setProductData] = useState({
        name: '',
        image: '',
        description: '',
        price: '',
        category: '',
        ratings: '',
        createdAt: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form submission logic here
        console.log(productData);
        axios.post('http://localhost:5000/products', productData)
        .then(res =>{
            console.log(res.data);
        })
        .then(error =>{
            console.error(error)
        })
    };

    return (
        <div className='bg-[#D8EFD3] p-10'>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto  p-8 bg-[#F1F8E8] rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={productData.image}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Ratings</label>
                    <input
                        type="number"
                        name="ratings"
                        value={productData.ratings}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Creation Date and Time</label>
                    <input
                        type="datetime-local"
                        name="createdAt"
                        value={productData.createdAt}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-[#55AD9B] text-white px-4 py-2 rounded ">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ProductForm;
