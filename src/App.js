// src/App.js
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
   
  };

  const handleAccountCreation = (e) => {
    e.preventDefault();
    
    console.log('Creating account:', { username, password });
    
  };

  return (
    <div className="container mx-auto mt-5 p-8 bg-gray-100">
      <ul className="flex border-b">
        <li className="-mb-px mr-1">
          <a
            href="#userDetails"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
          >
            User Details
          </a>
        </li>
        <li className="mr-1">
          <a
            href="#accountCreation"
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
          >
            Account Creation
          </a>
        </li>
      </ul>

      <div className="mt-4">
        {/* User Details Tab */}
        <div id="userDetails" className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">User Details</h3>
          {/* Search bar */}
          <input
            type="text"
            className="form-input mb-4 w-full p-2 rounded"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* User details table */}
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Creation Date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) =>
                  user.username.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-100"
                    onClick={() => handleUserClick(user)}
                  >
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.createdAt}</td>
                    <td className="border px-4 py-2">
                      <button className="btn btn-sm btn-primary">Generate Report</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Account Creation Tab */}
        <div id="accountCreation">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Account Creation</h3>
          {/* Account creation form */}
          <form onSubmit={handleAccountCreation}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                className="form-input mt-1 block w-full p-2 rounded"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                className="form-input mt-1 block w-full p-2 rounded"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
