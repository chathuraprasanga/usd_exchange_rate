//Developer one- kaveesha

//to establish a server
const express = require('express') //call express
const axios = require('axios') //call axos
// Developer three Chathura
const moment = require('moment') // call moment 

const app = express()
const PORT = 3000
const usdUrl = 'https://www.cbsl.gov.lk/cbsl_custom/charts/usd/oneweek.php'

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

//Developer two Isuru
//Create an API to fetch usdUrl data
app.get('/exchangeRate',async(req,res)=>{
  // error handling
    //dev 3
  try{
  const response = await axios.get(usdUrl);
  const apiData =  response.data;
  const lines = apiData.split('\n');

  const nonEmptyLines = lines.filter(line => line.trim() !== '');

  const today = moment().format('YYYY-MM-DD');
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');


  const rates = nonEmptyLines.map(line => {
    const [date, rate] = line.split('\t');
    return {date, rate: parseFloat(rate).toFixed(1) };
  });

  // take only rates today and yesterday
  // dev 3
  const filteredRates = rates.filter(rate => rate.date === today || rate.date === yesterday);

  const jsonData = {
    currency: "USD/LKR",
    rates: filteredRates,
  };

  // console.log(jsonData)
  res.status(200).json(jsonData);

  // res.json(apiData);
  }catch(error){
    // console.log(error)
    res.status(500).json({'message':'Internal Server Error'});
  }
});

