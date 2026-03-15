
import { NavLink } from "react-router-dom";
import { User, Settings, CreditCard } from "lucide-react";


const MenuItems = () => {
    return (
        <div>
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