
module.exports.getDefaultCurrency = () => {
  return process.env.DEFAULT_CURRENCY;
}

module.exports.calculatePrice = (usd_against, region_price) => {

  return usd_against * region_price;

}

module.exports.getCurrecySymbolWithSSD = (currency_symbol) => {
  return process.env.DEFAULT_CURRENCY_CODE+currency_symbol
}