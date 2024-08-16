import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const ProductCards = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const fetchProducts = async () => {
        const response = await axios.get(`http://localhost:5000/products?page=${page}&limit=10&search=${search}`);
        return response.data;
    };


    const { data, isLoading, error } = useQuery({ queryKey: ['Products', {page, search}], queryFn: fetchProducts });

    if (isLoading) return (
        <div>
            <Skeleton height={100} width={100} />
            <Skeleton count={3} />
        </div>
    );

    if (error) return <p>Error: {error.message}</p>;

    // Filter and sort products based on selected options
    const filteredProducts = data.products.filter((product) => {
        const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
        const priceMatch = selectedPriceRange ? product.price <= parseInt(selectedPriceRange) : true;
        const brandMatch = brandFilter ? product.brand.includes(brandFilter) : true;
        return categoryMatch && priceMatch && brandMatch;
    });

    const sortedProducts = filteredProducts.slice().sort((a, b) => {
        if (sortOption === 'priceLowHigh') {
            return a.price - b.price;
        } else if (sortOption === 'priceHighLow') {
            return b.price - a.price;
        } else if (sortOption === 'newest') {
            return new Date(b.dateAdded) - new Date(a.dateAdded);
        } else {
            return 0;
        }
    });

    const handleBrandChange = (e) => {
        setBrandFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= Math.ceil(data.total / 10)) {
            setPage(newPage);
        }
    };

    return (
        <div className="py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#95D2B3] via-[#D8EFD3] to-[#55AD9B] min-h-screen">
            <div className="container mx-auto ">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">Our Products</h1>
                <div className="flex flex-wrap justify-between items-center mb-8">
                    {/* Category filter dropdown */}
                    <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
                        <label className="mr-2 font-medium text-lg text-gray-700">Filter by Category:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border px-3 py-2 rounded-md w-full"
                        >
                            <option value="">All Categories</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Smartphones">Smartphones</option>
                            <option value="Tablets">Tablets</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Smartwatches">Smartwatches</option>
                        </select>
                    </div>
                    {/* Brand filter dropdown */}
                    <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
                        <label className="mr-2 font-medium text-lg text-gray-700">Filter by Brand:</label>
                        <input
                            type="text"
                            value={brandFilter}
                            onChange={handleBrandChange}
                            className="p-2 border rounded w-full"
                            placeholder="Enter brand"
                        />
                    </div>
                    {/* Price filter dropdown */}
                    <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
                        <label className="mr-2 font-medium text-lg text-gray-700">Filter by Price:</label>
                        <select
                            value={selectedPriceRange}
                            onChange={(e) => setSelectedPriceRange(e.target.value)}
                            className="border px-3 py-2 rounded-md w-full"
                        >
                            <option value="">All Prices</option>
                            <option value="100">Under $100</option>
                            <option value="500">Under $500</option>
                        </select>
                    </div>
                    {/* Sort buttons */}
                    <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
                        <label className="mr-2 font-medium text-lg text-gray-700">Sort by:</label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border px-3 py-2 rounded-md w-full"
                        >
                            <option value="">None</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                            <option value="newest">Date Added: Newest First</option>
                        </select>
                    </div>
                    {/* Search input */}
                    <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
                        <label className="mr-2 font-medium text-lg text-gray-700">Search:</label>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            className="p-2 border rounded w-full"
                            placeholder="Search products..."
                        />
                    </div>
                    {/* Pagination buttons */}
                    <div className="w-full flex justify-end mb-4">
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-4 py-2 mr-2 bg-gray-200 rounded">Previous</button>
                        <button onClick={() => handlePageChange(page + 1)} className="px-4 py-2 bg-gray-200 rounded">Next</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto w-fit">
                    {sortedProducts.map((product) => (
                        <div key={product._id} className="card bg-[#F1F8E8] w-96 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{product.name}</h2>
                                <p>{product.description}</p>
                                <p className="font-bold text-xl">$ {product.price}</p>
                                <p>Rating: {product.ratings}</p>
                                <div className="card-actions">
                                    <button className="btn bg-[#55AD9B] text-white">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCards;
