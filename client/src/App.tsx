import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { LoginPage } from "./pages/Login/LoginPage";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";
import { SignupPage } from "./pages/Register/SignupPage";
import { UpdateProfile } from "./pages/UpdateProfile/UpdateProfile";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/updateProfile"
          element={<ProtectedRoute element={<UpdateProfile />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
