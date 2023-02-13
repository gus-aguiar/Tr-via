// Esse botão deve possuir o atributo data-testid com o valor btn-go-home
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.forEach((element, index) => {
      element.index = index;
    });
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
    console.log(ranking);
  }

  rankingMap = () => {
    const { ranking } = this.state;
    return ranking.map(({ name, score, picture, index }) => (
      <div key={ index }>
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
        <img src={ picture } alt={ name } />
      </div>
    ));
  };

  render() {
    return (

      <div>
        {this.rankingMap()}
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
