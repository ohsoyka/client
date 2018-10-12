import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { current } from '../config';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';

class Error extends React.Component {
  static getInitialProps({ res, error, pathname }) {
    const statusCode = (res && res.statusCode) || (error && error.statusCode);

    return { statusCode, pathname };
  }

  render() {
    const { statusCode, error, pathname } = this.props;

    if (current.environment !== 'production' && error && error.message) {
      console.error(error);
    }

    const details = current.environment === 'production'
      ? null
      : (
        <div>
          <p>{error.message}</p>
          <p>{error.stack}</p>
        </div>
      );

    return (
      <Wrapper pathname={pathname}>
        <Head>
          <title>Шось пішло не так / {current.meta.title}</title>
        </Head>
        <Header />
        <Content className="container">
          <h1>Шось пішло не так</h1>
          <p className="larger text-center">{statusCode}</p>
          {details}
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  pathname: PropTypes.string.isRequired,
};

Error.defaultProps = {
  statusCode: null,
  error: {},
};

export default Error;
