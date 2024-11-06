// components/Header.js
"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate check for user login status
    const userToken = localStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header className="bg-indigo-600 p-4 text-white shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">
          <Link href="/">
           <img src="/logo.svg" alt="Reputify Logo" className="h-8 inline-block mr-2" /> Reputify
          </Link>
        </div>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link href="/dashboard" className="hover:text-gray-300 transition duration-200">
              Dashboard
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className="hover:text-gray-300 transition duration-200">Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-300 transition duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-gray-200 transition duration-200">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
