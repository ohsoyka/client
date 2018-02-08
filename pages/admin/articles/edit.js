import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import ArticleForm from '../../../components/admin/ArticleForm';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';

class EditArticlePage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const parentProps = await super.getInitialProps({ req, res });
    const article = await API.articles.findOne(query.path, { include: 'image' }, getAllCookies(req));
    const projects = await API.projects.find({}, getAllCookies(req));
    const categories = await API.categories.find({}, getAllCookies(req));

    return {
      ...parentProps,
      article,
      projects,
      categories,
    };
  }

  constructor(props) {
    super(props);

    this.state = { formDisabled: false };

    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async update(article) {
    this.setState({ formDisabled: true });

    try {
      const shouldUploadImage = article.image instanceof window.File;
      let image = (article.image && article.image.id) || article.image;

      if (shouldUploadImage) {
        const [uploadedImage] = await API.upload(article.image, getAllCookies());

        image = uploadedImage.id;
      }

      const articleWithImage = Object.assign({}, article, { image });
      const savedArticle = await API.articles.update(this.props.article.path, articleWithImage, getAllCookies());

      this.setState({ formDisabled: false });

      Router.push(`/admin/articles/edit?path=${savedArticle.path}`, `/admin/articles/${savedArticle.path}/edit`);
    } catch (error) {
      this.setState({ formDisabled: false });
    }
  }

  async remove() {
    API.articles.remove(this.props.article.path, getAllCookies())
      .then(() => Router.push('/admin/'));
  }

  render() {
    const {
      article,
      projects,
      categories,
      error,
    } = this.props;

    if (error) {
      return <Error statusCode={error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Редагувати статтю / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <ArticleForm
            article={article}
            projects={projects.docs}
            categories={categories.docs}
            disabled={this.state.formDisabled}
            key={article.path}
            onSubmit={this.update}
            onRemove={this.remove}
          />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default EditArticlePage;
