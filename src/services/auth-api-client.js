import axios from "axios";

const authApiClient = axios.create({
    // baseURL:'https://securevisionaibackend.onrender.com'
    baseURL: 'http://127.0.0.1:8000/'
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

export const deleteAlert = async (alertId) => {
    await authApiClient.delete(`/api/alerts/${alertId}/`);
};

export const detectLiveFrame = async ({ cameraName, image, mode = "standard" }) => {
    const endpoint = mode === "3dcnn" ? "/api/detection-3dcnn/" : "/api/detection/";
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
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });

    return data;
};

