import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import ProtectedPage from '../../_protected';
import Error from '../../_error';

import Wrapper from '../../../components/Wrapper';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/Footer';

import PageForm from '../../../components/admin/PageForm';

import API from '../../../services/api';
import { getAllCookies } from '../../../services/cookies';

class EditPagePage extends ProtectedPage {
  static async getInitialProps({ req, res, query }) {
    const parentProps = await super.getInitialProps({ req, res });
    const page = await API.pages.findOne(query.path, {}, getAllCookies(req));

    return {
      ...parentProps,
      page,
    };
  }

  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async update(page) {
    const savedPage = await API.pages.update(this.props.page.path, page, getAllCookies());

    if (this.props.page.path !== savedPage.path) {
      Router.push(`/admin/pages/edit?path=${savedPage.path}`, `/admin/pages/${savedPage.path}/edit`);
    }
  }

  async remove() {
    API.pages.remove(this.props.page.path, getAllCookies())
      .then(() => Router.push('/admin/'));
  }

  render() {
    const {
      page,
      error,
    } = this.props;

    if (error) {
      return <Error statusCode={this.props.error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Редагувати сторінку / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <PageForm
            page={page}
            key={page.path}
            onSubmit={this.update}
            onRemove={this.remove}
          />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default EditPagePage;
