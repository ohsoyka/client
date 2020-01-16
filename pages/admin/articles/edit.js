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
  static async getInitialProps({ req, res, query, pathname }) {
    const cookies = getAllCookies(req);
    const parentProps = await super.getInitialProps({ req, res });
    const article = await API.articles.findOne(query.path, { include: 'image, portraitImage' }, cookies);
    const projects = await API.projects.find({}, cookies);
    const categories = await API.categories.find({}, cookies);

    return {
      ...parentProps,
      article,
      projects,
      categories,
      pathname,
    };
  }

  static async getImageId(image, cookies) {
    if (!image) {
      return null;
    }

    if (image instanceof window.File) {
      const [uploadedImage] = await API.upload(image, cookies);

      return uploadedImage.id;
    }

    return typeof image === 'string' ? image : image.id;
  }

  constructor(props) {
    super(props);

    this.state = { formDisabled: false };

    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async update(article) {
    const cookies = getAllCookies();

    this.setState({ formDisabled: true });

    try {
      const [imageId, portraitImageid] = await Promise.all([
        EditArticlePage.getImageId(article.image, cookies),
        EditArticlePage.getImageId(article.portraitImage, cookies),
      ]);

      const articleWithImages = {
        ...article,
        image: imageId,
        portraitImage: portraitImageid,
      };
      const savedArticle = await API.articles.update(this.props.article.path, articleWithImages, cookies);

      this.setState({ formDisabled: false });

      Router.push(`/admin/articles/edit?path=${savedArticle.path}`, `/admin/articles/${savedArticle.path}/edit`);
    } catch (error) {
      console.error(error);

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
      pathname,
    } = this.props;

    if (error) {
      return <Error statusCode={error.status} />;
    }

    return (
      <Wrapper pathname={pathname}>
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
