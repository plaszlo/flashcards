import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const navigate = useNavigate();

    const login = () => {
        setIsLoggedIn(true);
        navigate("/");
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/welcome");
    };

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