import { Navigate } from "react-router-dom";

export const RedirectRoute = ({children, condition, redirectPath}) => {
    return condition ?  children : <Navigate to={redirectPath} replace />
}
