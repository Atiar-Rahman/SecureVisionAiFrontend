/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import authApiClient from "../../services/auth-api-client";

const WebcamMulti = () => {
    const [cameras, setCameras] = useState([]);
    const [selectedCameras, setSelectedCameras] = useState([]);

    const [results, setResults] = useState({});
    const [lastResults, setLastResults] = useState({}); //  cache last valid label

    const processingMapRef = useRef({});
    const webcamRefs = useRef({});

    // 🔹 Fetch cameras
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

    // 🔹 Capture frames
    const captureFrames = async () => {
        const promises = selectedCameras.map(async (cameraName) => {

            //  Skip if already processing
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

            //  only update cache if valid label আসে
            if (r.data?.label) {
                lastUpdated[r.cameraName] = r.data;
            }
        });

        // update live results
        setResults(prev => ({ ...prev, ...updated }));

        // update last valid results
        if (Object.keys(lastUpdated).length > 0) {
            setLastResults(prev => ({ ...prev, ...lastUpdated }));
        }
    };

    // 🔹 Stable interval
    useEffect(() => {
        const interval = setInterval(captureFrames, 1500);
        return () => clearInterval(interval);
    }, [selectedCameras]);

    return (
        <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Multi-Camera Live Stream</h2>

            <div className="flex flex-wrap justify-center gap-5">
                {selectedCameras.map((camName) => {

                    //  fallback to last result if skipped
                    const result = results[camName] || lastResults[camName];

                    return (
                        <div key={camName} className="bg-white shadow rounded-xl p-3">
                            <Webcam
                                ref={(el) => (webcamRefs.current[camName] = el)}
                                screenshotFormat="image/jpeg"
                                audio={false}
                                videoConstraints={{ width: 320, height: 240 }}
                            />

                            <div className="mt-2">
                                {result?.error && (
                                    <p className="text-red-500">Error</p>
                                )}

                                {result?.label ? (
                                    <div className={`text-white p-2 rounded ${result.label === "Suspicious"
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                        }`}>
                                        <strong>{result.label}</strong>
                                        <div className="text-sm">{result.confidence}</div>
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

                            <small className="block mt-1">{camName}</small>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WebcamMulti;