import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '../components/Select';
import Input from '../components/Input';
import Table from '../components/Table';
import Button from '../components/Button';
import getCurrencies from '../services/api';
import { getExchangeAndStoreExpense as storeExpenseAction } from '../actions/index';
import Header from '../components/Header';
import { PAYMENT_OPTIONS, EXPENSE_CATEGORY } from '../utils';

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

  getTotalExpense(expenses) {
    const allExpenses = expenses.map(({ value, exchangeRate }) => {
      const exchange = exchangeRate.ask;
      return value * exchange;
    });

    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return allExpenses.reduce(reducer);
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

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  render() {
    const { userEmail, expenses } = this.props;
    const { currencies } = this.state;
    const totalExpense = expenses.length > 0 ? this.getTotalExpense(expenses) : 0;

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
            <Button
              onClick={ this.handleClick }
              text="Adicionar despesa"
              // A operação abaixo verifica se todas as chaves do estado são verdadeiras, e portanto, estão preenchidas.
              // Caso não estejam, será retornado 'false', e o operador '!' converterá para 'true', assim desabilitando o botão.
              disabled={ !Object.values({ ...this.state, id: true }).every(Boolean) }
            />
          </form>
        </section>
        <main>
          <Table expenses={ expenses } />
        </main>
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
