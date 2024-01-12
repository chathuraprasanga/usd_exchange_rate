const express = require('express')
const axios = require('axios')

const app = express()
const PORT = 3000
const usdUrl = 'https://www.cbsl.gov.lk/cbsl_custom/charts/usd/oneweek.php'

//Create an API to fetch usdUrl data
app.get('/exchangeRate', async (req, res) => {
  try {
    const response = await axios.get(usdUrl);
    const apiData = response.data;

    const rates = fetchExchangeRates(apiData);

    const jsonData = {
      currency: "USD/LKR",
      rates: rates,
    };

    res.status(200).json(jsonData);

  } catch (error) {

    res.status(500).json({ 'message': 'Internal Server Error' });
  }
});

// fetch exchange rates to map
function fetchExchangeRates(apiData) {
  const lines = apiData.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');

  return nonEmptyLines.map(line => {
    const [date, rate] = line.split('\t');
    return { date, rate: parseFloat(rate).toFixed(1) };
  });
}

// run application
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})
