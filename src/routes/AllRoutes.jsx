import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Routes, Route } from "react-router-dom";
import { Home, PageNotFound, Settings, Welcome } from "../pages";
import { RedirectRoute } from "./RedirectRoute";

export const AllRoutes = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <RedirectRoute condition={isLoggedIn} redirectPath="/welcome"><Home /></RedirectRoute>
                }
            />

            <Route 
                path="welcome" 
                element={
                    <RedirectRoute condition={!isLoggedIn} redirectPath="/"><Welcome /></RedirectRoute>
                }
            />

            <Route
                path='/settings'
                element={
                    <RedirectRoute condition={isLoggedIn} redirectPath="/welcome"><Settings /></RedirectRoute>
                } 
            />

            <Route path='/*' element={<PageNotFound />} />
        </Routes>
    )
}
