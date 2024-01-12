//Developer one- kaveesha

//to establish a server
const express = require('express') //call express
const axios = require('axios') //call axos

const app = express()
const PORT = 3000
const usdUrl = 'https://www.cbsl.gov.lk/cbsl_custom/charts/usd/oneweek.php'

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

//Developer two Isuru
//Create an API to fetch usdUrl data
app.get('/exchangeRate',async(req,res)=>{
  const response = await axios.get(usdUrl);
  const apiData =  response.data;

  res.json(apiData);
});

