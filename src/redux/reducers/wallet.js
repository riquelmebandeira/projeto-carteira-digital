const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'STORE_EXPENSE':
    return (
      { ...state, expenses: [...state.expenses, action.expense] }
    );
  case 'DELETE_EXPENSE':
    return (
      { ...state, expenses: state.expenses.filter((e) => e.id !== action.id) }
    );
  case 'UPDATE_EXPENSE':
    return (
      { ...state,
        expenses: state.expenses.map(
          (e) => (e.id !== action.expense.id ? e : action.expense),
        ),
      }
    );
  default:
    return state;
  }
}

export default wallet;
