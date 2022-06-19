import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { email, totalExpense } = this.props;
    return (
      <header>
        <h2>Carteira Digital</h2>
        <div className="user-data">
          <p>{`Email: ${email}`}</p>
          <div>
            <p>{`Despesa Total: R$ ${totalExpense.toFixed(2)}`}</p>
            <span>BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpense: PropTypes.number.isRequired,
};

export default Header;
