import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./views/SignIn/ProtectedRoute";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Initialize useNavigate

  // Redirect to dashboard if authentication is successful
  useEffect(() => {
    console.log('token', token);
    if (token) {
      console.log('navigate to dashboard from App');
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
