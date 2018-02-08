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

class EditCategoryPage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const parentProps = await super.getInitialProps({ req, res });
    const category = await API.categories.findOne(query.path, { include: 'image' }, getAllCookies(req));

    return {
      ...parentProps,
      category,
    };
  }

  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async update(category) {
    const shouldUploadImage = category.image instanceof window.File;
    let image = (category.image && category.image.id) || category.image;

    if (shouldUploadImage) {
      const [uploadedImage] = await API.upload(category.image, getAllCookies());

      image = uploadedImage.id;
    }

    const categoryWithImage = Object.assign({}, category, { image });
    const savedCategory = await API.categories.update(this.props.category.path, categoryWithImage, getAllCookies());

    if (this.props.category.path !== savedCategory.path) {
      Router.push(`/admin/categories/edit?path=${savedCategory.path}`, `/admin/categories/${savedCategory.path}/edit`);
    }
  }

  async remove() {
    API.categories.remove(this.props.category.path, getAllCookies())
      .then(() => Router.push('/admin/'));
  }

  render() {
    const {
      category,
      error,
    } = this.props;

    if (error) {
      return <Error statusCode={this.props.error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Редагувати категорію / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <CategoryForm
            category={category}
            key={category.path}
            onSubmit={this.update}
            onRemove={this.remove}
          />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default EditCategoryPage;
