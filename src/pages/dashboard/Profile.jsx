
import { BadgeCheck, BellRing, Mail, MapPin, Phone } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Profile = () => {
    const { user } = useContext(AuthContext);

    const profileItems = [
        { label: "Email address", value: user?.email || "No email available", icon: <Mail size={18} /> },
        { label: "Phone number", value: user?.phone_number || "Not set", icon: <Phone size={18} /> },
        { label: "Address", value: user?.address || "No address added", icon: <MapPin size={18} /> },
    ];

    return (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[30px] bg-slate-900 p-8 text-slate-100 shadow-2xl shadow-slate-900/15">
                <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-2xl font-bold text-emerald-200">
                        {(user?.first_name || user?.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">
                        Account active
                    </div>
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    Operator profile
                </p>
                <h2 className="section-heading mt-2 text-3xl font-bold text-white">
                    {`${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "Security Operator"}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                    Manage your account details and keep the operator profile current for better coordination inside the monitoring dashboard.
                </p>
                <div className="mt-8 rounded-[24px] border border-cyan-400/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3">
                        <BadgeCheck size={18} className="text-emerald-300" />
                        <p className="font-semibold text-cyan-100">Verified access session</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                        Your account is ready to manage alerts, cameras, and system health updates.
                    </p>
                </div>
            </section>

            <section className="space-y-4 rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Profile details</p>
                        <h3 className="section-heading mt-2 text-2xl font-bold text-slate-900">Operator information</h3>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                        <BellRing size={18} />
                    </div>
                </div>

                {profileItems.map(({ label, value, icon }) => (
                    <article key={label} className="flex items-start gap-4 rounded-[24px] bg-slate-50 p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                            {icon}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500">{label}</p>
                            <p className="mt-1 text-base font-semibold text-slate-900">{value}</p>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default Profile;
