import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsGoogle } from "react-icons/bs";
import { Link } from "react-router-dom";


const Login = () => {
    const [showPassword,setShowPassword] = useState(false)

   const handleLogIn = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
    }
    const handleGoogleLogIn = () =>{

    }
    return (
        <div>
            <div className="hero  min-h-screen" style={{ backgroundImage: `url("/login-pic.png")` }}>
                <div className="hero-content flex-col">
                    <h3 className="text-center text-3xl  font-extrabold text-white">Login Here </h3>
                    <div className="card shrink-0 w-full md:w-[400px] shadow-2xl shadow-black">
                        <form onSubmit={handleLogIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} placeholder="Enter your password" name="password" className="input input-bordered w-full" required />
                                    <span className="absolute top-4 right-3" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#074B5c] text-white border-none">Login</button>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-center text-white">Or</span>
                                </label>
                                <button onClick={handleGoogleLogIn} className="btn bg-orange-600 border-none text-white"> <BsGoogle /> Sign in with Google </button>
                            </div>
                            <p className="text-center text-white">Do not have an account?</p>
                            <Link to="/register"><p className="text-xl font-medium text-[#074B5c] underline text-center">Register</p></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;