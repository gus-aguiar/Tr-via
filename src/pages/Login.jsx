import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getToken } from '../helpers/apiTrivia';
import { loginSubmit } from '../redux/actions';

class Login extends React.Component {
  state = {
    gravatarEmail: '',
    name: '',
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
        const { gravatarEmail, name: userName } = this.state;
        const btnDisable = !(
          this.validateEmail(gravatarEmail) && this.validateUserName(userName)
        );
        this.setState({ btnDisable });
      },
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();

    getToken().then(() => {
      const { gravatarEmail, name } = this.state;

      const { dispatch, history } = this.props;

      const loginInfo = { name, gravatarEmail };

      // TODO: verificar caso de problema com o teste (alterar para localStorage)
      dispatch(loginSubmit(loginInfo));

      history.push('/game');
    });
  };

  render() {
    const { gravatarEmail, name, btnDisable } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="email"
            name="gravatarEmail"
            data-testid="input-gravatar-email"
            placeholder="Email"
            value={ gravatarEmail }
            onChange={ this.handleChange }
          />

          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            placeholder="User Name"
            value={ name }
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
