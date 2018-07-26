import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Logo from '../ui/Logo';

const Header = (props, context) => {
  const isLoggedIn = context.isAuthenticated;

  return (
    <div className="photography-header">
      <Link href="/">
        <a title="Повернутись на сайт">
          <Logo light />
        </a>
      </Link>
      {
        isLoggedIn &&
        <div className="photography-header-admin">
          <Link href="/admin"><a><i className="fas fa-lock" />Панель керування</a></Link>
        </div>
      }
    </div>
  );
};

Header.contextTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Header;
