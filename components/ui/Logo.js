import React from 'react';
import PropTypes from 'prop-types';
import BirdIcon from '../../static/icons/logo.svg';

const Logo = props => (
  <div className={`logo layout-row layout-align-center-center ${props.className}`}>
    <BirdIcon className="logo-icon" />
    {
      props.text && <span className="logo-text">Сойка</span>
    }
  </div>
);

Logo.propTypes = {
  text: PropTypes.bool,
  className: PropTypes.string,
};

Logo.defaultProps = {
  text: true,
  className: '',
};

export default Logo;
