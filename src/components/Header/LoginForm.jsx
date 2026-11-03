import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [isLoginButton, setisLoginButton] = useState(false);
    const navigate = useNavigate();

  return (
    <div className="flex">
        <input 
            className="bg-gray-100 w-23 mx-3 px-1" placeholder="User name"
            onFocus={() => setisLoginButton(true)}
            onBlur={(e) => setisLoginButton(e.target.value.length > 0)}
            onChange={(e) => setisLoginButton(e.target.value.length > 0)}
          />
          <input className="bg-gray-100 w-23 px-1" placeholder="Password"
            onFocus={() => setisLoginButton(true)}
            onBlur={(e) => setisLoginButton(e.target.value.length > 0)}
            onChange={(e) => setisLoginButton(e.target.value.length > 0)}
          />
          { isLoginButton ? (
            <button 
              className="w-20 text-emerald-600 ml-3 border-2 border-emerald-600 rounded px-2.5"
              onClick={() => console.log("login")}
            >
              Login
            </button>
          ) : (
            <button 
              className="w-20 text-emerald-600 ml-3 border-2 border-emerald-600 rounded px-2.5"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          ) }
    </div>
  )
}
