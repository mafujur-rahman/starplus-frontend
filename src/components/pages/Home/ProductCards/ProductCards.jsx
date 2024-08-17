import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "lodash";
import { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const ProductCards = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce the search function
  const debounceSearch = debounce((value) => setDebouncedSearch(value), 500);

  const fetchProducts = async ({ queryKey }) => {
    const [, { page, debouncedSearch, selectedCategory, selectedBrand, sortOption }] = queryKey;
    const response = await axios.get('https://starplus-backend.vercel.app/products', {
      params: {
        page,
        limit: 9,
        search: debouncedSearch,
        category: selectedCategory,
        name: selectedBrand,
        sort: sortOption,
      }
    });
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['Products', { page, debouncedSearch, selectedCategory, selectedBrand, sortOption }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  const handleSearchClick = () => {
    debounceSearch(search);
  };

  const filteredProducts = useMemo(() => {
    if (!selectedPriceRange || selectedPriceRange === "all" || !data?.products) return data?.products || [];

    const [minPrice, maxPrice] = selectedPriceRange.split('-').map(price => parseFloat(price));
    return data.products.filter(product => {
      const productPrice = parseFloat(product.price);
      return productPrice >= minPrice && productPrice <= maxPrice;
    });
  }, [selectedPriceRange, data?.products]);

  if (isLoading) return (
    <div>
      <Skeleton height={100} width={100} />
      <Skeleton count={3} />
    </div>
  );

  if (error) return <p>Error: {error.message}</p>;

  // Calculate total pages
  const totalPages = Math.ceil(data.total / 9);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Generate numbered page buttons
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`btn text-white ${page === i ? 'bg-blue-500 font-bold' : 'bg-[#55AD9B]'}`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#95D2B3] via-[#D8EFD3] to-[#55AD9B] min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">Our Products</h1>
        {/* Search input */}
        <div className="flex flex-col md:flex-row justify-center my-10">
          <div className="w-full md:w-1/2 lg:w-1/3 my-4 md:mb-0 flex justify-center items-center">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              className="p-2 border rounded w-full"
              placeholder="Search products..."
            />
            <button
              className="btn bg-[#4fcfb6] text-white ml-2 border-none"
              onClick={handleSearchClick}
            >
              <FaSearch /> Search
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center mb-8">
          {/* Category filter dropdown */}
          <div className="w-full md:w-1/2 lg:w-1/5 mb-4 md:mb-0">
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
          <div className="w-full md:w-1/2 lg:w-1/5 mb-4 md:mb-0">
            <label className="mr-2 font-medium text-lg text-gray-700">Filter by Brand:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            >
              <option value="">All Brands</option>
              {data.products.map((product, index) => (
                <option key={index} value={product.name}>{product.name}</option>
              ))}
            </select>
          </div>
          {/* Price filter dropdown */}
          <div className="w-full md:w-1/2 lg:w-1/5 mb-4 md:mb-0">
            <label className="mr-2 font-medium text-lg text-gray-700">Filter by Price:</label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            >
              <option value="all">All Prices</option>
              <option value="0-500">Under $500</option>
              <option value="0-1000">Under $1000</option>
            </select>
          </div>
          {/* Sort buttons */}
          <div className="w-full md:w-1/2 lg:w-1/5 mb-4 md:mb-0">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto w-fit">
          {filteredProducts.map((product) => (
            <div key={product._id} className="card bg-[#F1F8E8] w-full md:w-96 shadow-xl">
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
        {/* Pagination buttons */}
        <div className="flex flex-wrap justify-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            className={`btn text-white ${page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1d4983]'}`}
            disabled={page === 1}
          >
            Previous
          </button>
          {pageButtons}
          <button
            onClick={() => handlePageChange(page + 1)}
            className={`btn text-white ${page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1d4983]'}`}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
