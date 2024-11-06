// pages/register.js
"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/navigation';
import useLoggedIn from '../../hooks/useLoggedIn';  
const Register = () => {
  const [orgDetails, setOrgDetails] = useState({
    name: '',
    description: '',
    logo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterOrganization = async (e) => {
    e.preventDefault();
    // Post new organization to the backend (assuming the endpoint exists)
    await fetch('/api/organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orgDetails),
    });
    // Reset form
    setOrgDetails({ name: '', description: '', logo: '' });
    // Optionally redirect or show a success message
  };
 const { loggedIn, loading } = useLoggedIn();
  const router = useRouter();
  useEffect(() => {
    // Redirect to /register if not logged in and loading is complete
    if (!loading && !loggedIn) {
      router.replace('/signup');
    }
  }, [loading, loggedIn, router]);
  return (
    <div>
      <Head>
        <title>Register Organization</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Register Organization</h1>
        <form onSubmit={handleRegisterOrganization} className="bg-white p-6 rounded shadow-md w-96">
          <input
            type="text"
            name="name"
            placeholder="Organization Name"
            value={orgDetails.name}
            onChange={handleInputChange}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={orgDetails.description}
            onChange={handleInputChange}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="logo"
            placeholder="Logo URL"
            value={orgDetails.logo}
            onChange={handleInputChange}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Register Organization
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
