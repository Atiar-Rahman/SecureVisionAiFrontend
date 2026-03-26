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
    const fetchUserProfile = async () => {
        if (!authToken) return;
        setLoading(true);
        try {
            const response = await apiClient.get("/auth/users/me/", {
                headers: { Authorization: `JWT ${authToken?.access}` },
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
            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));

            await fetchUserProfile();
            return true;
        } catch (error) {
            console.log("Login error:", error?.response?.data || error);
            return false;
        } finally {
            setLoading(false);
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
        if (authToken) fetchUserProfile();
        else setLoading(false);
    }, []);

    const authInfo = {
        user,
        loading,
        loginUser,
        logoutUser,
        authToken,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthContext;