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

class NewPagePage extends ProtectedPage {
  static async getInitialProps({ req, res }) {
    const parentProps = await super.getInitialProps({ req, res });

    return {
      ...parentProps,
    };
  }

  constructor(props) {
    super(props);

    this.state = { formDisabled: false };

    this.submit = this.submit.bind(this);
  }

  async submit(page) {
    this.setState({ formDisabled: true });

    try {
      const savedPage = await API.pages.create(page, getAllCookies());

      this.setState({ formDisabled: false });

      Router.push(`/admin/pages/edit?path=${savedPage.path}`, `/admin/pages/${savedPage.path}/edit`);
    } catch (error) {
      this.setState({ formDisabled: false });
    }
  }

  render() {
    const { error } = this.props;

    if (error) {
      return <Error statusCode={error.status} />;
    }

    return (
      <Wrapper>
        <Head>
          <title>Нова сторінка / Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <PageForm disabled={this.state.formDisabled} onSubmit={this.submit} />
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default NewPagePage;
