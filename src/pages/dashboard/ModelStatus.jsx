import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api-client';
import Loading from '../Error&loading/Loading';

const ModelStatus = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await apiClient.get('/');
                setStatus(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load model status");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    // Loading UI
    if (loading) {
        return <Loading/>
    }

    // Error UI
    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    return (
        <div className="p-6 flex justify-center">
            <div className="bg-base-100 shadow-lg rounded-2xl p-6 w-87.5 text-center">

                <h1 className="text-xl font-bold mb-4">Model Status</h1>

                {/* Status Badge */}
                <div className="my-3">
                    <span className="px-10 py-3 rounded-full bg-green-100 text-green-600 text-sm">
                        {status?.status || "Running"}
                    </span>
                </div>

                {/* Message */}
                <p className="text-gray-100 mb-2">
                    {status?.message || "SecureVisionAI Model Running"}
                </p>

                {/* Extra Info */}
                {status?.timestamp && (
                    <p className="text-xs text-gray-100">
                        {new Date(status.timestamp).toLocaleString()}
                    </p>
                )}

            </div>
        </div>
    );
};

export default ModelStatus;