// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Reputify - Enhance Your Feedback</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-indigo-100 ">
        <h1 className="text-5xl font-bold mb-4 text-center">Welcome to Reputify!</h1>
        <p className="text-lg mb-8 text-center">Streamline and manage user feedback effortlessly to build better user experiences.</p>
        <div className="flex space-x-4">
          <Link href="/dashboard">
            <p className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-200 transition duration-200">Register Your Organization</p>
          </Link>
          <Link href="/login">
            <p className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-200 transition duration-200">Login</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
