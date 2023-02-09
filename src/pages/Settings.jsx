import React from 'react';
import { connect } from 'react-redux';

class Settings extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Settings Page</h1>
      </div>
    );
  }
}

export default connect()(Settings);
