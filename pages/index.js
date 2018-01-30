import React from 'react';
import Head from 'next/head';
import { current } from '../config';

import Data from '../services/data';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';
import ArticlePreview from '../components/ArticlePreview';
import Carousel from '../components/Carousel';
import ArticlesGroup from '../components/ArticlesGroup';

const IndexPage = () => {
  const {
    title,
    description,
    keywords,
    language,
    social,
  } = current.meta;

  const lastArticles = Data.articles.slice(0, 10);
  const mostPopularArticles = [].concat(Data.articles).reverse();

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        <meta name="keywords" content={keywords.join(', ')} key="keywords" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content={social.twitter.username} />
        <meta name="twitter:creator" content={social.twitter.username} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:url" content={current.clientURL} />
        <meta name="og:site_name" content={title} />
        <meta name="og:locale" content={language} />
        <meta name="og:type" content="website" />
      </Head>
      <Header />
      <Content>
        <Carousel fullScreen autoplaySpeed={10000} pauseOnHover={false}>
          {
            lastArticles.map(article => <ArticlePreview key={article.id} {...article} fullScreen />)
          }
        </Carousel>
        <div className="container">
          <ArticlesGroup articles={mostPopularArticles} title="Найцікавіше" />
        </div>
      </Content>
      <Footer />
    </Wrapper>
  );
};

export default IndexPage;
