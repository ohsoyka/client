import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Error from './_error';
import { current } from '../config';
import AuthenticatablePage from './_authenticatable';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';

import ArticlePreview from '../components/ArticlePreview';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';

class ArticlesPage extends AuthenticatablePage {
  static async getInitialProps({ req, pathname }) {
    try {
      const cookies = getAllCookies(req);
      const parentProps = await super.getInitialProps({ req });
      const { docs } = await API.articles.find({ include: 'image', sort: '-publishedAt' }, cookies);

      return {
        ...parentProps,
        articles: docs,
        pathname,
      };
    } catch (error) {
      return { error };
    }
  }

  render() {
    if (this.props.error) {
      return <Error error={this.props.error} />;
    }

    const { articles, pathname } = this.props;
    const title = `Всі статті / ${current.meta.title}`;
    const url = `${current.clientURL}/articles`;

    return (
      <Wrapper pathname={pathname}>
        <Head>
          <title>{title}</title>

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:site" content={current.meta.social.twitter.username} />
          <meta name="twitter:creator" content={current.meta.social.twitter.username} />

          <meta name="og:title" content={title} />
          <meta name="og:url" content={url} />
          <meta name="og:site_name" content={current.meta.title} />
          <meta name="og:locale" content={current.meta.language} />
          <meta name="og:type" content="website" />
        </Head>
        <Header />
        <Content className="container">
          <h1>Всі статті</h1>
          <div className="articles layout-row layout-wrap children-horizontal-padding-1 compensate-padding-top">
            {
              articles.map(article => <ArticlePreview large withFooter {...article} key={article.id} className="flex-xs-100 flex-50" />)
            }
          </div>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

ArticlesPage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

ArticlesPage.defaultProps = {
  articles: [],
  error: null,
};

export default ArticlesPage;
