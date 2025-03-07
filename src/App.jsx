import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./views/SignIn/ProtectedRoute";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Cart from "./views/Cart";
import Profile from "./components/Profile";
import Header from "./components/Header";
import { Box } from "@mui/material";
import AddProduct from "./views/AddProduct";

//import MainLayout from "./layouts/MainLayout";

function App() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Initialize useNavigate

  // Redirect to dashboard if authentication is successful
  useEffect(() => {
    console.log("App token", token);
    if (token) {
      console.log("navigate to dashboard from App");
      navigate("/dashboard");
    }
  }, [token]);

  const WithHeader = ({ children }) => (
    <>
      <Header />
      <Box sx={{ pt: 2 }}>{children}</Box>
    </>
  );
  return (
    <Routes>
      {/* <MainLayout> */}
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <WithHeader>
              <Home />
            </WithHeader>
          </ProtectedRoute>
        }
      />
      {/* </MainLayout> */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <WithHeader>
              <Cart />
            </WithHeader>
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <ProtectedRoute allowedUserTypes={["seller"]}>
            <WithHeader>
              <AddProduct />
            </WithHeader>
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute allowedUserTypes={["seller"]}>
            <WithHeader>
              <AddProduct />
            </WithHeader>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
