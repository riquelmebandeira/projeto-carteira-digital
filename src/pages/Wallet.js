import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Select, Table, Button, Header } from '../components';
import getCurrencies from '../services/api';
import { storeWithExchanges as storeExpenseAction,
  updateExpense as updateExpenseAction } from '../redux/actions/index';
import { PAY_OPTIONS, EXPENSE_TAGS, INITIAL_STATE,
  getTotalSpend, enableButton } from '../utils';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    getCurrencies()
      .then((response) => {
        const currencies = Object.keys(response).filter((c) => c !== 'USDT');
        this.setState({
          currencies,
        });
      });
  }

  create = () => {
    const { storeExpense } = this.props;
    const { currencies, ...data } = this.state;
    storeExpense(data);

    this.setState((prevState) => ({
      ...INITIAL_STATE,
      id: prevState.id + 1,
    }));
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  }

  editExpense = (expense) => {
    // O id da tarefa em edição é salvo numa chave diferete, para não perder a contagem normal dos ids.
    const { id: editingId, ...data } = expense;

    this.setState({
      ...data,
      editingId,
      isEditing: true,
    });
  }

  update = () => {
    const { updateExpense } = this.props;
    const { currencies, isEditing, id, editingId, ...data } = this.state;
    const expense = { ...data, id: editingId };
    updateExpense(expense);

    this.setState({
      ...INITIAL_STATE,
      id,
      isEditing: false,
    });
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { userEmail, expenses } = this.props;
    const { currencies, value, description, isEditing } = this.state;
    const totalExpense = expenses.length > 0 ? getTotalSpend(expenses) : 0;

    return (
      <div>
        <Header email={ userEmail } totalExpense={ totalExpense } />
        <main>
          <form className={ `expense-form editing-${isEditing}` }>
            <Input text="Valor" id="value" handle={ this.handleChange } value={ value } />
            <Input
              text="Descrição"
              id="description"
              handle={ this.handleChange }
              value={ description }
            />
            <Select
              name="Moeda"
              id="currency"
              options={ currencies }
              handle={ this.handleChange }
            />
            <Select
              name="Método de pagamento"
              id="method"
              options={ PAY_OPTIONS }
              handle={ this.handleChange }
            />
            <Select
              name="Tag"
              id="tag"
              options={ EXPENSE_TAGS }
              handle={ this.handleChange }
            />
            {
              isEditing ? <Button
                text="Editar gasto"
                onClick={ this.update }
                disabled={ enableButton(this.state) }
              />
                : (
                  <Button
                    onClick={ this.create }
                    text="Adicionar despesa"
                    disabled={ enableButton(this.state) }
                  />)
            }
          </form>
          <Table expenses={ expenses } editExpense={ this.editExpense } />
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
  updateExpense: (expense) => dispatch(updateExpenseAction(expense)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  storeExpense: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
