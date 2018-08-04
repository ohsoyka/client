import React from 'react';
import PropTypes from 'prop-types';

const ControlButtons = (props) => {
  const {
    visible,
    onNext,
    onPrevious,
    // onClose,
  } = props;
  const classList = ['photo-viewer-buttons'];

  if (visible) {
    classList.push('photo-viewer-buttons-visible');
  }

  return (
    <div className={classList.join(' ')}>
      <div className="photo-viewer-button photo-viewer-arrow photo-viewer-arrow-left">
        <div className="photo-viewer-button-inner" title="Попереднє фото (&larr; або &uarr;)" onClick={onPrevious}>
          <i className="fas fa-angle-left" />
        </div>
      </div>
      <div className="photo-viewer-button photo-viewer-arrow photo-viewer-arrow-right">
        <div className="photo-viewer-button-inner" title="Наступне фото (&rarr; або &darr;)" onClick={onNext}>
          <i className="fas fa-angle-right" />
        </div>
      </div>
      {/* <div className="photo-viewer-button photo-viewer-close">
        <div className="photo-viewer-button-inner" title="Закрити" onClick={onClose}>
          <i className="fas fa-times" />
        </div>
      </div> */}
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
