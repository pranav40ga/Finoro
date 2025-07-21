// utils/fetchCompanyData.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.FMP_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

export const fetchCompanyRatios = async (symbol) => {
  const url = `${BASE_URL}/ratios/${symbol}?limit=1&apikey=${API_KEY}`;
  const res = await axios.get(url);
  return res.data[0]; // Latest year
};

export const fetchScreenerData = async () => {
  const url = `${BASE_URL}/stock-screener?limit=50&apikey=${API_KEY}`;
  const res = await axios.get(url);
  return res.data;
};
