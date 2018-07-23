import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Colors from '../../services/colors';
import * as Grammar from '../../services/grammar';

const AlbumPreview = (props) => {
  const averageCoverColor = props.cover.averageColor;
  const preloadGradient = Colors.RGBToGradient(...averageCoverColor);

  const style = {};
  const classList = ['photo-album-preview', props.className];
  const cover = props.cover || {};

  style.backgroundImage = `url("${cover.small}"), linear-gradient(to bottom right, ${preloadGradient.from}, ${preloadGradient.to})`;

  const photosCount = Grammar.describeWordCount(props.photos.length, ['фотографія', 'фотографії', 'фотографій']);
  const photosDate = Grammar.formatDate(props.shootAt);

  return (
    <Link href={`/photo-album?path=${props.path}`} as={`/photography/${props.path}`}>
      <a className={classList.join(' ')}>
        <div className="photo-album-preview-inner aspect-ratio-16-10" style={style}>
          <div className="photo-album-preview-content">
            <div className="photo-album-preview-text">
              <h3 className="photo-album-preview-title">{props.title}</h3>
              {
                props.description && <div className="photo-album-preview-description smaller">{props.description}</div>
              }
              <div className="photo-album-preview-info smaller">{photosCount} / {photosDate}</div>
            </div>
            <div className="photo-album-preview-mask" style={{ background: `linear-gradient(to bottom right, ${preloadGradient.from}, ${preloadGradient.to})` }} />
          </div>
        </div>
      </a>
    </Link>
  );
};

AlbumPreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  path: PropTypes.string.isRequired,
  cover: PropTypes.shape({
    original: PropTypes.string,
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
    averageColor: PropTypes.arrayOf(PropTypes.number),
  }),
  shootAt: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

AlbumPreview.defaultProps = {
  description: '',
  cover: {},
  photos: [],
  className: '',
};

export default AlbumPreview;
