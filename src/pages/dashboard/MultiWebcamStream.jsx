import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import authApiClient from "../../services/auth-api-client";

const MultiWebcamStream = ({ availableCameraIds = ["camera1", "camera2", "camera3"] }) => {
    const webcamRefs = useRef([]);

    const [selectedCameraIds, setSelectedCameraIds] = useState([...availableCameraIds]);
    const [results, setResults] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    // initialize refs safely
    useEffect(() => {
        webcamRefs.current = availableCameraIds.map(
            (_, i) => webcamRefs.current[i] || React.createRef()
        );
    }, [availableCameraIds]);

    const captureFrames = async () => {
        if (isProcessing) return; //  prevent overlap
        setIsProcessing(true);

        try {
            const promises = selectedCameraIds.map(async (cameraId, index) => {
                const frame = webcamRefs.current[index]?.current?.getScreenshot();
                if (!frame) return null;

                try {
                    const { data } = await authApiClient.post('/api/detect-update/', {
                        image: frame,
                        camera_id: cameraId
                    });

                    return { cameraId, data };
                // eslint-disable-next-line no-unused-vars
                } catch (error) {
                    return {
                        cameraId,
                        data: { status: "Error", error: true }
                    };
                }
            });

            const resultsArray = await Promise.all(promises);

            const newResults = {};
            resultsArray.forEach(r => {
                if (r) newResults[r.cameraId] = r.data;
            });

            setResults(prev => ({ ...prev, ...newResults }));
        } finally {
            setIsProcessing(false);
        }
    };

    //  safer interval (reduce load)
    useEffect(() => {
        const interval = setInterval(() => {
            captureFrames();
        }, 1500); //  1.5 sec (recommended)

        return () => clearInterval(interval);
    }, [selectedCameraIds, isProcessing]);

    return (
        <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Multi-Camera Stream</h2>

            {/* Camera Selector */}
            <div className="mb-6">
                {availableCameraIds.map((_, index) => (
                    <select
                        key={index}
                        className="mx-2 p-2 border rounded"
                        value={selectedCameraIds[index]}
                        onChange={(e) => {
                            const newIds = [...selectedCameraIds];
                            newIds[index] = e.target.value;
                            setSelectedCameraIds(newIds);
                        }}
                    >
                        {availableCameraIds.map(id => (
                            <option key={id} value={id}>{id}</option>
                        ))}
                    </select>
                ))}
            </div>

            {/* Streams */}
            <div className="flex flex-wrap justify-center gap-6">
                {availableCameraIds.map((_, index) => {
                    const cameraId = selectedCameraIds[index];
                    const result = results[cameraId];

                    return (
                        <div key={index} className="bg-white shadow rounded-xl p-3">
                            <Webcam
                                ref={el => (webcamRefs.current[index] = { current: el })}
                                screenshotFormat="image/jpeg"
                                audio={false}
                                videoConstraints={{ width: 320, height: 240 }}
                            />

                            {/* Result UI */}
                            <div className="mt-2">
                                {result?.error && (
                                    <p className="text-red-500">Error detecting</p>
                                )}

                                {result?.label && (
                                    <div className={`p-2 rounded text-white ${result.label === "Suspicious"
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                        }`}>
                                        <p>{result.label}</p>
                                        <p className="text-sm">
                                            {result.confidence}
                                        </p>
                                    </div>
                                )}

                                {!result && (
                                    <p className="text-gray-400 text-sm">
                                        Waiting...
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultiWebcamStream;