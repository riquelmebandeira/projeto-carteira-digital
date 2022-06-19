import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TABLE_HEADERS } from '../utils';
import { deleteExpense as deleteExpenseAction } from '../redux/actions/index';
import Button from './Button';

class Table extends Component {
  render() {
    const { expenses, deleteExpense, editExpense } = this.props;

    return (
      <table>
        <thead>
          <tr>
            {
              TABLE_HEADERS.map((header) => (
                <th key={ header }>{header}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const exchange = expense.exchangeRates[expense.currency];
              const currencyNames = exchange.name.split('/'); // O formato da chave exchange.name é: Moeda/Moeda de conversão.
              const exchangeRate = exchange.ask; // Esta é a taxa de câmbio utilizada.
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{(+expense.value).toFixed(2)}</td>
                  <td>{currencyNames[0]}</td>
                  <td>{(+exchangeRate).toFixed(2)}</td>
                  <td>{(expense.value * exchangeRate).toFixed(2)}</td>
                  <td>{currencyNames[1]}</td>
                  <td>
                    <Button text="Editar" onClick={ () => editExpense(expense) } />
                    <Button
                      text="Excluir"
                      onClick={ () => deleteExpense(expense.id) }
                    />
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Table);
