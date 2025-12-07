import React, { useContext } from 'react'
import CartContext from './CartContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    let { setSidebarOpen } = useContext(CartContext)
  return (
    
   <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white shadow-md z-50">
  <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
    {/* Left: Logo or Brand */}
    <div className="flex items-center">
      <span className="font-bold text-xl">MyShop</span>
    </div>

    {/* Right: Search Bar, Register, Login */}
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded border border-white bg-white text-gray-800 focus:outline-none"
        />
      </div>
       {/* <a href="#" className="hover:text-blue-200">Home</a> */}
       <Link to="/products" className="hover:text-blue-200">Home</Link>
      <a href="#" className="hover:text-blue-200">About</a>
      <a href="#" className="hover:text-blue-200" onClick={() => setSidebarOpen(true)}>Cart</a>
      {/* <a href="#" className="hover:text-blue-200">Register</a>
      <a href="#" className="hover:text-blue-200">Login</a> */}
      <Link to="/register" className="hover:text-blue-200">Register</Link>
      <Link to="/login" className="hover:text-blue-200">Login</Link>
    </div>
  </div>
</nav>


  )
}

export default Navbar




