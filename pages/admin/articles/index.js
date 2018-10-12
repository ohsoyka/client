import React from 'react';
import Head from 'next/head';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import Button from '../../../components/ui/Button';
import PanelSection from '../../../components/admin/PanelSection';
import PanelSectionItem from '../../../components/admin/PanelSectionItem';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';

class ArticlesPage extends ProtectedPage {
  static async getInitialProps({ req, res, query, pathname }) {
    const cookies = getAllCookies(req);
    const parentProps = await super.getInitialProps({ req, res });
    const articles = await API.articles.find({ sort: '-publishedAt', ...query }, cookies);

    return {
      ...parentProps,
      articles: articles.docs,
      pathname,
    };
  }

  render() {
    const { articles, error, pathname } = this.props;

    if (error) {
      return <Error error={this.props.error} />;
    }

    return (
      <Wrapper pathname={pathname}>
        <Head>
          <title>Статті / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <div className="layout-row layout-align-space-between-center">
            <h2>Статті</h2>
            <Button color="black" href="/admin/articles/new">Нова стаття</Button>
          </div>
          <PanelSection className="flex-100">
            {articles.map(article => <PanelSectionItem {...article} type="article" />)}
          </PanelSection>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default ArticlesPage;
