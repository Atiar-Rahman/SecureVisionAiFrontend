import React, { useContext } from 'react';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bell, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import MenuItems from '../routes/MenuItems';
import AuthContext from '../context/AuthContext';


const DashboardLayout = () =>  {
    const [isOpen, setIsOpen] = useState(false);
    const { logoutUser, user } = useContext(AuthContext);

    const handleLogout = async () => {
        await logoutUser();
    };


    return (
        <div className="app-shell flex min-h-screen overflow-hidden">
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`
                    glass-panel fixed left-0 top-0 z-50 flex h-screen w-72 flex-col rounded-none border-r
                    transform transition-transform duration-300 md:static md:translate-x-0 md:rounded-none
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-slate-900">Control Center</p>
                                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">SecureVisionAI</p>
                            </div>
                        </div>
                    </div>
                    <button className="rounded-xl p-2 text-slate-500 md:hidden" onClick={() => setIsOpen(false)}>
                        <X />
                    </button>
                </div>

                <div className="px-6 py-5">
                    <div className="rounded-[24px] bg-slate-900 p-4 text-white shadow-xl shadow-slate-900/15">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Logged in as</p>
                        <p className="mt-2 text-lg font-semibold">{user?.first_name || user?.email || "Security Operator"}</p>
                        <p className="mt-1 text-sm text-slate-300">Live monitoring workspace</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto px-4 pb-6">
                    <MenuItems />
                </nav>

                <div className="border-t border-slate-200 p-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 font-semibold text-rose-700 transition hover:bg-rose-100"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="px-4 pb-2 pt-4 sm:px-6">
                    <div className="glass-panel flex items-center justify-between rounded-[28px] px-5 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-slate-800 md:hidden"
                                onClick={() => setIsOpen(true)}
                            >
                                <Menu />
                            </button>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
                                <h1 className="section-heading text-2xl font-bold text-slate-900">Security Operations Hub</h1>
                            </div>
                        </div>
                        <div className="hidden items-center gap-3 md:flex">
                            <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                                Monitoring online
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                                <Bell size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
                    <div className="glass-panel min-h-full rounded-[32px] p-5 sm:p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
