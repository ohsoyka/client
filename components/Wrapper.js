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
    const pathTokens = this.props.pathname.slice(1).split('/');
    const classList = ['wrapper', this.props.className, ...pathTokens];

    return (
      <div className={classList.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string,
  className: PropTypes.string,
};

Wrapper.defaultProps = {
  className: '',
  pathname: '',
};

Wrapper.contextTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Wrapper;
