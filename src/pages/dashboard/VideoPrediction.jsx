import { useEffect, useMemo, useState } from "react";
import { Film, History, RefreshCw, ShieldAlert, UploadCloud } from "lucide-react";
import {
    fetchCameraList,
    fetchVideoPredictionById,
    fetchVideoPredictions,
    uploadVideoPrediction,
} from "../../services/auth-api-client";

const formatLabelTone = (label) => {
    if (label === "Suspicious") {
        return "bg-rose-100 text-rose-700";
    }

    if (label === "Normal") {
        return "bg-emerald-100 text-emerald-700";
    }

    return "bg-slate-200 text-slate-700";
};

const extractBackendErrorMessage = (backendError) => {
    if (typeof backendError === "string") {
        const titleMatch = backendError.match(/<title>(.*?)<\/title>/i);
        if (titleMatch?.[1]) {
            return titleMatch[1];
        }

        return backendError;
    }

    if (backendError?.detail) {
        return backendError.detail;
    }

    if (backendError?.video?.[0]) {
        return `Video: ${backendError.video[0]}`;
    }

    if (backendError?.camera?.[0]) {
        return `Camera: ${backendError.camera[0]}`;
    }

    if (backendError?.error) {
        return backendError.error;
    }

    return "Video prediction failed. Please try again.";
};

const formatDateTime = (value) => {
    if (!value) {
        return "Unavailable";
    }

    return new Date(value).toLocaleString();
};

