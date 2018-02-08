import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { current } from '../config';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';

class Error extends React.Component {
  static getInitialProps({ res, error }) {
    const statusCode = (res && res.statusCode) || (error && error.statusCode);

    if (current.environment !== 'production') {
      console.error(error);
    }

    return { statusCode };
  }

  render() {
    return (
      <Wrapper>
        <Head>
          <title>Шось пішло не так / {current.meta.title}</title>
        </Head>
        <Header />
        <Content className="container">
          <h1>Шось пішло не так</h1>
          <p className="larger text-center">{this.props.statusCode}</p>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: null,
};

export default Error;
