import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { name, gravatarImage, score } = this.props;
    return (
      <div>
        <h1>Header</h1>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ gravatarImage }
            alt="gravatar"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-player-score">
            Pontos:
            <span data-testid="header-score">{score}</span>
          </p>
          <Link to="/settings">
            <button data-testid="btn-settings">Settings</button>
          </Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarImage: PropTypes.any,
  name: PropTypes.any,
  score: PropTypes.any,
}.isRequired;

const mapStateToProps = ({ user }) => ({
  name: user.userName,
  gravatarImage: user.gravatarImage,
  score: user.score,
});

export default connect(mapStateToProps)(Header);
