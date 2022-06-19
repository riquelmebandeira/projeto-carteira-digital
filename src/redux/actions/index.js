export const storeEmailAction = (userEmail) => ({ type: 'STORE_EMAIL', userEmail });

export const storeExpense = (expense) => ({ type: 'STORE_EXPENSE', expense });

export const deleteExpense = (id) => ({ type: 'DELETE_EXPENSE', id });

export function getExchangeAndStoreExpense(expense) {
  return async (dispatch) => {
    let exchangeRate = await fetch('https://economia.awesomeapi.com.br/json/all');
    exchangeRate = await exchangeRate.json();
    exchangeRate = exchangeRate[expense.currency];
    return dispatch(storeExpense({ ...expense, exchangeRate }));
  };
}
