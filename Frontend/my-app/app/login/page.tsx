// pages/login.js
"use client"
// pages/login.js
import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-600">Or login with:</p>
          <div className="flex space-x-4 mt-2">
            <a href="/api/auth/google" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Google
            </a>
            <a href="/api/auth/github" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
              GitHub
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
