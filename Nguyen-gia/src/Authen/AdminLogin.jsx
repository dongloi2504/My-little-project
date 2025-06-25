import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

function AdminLogin() {
  const [UserEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login logic has been removed.');
  };

  return (
    <>
      <Helmet>
        <title>AIScannerStore | Login</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Hình minh họa */}
          <div className="hidden md:flex flex-1 items-center justify-center p-8 relative">
            <img src="/logo.png" alt="Login Illustration" className="max-w-full h-auto" />
            {/* Vạch phân cách */}
            <div className="absolute top-16 bottom-16 right-0 w-[2px] bg-gray-300" />
          </div>

          {/* Form login */}
          <div className="flex-1 p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={UserEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Input email"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input password"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                LOGIN
              </button>
            </form>

            <div className="text-center mt-4 text-sm text-gray-700">
              Contact Administration if you forgot your password
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
