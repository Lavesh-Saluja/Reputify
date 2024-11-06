// pages/register.js
"use client"
// pages/register.js
import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };
  const login = () => {
  window.location.href = 'http://localhost:8080/oauth2/authorization/github';
}
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96">
          <input
            type="text"
            placeholder="Email"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            placeholder="Password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Register
          </button>
        </form>
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-600">Or register with:</p>
          <div className="flex space-x-4 mt-2">
            <a href="/api/auth/google" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Google
            </a>
            <a onClick={login} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
              GitHub
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
