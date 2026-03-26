import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import authApiClient from "../../services/auth-api-client";

const MultiWebcam = () => {
    // eslint-disable-next-line no-unused-vars
    const [cameras, setCameras] = useState([]);
    const [selectedCameras, setSelectedCameras] = useState([]);
    const [results, setResults] = useState({});
    const [processing, setProcessing] = useState(false);

    const webcamRefs = useRef([]);

    //  Fetch cameras with AUTH
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

    //  Capture frames (parallel + safe)
    const captureFrames = async () => {
        if (processing) return; //  prevent overlap
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
                if (r) updatedResults[r.cameraName] = r.data;
            });

            setResults(prev => ({ ...prev, ...updatedResults }));

        } finally {
            setProcessing(false);
        }
    };

    //  Better interval
    useEffect(() => {
        const interval = setInterval(captureFrames, 1500); //  1.5 sec
        return () => clearInterval(interval);
    }, [selectedCameras, processing]);

    return (
        <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Multi-Camera Live Stream</h2>

            <div className="flex flex-wrap justify-center gap-5">
                {selectedCameras.map((camName, i) => {
                    const result = results[camName];

                    return (
                        <div key={i} className="bg-white shadow rounded-xl p-3">
                            <Webcam
                                ref={webcamRefs.current[i]}
                                screenshotFormat="image/jpeg"
                                audio={false}
                                videoConstraints={{ width: 320, height: 240 }}
                            />

                            <div className="mt-2">
                                {result?.error && (
                                    <p className="text-red-500">Error</p>
                                )}

                                {result?.label && (
                                    <div className={`text-white p-2 rounded ${result.label === "Suspicious"
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                        }`}>
                                        <strong>{result.label}</strong>
                                        <div className="text-sm">
                                            {result.confidence}
                                        </div>
                                    </div>
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

export default MultiWebcam;