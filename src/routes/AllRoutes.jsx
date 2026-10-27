import { Routes, Route } from "react-router-dom";
import { Home, Register, PageNotFound } from "../pages";

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        <Route path='/*' element={<PageNotFound />} />
    </Routes>
  )
}
