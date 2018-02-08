import React from 'react';
import Head from 'next/head';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import PanelSection from '../../../components/admin/PanelSection';
import PanelSectionItem from '../../../components/admin/PanelSectionItem';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';

class CategoriesPage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const parentProps = await super.getInitialProps({ req, res });
    const categories = await API.categories.find(Object.assign({
      sort: '-createdAt',
    }, query), getAllCookies(req));
    return {
      ...parentProps,
      categories: categories.docs,
    };
  }

  render() {
    const { categories, error } = this.props;

    if (error) {
      return <Error statusCode={this.props.error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Категорії / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <h2>Категорії</h2>
          <PanelSection type="categories" className="flex-100">
            {categories.map(category => <PanelSectionItem {...category} type="category" />)}
          </PanelSection>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default CategoriesPage;