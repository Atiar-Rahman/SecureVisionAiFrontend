/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <section className="bg-base-100 dark:bg-gray-900 min-h-screen flex items-center justify-center py-20">
            <div className="max-w-4xl w-full mx-auto px-6">

                {/* Animated Heading */}
                <motion.h1
                    className="text-4xl sm:text-5xl font-bold text-center mb-12 text-primary dark:text-primary-content"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    Contact Us
                </motion.h1>

                {/* Contact Form */}
                <motion.form
                    className="bg-base-200 dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {/* Name */}
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            className="peer w-full border border-gray-300 dark:border-gray-600 rounded-md p-4 pt-10 text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-primary dark:focus:border-primary transition"
                            placeholder="Your Name"
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-4 top-4 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary dark:peer-focus:text-primary"
                        >
                            Your Name
                        </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            className="peer w-full border border-gray-300 dark:border-gray-600 rounded-md p-4 pt-10 text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-primary dark:focus:border-primary transition"
                            placeholder="Your Email"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-4 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary dark:peer-focus:text-primary"
                        >
                            Your Email
                        </label>
                    </div>

                    {/* Message */}
                    <div className="relative">
                        <textarea
                            id="message"
                            rows="5"
                            className="peer w-full border border-gray-300 dark:border-gray-600 rounded-md p-4 pt-10 text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-primary dark:focus:border-primary transition resize-none"
                            placeholder="Your Message"
                        ></textarea>
                        <label
                            htmlFor="message"
                            className="absolute left-4 top-4 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary dark:peer-focus:text-primary"
                        >
                            Your Message
                        </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="btn btn-primary w-full py-4 text-lg font-semibold rounded-md hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;