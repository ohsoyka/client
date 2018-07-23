import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';

import * as GoogleAnalytics from '../utils/analytics';

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Wrapper extends React.Component {
  static balanceText() {
    window.balanceText('.balance-text');
  }

  componentDidMount() {
    this.logPageView();
    Wrapper.balanceText();
  }

  componentDidUpdate() {
    Wrapper.balanceText();
  }

  logPageView() {
    if (this.context.isAuthenticated) {
      return;
    }

    if (!global.GA_INITIALIZED) {
      GoogleAnalytics.init();
      global.GA_INITIALIZED = true;
    }

    GoogleAnalytics.logPageView();
  }

  render() {
    return (
      <div className={`wrapper ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Wrapper.defaultProps = {
  className: '',
};

Wrapper.contextTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Wrapper;
