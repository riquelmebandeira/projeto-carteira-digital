import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { storeEmailAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isValidPassword: false,
      isValidEmail: false,
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleChange({ target }) {
    const MIN_PASSWORD_LENGTH = 6;
    if (target.type === 'email') {
      this.setState({
        email: target.value,
        isValidEmail: this.validateEmail(target.value),
      }, () => this.enableButton());
    }
    if (target.type === 'password' && target.value.length >= MIN_PASSWORD_LENGTH) {
      this.setState({
        isValidPassword: true,
      }, () => this.enableButton());
    }
  }

  enableButton() {
    const { isValidEmail, isValidPassword } = this.state;
    if (isValidPassword === true && isValidEmail === true) {
      this.setState({
        disabled: false,
      });
    }
  }

  handleClick() {
    const { storeEmail, history } = this.props;
    const { email } = this.state;
    storeEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, disabled } = this.state;
    return (
      <main>
        <section>
          <input
            type="email"
            placeholder="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            type="password"
            placeholder="senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  storeEmail: (userEmail) => dispatch(storeEmailAction(userEmail)),
});

Login.propTypes = {
  storeEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
