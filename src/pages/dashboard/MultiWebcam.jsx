/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const MultiWebcam = () => {
    // eslint-disable-next-line no-unused-vars
    const [cameras,setCameras] = useState([]);
    const [selectedCameras, setSelectedCameras] = useState([]);
    const [results, setResults] = useState({});
    const webcamRefs = useRef([]);

    // Fetch cameras from backend
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/camera-list/").then(res => {
            setCameras(res.data);
            setSelectedCameras(res.data.map(cam => cam.name));
            webcamRefs.current = res.data.map(() => React.createRef());
        });
    }, []);

    // Capture frames and send to backend
    const captureFrames = async () => {
        for (let i = 0; i < selectedCameras.length; i++) {
            const cameraName = selectedCameras[i];
            const frame = webcamRefs.current[i].current?.getScreenshot();
            if (!frame) continue;

            try {
                const res = await axios.post("http://127.0.0.1:8000/api/detection/", {
                    image: frame,
                    camera_name: cameraName
                });
                setResults(prev => ({ ...prev, [cameraName]: res.data }));
            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        }
    };

    // Periodic capture
    useEffect(() => {
        const interval = setInterval(captureFrames, 500);
        return () => clearInterval(interval);
    }, [selectedCameras]);

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Multi-Camera Live Stream</h2>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                {selectedCameras.map((camName, i) => {
                    const result = results[camName];
                    return (
                        <div key={i} style={{ textAlign: "center" }}>
                            <Webcam
                                ref={webcamRefs.current[i]}
                                screenshotFormat="image/jpeg"
                                audio={false}
                                videoConstraints={{ width: 320, height: 240 }}
                            />
                            {result && (
                                <div style={{
                                    marginTop: 5,
                                    padding: 5,
                                    color: "white",
                                    backgroundColor: result.label === "Suspicious" ? "red" : "green",
                                    borderRadius: 5
                                }}>
                                    <strong>{result.label}</strong>
                                    <div>Confidence: {result.confidence}</div>
                                </div>
                            )}
                            <small>{camName}</small>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultiWebcam;