import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Re-check user on every route change
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center sticky top-0 z-50 py-2 backdrop:blur-lg bg-gray-200 px-6 dark:bg-gray-900 text-black dark:text-white shadow-md">
      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-2">
          <img className="h-14 w-auto" src="/Finoro-logo.png" alt="logo" />
          <Link to="/" className="text-xl tracking-tight text-blue-400 font-bold">FINORO</Link>
        </div>

        <ul className="flex space-x-8">
          <li><Link to="/screnner" className="font-semibold text-lg">Screener</Link></li>
          <li><Link to="/news" className="font-semibold text-lg">News</Link></li>
        </ul>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        <DarkModeToggle />
        {user ? (
          <button
            onClick={handleLogout}
            className=" bg-black dark:bg-slate-600 px-5 py-2 rounded-3xl text-white font-medium hover:bg-slate-400 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="border bg-black px-5 py-2 rounded-3xl text-white font-medium"
          >
            Login / Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
