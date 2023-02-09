import React from 'react';
import { connect } from 'react-redux';

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

  render() {
    const { email, userName, btnDisable } = this.state;
    return (
      <div>
        <form>
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
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
