import { Building2, BusFront, Factory, Warehouse } from "lucide-react";

const useCases = [
    {
        title: "Corporate campuses",
        description: "Protect entrances, lobbies, and office corridors with consistent AI-backed observation.",
        icon: <Building2 size={22} />,
    },
    {
        title: "Warehouses and logistics",
        description: "Watch loading zones, inventory paths, and restricted storage areas with fewer blind spots.",
        icon: <Warehouse size={22} />,
    },
    {
        title: "Manufacturing floors",
        description: "Support safety teams with better visibility across production lines and high-risk zones.",
        icon: <Factory size={22} />,
    },
    {
        title: "Transit and public access",
        description: "Improve situational awareness in stations, checkpoints, parking, and waiting areas.",
        icon: <BusFront size={22} />,
    },
];

const UseCasesSection = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="rounded-[36px] border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-10">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Deployment fit</p>
                    <h2 className="section-heading mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                        Professional surveillance for real environments, not just test footage.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                        Whether you manage a facility, transport hub, or industrial site, the platform is shaped around daily monitoring needs and response readiness.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {useCases.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
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

export default UseCasesSection;
