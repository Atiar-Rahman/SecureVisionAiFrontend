import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { Camera, RefreshCw, ShieldAlert, Video } from "lucide-react";
import Webcam from "react-webcam";
import {
    detectLiveFrame,
    fetchAlerts,
    fetchCameraList,
    fetchCameras,
} from "../../services/auth-api-client";
import { triggerModelWarmup } from "../../services/warmup";

const FRAME_INTERVAL_MS = 1200;

const getStatusTone = (label) => {
    if (label === "Suspicious") {
        return "bg-rose-100 text-rose-700";
    }

    if (label === "Normal") {
        return "bg-emerald-100 text-emerald-700";
    }

    return "bg-slate-200 text-slate-700";
};

const MultiWebcamStream = () => {
    const [cameraOptions, setCameraOptions] = useState([]);
    const [cameraMap, setCameraMap] = useState({});
    const [selectedCameraName, setSelectedCameraName] = useState("");
    const [result, setResult] = useState(null);
    const [latestAlert, setLatestAlert] = useState(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [error, setError] = useState("");
    const [isWebcamReady, setIsWebcamReady] = useState(false);

    const webcamRef = useRef(null);
    const lastLabelRef = useRef(null);
    const processingRef = useRef(false);
    const audioRef = useRef(null);

    useEffect(() => {
        triggerModelWarmup().catch((error) => {
            console.error("Detection page warmup failed:", error);
        });

        const loadCameraData = async () => {
            try {
                const [cameraList, cameras] = await Promise.all([
                    fetchCameraList(),
                    fetchCameras(),
                ]);

                setCameraOptions(cameraList);
                setCameraMap(
                    cameras.reduce((accumulator, camera) => {
                        accumulator[camera.name] = camera;
                        return accumulator;
                    }, {})
                );

                if (cameraList[0]?.name) {
                    setSelectedCameraName(cameraList[0].name);
                }
            } catch (loadError) {
                console.error("Live detection setup error:", loadError);
                setError("Unable to load cameras for live detection.");
            }
        };

        loadCameraData();
    }, []);

    const selectedCamera = useMemo(
        () => cameraMap[selectedCameraName] || null,
        [cameraMap, selectedCameraName]
    );

    const refreshLatestAlert = async () => {
        try {
            const alerts = await fetchAlerts();
            if (!alerts.length) {
                setLatestAlert(null);
                return;
            }

            const newestFirst = [...alerts].sort(
                (first, second) => new Date(second.created_at || 0) - new Date(first.created_at || 0)
            );

            setLatestAlert(newestFirst[0]);
        } catch (alertError) {
            console.error("Alert refresh error:", alertError);
        }
    };

    const captureFrame = useEffectEvent(async () => {
        if (!selectedCameraName || processingRef.current) {
            return;
        }

        const frame = webcamRef.current?.getScreenshot();
        if (!frame) {
            return;
        }

        processingRef.current = true;
        setIsDetecting(true);
        setError("");

        try {
            const data = await detectLiveFrame({
                cameraName: selectedCameraName,
                image: frame,
            });

            setResult(data);

            if (data.label === "Suspicious" && lastLabelRef.current !== "Suspicious") {
                audioRef.current?.play().catch(() => {});
                refreshLatestAlert();
            }

            if (data.label === "Normal" && lastLabelRef.current === "Suspicious") {
                audioRef.current?.pause();
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                }
            }

            if (data.label !== null) {
                lastLabelRef.current = data.label;
            }
        } catch (detectionError) {
            console.error("Detection error:", detectionError);
            setError("Live detection request failed. Check backend availability and JWT login.");
        } finally {
            processingRef.current = false;
            setIsDetecting(false);
        }
    });

    useEffect(() => {
        if (!selectedCameraName) {
            return undefined;
        }

        setResult(null);
        setError("");
        lastLabelRef.current = null;

        if (!isWebcamReady) {
            return undefined;
        }

        const interval = setInterval(() => {
            captureFrame();
        }, FRAME_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [selectedCameraName, isWebcamReady]);

    useEffect(() => {
        refreshLatestAlert();
    }, []);

    const previewImage = result?.frame_url || selectedCamera?.snapshot || null;

    return (
        <div className="space-y-6">
            <audio ref={audioRef} src="/Danger Alarm Sound Effect.mp3" />

            <section className="rounded-[30px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/15">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                            <Video size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Live Detection</p>
                            <h2 className="section-heading text-3xl font-bold">Real-time camera analysis</h2>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={refreshLatestAlert}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                    >
                        <RefreshCw size={16} />
                        Refresh alerts
                    </button>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                    Frames are captured from the browser webcam and sent with `camera_name`. Buffering responses keep the stream running quietly until the model returns a label.
                </p>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <article className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-lg shadow-slate-900/5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Camera feed</h3>
                            <p className="text-sm text-slate-500">Choose a backend camera entry, then the frontend will post frames every {FRAME_INTERVAL_MS}ms.</p>
                        </div>
                        <label className="w-full md:w-72">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Camera selector</span>
                            <select
                                value={selectedCameraName}
                                onChange={(event) => setSelectedCameraName(event.target.value)}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
                            >
                                <option value="">Select a camera</option>
                                {cameraOptions.map((camera) => (
                                    <option key={camera.id || camera.name} value={camera.name}>
                                        {camera.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-4">
                            <div className="aspect-video min-h-[260px] overflow-hidden rounded-[28px] bg-slate-950">
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    mirrored
                                    muted
                                    playsInline
                                    screenshotFormat="image/jpeg"
                                    screenshotQuality={0.82}
                                    className="h-full min-h-[260px] w-full object-cover"
                                    videoConstraints={{
                                        width: { ideal: 960 },
                                        height: { ideal: 540 },
                                        facingMode: "user",
                                    }}
                                    onUserMedia={() => {
                                        setIsWebcamReady(true);
                                        setError("");
                                    }}
                                    onUserMediaError={(webcamLoadError) => {
                                        console.error("Webcam access error:", webcamLoadError);
                                        setIsWebcamReady(false);
                                        setError("Webcam preview could not start. Please allow camera permission in the browser.");
                                    }}
                                />
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="rounded-[24px] bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Backend status</p>
                                    <div className="mt-3 flex items-center gap-3">
                                        <span className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusTone(result?.label)}`}>
                                            {result?.label === null
                                                ? "Buffering"
                                                : result?.label || "Waiting"}
                                        </span>
                                        {typeof result?.confidence === "number" && (
                                            <span className="text-sm text-slate-600">
                                                Confidence: {(result.confidence * 100).toFixed(1)}%
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-[24px] bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Camera metadata</p>
                                    <p className="mt-3 text-sm text-slate-700">Location: {selectedCamera?.location || "Unavailable"}</p>
                                    <p className="mt-1 text-sm text-slate-700">Status: {selectedCamera?.status || "Unknown"}</p>
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                    {error}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                                        <Camera size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Detection preview</p>
                                        <p className="text-xs text-slate-500">Uses live `frame_url` first, then camera `snapshot` as fallback.</p>
                                    </div>
                                </div>

                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Detection preview"
                                        className="mt-4 h-72 w-full rounded-[24px] object-cover"
                                    />
                                ) : (
                                    <div className="mt-4 flex h-72 items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white text-sm text-slate-500">
                                        Preview image unavailable
                                    </div>
                                )}
                            </div>

                            <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                                        <ShieldAlert size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Suspicious event handling</p>
                                        <p className="text-xs text-slate-500">Alert UI only elevates when the backend returns `Suspicious`.</p>
                                    </div>
                                </div>

                                {result?.label === "Suspicious" ? (
                                    <div className="mt-4 rounded-[24px] border border-rose-200 bg-rose-50 p-4 text-rose-800">
                                        <p className="font-semibold">Suspicious activity detected on {selectedCameraName}</p>
                                        <p className="mt-2 text-sm">
                                            Review the returned frame preview and refresh the alert center for the newest incident.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mt-4 rounded-[24px] bg-slate-50 p-4 text-sm text-slate-600">
                                        {isDetecting
                                            ? "Sending the next frame..."
                                            : "No suspicious alert currently active."}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </article>

                <aside className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-lg shadow-slate-900/5">
                    <h3 className="text-xl font-bold text-slate-900">Latest alert</h3>
                    <p className="mt-1 text-sm text-slate-500">Pulled from `GET /api/alerts/` and sorted newest first.</p>

                    {!latestAlert ? (
                        <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center text-sm text-slate-500">
                            No suspicious alert history available yet.
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4">
                            {latestAlert.frame_url ? (
                                <img
                                    src={latestAlert.frame_url}
                                    alt="Latest suspicious frame"
                                    className="h-64 w-full rounded-[24px] object-cover"
                                />
                            ) : (
                                <div className="flex h-64 items-center justify-center rounded-[24px] bg-slate-100 text-sm text-slate-500">
                                    Alert image unavailable
                                </div>
                            )}

                            <div className="rounded-[24px] bg-slate-50 p-5">
                                <p className="text-sm font-semibold text-slate-900">{latestAlert.camera?.name || latestAlert.camera || selectedCameraName}</p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Confidence: {typeof latestAlert.confidence === "number"
                                        ? `${(latestAlert.confidence * 100).toFixed(1)}%`
                                        : "Unavailable"}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    Time: {latestAlert.created_at ? new Date(latestAlert.created_at).toLocaleString() : "Unavailable"}
                                </p>
                            </div>
                        </div>
                    )}
                </aside>
            </section>
        </div>
    );
};

export default MultiWebcamStream;
