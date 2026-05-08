import apiClient from "./api-client";

const warmupToken = import.meta.env.VITE_MODEL_WARMUP_TOKEN;

let warmupPromise = null;
let warmedUp = false;

const getWarmupHeaders = () => (
    warmupToken
        ? { "X-Warmup-Token": warmupToken }
        : undefined
);

export const triggerModelWarmup = async () => {
    if (warmedUp) {
        return null;
    }

    if (warmupPromise) {
        return warmupPromise;
    }

    warmupPromise = apiClient.get("/api/warmup/", {
        headers: getWarmupHeaders(),
    })
        .then((response) => {
            warmedUp = true;
            return response.data;
        })
        .catch((error) => {
            warmupPromise = null;
            throw error;
        });

    return warmupPromise;
};

