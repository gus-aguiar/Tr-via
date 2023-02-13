// Esse botão deve possuir o atributo data-testid com o valor btn-go-home
import React, { Component } from "react";

class Ranking extends Component {
  handleLogin = () => {
    const { history } = this.props;
    history.push("/");
  };
  render() {
    return (
      <div>
        <button data-testid="btn-go-home" onClick={this.handleLogin}>
          Retornar
        </button>
      </div>
    );
  }
}

export default Ranking;
