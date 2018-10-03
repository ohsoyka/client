import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import Router from 'next/router';
import Colors from '../../services/colors';
import preloadImages from '../../utils/preload-images';
import ControlButtons from './photo-viewer/ControlButtons';
import LoaderIcon from '../../static/icons/oval.svg';

const KEY_CODES = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  ESCAPE: 27,
};

const previousPhotoKeyCodes = [KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_UP];
const nextPhotoKeyCodes = [KEY_CODES.ARROW_RIGHT, KEY_CODES.ARROW_DOWN];
const closeKeyCodes = [KEY_CODES.ESCAPE];

const HIDE_CONTROLS_TIMEOUT = 1500;

const PHOTO_SIZE = 'large';

class PhotoViewer extends React.Component {
  static blurBackground() {
    $('.container, .photo-viewer').siblings().css('filter', 'blur(6px)');
  }

  static unblurBackground() {
    $('.container, .photo-viewer').siblings().css('filter', '');
  }

  static disableScroll() {
    $('body').addClass('noscroll');
  }

  static enableScroll() {
    $('body').removeClass('noscroll');
  }

  constructor(props) {
    super(props);

    const [previousPhoto, nextPhoto] = this.getSiblingPhotos();

    this.state = {
      imageURL: props.photo.image[PHOTO_SIZE],
      nextPhoto,
      previousPhoto,
    };

    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.enableNavigation = this.enableNavigation.bind(this);
    this.disableNavigation = this.disableNavigation.bind(this);

    this.switchToPreviousPhoto = this.switchToPreviousPhoto.bind(this);
    this.switchToNextPhoto = this.switchToNextPhoto.bind(this);

    this.preloadPhotos = this.preloadPhotos.bind(this);

    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.enableNavigation();
    PhotoViewer.blurBackground();
    PhotoViewer.disableScroll();

    if (document.readyState === 'complete') {
      this.preloadPhotos();
    } else {
      $(window).on('load', () => {
        this.preloadPhotos();
      });
    }

    const { imageURL } = this.state;
    const image = new Image();

    image.src = imageURL;
    image.onload = () => this.setState({ imageLoaded: true });
  }

  componentWillUnmount() {
    this.disableNavigation();
    PhotoViewer.unblurBackground();
    PhotoViewer.enableScroll();
  }

  getSiblingPhotos() {
    const { photos } = this.props.album;
    const photoIds = photos.map(photo => photo.id);
    const albumLength = photos.length;

    const currentPhoto = this.props.photo;
    const currentPhotoIndex = photoIds.indexOf(currentPhoto.id);

    const previousPhotoIndex = currentPhotoIndex > 0 ? currentPhotoIndex - 1 : albumLength - 1;
    const previousPhoto = photos[previousPhotoIndex];

    const nextPhotoIndex = currentPhotoIndex < albumLength - 1 ? currentPhotoIndex + 1 : 0;
    const nextPhoto = photos[nextPhotoIndex];

    return [previousPhoto, nextPhoto];
  }

  enableNavigation() {
    const $document = $(document);

    $document.on('keydown.navigation', (event) => {
      const { keyCode } = event;

      if (previousPhotoKeyCodes.includes(keyCode)) {
        event.preventDefault();
        this.switchToPreviousPhoto();
      } else if (nextPhotoKeyCodes.includes(keyCode)) {
        event.preventDefault();
        this.switchToNextPhoto();
      } else if (closeKeyCodes.includes(keyCode)) {
        event.preventDefault();
        this.close();
      }
    });

    $document.on('mousemove.navigation', () => {
      const oldTimeout = this.state.hideControlsTimeout;

      clearTimeout(oldTimeout);

      const hideControlsTimeout = setTimeout(() => this.setState({ controlsVisible: false }), HIDE_CONTROLS_TIMEOUT);

      this.setState({
        controlsVisible: true,
        hideControlsTimeout,
      });
    });

    const touchEventsListener = new Hammer(document);

    this.setState({ touchEventsListener });

    touchEventsListener.on('swipe', (event) => {
      const { direction } = event;

      if (direction === Hammer.DIRECTION_LEFT || direction === Hammer.DIRECTION_UP) {
        this.switchToNextPhoto();
      } else if (direction === Hammer.DIRECTION_RIGHT || direction === Hammer.DIRECTION_DOWN) {
        this.switchToPreviousPhoto();
      }
    });
  }

