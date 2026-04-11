import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import authApiClient from "../../services/auth-api-client";

const MultiWebcam = () => {
    const [cameras, setCameras] = useState([]);
    const [selectedCameras, setSelectedCameras] = useState([]);
    const [results, setResults] = useState({});
    const [processing, setProcessing] = useState(false);

    const webcamRefs = useRef([]);
    const audioRef = useRef(null);
    const lastResultsRef = useRef({}); // for alarm control (NO re-render issue)

    // 🔹 Fetch cameras
    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const res = await authApiClient.get("/api/camera-list/");
                setCameras(res.data);
                setSelectedCameras(res.data.map(cam => cam.name));

                webcamRefs.current = res.data.map(
                    (_, i) => webcamRefs.current[i] || React.createRef()
                );
            } catch (err) {
                console.error("Camera fetch error:", err.response?.data || err.message);
            }
        };

        fetchCameras();
    }, []);

    
    const triggerAlarm = () => {
        if (!audioRef.current) return;

        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => { });
    };

    //  Capture frames
    const captureFrames = async () => {
        if (processing) return;
        setProcessing(true);

        try {
            const promises = selectedCameras.map((cameraName, i) => {
                const frame = webcamRefs.current[i]?.current?.getScreenshot();
                if (!frame) return null;

                return authApiClient.post("/api/detection/", {
                    image: frame,
                    camera_name: cameraName
                })
                    .then(res => ({ cameraName, data: res.data }))
                    .catch(() => ({ cameraName, data: { error: true } }));
            });

            const responses = await Promise.all(promises);

            const updatedResults = {};

            responses.forEach(r => {
                if (!r) return;

                updatedResults[r.cameraName] = r.data;

                const currentLabel = r.data?.label;
                const prevLabel = lastResultsRef.current[r.cameraName]?.label;

                //  ALARM LOGIC (NO SPAM)
                if (
                    currentLabel === "Normal" &&
                    prevLabel !== "Normal"
                ) {
                    triggerAlarm();
                }

                // update cache
                if (currentLabel) {
                    lastResultsRef.current[r.cameraName] = r.data;
                }
            });

            setResults(prev => ({ ...prev, ...updatedResults }));

        } finally {
            setProcessing(false);
        }
    };

    //  Interval
    useEffect(() => {
        const interval = setInterval(captureFrames, 1500);
        return () => clearInterval(interval);
    }, [selectedCameras, processing]);

    return (
        <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">
                Multi-Camera Live Stream
            </h2>

            {/*  ALARM SOUND */}
            <audio ref={audioRef} src="/src/assets/Danger Alarm Sound Effect.mp3" />

            <div className="flex flex-wrap justify-center gap-5">
                {selectedCameras.map((camName, i) => {
                    const result = results[camName];

                    return (
                        <div key={i} className="bg-white shadow rounded-xl p-3">
                            <Webcam
                                ref={webcamRefs.current[i]}
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
                                        className={`text-white p-2 rounded ${result.label === "Suspicious"
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
                                        Waiting...
                                    </p>
                                )}
                            </div>

                            <small className="block mt-1 text-black">
                                {camName}
                            </small>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultiWebcam;