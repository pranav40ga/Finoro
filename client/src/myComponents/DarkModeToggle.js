import React, { useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm text-black dark:text-white"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default DarkModeToggle;
