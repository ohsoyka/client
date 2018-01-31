import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { current } from '../config';

import Data from '../services/data';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';

import ArticlePreview from '../components/ArticlePreview';
import ProjectPreview from '../components/ProjectPreview';
import CategoryPreview from '../components/CategoryPreview';
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

  const lastArticles = Data.articles.slice(0, 5);
  const mostPopularArticles = [].concat(Data.articles).reverse().slice(0, 8);
  const projects = Data.projects.slice(0, 3);
  const categories = Data.categories.slice(0, 4);

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
          <div className="most-interesting-section">
            <h2>Найцікавіше</h2>
            <ArticlesGroup articles={mostPopularArticles} articlesCount={{ xs: 3 }} />
          </div>

          <div className="projects-section">
            <h2>Проекти</h2>
            {
              projects.map(project => <ProjectPreview key={project.id} {...project} />)
            }
            <p className="text-right larger"><Link href="/projects"><a>Всі проекти &rarr;</a></Link></p>
          </div>

          <div className="categories-section">
            <h2>Категорії</h2>
            <div className="categories-wrapper children-horizontal-padding children-vertical-padding layout-row layout-wrap">
              {
                categories.map((category, index) => {
                  const classList = ['flex-50', 'flex-gt-xs-33', 'flex-gt-sm-25'];

                  if (index > 1) {
                    classList.push('hide-xs');
                  }

                  if (index > 2) {
                    classList.push('hide-sm');
                  }

                  return <CategoryPreview key={category.id} {...category} className={classList.join(' ')} />;
                })
              }
            </div>
            <p className="text-right larger"><Link href="/categories"><a>Всі категорії &rarr;</a></Link></p>
          </div>
        </div>
      </Content>
      <Footer />
    </Wrapper>
  );
};

export default IndexPage;
