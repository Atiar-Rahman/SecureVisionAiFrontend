
import { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {

    // eslint-disable-next-line react-hooks/purity
    const [num1] = useState(Math.floor(Math.random() * 10));
    // eslint-disable-next-line react-hooks/purity
    const [num2] = useState(Math.floor(Math.random() * 10));

    const [captcha, setCaptcha] = useState("");
    const {register,handleSubmit} = useForm();
    const { 
        loginUser, 
    } = useContext(AuthContext)

    const nevigate = useNavigate()

    const onSubmit = async (data) => {
        if (parseInt(captcha) !== num1 + num2) {
            alert("Wrong captcha");
            return;
        }

        const success = await loginUser(data); // make loginUser return true/false
        if (success) {
            Swal.fire({
                title: "Logged In!",
                text: "Welcome back!",
                icon: "success"
            });
            nevigate('/') 
        } else {
            Swal.fire({
                title: "Oops!",
                text: "Invalid credentials",
                icon: "error"
            });
            nevigate('/signin')
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  relative">

            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            {/* LOGIN CARD */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-10 md:w-100 lg:w-125 border border-white/20 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
            >

                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    SignIn your Existing Accounts
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* EMAIL */}
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
                        required
                    />
                    
                    {/* PASSWORD */}
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
                        required
                    />

                    {/* CAPTCHA */}
                    <div className="text-white font-semibold">
                        Solve: {num1} + {num2}
                    </div>

                    <input
                        type="text"
                        placeholder="Enter captcha answer"
                        value={captcha}
                        onChange={(e) => setCaptcha(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
                        required
                    />

                    {/* BUTTON */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg shadow-lg"
                    >
                        SignIn
                    </motion.button>

                </form>
                <p className="text-white mt-10">
                    Don't have an account? <Link to='/register' className="underline ml-2">Register</Link>
                </p>
                </motion.div>
        </div>
    );
};

export default SignIn;