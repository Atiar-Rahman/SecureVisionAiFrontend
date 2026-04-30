import { useContext, useEffect, useState } from "react";
import { BellRing, LogOut, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Loading from "../Error&loading/Loading";

const themes = ["light", "cupcake", "corporate", "emerald", "winter", "retro"];
const defaultTheme = themes[0];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [themeIndex, setThemeIndex] = useState(() => {
        const savedTheme = localStorage.getItem("app-theme");
        const savedIndex = themes.indexOf(savedTheme || defaultTheme);
        return savedIndex >= 0 ? savedIndex : 0;
    });

    useEffect(() => {
        const activeTheme = themes[themeIndex] || defaultTheme;
        document.documentElement.setAttribute("data-theme", activeTheme);
        localStorage.setItem("app-theme", activeTheme);
    }, [themeIndex]);

    const changeTheme = () => {
        const nextIndex = (themeIndex + 1) % themes.length;
        setThemeIndex(nextIndex);
    };

    const {
        user,
        loading,
        logoutUser,
    } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    const handleLogout = async () => {
        try {
            logoutUser();
        } catch (err) {
            console.log(err);
        }
    };

    const linkClass = ({ isActive }) =>
        `cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            isActive
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
        }`;

    const navlinks = (
        <>
            <li>
                <NavLink to="/" className={linkClass}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            </li>
            <li>
                <button
                    onClick={changeTheme}
                    className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-white hover:text-slate-900"
                    title={`Current theme: ${themes[themeIndex]}`}
                >
                    Theme
                </button>
            </li>
            <li>
                <NavLink to="/detection" className={linkClass}>Detection</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            </li>
        </>
    );

    return (
        <header className="sticky top-0 z-30 py-4">
            <div className="glass-panel rounded-[28px] px-4 py-3 sm:px-6">
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-lg font-bold tracking-tight text-slate-900">SecureVisionAI</p>
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Smart surveillance</p>
                        </div>
                    </Link>

                    <nav className="hidden flex-1 justify-center lg:flex">
                        <ul className="flex items-center gap-2 rounded-full bg-slate-100/70 p-2">
                            {navlinks}
                        </ul>
                    </nav>

                    <div className="ml-auto hidden items-center gap-3 lg:flex">
                        <div className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-right">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Security status</p>
                            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                <BellRing size={14} />
                                Monitoring active
                            </p>
                        </div>

                        {user ? (
                            <>
                                <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                                    {user.first_name || user.email || "Operator"}
                                </div>
                                <button
                                    className="cursor-pointer flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5"
                            >
                                <Sparkles size={16} />
                                Get Started
                            </Link>
                        )}
                    </div>

                    <button
                        className="cursor-pointer ml-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-slate-800 lg:hidden"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        {menuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
                {menuOpen && (
                    <div className="mt-4 rounded-[24px] border border-slate-200 bg-white/90 p-4 lg:hidden">
                        <ul className="space-y-2">{navlinks}</ul>
                        <div className="mt-4 border-t border-slate-200 pt-4">
                            {user ? (
                                <button
                                    className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/register"
                                    className="block rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white"
                                >
                                    Create Account
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
