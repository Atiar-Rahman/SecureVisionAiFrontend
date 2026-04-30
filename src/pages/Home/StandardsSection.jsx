import { DatabaseZap, LockKeyhole, ServerCog, ShieldCheck } from "lucide-react";

const standards = [
    {
        title: "Role-aware access",
        description: "Keep dashboard actions limited to the right operator workflows and review responsibilities.",
        icon: <LockKeyhole size={20} />,
    },
    {
        title: "Deployment flexibility",
        description: "Support local backend environments, camera management, and workflow-specific dashboard control.",
        icon: <ServerCog size={20} />,
    },
    {
        title: "Reliable data handling",
        description: "Organize alerts, messages, and camera feeds in a structured way that scales with the team.",
        icon: <DatabaseZap size={20} />,
    },
    {
        title: "Security-first thinking",
        description: "Designed around surveillance confidence, response speed, and cleaner operational visibility.",
        icon: <ShieldCheck size={20} />,
    },
];

const StandardsSection = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Platform standards</p>
                    <h2 className="section-heading mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                        Built with the expectations of professional security teams in mind.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                        Beyond detection accuracy, strong surveillance products need predictable access, reliable organization, and interfaces that reduce stress during live operations.
                    </p>
                    <div className="mt-6 rounded-[28px] bg-slate-50 p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Why it matters</p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            The platform experience should help teams move quickly without sacrificing clarity, accountability, or review quality.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {standards.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                                {item.icon}
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StandardsSection;
