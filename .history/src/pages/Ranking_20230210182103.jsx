// Esse botão deve possuir o atributo data-testid com o valor btn-go-home
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Ranking extends Component {

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title"> Ranking </h1>
        <Link to = "/">
        <button data-testid="btn-go-home">
          Retornar
        </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;