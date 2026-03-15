/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const MultiWebcamStream = ({ availableCameraIds = ["camera1", "camera2", "camera3"] }) => {
    // Dynamic refs for all webcams
    const webcamRefs = useRef(availableCameraIds.map(() => React.createRef()));

    // State for user-selected camera IDs
    const [selectedCameraIds, setSelectedCameraIds] = useState([...availableCameraIds]);

    // State to hold predictions per camera
    const [results, setResults] = useState({});

    // Capture frames for all cameras
    const captureFrames = async () => {
        const promises = selectedCameraIds.map(async (cameraId, index) => {
            const frame = webcamRefs.current[index].current?.getScreenshot();
            if (!frame) return null;

            try {
                const { data } = await axios.post(
                    "http://127.0.0.1:8000/api/detect-update/",
                    { image: frame, camera_id: cameraId }
                );

                return { cameraId, data };
            } catch (error) {
                console.error(
                    "API Error for camera",
                    cameraId,
                    error.response?.data || error.message
                );
                return null;
            }
        });

        const resultsArray = await Promise.all(promises);
        const newResults = {};
        resultsArray.forEach(r => {
            if (r) newResults[r.cameraId] = r.data;
        });

        setResults(prev => ({ ...prev, ...newResults }));
    };

    // Periodic capture
    useEffect(() => {
        const interval = setInterval(() => {
            captureFrames();
        }, 500); // 500ms interval recommended

        return () => clearInterval(interval);
    }, [selectedCameraIds]);

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Multi-Camera Stream</h2>

            {/* Camera ID selection */}
            <div style={{ marginBottom: "20px" }}>
                {availableCameraIds.map((_, index) => (
                    <label key={index} style={{ marginRight: "20px" }}>
                        Camera {index + 1} ID:
                        <select
                            value={selectedCameraIds[index]}
                            onChange={e => {
                                const newIds = [...selectedCameraIds];
                                newIds[index] = e.target.value;
                                setSelectedCameraIds(newIds);
                            }}
                        >
                            {availableCameraIds.map(id => (
                                <option key={id} value={id}>
                                    {id}
                                </option>
                            ))}
                        </select>
                    </label>
                ))}
            </div>

            {/* Webcam streams */}
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {availableCameraIds.map((_, index) => {
                    const cameraId = selectedCameraIds[index];
                    const result = results[cameraId];

                    return (
                        <div key={index} style={{ textAlign: "center" }}>
                            <Webcam
                                ref={webcamRefs.current[index]}
                                screenshotFormat="image/jpeg"
                                audio={false}
                                videoConstraints={{ width: 320, height: 240 }}
                            />
                            {result && result.label && (
                                <div
                                    style={{
                                        backgroundColor: result.label === "Suspicious" ? "red" : "green",
                                        color: "white",
                                        padding: "5px",
                                        marginTop: "5px",
                                    }}
                                >
                                    <h4>{result.label}</h4>
                                    <h5>Confidence: {result.confidence}</h5>
                                </div>
                            )}
                            {/* Optional: show status while collecting frames */}
                            {result && !result.label && (
                                <div style={{ marginTop: "5px", color: "orange" }}>
                                    {result.status || "Collecting frames..."}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultiWebcamStream;