/* eslint-disable react-hooks/purity */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import AuthContext from '../../context/AuthContext';

const Register = () => {

    // CAPTCHA
    const [num1, setNum1] = useState(Math.floor(Math.random() * 10));
    const [num2, setNum2] = useState(Math.floor(Math.random() * 10));
    const [captcha, setCaptcha] = useState("");

    const regenerateCaptcha = () => {
        setNum1(Math.floor(Math.random() * 10));
        setNum2(Math.floor(Math.random() * 10));
        setCaptcha('');
    };

    const { register, handleSubmit, reset } = useForm();
    const {registerUser} = useContext(AuthContext)
    const onSubmit = async(data) => {

        // CAPTCHA VALIDATION
        if (parseInt(captcha) !== num1 + num2) {
            Swal.fire({
                icon: "error",
                title: "Wrong Captcha",
                text: "Please try again!"
            });
            regenerateCaptcha();
            return;
        }

        // PASSWORD MATCH VALIDATION
        if (data.password !== data.confirm_password) {
            Swal.fire({
                icon: "error",
                title: "Password Error",
                text: "Passwords do not match!"
            });
            return;
        }
        delete data.confirm_password
        // SUCCESS (replace with API later)
        console.log("Register Data:", data);
        
        const success = await registerUser(data)

        if (success) {
            Swal.fire({
                icon: "success",
                title: "Registered Successfully!",
                text: "Now you can login"
            });

            reset();
            regenerateCaptcha();
        } else {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Something went wrong!"
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">

            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            {/* CARD */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-10 md:w-100 lg:w-125 border border-white/20 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
            >

                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Create a New Account
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

                    {/* NAME */}
                    <input
                        type="text"
                        placeholder="First Name"
                        {...register('first_name')}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        {...register('last_name')}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
                    />

                    {/* EXTRA INFO */}
                    <input
                        type="text"
                        placeholder="Phone Number"
                        {...register('phone_number')}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        {...register('address')}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
                    />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register('confirm_password')}
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
                        Register
                    </motion.button>

                </form>

                <p className="text-white mt-10 text-center">
                    Already have an account?{" "}
                    <Link to='/signin' className='underline font-bold ml-2'>
                        Sign In
                    </Link>
                </p>

            </motion.div>
        </div>
    );
};

export default Register;