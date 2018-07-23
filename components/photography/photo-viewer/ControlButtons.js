import React from 'react';
import PropTypes from 'prop-types';

const ControlButtons = (props) => {
  const {
    visible,
    onNext,
    onPrevious,
    onClose,
  } = props;
  const classList = ['photo-viewer-buttons'];

  if (visible) {
    classList.push('photo-viewer-buttons-visible');
  }

  return (
    <div className={classList.join(' ')}>
      <div className="photo-viewer-button photo-viewer-arrow photo-viewer-arrow-left" title="Попереднє фото (&larr; або &uarr;)" onClick={onPrevious}>
        <i className="fas fa-angle-left" />
      </div>
      <div className="photo-viewer-button photo-viewer-arrow photo-viewer-arrow-right" title="Наступне фото (&rarr; або &darr;)" onClick={onNext}>
        <i className="fas fa-angle-right" />
      </div>
      <div className="photo-viewer-button photo-viewer-close" title="Закрити" onClick={onClose}>
        <i className="fas fa-times" />
      </div>
    </div>
  );
};

ControlButtons.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onClose: PropTypes.func,
};

ControlButtons.defaultProps = {
  visible: false,
  onNext: () => {},
  onPrevious: () => {},
  onClose: () => {},
};

export default ControlButtons;
