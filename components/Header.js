import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Logo from './ui/Logo';

import Session from '../services/session';

const menuItems = [
  {
    id: 5,
    markup: <Link href="/admin/index" as="/admin"><a><i className="fas fa-lock" />Панель керування</a></Link>,
    loggedInOnly: true,
  },
  {
    id: 1,
    markup: <Link href="/projects"><a>Проекти</a></Link>,
  },
  {
    id: 2,
    markup: <Link href="/photography"><a><i className="fas fa-camera" />Фотопортфоліо</a></Link>,
  },
  {
    id: 3,
    markup: <a>Ше шось</a>,
  },
  {
    id: 4,
    markup: <Link href="/page?path=about" as="/pages/about"><a>Про</a></Link>,
  },
];

const adminPanelMenuItems = [
  {
    id: 1,
    markup: <Link href="/"><a>Перейти на сайт</a></Link>,
  },
  {
    id: 4,
    markup: <a onClick={Session.logOut}>Вийти</a>,
  },
];

class Header extends React.Component {
  static initHeadroom() {
    const { Headroom } = window;

    if (!Headroom) {
      return;
    }

    const element = document.querySelector('.header');
    const headroom = new Headroom(element, {
      offset: 100,
      tolerance: 5,
    });

    headroom.init();
  }

  static initHamburgerButton() {
    const $menu = $('.header .menu');

    $('.header .menu-hamburger').on('click', (event) => {
      event.stopPropagation();

      if ($menu.hasClass('menu-visible')) {
        $menu.removeClass('menu-visible');
      } else {
        $menu.addClass('menu-visible');
      }
    });

    $('body').on('click', () => {
      $menu.removeClass('menu-visible');
    });
  }

  componentDidMount() {
    if (this.props.fixed) {
      Header.initHeadroom();
    }
    Header.initHamburgerButton();
  }

  render() {
    const isLoggedIn = this.context.isAuthenticated;
    const isInAdminPanel = this.props.admin;
    const isDark = this.props.dark;
    const isSpecial = this.props.special;
    const isFixed = this.props.fixed;

    const menu = (isInAdminPanel
      ? adminPanelMenuItems
      : menuItems.filter(item => !item.loggedInOnly || isLoggedIn))
      .map(item => <li key={item.id}>{item.markup}</li>);

    const logoHref = this.props.admin ? '/admin' : '/';

    const classList = ['header'];

    if (isDark) {
      classList.push('header-dark');
    }

    if (isSpecial) {
      classList.push('header-special');
    }

    if (isFixed) {
      classList.push('header-fixed');
    }

    return (
      <section className={classList.join(' ')}>
        <Link href={logoHref}><a><Logo light={isDark} /></a></Link>
        <nav className="header-nav layout-row layout-align-start-center">
          <div className="search-button">
            <Link href="/search">
              <a>
                <i className="fa fa-search" /><span className="sr-only">Facebook</span>
              </a>
            </Link>
          </div>
          <ul className="menu">
            {menu}
          </ul>
          <i className="menu-hamburger fa fa-bars" />
        </nav>
      </section>
    );
  }
}

Header.propTypes = {
  admin: PropTypes.bool,
  dark: PropTypes.bool,
  special: PropTypes.bool,
  fixed: PropTypes.bool,
};

Header.defaultProps = {
  admin: false,
  dark: false,
  special: false,
  fixed: true,
};

Header.contextTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Header;
