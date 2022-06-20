import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { storeEmailAction } from '../redux/actions/index';
import '../styles/Login.css';
import { MIN_LENGTH, EMAIL_PATTERN } from '../utils';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { storeEmail, history } = this.props;
    const { email } = this.state;
    storeEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;

    return (
      <main className="login-page">
        <h2>Carteira Digital</h2>
        <form className="login-form">
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            type="password"
            placeholder="senha"
            id="password"
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            type="submit"
            onClick={ (e) => this.handleClick(e) }
            disabled={
              password.length < MIN_LENGTH || !EMAIL_PATTERN.test(email)
            }
          >
            Entrar
          </button>
        </form>
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
