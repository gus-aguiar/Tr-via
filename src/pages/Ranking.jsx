// Esse botão deve possuir o atributo data-testid com o valor btn-go-home
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title"> Ranking </h1>
        <Link to="/">
          <button data-testid="btn-go-home">
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Ranking);
