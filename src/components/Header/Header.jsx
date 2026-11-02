import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LoggedInMenu, LoginForm } from "../../components";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className='max-w-7xl mx-auto p-5 dark:bg-slate-950'>
      <div className="p-2 grid grid-cols-[2fr_1fr_2fr]">
        <div className='col-start-2 text-center'>
          <Link to={"/"} className='text-3xl col-start-2 dark:text-slate-300'>Flashcards</Link>
        </div>
        <div className='col-start-3 flex justify-end items-center'>
          <span onClick={() => setDarkMode(!darkMode)} className="text-right">
            <i className='bi bi-moon-stars-fill mx-3 text-3xl cursor-pointer dark:text-slate-300' />
          </span>
          <span onClick='' className="text-right">
            <i 
              className={`bi bi-person-circle text-3xl cursor-pointer dark:text-slate-300 ${
                isLoggedIn && 'text-sky-600 dark:!text-sky-600'
              }`} 
              onClick={() => setShowUserPanel(!showUserPanel)}
            />
          </span>
          { showUserPanel && (
            isLoggedIn ? <LoggedInMenu /> : <LoginForm />
          )}
        </div>
      </div>
    </header>
  )
}
