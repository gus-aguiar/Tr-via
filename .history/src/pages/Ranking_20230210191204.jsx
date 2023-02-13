// Esse botão deve possuir o atributo data-testid com o valor btn-go-home
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getGravatar } from "../helpers/apiTrivia";
import { connect } from "react-redux";

class Ranking extends Component {
state = {
  imageGravatar:"",
}
  async componentDidMount (){
    const imageGravatar = await getGravatar()
    this.setState({imageGravatar})
  }
  render() {
    const {player}=this.props
    const teste2 = Object.values(player)
    const teste3 = [...teste2]
    console.log(teste3);

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

const mapStateToProps = (state)=>({
player: state.player,
})

export default connect(mapStateToProps)(Ranking);
