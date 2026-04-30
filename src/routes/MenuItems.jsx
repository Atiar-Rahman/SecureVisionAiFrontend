import { NavLink } from "react-router-dom";
import { Activity, Camera, Home, Layers3, MessageSquareText, Siren, User } from "lucide-react";


const MenuItems = () => {
    const items = [
        { to: "/", icon: <Home size={18} />, label: "Home" },
        { to: "/dashboard/model-status", icon: <Activity size={18} />, label: "Model Status" },
        { to: "/dashboard/profile", icon: <User size={18} />, label: "Profile" },
        { to: "/dashboard/add-camera", icon: <Camera size={18} />, label: "Add Camera" },
        { to: "/dashboard/camera-list", icon: <Layers3 size={18} />, label: "Camera List" },
        { to: "/dashboard/contacts-user", icon: <MessageSquareText size={18} />, label: "Contact Inbox" },
        { to: "/dashboard/detect", icon: <Siren size={18} />, label: "Detection Feed" },
        { to: "/dashboard/detection", icon: <Camera size={18} />, label: "Detection Stream" },
        { to: "/dashboard/alert-show", icon: <Siren size={18} />, label: "Alert Center" },
        { to: "/dashboard/detection-skip", icon: <Activity size={18} />, label: "Detection Skip" },
        { to: "/dashboard/detection-3dcnn", icon: <Activity size={18} />, label: "3D CNN Detection" },
    ];

    return (
        <div className="space-y-1.5">
            {items.map(({ to, icon, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                            isActive
                                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
                                : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
                        }`
                    }
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
                        {icon}
                    </span>
                    <span>{label}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default MenuItems;
