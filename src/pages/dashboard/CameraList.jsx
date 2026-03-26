import { useEffect, useState } from 'react';
import authApiClient from '../../services/auth-api-client';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const CameraList = () => {
    const [cameras, setCameras] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCamera = async () => {
        setLoading(true);
        try {
            const res = await authApiClient.get('/api/cameras/');
            setCameras(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCamera();
    }, []);

    // 🔥 Delete Camera
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This camera will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await authApiClient.delete(`/api/cameras/${id}/`);
                setCameras(cameras.filter(cam => cam.id !== id));

                Swal.fire("Deleted!", "Camera removed successfully.", "success");
            } catch (error) {
                Swal.fire("Error!", "Delete failed.", "error",error);
            }
        }
    };
    
    // 🔥 Edit Camera (simple redirect or modal)
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/dashboard/camera-edit/${id}`);
    };

    if (loading) {
        return <p className="text-center mt-10">Loading cameras...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Cameras ({cameras.length})</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cameras.map((cam) => (
                    <div key={cam.id} className="bg-base-100 shadow-md rounded-2xl p-4 border">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">{cam.name}</h2>

                            <span className={`px-2 py-1 text-xs rounded-full 
                                ${cam.status === 'online' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {cam.status}
                            </span>
                        </div>

                        {/* Info */}
                        <p className="text-sm text-gray-600">📍 {cam.location}</p>
                        <p className="text-sm text-gray-600">🎥 {cam.camera_type}</p>
                        <p className="text-sm text-gray-600">FPS: {cam.fps}</p>

                        {/* AI status */}
                        <p className="text-sm mt-2">
                            AI: {cam.ai_enabled ? "✅ Enabled" : "❌ Disabled"}
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleEdit(cam.id)}
                                className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(cam.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default CameraList;