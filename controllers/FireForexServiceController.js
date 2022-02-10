const axios = require('axios');
const FireForexServiceUtil = require('../utils/FireForexApi.Util')

module.exports.getCurrencies = (req, res) => {

    console.log(process.env.FOREX_API_ENDPOINT + '/live?access_key=' + 'some_secrete_access_key')
    axios.get(process.env.FOREX_API_ENDPOINT + '/live?access_key=' + process.env.FOREX_API_ACCESS_KEY)
      .then(response => {
        if(response.data) {
            res.json(response.data.quotes);
        }else {
            res.json({message: 'request could not be fulfield: internal server error', status: '500'})
        }
      })
      .catch(err => {
        console.log('Error: ', err.message);
        res.json({message: 'internal server error', status: '500', errorMessage: err.message})
      });
},

module.exports.getLocalPrice = (req, res) => {
    const data = req.body;
    if(data) {
    let region_currency_symbol = data.region_currency_symbol;
    let usd_price =  data.usd_price;
    axios.get(process.env.FOREX_API_ENDPOINT + '/live?access_key=' + process.env.FOREX_API_ACCESS_KEY)
      .then(response => {
         console.log("DEBUG=> " + process.env.FOREX_API_ENDPOINT + '/live?access_key=' + 'some_secrete_access_key') 
         let exchange_rate_symbol = FireForexServiceUtil.getCurrecySymbolWithSSD(region_currency_symbol); 
         let current_exchange_rate = response.data.quotes[exchange_rate_symbol] 
         let region_price_result = FireForexServiceUtil.calculatePrice(current_exchange_rate, usd_price)
         res.json({price: region_price_result, country_currency_code: region_currency_symbol, status: 200})
      })
      .catch(err => {
        console.log('Error: ', err.message);
        res.json({message: 'internal server error', status: '500', errorMessage: err.message})
      });

    }

}