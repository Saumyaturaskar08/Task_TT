// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Register from './components/Register';
// import Login from './components/Login';
// import UserList from './components/UserList';
// import Products from "./components/Products";
// import ProductDetail from "./components/ProductDetail";
// import Navbar from "./components/Navbar";


// function App() {
//   return (
    
//     <Router>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Register />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/users" element={<UserList />} />
//           <Route path="/products" element={<Products/>}/>
//           <Route path="/product/:id" element={<ProductDetail />} />
//           {/* navbar */}
//           {/* <Route path="/navbar" element={<Navbar />}/> */}
                    

//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import CartContext from "./components/CartContext";

function App() {
  // by passing as data in product
  let [cartItems, setCartItems] = useState([]);
  let [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <CartContext.Provider value={{ cartItems, setCartItems, sidebarOpen, setSidebarOpen }}>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <Navbar />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </CartContext.Provider>
    </Router>
  );
}

export default App;
