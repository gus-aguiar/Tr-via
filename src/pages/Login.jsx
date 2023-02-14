import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../helpers/apiTrivia';
import { loginSubmit } from '../redux/actions';
import styles from '../styles/Login.module.css';

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

      dispatch(loginSubmit(loginInfo));

      history.push('/game');
    });
  };

  handleSettings = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { gravatarEmail, name, btnDisable } = this.state;
    return (
      <div className={ styles.loginContainer }>
        <img className={ styles.logoTrivia } alt="logo-trivia" />
        <form className={ styles.formContainer } onSubmit={ this.handleSubmit }>
          <input
            type="email"
            className={ styles.inputsStyle }
            name="gravatarEmail"
            data-testid="input-gravatar-email"
            placeholder="Qual é o Email do seu Gravatar?"
            value={ gravatarEmail }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            className={ styles.inputsStyle }
            name="name"
            data-testid="input-player-name"
            placeholder="Qual é o seu Name?"
            value={ name }
            onChange={ this.handleChange }
          />
          <div className={ styles.btnContainer }>
            <button
              type="submit"
              className={ styles.loginBtn }
              data-testid="btn-play"
              disabled={ btnDisable }
            >
              Jogar
            </button>
            <button
              className={ styles.settingsBtn }
              data-testid="btn-settings"
              onClick={ this.handleSettings }
            >
              <img className={ styles.settingsIcon } alt="settingsIcon" />
              Configurações
            </button>
          </div>
        </form>
        <footer>
          <img alt="tybeLogo" />
        </footer>
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
