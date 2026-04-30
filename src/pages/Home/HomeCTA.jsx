import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const HomeCTA = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="relative overflow-hidden rounded-[36px] bg-linear-to-r from-slate-900 via-teal-900 to-slate-800 p-8 text-slate-100 shadow-2xl shadow-slate-900/15 sm:p-10 lg:p-12">
                <div className="absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-emerald-400/15 blur-2xl" />

                <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                            <ShieldCheck size={16} />
                            Ready for the next step
                        </div>
                        <h2 className="section-heading mt-5 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
                            Build a surveillance workflow your operators can actually trust.
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
                            Start with live detection, organize your camera network, and move from passive watching to proactive monitoring.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Open Dashboard
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-full border border-cyan-200/20 bg-white/5 px-6 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-white/10"
                        >
                            Talk to Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeCTA;
