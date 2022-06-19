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

const activateButton = (object) => (
  // A operação abaixo verifica se todas as propriedades do objeto são verdadeiras, e portanto, estão preenchidas.
  // Caso não estejam, será retornado 'false', e o operador '!' converterá para 'true', assim desabilitando o botão.
  !Object.values({ ...object, id: true, isEditing: true }).every(Boolean)
);

module.exports = {
  TABLE_HEADERS,
  PAYMENT_OPTIONS,
  EXPENSE_CATEGORY,
  INITIAL_STATE,
  getTotalExpense,
  activateButton,
};
