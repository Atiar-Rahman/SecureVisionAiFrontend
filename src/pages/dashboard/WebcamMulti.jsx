import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import authApiClient from "../../services/auth-api-client";

const WebcamMulti = () => {
    const [cameras, setCameras] = useState([]);
    const [selectedCameras, setSelectedCameras] = useState([]);

    const [results, setResults] = useState({});
    const [lastResults, setLastResults] = useState({});

    const processingMapRef = useRef({});
    const webcamRefs = useRef({});
    const audioRef = useRef(null);

    //  NEW: alarm control refs
    const lastAlarmTimeRef = useRef({});
    const alarmStateRef = useRef({});

    // -----------------------------
    // Fetch cameras
    // -----------------------------
    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const res = await authApiClient.get("/api/camera-list/");
                setCameras(res.data);
                setSelectedCameras(res.data.map(cam => cam.name));
            } catch (err) {
                console.error("Camera fetch error:", err);
            }
        };

        fetchCameras();
    }, []);

    // -----------------------------
    // Capture frames
    // -----------------------------
    const captureFrames = async () => {

        const promises = selectedCameras.map(async (cameraName) => {

            if (processingMapRef.current[cameraName]) return null;

            const frame = webcamRefs.current[cameraName]?.getScreenshot();
            if (!frame) return null;

            processingMapRef.current[cameraName] = true;

            try {
                const res = await authApiClient.post("/api/detection-skip/", {
                    image: frame,
                    camera_name: cameraName
                });

                return { cameraName, data: res.data };

            } catch {
                return { cameraName, data: { error: true } };

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

            if (!r.data?.label) return;

            const prevLabel = lastResults[r.cameraName]?.label;
            const currentLabel = r.data.label;
            const camName = r.cameraName;

            lastUpdated[camName] = r.data;

            console.log(camName, currentLabel);

            // -----------------------------
            //  1. Normal → Suspicious (START ALARM)
            // -----------------------------
            if (currentLabel === "Suspicious" && prevLabel !== "Suspicious") {

                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {});

                alarmStateRef.current[camName] = true;
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
                    audioRef.current.play().catch(() => {});

                    lastAlarmTimeRef.current[camName] = now;
                }
            }

            // -----------------------------
            //  3. Suspicious → Normal (STOP ALARM)
            // -----------------------------
            if (currentLabel === "Normal" && prevLabel === "Suspicious") {

                audioRef.current.pause();
                audioRef.current.currentTime = 0;

                alarmStateRef.current[camName] = false;
            }
        });

        // update results
        setResults(prev => ({ ...prev, ...updated }));

        // update cache
        if (Object.keys(lastUpdated).length > 0) {
            setLastResults(prev => ({ ...prev, ...lastUpdated }));
        }
    };

    // -----------------------------
    // Stable interval
    // -----------------------------
    useEffect(() => {
        const interval = setInterval(() => {
            captureFrames();
        }, 1500);

        return () => clearInterval(interval);
    }, [selectedCameras]);

    // -----------------------------
    // UI
    // -----------------------------
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
                    const result =
                        results[camName] || lastResults[camName];

                    return (
                        <div key={camName} className="bg-white shadow rounded-xl p-3">
                            <Webcam
                                ref={(el) =>
                                    (webcamRefs.current[camName] = el)
                                }
                                screenshotFormat="image/jpeg"
                                audio={false}
                                videoConstraints={{
                                    width: 320,
                                    height: 240
                                }}
                            />

                            <div className="mt-2">

                                {result?.error && (
                                    <p className="text-red-500">Error</p>
                                )}

                                {result?.label ? (
                                    <div
                                        className={`text-white p-2 rounded ${
                                            result.label === "Suspicious"
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                        }`}
                                    >
                                        <strong>{result.label}</strong>
                                        <div className="text-sm">
                                            {result.confidence}
                                        </div>
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

export default WebcamMulti;