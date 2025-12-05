import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let UserList = () => {
  const navigate = useNavigate(); 
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    // localStorage.clear(); 
    navigate("/login"); 
  };

  if (loading) return <p className="text-lg font-semibold p-4">Loading users...</p>;
  if (error) return <p className="text-red-500 font-semibold p-4">{error}</p>;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users List</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 w-52 rounded"
        />
        <button
          onClick={fetchUsers}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Users
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {users
          .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
          .map((user) => (
            <div
              key={user.id}
              className="border border-gray-300 p-4 rounded shadow-sm"
            >
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">City:</span> {user.address.city}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;


