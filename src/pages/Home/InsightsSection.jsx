import { BarChart3, Clock3, Radar, Siren } from "lucide-react";

const insights = [
    {
        title: "Faster threat recognition",
        value: "68%",
        detail: "Average improvement in identifying unusual movement patterns before manual escalation.",
        icon: <Radar size={20} />,
        tone: "bg-emerald-50 text-emerald-700",
    },
    {
        title: "Operator time saved",
        value: "31 hrs",
        detail: "Weekly time recovered by reducing passive camera watching across multi-feed environments.",
        icon: <Clock3 size={20} />,
        tone: "bg-sky-50 text-sky-700",
    },
    {
        title: "Incident review clarity",
        value: "92%",
        detail: "Teams report better confidence when alerts are paired with labels and organized dashboards.",
        icon: <BarChart3 size={20} />,
        tone: "bg-amber-50 text-amber-700",
    },
    {
        title: "Alert readiness",
        value: "24/7",
        detail: "Detection pipelines remain available for high-priority zones that need continuous monitoring.",
        icon: <Siren size={20} />,
        tone: "bg-slate-100 text-slate-700",
    },
];

const InsightsSection = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="rounded-[36px] bg-slate-900 p-6 text-slate-100 shadow-2xl shadow-slate-900/15 sm:p-8 lg:p-10">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Operational impact</p>
                    <h2 className="section-heading mt-2 text-3xl font-bold text-white sm:text-4xl">
                        Security analytics that help teams act with more confidence.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                        SecureVisionAI is built to turn surveillance from a passive screen-watching task into an informed, measurable security workflow.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {insights.map((item) => (
                        <article key={item.title} className="rounded-[28px] bg-white/8 p-5 backdrop-blur-sm">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}>
                                {item.icon}
                            </div>
                            <p className="mt-5 text-4xl font-bold text-white">{item.value}</p>
                            <h3 className="mt-2 text-lg font-semibold text-cyan-50">{item.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InsightsSection;
