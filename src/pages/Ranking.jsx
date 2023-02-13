// Esse botão deve possuir o atributo data-testid com o valor btn-go-home
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';

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
    return ranking.map(({ name, score, picture }, index) => (
      <div key={ index }>
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
        <img src={ picture } alt={ name } />
      </div>
    ));
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());

    history.push('/');
  };

  render() {
    return (
      <div>
        {this.rankingMap()}
        <h1 data-testid="ranking-title"> Ranking </h1>
        <button data-testid="btn-go-home" onClick={ this.handleClick }>
          Jogar Novamente
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Ranking);
