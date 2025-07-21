import React, { useState } from 'react';

const Screener = () => {
  const [filters, setFilters] = useState({
    minROCE: '',
    maxROCE: '',
    minPE: '',
    maxPE: '',
    minMarketCap: '',
    maxMarketCap: ''
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/companies/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      });

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error filtering companies:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-blue-900 px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Stock Screener</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-5xl mx-auto"
      >
        <input
          type="number"
          name="minROCE"
          placeholder="Min ROCE"
          value={filters.minROCE}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="maxROCE"
          placeholder="Max ROCE"
          value={filters.maxROCE}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="minPE"
          placeholder="Min P/E Ratio"
          value={filters.minPE}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="maxPE"
          placeholder="Max P/E Ratio"
          value={filters.maxPE}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="minMarketCap"
          placeholder="Min Market Cap (Cr)"
          value={filters.minMarketCap}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="maxMarketCap"
          placeholder="Max Market Cap (Cr)"
          value={filters.maxMarketCap}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </form>

      {results.length > 0 && (
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="w-full border-collapse bg-white dark:bg-slate-600 dark:text-slate-200">
            <thead>
              <tr className="bg-blue-100 dark:bg-slate-400">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Symbol</th>
                <th className="p-2 border">ROCE (%)</th>
                <th className="p-2 border">P/E Ratio</th>
                <th className="p-2 border">Market Cap (Cr)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((company, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{company.name}</td>
                  <td className="p-2 border">{company.symbol}</td>
                  <td className="p-2 border">{company.ROCE ?? 'N/A'}</td>
                  <td className="p-2 border">{company.peRatio ?? 'N/A'}</td>
                  <td className="p-2 border">{company.marketCap ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">No companies match the filters.</p>
      )}
    </div>
  );
};

export default Screener;
