import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Nopage from "./pages/nopage/Nopage";
import MyState from "./context/data/myState";
import AllProducts from "./pages/allproducts/AllProducts";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProducts from "./pages/admin/pages/AddProducts";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";

const App = () => {
  return (
    <div>
      <MyState>
        <Router>
          <Routes>
            <Route element={<Home />} path={"/"} />
            <Route
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
              path={"/order"}
            />
            <Route element={<Cart />} path={"/cart"} />
            <Route
              element={
                <ProctedRouteForAdmin>
                  <Dashboard />
                </ProctedRouteForAdmin>
              }
              path={"/dashboard"}
            />
            <Route element={<Nopage />} path={"/*"} />
            <Route element={<AllProducts />} path={"/allproducts"} />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<ProductInfo />} path="/productinfo/:id" />
            <Route
              element={
                <ProctedRouteForAdmin>
                  <AddProducts />
                </ProctedRouteForAdmin>
              }
              path="/addproducts"
            />
            <Route
              element={
                <ProctedRouteForAdmin>
                  <UpdateProduct />
                </ProctedRouteForAdmin>
              }
              path="/updateproducts"
            />
          </Routes>
          <ToastContainer />
        </Router>
      </MyState>
    </div>
  );
};

export default App;

// procted route for user
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    <Navigate to={"/login"} />;
  }
};

// procted route for admin

export const ProctedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(window.localStorage.getItem("user"));
  console.log(admin, "admin");
  if (admin.user.email === "admin@gmail.com") {
    return children;
  } else {
    <Navigate to={"/login"} />;
  }
};
