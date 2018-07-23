import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Breadcrumbs = props => (
  <ul className="photography-breadcrumbs">
    {
      props.crumbs.map(({ title, href, as }) => {
        const link = (
          <Link href={href} as={as}>
            <a><h3>&larr;&nbsp;{title}</h3></a>
          </Link>
        );

        return <li className="photography-breadcrumbs-item" key={href}>{link}</li>;
      })
    }
  </ul>
);

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
    as: PropTypes.string,
  })).isRequired,
};

export default Breadcrumbs;
