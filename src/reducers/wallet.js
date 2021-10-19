const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'STORE_EXPENSE':
    return (
      { ...state, wallet: { expenses: [...state.wallet.expenses, action.expenses] } }
    );
  default:
    return state;
  }
}

export default wallet;
