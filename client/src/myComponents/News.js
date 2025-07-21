import React, { useEffect, useState } from 'react';

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('http://localhost:3001/news');
        const xmlText = await res.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'text/xml');
        const items = xml.querySelectorAll('item');

        const parsedNews = Array.from(items).map((item) => ({
          title: item.querySelector('title')?.textContent,
          link: item.querySelector('link')?.textContent,
          pubDate: item.querySelector('pubDate')?.textContent,
          description: item.querySelector('description')?.textContent
            ?.replace(/(<([^>]+)>)/gi, '') // Remove HTML tags
            ?.slice(0, 200) + '...', // Truncate description
        }));

        setNews(parsedNews);
      } catch (err) {
        console.error(err);
        setError('Failed to load news');
      }
    };

    fetchNews();
  }, []);

  if (error)
    return (
      <div className="p-4 text-red-600 text-center text-lg font-semibold ">
        {error}
      </div>
    );

  return (
    <div className=" min-h-screen  mx-auto p-6 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
        📈 Market News
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-700 hover:underline block mb-2"
            >
              {item.title}
            </a>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            <div className="text-gray-500 text-xs text-right">
              {new Date(item.pubDate).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
