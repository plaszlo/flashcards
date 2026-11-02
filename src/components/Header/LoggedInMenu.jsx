import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoggedInMenu = () => {
    const { setIsLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

  return (
    <div className="flex">
        <button 
            className="w-20 text-sky-600 ml-3 border-2 border-sky-600 rounded px-2.5"
            onClick={() => navigate("/settings")}
        >
            Settings
        </button>
        <button 
            className="w-20 text-red-600 ml-3 border-2 border-red-600 rounded px-2.5"
            onClick={() => setIsLoggedIn(false)}
        >
            Logout
        </button>
    </div>
  )
}
