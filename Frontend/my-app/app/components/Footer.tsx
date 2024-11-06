// components/Footer.js
"use client"
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>&copy; {new Date().getFullYear()} Feedback App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
