import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getToken } from '../helpers/apiTrivia';

class Login extends React.Component {
  state = {
    email: '',
    userName: '',
    btnDisable: true,
  };

  validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  validateUserName = (userName) => {
    const regex = /.{3,}/;
    return regex.test(userName);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        const { email, userName } = this.state;
        const btnDisable = !(
          this.validateEmail(email) && this.validateUserName(userName)
        );
        this.setState({ btnDisable });
      },
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();

    getToken().then(() => {
      const { history } = this.props;

      history.push('/game');
    });
  };

  render() {
    const { email, userName, btnDisable } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            value={ email }
            onChange={ this.handleChange }
          />

          <input
            type="text"
            name="userName"
            data-testid="input-player-name"
            placeholder="User Name"
            value={ userName }
            onChange={ this.handleChange }
          />

          <button type="submit" data-testid="btn-play" disabled={ btnDisable }>
            Play
          </button>
          <Link to="/settings">
            <button data-testid="btn-settings">Settings</button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
