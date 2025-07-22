import sequelize from '../config/database.js';
import Company from '../Models/Company.js';
import { fetchScreenerData, fetchCompanyRatios } from '../Utils/fmpAPIhelper.js';

const seedCompanies = async () => {
  try {
    await sequelize.sync();
    const screener = await fetchScreenerData();

    for (const stock of screener) {
      console.log(` Processing ${stock.symbol}`);

      const ratios = await fetchCompanyRatios(stock.symbol);

      if (!ratios || typeof ratios !== 'object') {
        console.log(` No ratios for ${stock.symbol}`);
        continue;
      }

      const {
        priceEarningsRatio,
        returnOnEquity,
        returnOnCapitalEmployed,
        debtEquityRatio
      } = ratios;

      
      console.log(`👉 PE: ${priceEarningsRatio}, ROE: ${returnOnEquity}, ROCE: ${returnOnCapitalEmployed}, D/E: ${debtEquityRatio}`);

      
      const hasRequiredFields =
        priceEarningsRatio != null &&
        returnOnEquity != null &&
        returnOnCapitalEmployed != null;

      if (!hasRequiredFields) {
        console.log(`⏭️ Skipping ${stock.symbol} due to missing required fields.`);
        continue;
      }

      // Save to DB
      await Company.create({
        name: stock.companyName,
        symbol: stock.symbol,
        marketCap: stock.marketCap || 0,
        peRatio: priceEarningsRatio,
        ROE: returnOnEquity,
        ROCE: returnOnCapitalEmployed,
        debtToEquity: debtEquityRatio ?? 0,
        salesGrowth: 0,
        profitGrowth: 0
      });

      console.log(`✅ Saved ${stock.symbol}`);
      await new Promise((resolve) => setTimeout(resolve, 500));     }

    console.log(' All companies processed successfully!');
  } catch (err) {
    console.error(' Error seeding companies:', err);
  }
};

seedCompanies();
