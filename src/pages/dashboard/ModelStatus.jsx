import React, { useEffect, useState } from 'react';
import { Activity, RefreshCcw, ShieldCheck, TimerReset } from 'lucide-react';
import apiClient from '../../services/api-client';
import Loading from '../Error&loading/Loading';

const ModelStatus = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await apiClient.get('/');
                setStatus(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load model status");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    // Loading UI
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-rose-700">
                <p className="text-lg font-semibold">Unable to load model status</p>
                <p className="mt-2 text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <section className="rounded-[30px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/15">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                        <Activity size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Inference service</p>
                        <h2 className="section-heading text-3xl font-bold">Model Status</h2>
                    </div>
                </div>
                <div className="mt-8 inline-flex rounded-full bg-emerald-500/15 px-5 py-3 text-sm font-semibold text-emerald-300">
                    {status?.status || "Running"}
                </div>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                    {status?.message || "SecureVisionAI model is running and ready to process live detection requests."}
                </p>
            </section>

            <section className="space-y-4 rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5">
                <article className="flex items-start gap-4 rounded-[24px] bg-slate-50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Availability</p>
                        <p className="mt-1 text-lg font-bold text-slate-900">{status?.status || "Running"}</p>
                    </div>
                </article>

                <article className="flex items-start gap-4 rounded-[24px] bg-slate-50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                        <TimerReset size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Last update</p>
                        <p className="mt-1 text-lg font-bold text-slate-900">
                            {status?.timestamp ? new Date(status.timestamp).toLocaleString() : "Awaiting timestamp"}
                        </p>
                    </div>
                </article>

                <article className="flex items-start gap-4 rounded-[24px] bg-slate-50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                        <RefreshCcw size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Operational note</p>
                        <p className="mt-1 text-sm leading-7 text-slate-700">
                            Use this panel to confirm backend readiness before testing live camera detection or alert flows.
                        </p>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default ModelStatus;
