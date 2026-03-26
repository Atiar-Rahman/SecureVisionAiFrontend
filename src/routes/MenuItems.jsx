
import { NavLink } from "react-router-dom";
import { User, Settings, CreditCard } from "lucide-react";


const MenuItems = () => {
    return (
        <div>
            <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded hover:bg-gray-500 transition ${isActive ? "bg-gray-300 font-semibold" : ""
                    }`
                }
            >
                <User size={18} />
                Profile
            </NavLink>
            <NavLink
                to="/dashboard/add-camera"
                className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded hover:bg-gray-500 transition ${isActive ? "bg-gray-300 font-semibold" : ""
                    }`
                }
            >
                <User size={18} />
                Add Camera
            </NavLink>
            <NavLink
                to="/dashboard/camera-list"
                className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded hover:bg-gray-500 transition ${isActive ? "bg-gray-300 font-semibold" : ""
                    }`
                }
            >
                <User size={18} />
                Camera List
            </NavLink>
            <NavLink
                to="/dashboard/detect"
                className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded hover:bg-gray-500 transition ${isActive ? "bg-gray-300 font-semibold" : ""
                    }`
                }
            >
                <User size={18} />
                UserCameraDetect
            </NavLink>

            <NavLink
                to="/dashboard/detection"
                className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded hover:bg-gray-500 transition ${isActive ? "bg-gray-300 font-semibold" : ""
                    }`
                }
            >
                <CreditCard size={18} />
                Detection
            </NavLink>
            <NavLink
                to="/dashboard/alert-show"
                className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded hover:bg-gray-500 transition ${isActive ? "bg-gray-300 font-semibold" : ""
                    }`
                }
            >
                <CreditCard size={18} />
                Alert Show
            </NavLink>

            <NavLink
                to="/user/settings"
                className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded hover:bg-gray-500 transition ${isActive ? "bg-gray-300 font-semibold" : ""
                    }`
                }
            >
                <Settings size={18} />
                Settings
            </NavLink>
        </div>
    );
};

export default MenuItems;