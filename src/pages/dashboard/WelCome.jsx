import React, { useContext } from 'react';
import { Activity, Camera, ChartColumnBig, ShieldAlert } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const WelCome = () => {
    const { user } = useContext(AuthContext);

    const stats = [
        { label: 'Monitored feeds', value: '24', icon: <Camera size={20} />, tone: 'bg-emerald-50 text-emerald-700' },
        { label: 'Active detections', value: '03', icon: <ShieldAlert size={20} />, tone: 'bg-amber-50 text-amber-700' },
        { label: 'System health', value: '98%', icon: <Activity size={20} />, tone: 'bg-sky-50 text-sky-700' },
        { label: 'Response score', value: 'A+', icon: <ChartColumnBig size={20} />, tone: 'bg-slate-100 text-slate-700' },
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-[30px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/15">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">Operations overview</p>
                    <h2 className="section-heading mt-4 max-w-xl text-4xl font-bold">
                        Welcome back{user?.first_name ? `, ${user.first_name}` : ""}. Your command center is ready.
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                        Review model health, camera coverage, and recent incidents from a dashboard designed for fast decision-making.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">Live alerts enabled</div>
                        <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">Detection streaming active</div>
                    </div>
                </div>

                <div className="rounded-[30px] border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-900/5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Today’s priorities</p>
                    <div className="mt-5 space-y-4">
                        <div className="rounded-2xl bg-emerald-50 p-4">
                            <p className="font-semibold text-emerald-800">Check camera uptime</p>
                            <p className="mt-1 text-sm text-emerald-700">Review offline feeds and update stream settings if needed.</p>
                        </div>
                        <div className="rounded-2xl bg-slate-100 p-4">
                            <p className="font-semibold text-slate-900">Confirm alert routing</p>
                            <p className="mt-1 text-sm text-slate-600">Make sure notifications reach the right operator channels.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, icon, tone }) => (
                    <article key={label} className="rounded-[26px] border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/5">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
                            {icon}
                        </div>
                        <p className="mt-5 text-3xl font-bold text-slate-900">{value}</p>
                        <p className="mt-1 text-sm text-slate-600">{label}</p>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default WelCome;
