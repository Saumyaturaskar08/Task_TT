import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<Products/>}/>
          <Route path="/product/:id" element={<ProductDetail />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
