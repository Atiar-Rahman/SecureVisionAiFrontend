/* eslint-disable no-unused-vars */
import React from "react";
import { Headset, Mail, MapPin, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <section className="py-8 sm:py-10">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <motion.div
                    className="rounded-[32px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/15"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                        <Headset size={16} />
                        Support team
                    </div>
                    <h1 className="section-heading mt-6 text-4xl font-bold sm:text-5xl">
                        Let’s plan a sharper surveillance workflow.
                    </h1>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">
                        Reach out for deployment help, camera setup questions, or product guidance. We’ll help you design a monitoring experience that feels reliable and operator-friendly.
                    </p>
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                            <Mail size={18} className="text-emerald-300" />
                            <span>support@securevisionai.local</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                            <PhoneCall size={18} className="text-emerald-300" />
                            <span>+880 SecureVision Hotline</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                            <MapPin size={18} className="text-emerald-300" />
                            <span>Remote-first deployment and operations support</span>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    className="glass-panel rounded-[32px] p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Send a message</p>
                        <h2 className="section-heading mt-2 text-3xl font-bold text-slate-900">Tell us what you’re building</h2>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-600">Your name</span>
                            <input
                                type="text"
                                id="name"
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                                placeholder="Jane Doe"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-600">Email</span>
                            <input
                                type="email"
                                id="email"
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                                placeholder="you@company.com"
                            />
                        </label>
                    </div>

                    <label className="mt-5 block">
                        <span className="mb-2 block text-sm font-semibold text-slate-600">Message</span>
                        <textarea
                            id="message"
                            rows="6"
                            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                            placeholder="Share your cameras, alert workflow, or support request."
                        ></textarea>
                    </label>

                    <motion.button
                        type="submit"
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
