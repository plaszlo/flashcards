import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/authUtils";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const isLoggedIn = !!(token && !isTokenExpired(token));

    const navigate = useNavigate();

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        navigate("/");
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/welcome");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token");
            setToken(null);
            return;
        }

        const decoded = jwtDecode(token);
        const timeUntilExpiry = decoded.exp * 1000 - Date.now();

        const timeout = setTimeout(() => {
            logout();
            toast.info("Session expired. Please log in again.");
        }, timeUntilExpiry);

        return () => clearTimeout(timeout);

    },[token]);

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}