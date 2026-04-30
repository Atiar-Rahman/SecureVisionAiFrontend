import React from 'react';
import { BellRing, CheckCircle2, Siren, TriangleAlert } from 'lucide-react';

const AlertShow = () => {
    const alerts = [
        {
            title: "Suspicious activity detected",
            detail: "Entrance camera flagged an unusual motion pattern in the north wing.",
            time: "2 min ago",
            level: "Critical",
            tone: "bg-rose-50 text-rose-700 border-rose-100",
            icon: <TriangleAlert size={20} />,
        },
        {
            title: "Operator review completed",
            detail: "Camera 07 event was reviewed and marked as resolved.",
            time: "18 min ago",
            level: "Resolved",
            tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
            icon: <CheckCircle2 size={20} />,
        },
        {
            title: "Monitoring reminder",
            detail: "Model confidence dipped on one stream. Consider checking camera angle and lighting.",
            time: "42 min ago",
            level: "Advisory",
            tone: "bg-amber-50 text-amber-700 border-amber-100",
            icon: <BellRing size={20} />,
        },
    ];

    return (
        <div className="space-y-6">
            <section className="rounded-[30px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/15">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                        <Siren size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Alert center</p>
                        <h2 className="section-heading text-3xl font-bold">Incident timeline</h2>
                    </div>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                    Review notable detections, completed responses, and operational reminders from one clean workspace.
                </p>
            </section>

            <section className="grid gap-4">
                {alerts.map(({ title, detail, time, level, tone, icon }) => (
                    <article key={title} className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="flex items-start gap-4">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${tone}`}>
                                    {icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                                    <p className="mt-2 text-sm leading-7 text-slate-600">{detail}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 md:items-end">
                                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${tone}`}>{level}</span>
                                <span className="text-sm text-slate-500">{time}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default AlertShow;
