import { Routes, Route } from "react-router-dom";
import { Home, Register, PageNotFound, Settings, Welcome } from "../pages";

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="welcome" element={<Welcome/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        <Route path='/*' element={<PageNotFound />} />
        <Route path='/settings' element={<Settings />} />
    </Routes>
  )
}
