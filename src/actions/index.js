export const storeEmailAction = (userEmail) => ({ type: 'STORE_EMAIL', userEmail });

export const storeExpense = (expense) => ({ type: 'STORE_EXPENSE', expense });

export function getExchangesAndStoreExpense(expense) {
  return async (dispatch) => {
    let exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all');
    exchangeRates = await exchangeRates.json();
    return dispatch(storeExpense({ ...expense, exchangeRates }));
  };
}
