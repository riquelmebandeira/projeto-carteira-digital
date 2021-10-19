async function getCurrencies() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  let currencies = await fetch(url);
  currencies = await currencies.json();
  return currencies;
}

export default getCurrencies;
