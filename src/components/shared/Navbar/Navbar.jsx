import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";


const Navbar = () => {
    const {user, logout} = useContext(AuthContext);

    const handleLogout = () =>{
        logout()
        .then()
        .then()
    }
    return (
        <div className="bg-[#55AD9B] ">
            <div className="container mx-auto py-6 flex justify-between items-center">
            <h1 className="text-4xl font-bold">Star Plus</h1>
                <ul className=" flex justify-center items-center gap-10 text-xl font-medium text-white">
                    {
                        user ? 
                        <>
                        <li><button onClick={handleLogout}>Logout</button></li>
                        <li><NavLink to="/add-product"><button>Add Product</button></NavLink></li>

                        </>
                        :
                        <>
                        <li><NavLink to="/login"><button>Login</button></NavLink></li>
                        <li><NavLink to="/register"><button>Register</button></NavLink></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;