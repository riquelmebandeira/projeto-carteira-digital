import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '../components/Select';
import Input from '../components/Input';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    const PAYMENT_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const EXPENSE_CATEGORY = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <header>
          <p data-testid="email-field">{`Email: ${userEmail}`}</p>
          <p data-testid="total-field">Despesa Total: R$ 0</p>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <section>
          <form>
            <Input name="Valor" id="value" />
            <Input name="Descrição" id="description" />
            <Select name="Moeda" id="currency" />
            <Select name="Método de pagamento" id="payment" options={ PAYMENT_OPTIONS } />
            <Select name="Tag" id="category" options={ EXPENSE_CATEGORY } />
          </form>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
