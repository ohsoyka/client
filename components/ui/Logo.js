import React from 'react';
import PropTypes from 'prop-types';
import BirdIcon from '../../static/icons/logo.svg';

const Logo = (props) => {
  const { text, light, className } = props;
  const classList = ['logo', 'layout-row', 'layout-align-center-center', className];

  if (light) {
    classList.push('logo-light');
  }

  return (
    <div className={classList.join(' ')}>
      <BirdIcon className="logo-icon" />
      {
        text && <span className="logo-text">{text}</span>
      }
    </div>
  );
};

Logo.propTypes = {
  text: PropTypes.string,
  light: PropTypes.bool,
  className: PropTypes.string,
};

Logo.defaultProps = {
  text: 'Сойка',
  light: false,
  className: '',
};

export default Logo;
