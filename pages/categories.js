import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Error from './_error';
import { current } from '../config';
import AuthenticatablePage from './_authenticatable';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import CategoryPreview from '../components/CategoryPreview';
import Footer from '../components/Footer';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';

class CategoriesPage extends AuthenticatablePage {
  static async getInitialProps({ req }) {
    try {
      const cookies = getAllCookies(req);
      const parentProps = await super.getInitialProps({ req });
      const { docs } = await API.categories.find({ include: 'image' }, cookies);

      return { ...parentProps, categories: docs };
    } catch (error) {
      return { error };
    }
  }

  render() {
    if (this.props.error) {
      return <Error error={this.props.error} />;
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
