import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Something went wrong');
        return;
      }
      localStorage.setItem('user', JSON.stringify(data.user));

      alert('Logged in successfully!');
      setEmail('');
      setPassword('');
      navigate('/'); 
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-blue-900 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md dark:bg-slate-200 text-gray-900 dark:text-blue-900 px-4">
        <div className="flex flex-col items-center mb-6 ">
          <img src="/Finoro-logo.png" alt="Finoro Logo" className="h-16 w-auto mb-2 border rounded-2xl" />
          <h2 className="text-2xl font-bold text-blue-700">Login to Finoro</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-left font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pranav@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-left font-medium mb-1 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
