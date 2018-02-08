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

class PagesPage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const parentProps = await super.getInitialProps({ req, res });
    const pages = await API.pages.find(Object.assign({
      sort: '-createdAt',
    }, query), getAllCookies(req));
    return {
      ...parentProps,
      pages: pages.docs,
    };
  }

  render() {
    const { pages, error } = this.props;

    if (error) {
      return <Error statusCode={this.props.error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Сторінки / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <h2>Сторінки</h2>
          <PanelSection type="pages" className="flex-100">
            {pages.map(article => <PanelSectionItem {...article} type="article" />)}
          </PanelSection>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default PagesPage;
