import React from 'react';
import PropTypes from 'prop-types';
import Session from '../services/session';

class AuthenticatablePage extends React.Component {
  static async getInitialProps({ req }) {
    const isAuthenticated = Session.isAuthenticated(req);
    const props = { isAuthenticated };

    return props;
  }

  getChildContext() {
    return { isAuthenticated: this.props.isAuthenticated };
  }
}

export default AuthenticatablePage;

AuthenticatablePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

AuthenticatablePage.childContextTypes = {
  isAuthenticated: PropTypes.bool,
};
