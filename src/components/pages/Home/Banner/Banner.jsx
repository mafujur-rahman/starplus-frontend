
const Banner = () => {
    return (
        <div className="relative bg-cover bg-center h-96 bg-[#95D2B3]" >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-4xl font-bold">Welcome to Our Star Plus Store</h1>
                <p className="mt-4 text-lg">Discover a wide range of products with detailed information and reviews.</p>
                <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                    Shop Now
                </button>
            </div>
        </div>
    );
};

export default Banner;