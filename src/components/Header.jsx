import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  return (
    <header className='max-w-7xl mx-auto p-5'>
      <div className="p-2 grid grid-cols-[2fr_1fr_2fr]">
        <div className='col-start-2 text-center'>
          <Link to={"/"} className='text-3xl col-start-2'>Flashcards</Link>
        </div>
        <div className='col-start-3 flex justify-end items-center'>
          <span onClick='' className="text-right">
            <i className='bi bi-person-circle text-3xl cursor-pointer'></i>
          </span>
          <input 
            className="bg-gray-100 w-23 mx-3 px-1" placeholder="User name"
            onFocus={() => setIsLogin(true)}
            onBlur={(e) => setIsLogin(e.target.value.length > 0)}
            onChange={(e) => setIsLogin(e.target.value.length > 0)}
          />
          <input className="bg-gray-100 w-23 px-1" placeholder="Password"
            onFocus={() => setIsLogin(true)}
            onBlur={(e) => setIsLogin(e.target.value.length > 0)}
            onChange={(e) => setIsLogin(e.target.value.length > 0)}
          />
          { isLogin ? (
            <button 
              className="w-20 bg-emerald-600 ml-3 text-white rounded px-2.5"
              onClick={() => console.log("login")}
            >
              Login
            </button>
          ) : (
            <button 
              className="w-20 bg-emerald-600 ml-3 text-white rounded px-2.5"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          ) }
        </div>
      </div>
    </header>
  )
}