const VideoPrediction = () => {
    const [cameraOptions, setCameraOptions] = useState([]);
    const [selectedCameraId, setSelectedCameraId] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [historyRefreshing, setHistoryRefreshing] = useState(false);
    const [detailsLoadingId, setDetailsLoadingId] = useState(null);
    const [error, setError] = useState("");
    const [historyError, setHistoryError] = useState("");
    const [history, setHistory] = useState([]);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoadingHistory(true);

            try {
                const [cameraData, historyData] = await Promise.all([
                    fetchCameraList(),
                    fetchVideoPredictions(),
                ]);

                setCameraOptions(cameraData);
                if (cameraData[0]?.id) {
                    setSelectedCameraId(String(cameraData[0].id));
                }

                const sortedHistory = [...historyData].sort(
                    (first, second) => new Date(second.created_at || 0) - new Date(first.created_at || 0)
                );

                setHistory(sortedHistory);
                if (sortedHistory[0]) {
                    setResult(sortedHistory[0]);
                }
            } catch (loadError) {
                console.error("Video prediction init error:", loadError);
                setError("Unable to load cameras for video prediction.");
                setHistoryError("Unable to load previous predictions.");
            } finally {
                setLoadingHistory(false);
            }
        };

        loadInitialData();
    }, []);

    const cameraNameMap = useMemo(
        () =>
            cameraOptions.reduce((accumulator, camera) => {
                accumulator[String(camera.id)] = camera.name;
                return accumulator;
            }, {}),
        [cameraOptions]
    );

    const refreshHistory = async () => {
        setHistoryRefreshing(true);
        setHistoryError("");

        try {
            const historyData = await fetchVideoPredictions();
            const sortedHistory = [...historyData].sort(
                (first, second) => new Date(second.created_at || 0) - new Date(first.created_at || 0)
            );
            setHistory(sortedHistory);
        } catch (refreshError) {
            console.error("Video prediction history refresh error:", refreshError);
            setHistoryError("Unable to refresh prediction history.");
        } finally {
            setHistoryRefreshing(false);
        }
    };

    const handleSelectHistoryItem = async (predictionId) => {
        setDetailsLoadingId(predictionId);
        setHistoryError("");

        try {
            const data = await fetchVideoPredictionById(predictionId);
            setResult(data);
        } catch (detailsError) {
            console.error("Video prediction details error:", detailsError);
            setHistoryError("Unable to load that prediction.");
        } finally {
            setDetailsLoadingId(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedCameraId || !selectedFile) {
            setError("Choose a camera and a video file before uploading.");
            return;
        }

        setSubmitting(true);
        setError("");
        setUploadProgress(0);

        try {
            const data = await uploadVideoPrediction({
                cameraId: selectedCameraId,
                video: selectedFile,
                onUploadProgress: (progressEvent) => {
                    if (!progressEvent.total) return;
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                },
            });

            const nextResult = {
                ...data,
                camera: Number(selectedCameraId),
                created_at: new Date().toISOString(),
            };

            setResult(nextResult);
            setHistory((currentHistory) => [nextResult, ...currentHistory.filter((item) => item.id !== nextResult.id)]);
            setSelectedFile(null);
        } catch (submitError) {
            console.error("Video prediction error:", submitError);
            const backendError = submitError?.response?.data;
            setError(extractBackendErrorMessage(backendError));
        } finally {
            setSubmitting(false);
        }
    };

    const currentCameraName =
        cameraNameMap[String(result?.camera?.id || result?.camera)] ||
        result?.camera?.name ||
        "Unknown camera";

    return (
        <div className="space-y-6">
            <section className="rounded-[30px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/15">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                            <Film size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Video Predictor</p>
                            <h2 className="section-heading text-3xl font-bold">Upload and review recorded footage</h2>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={refreshHistory}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                    >
                        <RefreshCw size={16} />
                        {historyRefreshing ? "Refreshing..." : "Refresh history"}
                    </button>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                    Upload a recorded clip, review the final label and returned Cloudinary assets, then jump through previous prediction runs from one place.
                </p>
            </section>

            <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr_0.8fr]">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-lg shadow-slate-900/5"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                            <UploadCloud size={18} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Prediction Request</h3>
                            <p className="text-sm text-slate-500">Send `camera` id and `video` file as multipart data.</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Camera</span>
                            <select
                                value={selectedCameraId}
                                onChange={(event) => setSelectedCameraId(event.target.value)}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
                            >
                                <option value="">Select a camera</option>
                                {cameraOptions.map((camera) => (
                                    <option key={camera.id} value={camera.id}>
                                        {camera.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Video file</span>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
                                className="w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-700"
                            />
                        </label>

                        {selectedFile && (
                            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                                {selectedFile.name}
                            </div>
                        )}

                        {submitting && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-slate-600">
                                    <span>Upload progress</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-200">
                                    <div
                                        className="h-2 rounded-full bg-slate-900 transition-all"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={submitting || !selectedCameraId || !selectedFile}
                            className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            {submitting ? "Uploading..." : "Run Prediction"}
                        </button>
                    </div>
                </form>

                <article className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-lg shadow-slate-900/5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                            <ShieldAlert size={18} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Prediction Result</h3>
                            <p className="text-sm text-slate-500">Open the latest response or inspect any older prediction from history.</p>
                        </div>
                    </div>

                    {!result ? (
                        <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center text-sm text-slate-500">
                            Upload a video or select a history item to view the backend response.
                        </div>
                    ) : (
                        <div className="mt-6 space-y-5">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${formatLabelTone(result.final_result)}`}>
                                    {result.final_result || "Unknown"}
                                </span>
                                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                                    Suspicious frames: {result.suspicious_frames ?? 0}
                                </span>
                                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                                    Normal frames: {result.normal_frames ?? 0}
                                </span>
                            </div>

                            {result.video_url ? (
                                <video
                                    controls
                                    src={result.video_url}
                                    className="h-64 w-full rounded-[24px] bg-slate-950 object-cover"
                                />
                            ) : (
                                <div className="flex h-64 items-center justify-center rounded-[24px] bg-slate-100 text-sm text-slate-500">
                                    Video preview unavailable
                                </div>
                            )}

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="mb-2 text-sm font-semibold text-slate-700">Suspicious frame</p>
                                    {result.suspicious_frame_url || result.frame_url ? (
                                        <img
                                            src={result.suspicious_frame_url || result.frame_url}
                                            alt="Suspicious frame preview"
                                            className="h-48 w-full rounded-[24px] object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-48 items-center justify-center rounded-[24px] bg-slate-100 text-sm text-slate-500">
                                            No frame image returned
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 rounded-[24px] bg-slate-50 p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Response details</p>
                                    <p className="text-sm text-slate-700">Prediction ID: {result.id ?? "N/A"}</p>
                                    <p className="text-sm text-slate-700">Camera: {currentCameraName}</p>
                                    <p className="text-sm text-slate-700">Created: {formatDateTime(result.created_at)}</p>
                                    <p className="break-all text-sm text-slate-700">Video URL: {result.video_url || "Unavailable"}</p>
                                    <p className="break-all text-sm text-slate-700">Frame URL: {result.frame_url || result.suspicious_frame_url || "Unavailable"}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </article>

                <aside className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-lg shadow-slate-900/5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                            <History size={18} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Recent Predictions</h3>
                            <p className="text-sm text-slate-500">Pulled from `GET /api/video-predictions/`.</p>
                        </div>
                    </div>

                    {historyError && (
                        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {historyError}
                        </div>
                    )}

                    {loadingHistory ? (
                        <div className="mt-6 rounded-[24px] bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
                            Loading prediction history...
                        </div>
                    ) : history.length === 0 ? (
                        <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
                            No previous video predictions yet.
                        </div>
                    ) : (
                        <div className="mt-6 space-y-3">
                            {history.map((item) => {
                                const itemCameraName =
                                    cameraNameMap[String(item.camera?.id || item.camera)] ||
                                    item.camera?.name ||
                                    "Unknown camera";

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleSelectHistoryItem(item.id)}
                                        className={`w-full rounded-[24px] border p-4 text-left transition ${
                                            result?.id === item.id
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-slate-50 text-slate-900 hover:bg-white"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="font-semibold">{itemCameraName}</p>
                                                <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${result?.id === item.id ? "bg-white/15 text-white" : formatLabelTone(item.final_result)}`}>
                                                    {item.final_result || "Unknown"}
                                                </p>
                                            </div>
                                            <span className={`text-xs ${result?.id === item.id ? "text-slate-300" : "text-slate-500"}`}>
                                                {detailsLoadingId === item.id ? "Loading..." : formatDateTime(item.created_at)}
                                            </span>
                                        </div>
                                        <div className={`mt-3 flex flex-wrap gap-2 text-xs ${result?.id === item.id ? "text-slate-300" : "text-slate-600"}`}>
                                            <span>Suspicious: {item.suspicious_frames ?? 0}</span>
                                            <span>Normal: {item.normal_frames ?? 0}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </aside>
            </section>
        </div>
    );
};

export default VideoPrediction;
