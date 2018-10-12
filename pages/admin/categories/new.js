import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import CategoryForm from '../../../components/admin/CategoryForm';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';

class NewCategoryPage extends ProtectedPage {
  static async getInitialProps({ req, res, pathname }) {
    const parentProps = await super.getInitialProps({ req, res });

    return {
      ...parentProps,
      pathname,
    };
  }

  constructor(props) {
    super(props);

    this.state = { formDisabled: false };

    this.submit = this.submit.bind(this);
  }

  async submit(category) {
    const cookies = getAllCookies();

    this.setState({ formDisabled: true });

    try {
      const imageFile = category.image;
      let savedCategory;

      if (imageFile) {
        const [uploadedImage] = await API.upload(imageFile, cookies);
        const categoryWithImage = { ...category, image: uploadedImage.id };

        savedCategory = await API.categories.create(categoryWithImage, cookies);
      } else {
        savedCategory = await API.categories.create(category, cookies);
      }

      this.setState({ formDisabled: false });

      Router.push(`/admin/categories/edit?path=${savedCategory.path}`, `/admin/categories/${savedCategory.path}/edit`);
    } catch (error) {
      this.setState({ formDisabled: false });
    }
  }

  render() {
    const { error, pathname } = this.props;

    if (error) {
      return <Error statusCode={error.status} />;
    }

    return (
      <Wrapper pathname={pathname}>
        <Head>
          <title>Нова категорія / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <CategoryForm disabled={this.state.formDisabled} onSubmit={this.submit} />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default NewCategoryPage;
