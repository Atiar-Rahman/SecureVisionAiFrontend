import { ArrowRight, Radar, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="pb-8 pt-10">
            <div className="glass-panel overflow-hidden rounded-[32px]">
                <div className="grid gap-8 px-6 py-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-10">
                    <div>
                        <div className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                            <Shield size={16} />
                            SecureVisionAI
                        </div>
                        <h2 className="section-heading mt-5 max-w-sm text-3xl font-bold text-slate-900">
                            Better visibility for every camera, operator, and incident.
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                            AI-powered surveillance for live monitoring, threat response, and operational confidence across your spaces.
                        </p>
                        <Link
                            to="/dashboard"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Open Dashboard
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div>
                        <h6 className="text-sm font-bold uppercase tracking-[0.26em] text-slate-500">Product</h6>
                        <div className="mt-5 space-y-3 text-sm text-slate-600">
                            <Link to="/detection" className="block transition hover:text-slate-900">Live detection</Link>
                            <Link to="/dashboard/model-status" className="block transition hover:text-slate-900">Model status</Link>
                            <Link to="/dashboard/camera-list" className="block transition hover:text-slate-900">Camera management</Link>
                            <Link to="/dashboard/alert-show" className="block transition hover:text-slate-900">Incident alerts</Link>
                        </div>
                    </div>

                    <div>
                        <h6 className="text-sm font-bold uppercase tracking-[0.26em] text-slate-500">Company</h6>
                        <div className="mt-5 space-y-3 text-sm text-slate-600">
                            <Link to="/" className="block transition hover:text-slate-900">Overview</Link>
                            <Link to="/contact" className="block transition hover:text-slate-900">Contact</Link>
                            <span className="block">Security operations</span>
                            <span className="block">Deployment support</span>
                        </div>
                    </div>

                    <div className="rounded-[28px] bg-slate-900 p-6 text-white shadow-2xl shadow-slate-900/15">
                        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-300">Operational pulse</p>
                        <div className="mt-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <Radar className="mt-0.5" size={18} />
                                <div>
                                    <p className="font-semibold">Always-on monitoring</p>
                                    <p className="mt-1 text-sm text-slate-300">Track cameras, model health, and threat predictions from one place.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Sparkles className="mt-0.5" size={18} />
                                <div>
                                    <p className="font-semibold">Faster operator workflow</p>
                                    <p className="mt-1 text-sm text-slate-300">Designed for quick scanning, clean actions, and less dashboard friction.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-200/70 px-6 py-4 text-sm text-slate-500 lg:px-10">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p>&copy; {new Date().getFullYear()} SecureVisionAI. Built for professional surveillance operations.</p>
                        <p>Detection. Response. Confidence.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
