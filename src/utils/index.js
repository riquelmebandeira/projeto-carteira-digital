const TABLE_HEADERS = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

const PAY_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const EXPENSE_TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const INITIAL_STATE = {
  isEditing: false,
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const getTotalSpend = (expenses) => {
  const allExpenses = expenses.map(({ value, currency, exchangeRates }) => {
    const exchange = exchangeRates[currency].ask;
    return value * exchange;
  });

  return allExpenses.reduce((sum, expense) => sum + expense, 0);
};

const enableButton = (object) => (
  // A operação abaixo verifica se todas as propriedades do objeto são verdadeiras, e portanto, estão preenchidas.
  // Caso não estejam, será retornado 'false', e o operador '!' converterá para 'true', assim desabilitando o botão.
  !Object.values({ ...object, id: true, isEditing: true, editingId: true }).every(Boolean)
);

const MIN_LENGTH = 6;

const EMAIL_PATTERN = /\S+@\S+\.\S+/;

module.exports = {
  TABLE_HEADERS,
  PAY_OPTIONS,
  EXPENSE_TAGS,
  INITIAL_STATE,
  MIN_LENGTH,
  EMAIL_PATTERN,
  getTotalSpend,
  enableButton,
};
