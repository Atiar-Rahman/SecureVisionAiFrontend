import { Activity, BrainCircuit, Eye, ShieldCheck } from "lucide-react";

const workflowSteps = [
    {
        title: "Connect every critical feed",
        description: "Bring lobby, perimeter, parking, and restricted-area cameras into one operational view.",
        icon: <Eye size={20} />,
    },
    {
        title: "Run live AI behavior analysis",
        description: "Continuously evaluate movement patterns and suspicious activity using trained detection models.",
        icon: <BrainCircuit size={20} />,
    },
    {
        title: "Respond with better context",
        description: "Operators review alerts with camera labels, confidence signals, and a cleaner dashboard workflow.",
        icon: <ShieldCheck size={20} />,
    },
];

const OperationsSection = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[32px] bg-slate-900 p-8 text-slate-100 shadow-2xl shadow-slate-900/15 sm:p-10">
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                        <Activity size={16} />
                        Built for live operations
                    </div>
                    <h2 className="section-heading mt-6 max-w-xl text-3xl font-bold text-white sm:text-4xl">
                        A workflow designed for fast monitoring and clear action.
                    </h2>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                        SecureVisionAI is not just a model demo. It is meant to help security teams watch more feeds, spot risk faster, and reduce operator overload during real incidents.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl bg-white/5 p-4">
                            <p className="text-3xl font-bold text-emerald-200">24/7</p>
                            <p className="mt-1 text-sm text-slate-300">Automated surveillance assistance</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4">
                            <p className="text-3xl font-bold text-cyan-200">&lt;5s</p>
                            <p className="mt-1 text-sm text-slate-300">Alert-ready operator review loop</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4">
                            <p className="text-3xl font-bold text-teal-200">Multi-feed</p>
                            <p className="mt-1 text-sm text-slate-300">Coverage across key zones</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">How it works</p>
                        <h3 className="section-heading mt-2 text-3xl font-bold text-slate-900">
                            From camera input to incident response
                        </h3>
                    </div>

                    {workflowSteps.map((step, index) => (
                        <article key={step.title} className="rounded-[26px] bg-slate-50 p-5">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    {step.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        Step {index + 1}
                                    </p>
                                    <h4 className="mt-1 text-lg font-bold text-slate-900">{step.title}</h4>
                                    <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OperationsSection;
