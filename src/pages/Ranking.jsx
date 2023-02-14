// Esse botão deve possuir o atributo data-testid com o valor btn-go-home
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';
import styles from '../styles/Ranking.module.css';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  rankingMap = () => {
    const { ranking } = this.state;
    return ranking.map(({ name, score, picture }, index) => (
      <div className={ styles.rankingScore } key={ index }>
        <div className={ styles.nameContainer }>
          <img src={ picture } alt={ name } />
          <p data-testid={ `player-name-${index}` }>{name}</p>
        </div>
        <div className={ styles.playerScoreContainer }>
          <img alt="start" className={ styles.starIcon } />
          <span data-testid={ `player-score-${index}` }>{score}</span>
          <p data-testid={ `player-score-${index}` }>Pontos</p>
        </div>
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
      <div className={ styles.rankingPageContainer }>
        <div className={ styles.rakingBackground }>
          <h1 data-testid="ranking-title"> Ranking </h1>
          <div className={ styles.scoresContainer }>{this.rankingMap()}</div>
          <button
            className={ styles.playBtn }
            data-testid="btn-go-home"
            onClick={ this.handleClick }
          >
            Jogar Novamente
          </button>
        </div>
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
