import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Loading from "../Error&loading/Loading";

const themes = ["light", "dark", "cupcake","synthwave","coffee","retro","aqua","deacula"];

const Navbar = () => {

    const [themeIndex, setThemeIndex] = useState(0);

    const changeTheme = () => {
        const nextIndex = (themeIndex + 1) % themes.length;
        setThemeIndex(nextIndex);
        document.documentElement.setAttribute("data-theme", themes[nextIndex]);
    };

    const { user,
        loading,
        logoutUser, } = useContext(AuthContext)

    if(loading){
        return <Loading/>
    }

    const handleLogout=async()=>{
        try{
            logoutUser()
        }catch(err){
            console.log(err)
        }
    }

    const navlinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition-all duration-200 font-medium btn btn-outline ${isActive
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-base-200 hover:text-primary"
                        }`
                    }
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition-all duration-200 font-medium ${isActive
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-base-200 hover:text-primary"
                        }`
                    }
                >
                    Contact
                </NavLink>
            </li>

            <li>
                <button
                    onClick={changeTheme}
                    className="px-3 py-2 font-medium rounded-lg text-gray-600 hover:bg-base-200 hover:text-primary transition-all duration-200"
                >
                    Theme
                </button>
            </li>
            <li>
                <NavLink
                    to="/detection"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition-all duration-200 font-medium ${isActive
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-base-200 hover:text-primary"
                        }`
                    }
                >
                    Detection
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition-all duration-200 font-medium ${isActive
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-base-200 hover:text-primary"
                        }`
                    }
                >
                    Dashboard
                </NavLink>
            </li>
        </>
    );
    return (
        <div className="navbar bg-base-100 shadow-md px-4">

            {/* Navbar Start */}
            <div className="navbar-start">

                {/* Mobile menu */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        ☰
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                    >
                        {navlinks}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-primary">
                    SecureVisionAI
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-2 px-1">
                    {navlinks}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">

                {user ? (
                    <Link>
                        <button className="btn btn-outline btn-error" onClick={handleLogout}>
                            LogOut
                        </button>
                    </Link>
                ) : (
                    <Link to="/register">
                        <button className="btn btn-primary">
                            Sign Up
                        </button>
                    </Link>
                )}

            </div>

        </div>
    );
};

export default Navbar;