import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Error from './_error';
import { current } from '../config';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import CategoryPreview from '../components/CategoryPreview';
import Footer from '../components/Footer';

import Data from '../services/data';

class CategoriesPage extends React.Component {
  static getInitialProps() {
    try {
      const { categories } = Data;

      return { categories };
    } catch (error) {
      return { error };
    }
  }

  render() {
    if (this.props.error) {
      return <Error statusCode={this.props.error.status} />;
    }

    const { categories } = this.props;
    const title = `Категорії / ${current.meta.title}`;

    return (
      <Wrapper>
        <Head>
          <title>{title}</title>
          <meta name="description" content={current.meta.description} key="description" />
          <meta name="keywords" content={current.meta.keywords.join(', ')} key="keywords" />
        </Head>
        <Header />
        <Content className="container">
          <h1>Категорії</h1>
          <div className="layout-row layout-wrap children-horizontal-padding children-vertical-padding">
            {
              categories.map(category => (
                <CategoryPreview
                  key={category.id}
                  {...category}
                  className="flex-50 flex-gt-xs-33 flex-gt-sm-25"
                />
              ))
            }
          </div>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

CategoriesPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

CategoriesPage.defaultProps = {
  categories: [],
  error: null,
};

export default CategoriesPage;
