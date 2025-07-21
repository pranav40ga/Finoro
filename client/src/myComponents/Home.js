import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaApple, FaMicrosoft, FaGoogle, FaMicrochip } from 'react-icons/fa';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Handlesearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim() === '') {
      alert("Please enter a stock to search");
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/companies/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      const data = await res.json();

      if (!res.ok || data.length === 0) {
        setError(data.message || 'Search failed');
        return;
      }

      setError('');
      navigate(`/company/${data[0].symbol}`);
    } catch (error) {
      console.error('❌ Search failed:', error);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center dark:bg-gray-900 text-gray-900 dark:text-blue-900 px-4">
      <div className="-translate-y-20 text-center">
        {/* Logo & Title */}
         <div className="flex justify-center items-center text-5xl text-blue-700 font-bold mt-40">
          <img className="h-16 w-auto m-4" src="/Finoro-logo.png" alt="logo" />
           FINORO
         </div>

        {/* Subtitle */}
        <h1 className="mt-2 text-xl text-black font-serif dark:text-white">
          Stock analysis and screening tool for investors in India.
        </h1>

        {/* Search Form */}
        <form onSubmit={Handlesearch} className="mt-4 flex justify-center">
          <input
            className="w-4/5 h-12 border border-cyan-600 rounded-3xl text-center mx-1"
            type="text"
            placeholder="Search for a stock..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Analyze Section */}
        <h1 className="mt-6 text-lg font-medium">Or Analyze…</h1>

        <div className="mt-3 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate(`/company/GOOG`)}
            className="flex items-center gap-2 px-5 py-2 bg-white text-slate-500 border border-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            <FaGoogle />
            GOOG
          </button>

          <button
            onClick={() => navigate(`/company/NVDA`)}
            className="flex items-center gap-2 px-5 py-2 bg-white text-slate-500 border border-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            <FaMicrochip />
            NVDA
          </button>

          <button
            onClick={() => navigate(`/company/MSFT`)}
            className="flex items-center gap-2 px-5 py-2 bg-white text-slate-500 border border-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            <FaMicrosoft />
            MSFT
          </button>

          <button
            onClick={() => navigate(`/company/AAPL`)}
            className="flex items-center gap-2 px-5 py-2 bg-white text-slate-500 border border-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            <FaApple />
            AAPL
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Home;

