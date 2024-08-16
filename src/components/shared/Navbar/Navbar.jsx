import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {})
            .catch(error => console.error('Logout error:', error));
    };

    return (
        <div className="bg-[#55AD9B] py-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center px-4 md:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Star Plus
                </h1>
                <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-lg md:text-xl font-medium text-white">
                    {user ? (
                        <>
                            <li>
                                <button 
                                    onClick={handleLogout} 
                                    className="btn bg-[#4fcfb6] text-white py-2 px-4 rounded border-none hover:bg-[#3a9d8b]"
                                    aria-label="Logout"
                                >
                                    Logout
                                </button>
                            </li>
                            <li>
                                <NavLink 
                                    to="/add-product" 
                                    className="btn bg-[#4fcfb6] text-white py-2 px-4 rounded border-none hover:bg-[#3a9d8b]"
                                    aria-label="Add Product"
                                >
                                    Add Product
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink 
                                    to="/login" 
                                    className="btn bg-[#4fcfb6] text-white py-2 px-4 rounded border-none hover:bg-[#3a9d8b]"
                                    aria-label="Login"
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/register" 
                                    className="btn bg-[#4fcfb6] text-white py-2 px-4 rounded border-none hover:bg-[#3a9d8b]"
                                    aria-label="Register"
                                >
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
