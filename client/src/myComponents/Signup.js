import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const { username, email, password } = formData;

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (password && !passwordRegex.test(password)) {
      newErrors.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');
    setSuccessMessage('');

    try {
      const res = await fetch('http://localhost:3001/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || 'Something went wrong. Please try again.');
        return;
      }

      // Success
      setSuccessMessage('User created successfully! Please check your email to verify.');
      setFormData({
        username: '',
        email: '',
        password: '',
      });
      setErrors({});
    } catch (err) {
      console.error('Signup failed:', err);
      setServerError('Server error. Please try again later.');
    } finally {
      setTimeout(() => setLoading(false), 3000); // Disable button for 3 seconds
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-blue-900">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md dark:bg-slate-300">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/Finoro-logo.png"
            alt="Finoro Logo"
            className="h-16 w-auto mb-2 border rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-blue-700">Create an Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['username', 'email', 'password'].map((field) => (
            <div key={field}>
              <label className="block text-left font-medium mb-1 text-gray-700 capitalize">
                {field}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              {errors[field] && (
                <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          {serverError && (
            <p className="text-sm text-red-600 text-center">{serverError}</p>
          )}

          {successMessage && (
            <p className="text-sm text-green-600 text-center">{successMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
