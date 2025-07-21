import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CompanyDetails = () => {
  const { symbol } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`http://localhost:3001/companies/${symbol}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Company not found');
          return;
        }

        setCompany(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch company data.');
      }
    };

    fetchCompany();
  }, [symbol]);

  if (error) return <div className="p-10 text-red-600">{error}</div>;

  if (!company) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10  dark:bg-gray-900 text-gray-900 dark:text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Company Details: {company.name}</h1>
      <table className="table-auto border-collapse border border-y-slate-400 dark:bg-slate-300 text-gray-900 dark:slate-300">
        <tbody>
          {Object.entries(company).map(([key, value]) => (
            <tr key={key}>
              <td className="border px-4 py-2 font-semibold">{key}</td>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyDetails;
