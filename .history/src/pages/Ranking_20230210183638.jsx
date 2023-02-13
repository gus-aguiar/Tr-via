// Esse botão deve possuir o atributo data-testid com o valor btn-go-home
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getGravatar } from "../helpers/apiTrivia";


class Ranking extends Component {

  async componentDidMount (){
    const teste = await getGravatar()
  console.log(teste)}
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title"> Ranking </h1>
        <Link to = "/">
        <button data-testid="btn-go-home">
          Jogar Novamente
        </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
