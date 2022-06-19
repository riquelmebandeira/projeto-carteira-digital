export const storeEmailAction = (userEmail) => ({ type: 'STORE_EMAIL', userEmail });

export const storeExpense = (expense) => ({ type: 'STORE_EXPENSE', expense });

export const deleteExpense = (id) => ({ type: 'DELETE_EXPENSE', id });

export const updateExpense = (expense) => ({ type: 'UPDATE_EXPENSE', expense });

export function storeWithExchanges(expense) {
  return async (dispatch) => {
    let exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all');
    exchangeRates = await exchangeRates.json();
    return dispatch(storeExpense({ ...expense, exchangeRates }));
  };
}
