import { BellRing, Eye, LockKeyhole, ScanSearch } from "lucide-react";

const features = [
    {
        icon: <ScanSearch size={22} />,
        title: "AI-powered detection",
        description: "Behavior-focused monitoring helps identify suspicious movement patterns from CCTV footage in real time.",
        badge: "Real-time analysis",
        tone: "bg-emerald-50 text-emerald-700",
    },
    {
        icon: <Eye size={22} />,
        title: "Live multi-camera visibility",
        description: "Operators can watch multiple active feeds together instead of switching between disconnected views.",
        badge: "Unified monitoring",
        tone: "bg-sky-50 text-sky-700",
    },
    {
        icon: <BellRing size={22} />,
        title: "Faster alert response",
        description: "Detection results are presented with clearer context so teams can review and react with less delay.",
        badge: "Response-ready alerts",
        tone: "bg-amber-50 text-amber-700",
    },
    {
        icon: <LockKeyhole size={22} />,
        title: "Security-minded workflow",
        description: "Camera management, dashboard access, and review surfaces are organized for professional operations.",
        badge: "Operational trust",
        tone: "bg-slate-100 text-slate-700",
    },
];

const Features = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[34px] bg-slate-900 p-8 text-slate-100 shadow-2xl shadow-slate-900/15 sm:p-10">
                    <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                        Platform highlights
                    </div>
                    <h2 className="section-heading mt-6 text-3xl font-bold text-white sm:text-4xl">
                        Key Features of SecureVisionAI
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-slate-300">
                        Built for teams that need more than a basic surveillance demo. These features support clearer monitoring, faster response, and a more dependable day-to-day security workflow.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="rounded-[24px] bg-white/6 p-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Why it stands out</p>
                            <p className="mt-2 text-sm leading-7 text-slate-300">
                                The product combines detection visibility, operator workflow, and dashboard structure into one more professional system experience.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/6 p-4">
                                <p className="text-3xl font-bold text-emerald-200">98%</p>
                                <p className="mt-1 text-sm text-slate-300">Detection accuracy target</p>
                            </div>
                            <div className="rounded-2xl bg-white/6 p-4">
                                <p className="text-3xl font-bold text-cyan-200">24/7</p>
                                <p className="mt-1 text-sm text-slate-300">Continuous monitoring direction</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {features.map((feature) => (
                        <article
                            key={feature.title}
                            className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/8"
                        >
                            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.tone}`}>
                                {feature.icon}
                            </div>
                            <div className="mt-5">
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${feature.tone}`}>
                                    {feature.badge}
                                </span>
                                <h3 className="mt-4 text-xl font-bold text-slate-900">{feature.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
