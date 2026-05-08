import React, { createRef, useEffect, useEffectEvent, useRef, useState } from "react";
import Webcam from "react-webcam";
import { detectLiveFrame, fetchCameraList } from "../../services/auth-api-client";

const MultiWebcam = () => {
    const [selectedCameras, setSelectedCameras] = useState([]);
    const [results, setResults] = useState({});

    const webcamRefs = useRef([]);
    const audioRef = useRef(null);
    const lastResultsRef = useRef({});
    const processingRef = useRef(false);

    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const data = await fetchCameraList();
                setSelectedCameras(data.map(cam => cam.name));

                webcamRefs.current = data.map(
                    (_, i) => webcamRefs.current[i] || createRef()
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

    const captureFrames = useEffectEvent(async () => {
        if (processingRef.current) return;
        processingRef.current = true;

        try {
            const promises = selectedCameras.map((cameraName, i) => {
                const frame = webcamRefs.current[i]?.current?.getScreenshot();
                if (!frame) return null;

                return detectLiveFrame({
                    image: frame,
                    cameraName,
                    mode: "standard",
                })
                    .then(data => ({ cameraName, data }))
                    .catch((error) => ({
                        cameraName,
                        data: { error: error?.response?.data?.error || "Prediction failed" },
                    }));
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
                    currentLabel === "Suspicious" &&
                    prevLabel !== "Suspicious"
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
            processingRef.current = false;
        }
    });

    useEffect(() => {
        if (selectedCameras.length === 0) return undefined;

        const interval = setInterval(captureFrames, 1500);
        return () => clearInterval(interval);
    }, [selectedCameras]);

    return (
        <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">
                Multi-Camera Live Stream
            </h2>

            {/*  ALARM SOUND */}
            <audio
                ref={audioRef}
                src="/Danger Alarm Sound Effect.mp3"
            />

            <div className="flex flex-wrap justify-center gap-5">
                {selectedCameras.map((camName, i) => {
                    const result = results[camName];

                    return (
                        <div key={camName} className="bg-white shadow rounded-xl p-3">
                            <Webcam
                                ref={webcamRefs.current[i]}
                                screenshotFormat="image/jpeg"
                                audio={false}
                                mirrored
                                className="h-60 w-full rounded-lg bg-slate-950 object-cover"
                                videoConstraints={{
                                    width: 320,
                                    height: 240
                                }}
                            />

                            {result?.frame_url && (
                                <img
                                    src={result.frame_url}
                                    alt={`${camName} detection preview`}
                                    className="mt-3 h-40 w-full rounded-lg object-cover"
                                />
                            )}

                            <div className="mt-2">
                                {result?.error && (
                                    <p className="text-red-500">{result.error}</p>
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
