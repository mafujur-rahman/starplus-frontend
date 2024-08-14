import { NavLink } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="bg-[#a29bfe] ">
            <div className="container mx-auto py-6 flex justify-between items-center">
            <h1 className="text-4xl font-bold">Star Plus</h1>
                <ul className=" flex justify-center items-center gap-10 text-xl font-medium text-white">
                    <li><NavLink to="/login"><button>Login</button></NavLink></li>
                    <li><NavLink to="/register"><button>Register</button></NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;