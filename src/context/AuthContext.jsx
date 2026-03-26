import { createContext, useState, useEffect } from "react";
import apiClient from "../services/api-client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthTokens] = useState(() => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    });

    // Fetch user profile
    const fetchUserProfile = async (token = authToken) => {
        if (!token) return;
        setLoading(true);

        try {
            const response = await apiClient.get("/auth/users/me/", {
                headers: { Authorization: `JWT ${token?.access}` },
            });
            setUser(response.data);
        } catch (error) {
            console.log("Fetch profile error:", error);
            setUser(null);
            setAuthTokens(null);
            localStorage.removeItem("authTokens");
        } finally {
            setLoading(false);
        }
    };

    // Login user
    // Returns true if login successful, false if failed
    const loginUser = async (userData) => {
        setLoading(true);
        try {
            const response = await apiClient.post("/auth/jwt/create/", userData);

            const tokens = response.data;

            setAuthTokens(tokens);
            localStorage.setItem("authTokens", JSON.stringify(tokens));

            // 🔥 Pass fresh token
            await fetchUserProfile(tokens);

            return true;
        } catch (error) {
            console.log("Login error:", error?.response?.data || error);
            return false;
        } finally {
            setLoading(false);
        }
    };
    

    // register user
    const registerUser = async (userData) => {
        try {
            await apiClient.post('/auth/users/', userData);
            return true;
        } catch (error) {
            console.log(error.response?.data);
            return false;
        }
    };

    // Logout user
    const logoutUser = () => {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem("authTokens");
    };

    // Automatically fetch profile if token exists
    useEffect(() => {
        if (authToken) {
            fetchUserProfile(authToken);
        } else {
            setLoading(false);
        }
    }, [authToken]);

    const authInfo = {
        user,
        loading,
        setLoading,
        loginUser,
        registerUser,
        logoutUser,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthContext;