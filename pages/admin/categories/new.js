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
  static async getInitialProps({ req, res }) {
    const parentProps = await super.getInitialProps({ req, res });

    return {
      ...parentProps,
    };
  }

  static async submit(category) {
    const imageFile = category.image;
    let savedCategory;

    if (imageFile) {
      const [uploadedImage] = await API.upload(imageFile, getAllCookies());
      const categoryWithImage = Object.assign({}, category, { image: uploadedImage.id });

      savedCategory = await API.categories.create(categoryWithImage, getAllCookies());
    } else {
      savedCategory = await API.categories.create(category, getAllCookies());
    }

    Router.push(`/admin/categories/edit?path=${savedCategory.path}`, `/admin/categories/${savedCategory.path}/edit`);
  }

  render() {
    const { error } = this.props;

    if (error) {
      return <Error statusCode={this.props.error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Нова категорія / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <CategoryForm onSubmit={NewCategoryPage.submit} />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default NewCategoryPage;
