import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Wrapper extends React.Component {
  componentDidMount() {
    window.balanceText('.balance-text');
  }

  componentDidUpdate() {
    window.balanceText('.balance-text');
  }

  render() {
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
