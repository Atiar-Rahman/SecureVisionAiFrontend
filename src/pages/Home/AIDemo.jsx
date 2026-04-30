import React from "react";
import { Camera, PlayCircle, ScanSearch, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/icons/hero.png";

const AIDemo = () => {
    const demoHighlights = [
        {
            title: "Live scene review",
            description: "Visualize how operators monitor suspicious movement across active feeds.",
            icon: <Camera size={18} />,
        },
        {
            title: "AI event labeling",
            description: "Show detection output with cleaner, faster context for decision-making.",
            icon: <ScanSearch size={18} />,
        },
        {
            title: "Response-ready workflow",
            description: "Move from watching footage to taking action with less delay.",
            icon: <ShieldCheck size={18} />,
        },
    ];

    return (
        <section className="py-8 sm:py-12">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[34px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                            Interactive preview
                        </p>
                        <h2 className="section-heading mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                            See how the detection experience looks in motion.
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            Explore a more realistic product preview with live demo footage, supporting visuals, and the kind of context security teams expect from a modern surveillance platform.
                        </p>
                    </div>

                    <div className="relative mt-8 overflow-hidden rounded-[28px] bg-slate-900 shadow-2xl shadow-slate-900/15">
                        <video
                            autoPlay
                            loop
                            muted
                            className="h-full w-full object-cover"
                        >
                            <source src="/demo.mp4" type="video/mp4" />
                        </video>

                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                            <PlayCircle size={16} />
                            Live AI demo
                        </div>

                        <div className="absolute bottom-4 right-4 rounded-2xl bg-white/90 px-4 py-3 text-left shadow-lg">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Camera zone</p>
                            <p className="mt-1 text-sm font-bold text-slate-900">Monitoring feed active</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                        <Link
                            to="/detection"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
                        >
                            Try Live Demo
                        </Link>
                        <button className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                            Request Access
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <article className="overflow-hidden rounded-[28px] bg-slate-900 text-slate-100 shadow-xl shadow-slate-900/15">
                            <img
                                src={heroImage}
                                alt="SecureVisionAI dashboard preview"
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Dashboard view</p>
                                <h3 className="mt-2 text-xl font-bold text-white">Operator-friendly layout</h3>
                                <p className="mt-2 text-sm leading-7 text-slate-300">
                                    Cleaner panels and faster scanning help teams work more confidently under pressure.
                                </p>
                            </div>
                        </article>

                        <article className="overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-xl shadow-slate-900/5">
                            <div className="flex h-48 items-center justify-center bg-linear-to-br from-emerald-100 via-teal-50 to-slate-100">
                                <img
                                    src="/secureicon.png"
                                    alt="SecureVisionAI shield icon"
                                    className="h-24 w-24 rounded-3xl object-contain shadow-lg"
                                />
                            </div>
                            <div className="p-5">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">System identity</p>
                                <h3 className="mt-2 text-xl font-bold text-slate-900">Focused on secure monitoring</h3>
                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                    A product direction shaped around surveillance reliability, alert review, and operational trust.
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="rounded-[30px] bg-slate-50 p-6 shadow-lg shadow-slate-900/5">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Inside the demo</p>
                        <div className="mt-5 space-y-4">
                            {demoHighlights.map((item) => (
                                <article key={item.title} className="flex items-start gap-4 rounded-[22px] bg-white p-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                                        <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIDemo;
