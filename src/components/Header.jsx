import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGravatar } from '../helpers/apiTrivia';
import styles from '../styles/Header.module.css';

class Header extends React.Component {
  state = {
    gravatarImage: '',
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    getGravatar(gravatarEmail).then((response) => {
      this.setState({ gravatarImage: response });
    });
  }

  render() {
    const { name, score } = this.props;
    const { gravatarImage } = this.state;
    return (
      <div className={ styles.headerContainer }>
        <div className={ styles.separator }>
          <div className={ styles.imageContainer }>
            <img
              data-testid="header-profile-picture"
              src={ gravatarImage }
              alt="gravatar"
            />
            <p data-testid="header-player-name">{name}</p>
          </div>
          <div className={ styles.scoreContainer }>
            <img alt="start" className={ styles.starIcon } />
            <p data-testid="header-player-score">
              Pontos:
              <span data-testid="header-score">{score}</span>
            </p>
          </div>
        </div>
        <Link to="/settings">
          <img alt="settings" className={ styles.settingsIcon } />
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.any,
  name: PropTypes.any,
  score: PropTypes.any,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
