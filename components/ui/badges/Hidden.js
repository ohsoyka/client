import React from 'react';
import PropTypes from 'prop-types';

const HiddenBadge = ({ className }) => (
  <i className={`fas fa-eye-slash ${className}`} title="Заховано" />
);

HiddenBadge.propTypes = {
  className: PropTypes.string,
};

HiddenBadge.defaultProps = {
  className: '',
};

export default HiddenBadge;
