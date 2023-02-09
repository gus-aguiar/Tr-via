import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Header</h1>
        <Link to="/settings">
          <button data-testid="btn-settings">Settings</button>
        </Link>
      </div>
    );
  }
}

export default connect()(Header);
