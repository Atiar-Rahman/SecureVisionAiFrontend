import { useEffect, useState } from "react";
import { RefreshCw, Siren, Trash2, TriangleAlert } from "lucide-react";
import Swal from "sweetalert2";
import { deleteAlert, fetchAlerts } from "../../services/auth-api-client";

const AlertShow = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingAlertId, setDeletingAlertId] = useState(null);

    const loadAlerts = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await fetchAlerts();
            const sortedAlerts = [...data].sort(
                (first, second) => new Date(second.created_at || 0) - new Date(first.created_at || 0)
            );
            setAlerts(sortedAlerts);
        } catch (loadError) {
            console.error("Alerts load error:", loadError);
            setError("Unable to fetch alert history.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAlerts();
    }, []);

    const handleDeleteAlert = async (alertId) => {
        const confirmation = await Swal.fire({
            title: "Delete this alert?",
            text: "This will permanently remove the alert from your history.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete alert",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#be123c",
        });

        if (!confirmation.isConfirmed) {
            return;
        }

        setDeletingAlertId(alertId);
        setError("");

        try {
            await deleteAlert(alertId);
            setAlerts((currentAlerts) => currentAlerts.filter((alert) => alert.id !== alertId));

            await Swal.fire({
                title: "Deleted",
                text: "The alert was removed successfully.",
                icon: "success",
                timer: 1600,
                showConfirmButton: false,
            });
        } catch (deleteError) {
            console.error("Alert delete error:", deleteError);
            setError("Unable to delete that alert. Please try again.");
        } finally {
            setDeletingAlertId(null);
        }
    };

    return (
        <div className="space-y-6">
            <section className="rounded-[30px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/15">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                            <Siren size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Alert center</p>
                            <h2 className="section-heading text-3xl font-bold">Suspicious incident timeline</h2>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={loadAlerts}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                    Review suspicious events returned by the backend, including camera, confidence, timestamp, and the Cloudinary frame preview when available.
                </p>
            </section>

            {error && (
                <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="rounded-[28px] border border-white/70 bg-white/80 p-10 text-center text-sm text-slate-500 shadow-lg shadow-slate-900/5">
                    Loading alerts...
                </div>
            ) : alerts.length === 0 ? (
                <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
                    No suspicious alert history yet.
                </div>
            ) : (
                <section className="grid gap-4">
                    {alerts.map((alert, index) => (
                        <article
                            key={alert.id || `${alert.created_at}-${index}`}
                            className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/5"
                        >
                            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                                <div>
                                    {alert.frame_url ? (
                                        <img
                                            src={alert.frame_url}
                                            alt="Suspicious event frame"
                                            className="h-56 w-full rounded-[24px] object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-56 items-center justify-center rounded-[24px] bg-slate-100 text-sm text-slate-500">
                                            Frame unavailable
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col justify-between gap-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-700">
                                                <TriangleAlert size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {alert.camera?.name || alert.camera || "Unknown camera"}
                                                </h3>
                                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                                    Suspicious activity recorded and saved to alert history.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteAlert(alert.id)}
                                            disabled={!alert.id || deletingAlertId === alert.id}
                                            className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <Trash2 size={16} />
                                            {deletingAlertId === alert.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <span className="rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
                                            Suspicious
                                        </span>
                                        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                                            Confidence: {typeof alert.confidence === "number"
                                                ? `${(alert.confidence * 100).toFixed(1)}%`
                                                : "Unavailable"}
                                        </span>
                                        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                                            {alert.created_at ? new Date(alert.created_at).toLocaleString() : "Time unavailable"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </div>
    );
};

export default AlertShow;
