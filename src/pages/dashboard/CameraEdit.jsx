import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import authApiClient from "../../services/auth-api-client";
import Swal from "sweetalert2";

const CameraEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(true);

    // For controlled select
    const [status, setStatus] = useState("online");

    // Fetch camera data
    useEffect(() => {
        const fetchCamera = async () => {
            try {
                const res = await authApiClient.get(`/api/cameras/${id}/`);
                const camera = res.data;

                // Ensure status is string for select
                camera.status = camera.status === "online" || camera.status === true ? "online" : "offline";

                // Ensure checkboxes are boolean
                camera.is_active = !!camera.is_active;
                camera.ai_enabled = !!camera.ai_enabled;

                // Pre-fill form
                reset(camera);
                setStatus(camera.status);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCamera();
    }, [id, reset]);

    // Update camera
    const onSubmit = async (data) => {
        try {
            // Convert fps to number
            data.fps = parseInt(data.fps) || 0;

            // Ensure status is correct
            data.status = status;

            // Ensure checkboxes are boolean
            data.is_active = !!data.is_active;
            data.ai_enabled = !!data.ai_enabled;

            await authApiClient.patch(`/api/cameras/${id}/`, data);

            Swal.fire("Updated!", "Camera updated successfully", "success");
            navigate("/dashboard/camera-list");
        } catch (error) {
            console.log(error.response?.data);
            Swal.fire("Error!", "Update failed", "error");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="flex justify-center">
            <div className="bg-base-100 shadow-lg rounded-2xl w-full md:w-1/2 lg:w-2/3">
                <h1 className="text-xl font-bold mb-4 text-center">Edit Camera</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <input {...register("name")} placeholder="Name" className="w-full p-2 border rounded" />
                    <input {...register("location")} placeholder="Location" className="w-full p-2 border rounded" />

                    <select {...register("camera_type")} className="w-full p-2 border rounded">
                        <option value="webcam" className="bg-gray-400">Webcam</option>
                        <option value="ip_camera" className="bg-gray-400">IP Camera</option>
                    </select>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded "
                    >
                        <option value="online" className="bg-gray-400">Online</option>
                        <option value="offline" className="bg-gray-400">Offline</option>
                    </select>

                    <input {...register("stream_url")} placeholder="Stream URL" className="w-full p-2 border rounded" />
                    <input {...register("fps")} type="number" placeholder="FPS" className="w-full p-2 border rounded" />
                    <input {...register("resolution")} placeholder="Resolution" className="w-full p-2 border rounded" />

                    <div className="flex justify-between mt-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("is_active")} />
                            Active
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("ai_enabled")} />
                            AI Enabled
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mt-3">
                        Update Camera
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CameraEdit;