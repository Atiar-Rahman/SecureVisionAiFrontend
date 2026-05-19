import React, { useEffect, useEffectEvent, useRef, useState } from "react";
import Webcam from "react-webcam";
import { detectLiveFrame, fetchCameraList } from "../../services/auth-api-client";

const formatPercent = (value) => {
    if (typeof value !== "number") {
        return "Unavailable";
    }

    return `${(value * 100).toFixed(1)}%`;
};

const CNN3DDetection = () => {
    const [selectedCameras, setSelectedCameras] = useState([]);

    const [results, setResults] = useState({});
    const [lastResults, setLastResults] = useState({});

    const processingMapRef = useRef({});
    const webcamRefs = useRef({});
    const audioRef = useRef(null);

    const lastAlarmTimeRef = useRef({});
    const activeAlarmsRef = useRef(new Set());

    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const data = await fetchCameraList();
                setSelectedCameras(data.map(cam => cam.name));
            } catch (err) {
                console.error("Camera fetch error:", err);
            }
        };

        fetchCameras();
    }, []);

    const captureFrames = useEffectEvent(async () => {
        const promises = selectedCameras.map(async (cameraName) => {
            if (processingMapRef.current[cameraName]) return null;

            const frame = webcamRefs.current[cameraName]?.getScreenshot();
            if (!frame) return null;

            processingMapRef.current[cameraName] = true;

            try {
                const res = await detectLiveFrame({
                    image: frame,
                    cameraName,
                    mode: "3dcnn",
                });

                return { cameraName, data: res };

            } catch (error) {
                return { cameraName, data: { error: error?.response?.data?.error || "Prediction failed" } };

            } finally {
                processingMapRef.current[cameraName] = false;
            }
        });

        const responses = await Promise.all(promises);

        const updated = {};
        const lastUpdated = {};

        responses.forEach(r => {
            if (!r) return;

            updated[r.cameraName] = r.data;

            if (!r.data?.sequence_ready || !r.data?.label) return;

            const prevLabel = lastResults[r.cameraName]?.label;
            const currentLabel = r.data.label;
            const camName = r.cameraName;

            lastUpdated[camName] = r.data;

            console.log(camName, currentLabel);

            // -----------------------------
            //  1. Normal → Suspicious (START ALARM)
            // -----------------------------
            if (currentLabel === "Suspicious" && prevLabel !== "Suspicious") {
                activeAlarmsRef.current.add(camName);
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => { });

                lastAlarmTimeRef.current[camName] = Date.now();
            }

            // -----------------------------
            //  2. Suspicious → Suspicious (COOLDOWN REPEAT)
            // -----------------------------
            if (currentLabel === "Suspicious" && prevLabel === "Suspicious") {
                const now = Date.now();

                if (
                    !lastAlarmTimeRef.current[camName] ||
                    now - lastAlarmTimeRef.current[camName] > 3000
                ) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(() => { });

                    lastAlarmTimeRef.current[camName] = now;
                }
            }

            // -----------------------------
            //  3. Suspicious → Normal (STOP ALARM)
            // -----------------------------
            if (currentLabel === "Normal" && prevLabel === "Suspicious") {
                activeAlarmsRef.current.delete(camName);
                if (activeAlarmsRef.current.size === 0) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            }
        });

        // update results
        setResults(prev => ({ ...prev, ...updated }));

        // update cache
        if (Object.keys(lastUpdated).length > 0) {
            setLastResults(prev => ({ ...prev, ...lastUpdated }));
        }
    });

    useEffect(() => {
        if (selectedCameras.length === 0) return undefined;

        const interval = setInterval(() => {
            captureFrames();
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedCameras]);

    return (
        <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">
                Multi-Camera Live Stream
            </h2>

            {/* Alarm sound */}
            <audio
                ref={audioRef}
                src="/Danger Alarm Sound Effect.mp3"
            />

            <div className="flex flex-wrap justify-center gap-5">
                {selectedCameras.map((camName) => {
                    const result = results[camName];
                    const lastReadyResult = lastResults[camName];
                    const sequenceReady = result?.sequence_ready === true;
                    const hasBufferedResponse = result?.sequence_ready === false;
                    const visibleLabel = sequenceReady ? result?.label : lastReadyResult?.label;
                    const previewFrame = result?.frame_url || lastReadyResult?.frame_url;
                    const thresholdValue = result?.threshold ?? lastReadyResult?.threshold;

                    return (
                        <div key={camName} className="bg-white shadow rounded-xl p-3">
                            <Webcam
                                ref={(el) =>
                                    (webcamRefs.current[camName] = el)
                                }
                                screenshotFormat="image/jpeg"
                                screenshotQuality={0.6}
                                audio={false}
                                mirrored
                                className="h-52 w-full rounded-lg bg-slate-950 object-cover"
                                videoConstraints={{
                                    width: 160,
                                    height: 120
                                }}
                            />

                            {previewFrame && (
                                <img
                                    src={previewFrame}
                                    alt={`${camName} 3D CNN preview`}
                                    className="mt-3 h-40 w-full rounded-lg object-cover"
                                />
                            )}

                            <div className="mt-2">

                                {result?.error && (
                                    <p className="text-red-500">{result.error}</p>
                                )}

                                {visibleLabel ? (
                                    <div
                                        className={`text-white p-2 rounded ${visibleLabel === "Suspicious"
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                            }`}
                                    >
                                        <strong>{visibleLabel}</strong>
                                        <div className="mt-1 text-sm space-y-1">
                                            <div>Sequence: {sequenceReady ? "Ready" : "Buffering"}</div>
                                            <div>Confidence: {formatPercent(result?.confidence ?? lastReadyResult?.confidence)}</div>
                                            <div>Suspicious score: {formatPercent(result?.suspicious_score ?? lastReadyResult?.suspicious_score)}</div>
                                            <div>Threshold: {typeof thresholdValue === "number" ? thresholdValue.toFixed(2) : "Unavailable"}</div>
                                        </div>
                                    </div>
                                ) : hasBufferedResponse ? (
                                    <div className="rounded bg-amber-50 p-2 text-sm text-amber-700">
                                        Sequence buffering...
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">
                                        Detecting...
                                    </p>
                                )}

                                {!result && (
                                    <p className="text-gray-400 text-sm">
                                        Waiting...
                                    </p>
                                )}
                            </div>

                            <small className="block mt-1">
                                {camName}
                            </small>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CNN3DDetection;
