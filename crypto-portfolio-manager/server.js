const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 8000;
const app = express();
const publicPath = __dirname + '/dist';

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.get('/crypto', async(req, res) => {
  const { headers:headerData, query:{start, limit, convert:currency}} = req;
  const headers = {
    "X-CMC_PRO_API_KEY": headerData['x-cmc_pro_api_key'],
  }
  const convert = removeQuotes(currency);
  const base_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/';
  try {
    const response = await axios(`${base_url}listings/latest?start=${start}&limit=${limit}&convert=${convert}`, {
      headers
    })
    // const data = await axios('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=2&convert=INR', {
    //   headers
    // })
    const { data } = response;
    res.send(data);  
  } catch(err) {
    const { response:{ data }} = err;
    res.send(data);
  } 
})

function removeQuotes(str =" ") {
  return str.replace(/['"]+/g, '');
}

app.get('*', (req, res) => {
	res.sendFile(path.resolve(publicPath, 'index.html'));
})

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
