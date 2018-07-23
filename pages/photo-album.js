import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Error from './_error';
import { current } from '../config';
import AuthenticatablePage from './_authenticatable';

import Wrapper from '../components/Wrapper';
import Content from '../components/Content';
import Header from '../components/photography/Header';
import Breadcrumbs from '../components/photography/Breadcrumbs';
import Album from '../components/photography/Album';
import Footer from '../components/Footer';

import API from '../services/api';
import { getAllCookies } from '../services/cookies';

const PhotoViewer = dynamic(import('../components/photography/PhotoViewer'), {
  ssr: false,
  loading: () => null,
});

class PhotoAlbumPage extends AuthenticatablePage {
  static async getInitialProps({ req, query }) {
    try {
      const parentProps = await super.getInitialProps({ req });
      const photoAlbum = await API.photoAlbums.findOne(query.path, { include: 'photos, photos.image' }, getAllCookies(req));
      const currentPhoto = query.photo ? photoAlbum.photos.find(photo => photo.id === query.photo) : null;

      return { ...parentProps, photoAlbum, currentPhoto };
    } catch (error) {
      return { error };
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      currentPhoto: props.currentPhoto,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPhoto: nextProps.currentPhoto,
    });
  }

  render() {
    if (this.props.error) {
      return <Error error={this.props.error} />;
    }

    const { photoAlbum } = this.props;
    const { currentPhoto } = this.state;
    const title = `${photoAlbum.title} / Фотопортфоліо / ${current.meta.title}`;
    const breadcrumbs = [
      {
        title: 'Фотопортфоліо',
        href: '/photography',
      },
    ];

    return (
      <Wrapper>
        <Head>
          <title>{title}</title>
          <meta name="description" content={current.meta.description} key="description" />
          <meta name="keywords" content={current.meta.keywords.join(', ')} key="keywords" />
        </Head>
        <Content className="container photos-container">
          <Header />
          <Breadcrumbs crumbs={breadcrumbs} />
          <Album key={photoAlbum.id} {...photoAlbum} />
          {
            currentPhoto &&
            <PhotoViewer
              key={currentPhoto.id}
              photo={currentPhoto}
              album={photoAlbum}
            />
          }
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

PhotoAlbumPage.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

PhotoAlbumPage.defaultProps = {
  albums: [],
  error: null,
};

export default PhotoAlbumPage;
