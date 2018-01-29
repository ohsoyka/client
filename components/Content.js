import React from 'react';
import PropTypes from 'prop-types';

const Content = props => (
  <section className={`content ${props.className}`}>
    {props.children}
  </section>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Content.defaultProps = {
  className: '',
};

export default Content;
