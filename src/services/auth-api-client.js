import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const authApiClient = axios.create({
    baseURL,
});

export default authApiClient;

authApiClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('authTokens')
    if(token){
        config.headers.Authorization = `JWT ${JSON.parse(token)?.access}`
    }
    return config;
},(error)=>Promise.reject(error))

export const fetchCameras = async () => {
    const { data } = await authApiClient.get("/api/cameras/");
    return data;
};

export const fetchCameraList = async () => {
    const { data } = await authApiClient.get("/api/camera-list/");
    return data;
};

export const fetchAlerts = async () => {
    const { data } = await authApiClient.get("/api/alerts/");
    return Array.isArray(data) ? data : [];
};

export const fetchVideoPredictions = async () => {
    const { data } = await authApiClient.get("/api/video-predictions/");
    return Array.isArray(data) ? data : [];
};

export const fetchVideoPredictionById = async (predictionId) => {
    const { data } = await authApiClient.get(`/api/video-predictions/${predictionId}/`);
    return data;
};

export const deleteAlert = async (alertId) => {
    await authApiClient.delete(`/api/alerts/${alertId}/`);
};

export const detectLiveFrame = async ({ cameraName, image, mode = "standard" }) => {
    const endpointMap = {
        standard: "/api/detection/",
        skip: "/api/detection-skip/",
        "3dcnn": "/api/detection-3dcnn/",
    };

    const endpoint = endpointMap[mode] || endpointMap.standard;
    const { data } = await authApiClient.post(endpoint, {
        camera_name: cameraName,
        image,
    });
    return data;
};

export const uploadVideoPrediction = async ({ cameraId, video, onUploadProgress }) => {
    const formData = new FormData();
    formData.append("camera", cameraId);
    formData.append("video", video);

    const { data } = await authApiClient.post("/api/video-predictions/", formData, {
        onUploadProgress,
    });

    return data;
};
