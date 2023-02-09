import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Header />
        <h1>Game Page</h1>
      </div>
    );
  }
}

export default connect()(Game);
