import React from 'react';
import PropTypes from 'prop-types';
import BirdIcon from '../../static/icons/logo.svg';

const Logo = (props) => {
  const classList = ['logo', 'layout-row', 'layout-align-center-center', props.className];

  if (props.light) {
    classList.push('logo-light');
  }

  return (
    <div className={classList.join(' ')}>
      <BirdIcon className="logo-icon" />
      {
        props.text && <span className="logo-text">Сойка</span>
      }
    </div>
  );
};

Logo.propTypes = {
  text: PropTypes.bool,
  light: PropTypes.bool,
  className: PropTypes.string,
};

Logo.defaultProps = {
  text: true,
  light: false,
  className: '',
};

export default Logo;
