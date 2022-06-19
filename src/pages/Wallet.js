import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '../components/Select';
import Input from '../components/Input';
import getCurrencies from '../services/api';
import { getExchangeAndStoreExpense as storeExpenseAction } from '../actions/index';
import Header from '../components/Header';

const PAYMENT_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const EXPENSE_CATEGORY = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setCurrenciesOnState();
  }

  async setCurrenciesOnState() {
    const currencies = Object.keys(await getCurrencies());
    const indexOfElementToRemove = currencies.indexOf('USDT');
    currencies.splice(indexOfElementToRemove, 1);
    this.setState({
      currencies,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { storeExpense } = this.props;
    const expense = { ...this.state };
    delete expense.currencies;
    storeExpense({ ...expense });
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  }

  render() {
    const { userEmail, expenses } = this.props;
    const { currencies } = this.state;
    let totalExpense = 0;

    if (expenses.length > 0) {
      const allExpenses = expenses.map(({ value, exchangeRate }) => {
        const exchange = exchangeRate.ask;
        return value * exchange;
      });
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      totalExpense = allExpenses.reduce(reducer);
    }

    return (
      <div>
        <Header email={ userEmail } totalExpense={ totalExpense } />
        <section>
          <form>
            <Input name="Valor" id="value" handle={ this.handleChange } />
            <Input name="Descrição" id="description" handle={ this.handleChange } />
            <Select
              name="Moeda"
              id="currency"
              options={ currencies }
              handle={ this.handleChange }
            />
            <Select
              name="Método de pagamento"
              id="method"
              options={ PAYMENT_OPTIONS }
              handle={ this.handleChange }
            />
            <Select
              name="Tag"
              id="tag"
              options={ EXPENSE_CATEGORY }
              handle={ this.handleChange }
            />
            <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
          </form>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  storeExpense: (expense) => dispatch(storeExpenseAction(expense)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  storeExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
