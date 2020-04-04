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

class NewArticlePage extends ProtectedPage {
  static async getInitialProps({ req, res, pathname }) {
    const cookies = getAllCookies(req);
    const parentProps = await super.getInitialProps({ req, res });
    const projects = await API.projects.find({}, cookies);
    const categories = await API.categories.find({}, cookies);

    return {
      ...parentProps,
      projects: projects.docs,
      categories: categories.docs,
      pathname,
    };
  }

  static async uploadImage(imageFile, cookies) {
    if (!imageFile) {
      return null;
    }

    const [uploadedImage] = await API.upload(imageFile, cookies);

    return uploadedImage.id;
  }

  constructor(props) {
    super(props);

    this.state = { formDisabled: false };

    this.submit = this.submit.bind(this);
  }


  async submit(article) {
    const cookies = getAllCookies();

    this.setState({ formDisabled: true });

    try {
      const [imageId, portraitImageid] = await Promise.all([
        NewArticlePage.uploadImage(article.image, cookies),
        NewArticlePage.uploadImage(article.portraitImage, cookies),
      ]);

      const savedArticle = await API.articles.create({
        ...article,
        image: imageId,
        portraitImage: portraitImageid,
      }, getAllCookies());

      this.setState({ formDisabled: false });

      Router.push(`/admin/articles/edit?path=${savedArticle.path}`, `/admin/articles/${savedArticle.path}/edit`);
    } catch (error) {
      console.error(error);

      this.setState({ formDisabled: false });
    }
  }

  render() {
    const {
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
          <title>Нова стаття / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <ArticleForm
            disabled={this.state.formDisabled}
            projects={projects}
            categories={categories}
            onSubmit={this.submit}
          />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default NewArticlePage;
