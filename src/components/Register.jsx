import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 


const Register = () => {
  const navigate = useNavigate(); 
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [agree, setAgree] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === email)) {
      alert("Email already registered!");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");

    navigate("/login"); 
    setEmail("");
    setPassword("");
    setAgree(false);
  };

  return (
    <form
      className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md mt-10"
      onSubmit={handleRegister}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="name@abc.com"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          required
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="w-4 h-4 border rounded focus:ring-2 focus:ring-blue-500"
          id="agree"
        />
        <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
          I agree with the{" "}
         
           <a href="#" className="text-blue-600 hover:underline">
            terms and conditions
          </a>
          .
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>

      
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default Register;