  disableNavigation() {
    const $document = $(document);

    $document.off('keydown.navigation').off('mousemove.navigation');

    const { hideControlsTimeout, touchEventsListener } = this.state;

    clearTimeout(hideControlsTimeout);
    touchEventsListener.off('swipe');
  }

  preloadPhotos() {
    const { photos } = this.props.album;
    const photoIds = photos.map(photo => photo.id);
    const photoURLs = photos.map(photo => photo.image[PHOTO_SIZE]);

    const currentPhoto = this.props.photo;
    const currentPhotoIndex = photoIds.indexOf(currentPhoto.id);

    const photoURLsInOrderOfPreload = photoURLs.slice(currentPhotoIndex + 1)
      .concat(photoURLs.slice(0, currentPhotoIndex));

    return preloadImages(photoURLsInOrderOfPreload);
  }

  calculateContainerDimensions() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const viewportAspectRatio = viewportWidth / viewportHeight;
    const photoAspectRatio = this.props.photo.image.aspectRatio;

    let width;
    let height;

    if (viewportAspectRatio >= photoAspectRatio) {
      height = `${viewportHeight}px`;
      width = `calc((${viewportHeight}px) * ${photoAspectRatio})`;
    } else {
      width = `${viewportWidth}px`;
      height = `calc((${viewportWidth}px) / ${photoAspectRatio})`;
    }

    return { width, height };
  }

  switchToPreviousPhoto() {
    const { album } = this.props;
    const { previousPhoto } = this.state;

    Router.push(`/photo-album?path=${album.path}&photo=${previousPhoto.id}`, `/photography/${album.path}/${previousPhoto.id}`);
  }

  switchToNextPhoto() {
    const { album } = this.props;
    const { nextPhoto } = this.state;

    Router.push(`/photo-album?path=${album.path}&photo=${nextPhoto.id}`, `/photography/${album.path}/${nextPhoto.id}`);
  }

  close() {
    const { album } = this.props;

    Router.push(`/photo-album?path=${album.path}`, `/photography/${album.path}`);
  }

  handleOutsideClick(event) {
    const classList = Array.from(event.target.classList);

    if (classList.includes('photo-viewer-container')) {
      this.close();
    }
  }

  render() {
    const { photo } = this.props;
    const { imageURL, imageLoaded, controlsVisible } = this.state;

    const containerDimensions = this.calculateContainerDimensions();

    const averageColor = photo.image && photo.image.averageColor;
    const [r, g, b] = averageColor;
    const { from, to } = Colors.RGBToGradient(...averageColor);

    return (
      <div className="photo-viewer">
        <div className="photo-viewer-container" style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.7)` }} onClick={this.handleOutsideClick}>
          <div className="photo-viewer-container-inner" style={{ width: containerDimensions.width, height: containerDimensions.height }}>
            <div className={`photo-viewer-image ${imageLoaded ? 'photo-viewer-image-loaded' : ''}`} style={{ backgroundImage: `url("${imageURL}")` }} />
            <div className="photo-viewer-placeholder" style={{ backgroundImage: `linear-gradient(to bottom right, ${from}, ${to})` }}>
              <LoaderIcon className="photo-viewer-loader" />
            </div>
            {
              photo.description &&
              <div className="photo-viewer-info smaller">
                <div className="photo-viewer-description">{photo.description}</div>
              </div>
            }
            <ControlButtons
              visible={controlsVisible}
              onNext={this.switchToNextPhoto}
              onPrevious={this.switchToPreviousPhoto}
              onClose={this.close}
            />
          </div>
        </div>
      </div>
    );
  }
}

PhotoViewer.propTypes = {
  photo: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.object,
  }).isRequired,
  album: PropTypes.shape({
    path: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.object),
  }),
};

PhotoViewer.defaultProps = {
  album: {},
};

export default PhotoViewer;
