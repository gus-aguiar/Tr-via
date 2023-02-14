import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGravatar } from '../helpers/apiTrivia';

class Header extends React.Component {
  state = {
    gravatarImage: '',
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    getGravatar(gravatarEmail).then((response) => {
      console.log(response);
      this.setState({ gravatarImage: response });
    });
  }

  render() {
    const { name, score } = this.props;
    const { gravatarImage } = this.state;
    return (
      <div>
        <h1>Header</h1>
        <div>
          <img
            data-testid='header-profile-picture'
            src={gravatarImage}
            alt='gravatar'
          />
          <p data-testid='header-player-name'>{name}</p>
          <p data-testid='header-player-score'>
            Pontos:
            <span data-testid='header-score'>{score}</span>
          </p>
          <Link to='/settings'>
            <button data-testid='btn-settings'>Settings</button>
          </Link>
        </div>
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
