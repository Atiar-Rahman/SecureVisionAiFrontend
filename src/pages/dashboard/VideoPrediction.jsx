import { useEffect, useState } from "react";
import { Film, ShieldAlert, UploadCloud } from "lucide-react";
import { fetchCameraList, uploadVideoPrediction } from "../../services/auth-api-client";

const formatLabelTone = (label) => {
    if (label === "Suspicious") {
        return "bg-rose-100 text-rose-700";
    }

    if (label === "Normal") {
        return "bg-emerald-100 text-emerald-700";
    }

    return "bg-slate-200 text-slate-700";
};

const VideoPrediction = () => {
    const [cameraOptions, setCameraOptions] = useState([]);
    const [selectedCameraId, setSelectedCameraId] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => {
        const loadCameraOptions = async () => {
            try {
                const data = await fetchCameraList();
                setCameraOptions(data);

                if (data[0]?.id) {
                    setSelectedCameraId(String(data[0].id));
                }
            } catch (loadError) {
                console.error("Camera list load error:", loadError);
                setError("Unable to load cameras for video prediction.");
            }
        };

        loadCameraOptions();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedCameraId || !selectedFile) {
            setError("Choose a camera and a video file before uploading.");
            return;
        }

        setSubmitting(true);
        setError("");
        setUploadProgress(0);
        setResult(null);

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

            setResult(data);
        } catch (submitError) {
            console.error("Video prediction error:", submitError);
            setError("Video prediction failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <section className="rounded-[30px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/15">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                        <Film size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Video Predictor</p>
                        <h2 className="section-heading text-3xl font-bold">Upload and analyze recorded footage</h2>
                    </div>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                    Send a recorded clip to the backend, then review the returned Cloudinary video URL, suspicious frame thumbnail, and overall prediction summary.
                </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
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
                            <p className="text-sm text-slate-500">Use camera id plus a video file, as required by the backend.</p>
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
                            <p className="text-sm text-slate-500">Final label, frame counts, and returned media assets appear here.</p>
                        </div>
                    </div>

                    {!result ? (
                        <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center text-sm text-slate-500">
                            Upload a video to view the backend response.
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

                            {result.video_url && (
                                <video
                                    controls
                                    src={result.video_url}
                                    className="h-64 w-full rounded-[24px] bg-slate-950 object-cover"
                                />
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
                                    <p className="break-all text-sm text-slate-700">Video URL: {result.video_url || "Unavailable"}</p>
                                    <p className="break-all text-sm text-slate-700">Frame URL: {result.frame_url || "Unavailable"}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </article>
            </section>
        </div>
    );
};

export default VideoPrediction;
