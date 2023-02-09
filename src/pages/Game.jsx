import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Game Page</h1>
      </div>
    );
  }
}

export default connect()(Game);
