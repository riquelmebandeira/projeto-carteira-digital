const TABLE_HEADERS = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

const PAYMENT_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const EXPENSE_CATEGORY = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const INITIAL_STATE = {
  isEditing: false,
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const getTotalExpense = (expenses) => {
  const allExpenses = expenses.map(({ value, currency, exchangeRates }) => {
    const exchange = exchangeRates[currency].ask;
    return value * exchange;
  });

  return allExpenses.reduce((sum, expense) => sum + expense, 0);
};

module.exports = {
  TABLE_HEADERS,
  PAYMENT_OPTIONS,
  EXPENSE_CATEGORY,
  INITIAL_STATE,
  getTotalExpense,
};
