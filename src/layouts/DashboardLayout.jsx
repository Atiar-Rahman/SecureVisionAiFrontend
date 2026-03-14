import React from 'react';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import MenuItems from '../routes/MenuItems';


const DashboardLayout = () =>  {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed md:static top-0 left-0 h-screen w-64 shadow-lg z-50
          transform transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
            >
                {/* Sidebar Header */}
                <div className="p-5 text-2xl font-bold border-b flex justify-between items-center">
                    User Panel
                    <button className="md:hidden" onClick={() => setIsOpen(false)}>
                        <X />
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <MenuItems/>
                </nav>

                {/* Sidebar Bottom */}
                <div className="p-4 border-t">
                    <button className="w-full flex items-center gap-2 text-red-600 hover:text-red-800">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full">

                {/* Navbar */}
                <header className="shadow p-4 flex items-center justify-between">
                    <button
                        className="md:hidden mr-4"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu />
                    </button>
                    <h1 className="text-xl font-semibold">User Dashboard</h1>
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="user"
                        className="w-10 h-10 rounded-full"
                    />
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="p-6 rounded-lg shadow">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;