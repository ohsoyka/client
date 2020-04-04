import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Error from './_error';
import { current } from '../config';
import AuthenticatablePage from './_authenticatable';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import ArticlePreview from '../components/ArticlePreview';
import Footer from '../components/Footer';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';

class TagPage extends AuthenticatablePage {
  static async getInitialProps({ req, pathname, query }) {
    try {
      const cookies = getAllCookies(req);
      const parentProps = await super.getInitialProps({ req });
      const { tag } = query;
      const { docs } = await API.articles.find({ tag, include: 'image' }, cookies);

      return {
        ...parentProps,
        tag,
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

    const { tag, articles, pathname } = this.props;
    const title = `#${tag} / ${current.meta.title}`;
    const url = `${current.clientURL}/tag/${tag}`;

    const content = articles.length
      ? (
        <div className="category-articles">
          {articles.map(article => <ArticlePreview large horizontal {...article} key={article.id} />)}
        </div>
      )
      : <h2 className="text-center">Поки що тут порожньо</h2>;

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
          <meta name="og:locale" content={current.meta.languageTerritory} />
          <meta name="og:type" content="website" />
        </Head>
        <Header />
        <Content className="container">
          <h1 className="text-center">#{tag}</h1>

          {content}
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

TagPage.propTypes = {
  tag: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

TagPage.defaultProps = {
  articles: [],
  error: null,
};

export default TagPage;
