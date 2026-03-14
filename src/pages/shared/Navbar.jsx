import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

    const [dark, setDark] = useState(false)

    const toggleTheme = () => {
        const theme = dark ? "light" : "dark"
        document.documentElement.setAttribute("data-theme", theme)
        setDark(!dark)
    }

    const navLinks = ({ isActive }) =>
        `px-3 py-2 font-medium transition-all duration-300 border-b-2 ${isActive
            ? "border-primary text-primary"
            : "border-transparent hover:border-primary hover:text-primary"
        }`

    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-base-100/70 border-b border-base-300">

            <div className="navbar max-w-7xl mx-auto px-4">

                {/* Logo */}
                <div className="navbar-start">
                    <Link to="/" className="text-xl font-bold text-primary">
                        SecureVisionAI
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-3">

                        <li>
                            <NavLink to="/" className={navLinks}>
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/contact" className={navLinks}>
                                Contact
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard" className={navLinks}>
                                Dashboard
                            </NavLink>
                        </li>

                    </ul>
                </div>

                {/* Right Side */}
                <div className="navbar-end gap-3">

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost text-xl"
                    >
                        {dark ? "☀️" : "🌙"}
                    </button>

                    {/* User Avatar */}
                    <div className="dropdown dropdown-end">

                        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://i.pravatar.cc/150?img=3" />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link>Profile</Link>
                            </li>
                            <li>
                                <Link>Settings</Link>
                            </li>
                            <li>
                                <Link>Logout</Link>
                            </li>
                        </ul>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Navbar