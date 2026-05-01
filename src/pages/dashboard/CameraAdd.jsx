import React from 'react';
import { useForm } from 'react-hook-form';
import authApiClient from '../../services/auth-api-client';
import Swal from 'sweetalert2';

const CameraAdd = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            data.fps = parseInt(data.fps) || 0;

            // eslint-disable-next-line no-unused-vars
            const res = await authApiClient.post('/api/cameras/', data);

            Swal.fire("Success!", "Camera added successfully", "success");
            reset();

        } catch (error) {
            console.log(error.response?.data);
            Swal.fire("Error!", "Failed to add camera", "error");
        }
    };

    return (
        <div className="flex justify-center bg-base-200">
            <div className="bg-base-100 shadow-lg rounded-2xl w-full md:w-1/2 lg:w-2/3">

                <h1 className="text-xl font-bold mb-4 text-center">
                    Add Camera
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Camera Name"
                            className="w-full p-2 border rounded"
                            {...register("name", { required: true, maxLength: 100 })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full p-2 border rounded"
                            {...register("location", { maxLength: 200 })}
                        />
                    </div>

                    {/* Camera Type */}
                    <div>
                        <select
                            className="w-full p-2 border rounded"
                            {...register("camera_type", { required: true })}
                        >
                            <option value="">Select Camera Type</option>
                            <option value="webcam" className="bg-gray-400">Webcam</option>
                            <option value="ip_camera" className="bg-gray-400">IP Camera</option>
                        </select>
                        {errors.camera_type && (
                            <p className="text-red-500 text-sm">Camera type required</p>
                        )}
                    </div>

                    {/* Stream URL */}
                    <div>
                        <input
                            type="text"
                            placeholder="Stream URL / Device ID"
                            className="w-full p-2 border rounded"
                            {...register("stream_url", { required: true })}
                        />
                        {errors.stream_url && (
                            <p className="text-red-500 text-sm">Stream URL required</p>
                        )}
                    </div>

                    {/* FPS */}
                    <div>
                        <input
                            type="number"
                            placeholder="FPS (e.g. 10)"
                            className="w-full p-2 border rounded"
                            {...register("fps")}
                        />
                    </div>

                    {/* Resolution */}
                    <div>
                        <input
                            type="text"
                            placeholder="Resolution (e.g. 640x480)"
                            className="w-full p-2 border rounded"
                            {...register("resolution", { maxLength: 20 })}
                        />
                    </div>

                    {/* Toggles */}
                    <div className="flex justify-between">

                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("is_active")} />
                            Active
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("ai_enabled")} />
                            AI Enabled
                        </label>

                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Add Camera
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CameraAdd;