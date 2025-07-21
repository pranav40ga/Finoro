import React from 'react';

const Support = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 text-gray-800 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Support</h1>

      <p className="text-lg mb-8 text-center">
        Need help with Finoro? You’re in the right place.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">📬 Contact Us</h2>
        <p>
          If you have questions, suggestions, or face any issues, feel free to email us at:
          <span className="text-blue-600 font-medium ml-1">pranavchalisgaonkar077@gmail.com</span>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">💡 Frequently Asked Questions</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>How do I search for a stock?</li>
          <li>Is Finoro’s data real-time?</li>
          <li>Can I analyze financial ratios?</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🤝 Community</h2>
        <p>
          Join our Telegram or Discord community to connect with other investors and ask questions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🛠 Technical Issues</h2>
        <p>
          Having trouble using Finoro? Try refreshing the page or clearing your browser cache.
          If that doesn’t help, please email us with a screenshot and a brief explanation.
        </p>
      </section>

      <p className="text-center mt-16 text-sm text-gray-500">
        Finoro was created with ❤️ by <span className="font-semibold text-gray-700">Pranav</span>.
        We appreciate your support and feedback.
      </p>
    </div>
  );
};

export default Support;
