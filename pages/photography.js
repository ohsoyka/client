import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Error from './_error';
import { current } from '../config';
import AuthenticatablePage from './_authenticatable';

import Wrapper from '../components/Wrapper';
import Header from '../components/photography/Header';
import AlbumPreview from '../components/photography/AlbumPreview';
import Content from '../components/Content';
import Footer from '../components/Footer';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';

class PhotographyPage extends AuthenticatablePage {
  static async getInitialProps({ req }) {
    try {
      const parentProps = await super.getInitialProps({ req });
      const { docs } = await API.photoAlbums.find({ include: 'cover' }, getAllCookies(req));

      return { ...parentProps, photoAlbums: docs };
    } catch (error) {
      return { error };
    }
  }

  render() {
    if (this.props.error) {
      return <Error error={this.props.error} />;
    }

    const { photoAlbums } = this.props;
    const title = `Фотопортфоліо / ${current.meta.title}`;

    return (
      <Wrapper>
        <Head>
          <title>{title}</title>
          <meta name="description" content={current.meta.description} key="description" />
          <meta name="keywords" content={current.meta.keywords.join(', ')} key="keywords" />
        </Head>
        <Content className="container photos-container">
          <Header />
          <h1 className="text-center">Фотопортфоліо</h1>
          <div className="layout-row layout-wrap children-horizontal-padding children-vertical-padding">
            {
              photoAlbums.map(album => <AlbumPreview key={album.id} {...album} className="flex-100 flex-gt-xs-50 flex-gt-lg-33" />)
            }
          </div>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

PhotographyPage.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

PhotographyPage.defaultProps = {
  albums: [],
  error: null,
};

export default PhotographyPage;
