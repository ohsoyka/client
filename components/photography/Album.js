import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Colors from '../../services/colors';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.albumLayoutElement = React.createRef();
  }

  componentDidMount() {
    this.initMasonry();
  }

  initMasonry() {
    new window.Masonry(this.albumLayoutElement.current, { // eslint-disable-line
      itemSelector: '.photo',
      percentPosition: true,
      columnWidth: '.grid-sizer',
    });
  }

  render() {
    const {
      title,
      description,
      photos,
    } = this.props;
    const previews = photos.map((photo, index, array) => {
      const classList = ['photo'];
      const averagePhotoColor = photo.image.averageColor;
      const preloadGradient = Colors.RGBToGradient(...averagePhotoColor);
      const [r, g, b] = averagePhotoColor;
      const style = {
        backgroundImage: `url("${photo.image.small}"), linear-gradient(to bottom right, ${preloadGradient.from}, ${preloadGradient.to})`,
        outlineColor: `rgb(${r}, ${g}, ${b})`,
        paddingTop: `calc(100% / ${photo.image.aspectRatio})`,
      };

      if (array.length === 1) {
        classList.push('grid-item-width-lg');
      } else if (array.length === 2) {
        classList.push('grid-item-width-md');
      } else {
        classList.push('grid-item-width-sm');
      }

      return (
        <div key={photo.id} className={classList.join(' ')}>
          <Link href={`/photo-album?path=${this.props.path}&photo=${photo.id}`} as={`/photography/${this.props.path}/${photo.id}`} scroll={false}>
            <a>
              <div className="photo-inner" style={style} />
            </a>
          </Link>
        </div>
      );
    });

    return (
      <div className="photo-album">
        <h1 className="photo-album-title">{title}</h1>
        {
          description && <div className="photo-album-description">{description}</div>
        }

        <div className="photo-album-layout children-horizontal-padding children-vertical-padding" ref={this.albumLayoutElement}>
          <div className="grid-sizer grid-item-width-sm" />
          {
            previews
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.object),
};

Album.defaultProps = {
  description: '',
  photos: [],
};

export default Album;
