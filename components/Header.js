import React from 'react';
import Link from 'next/link';
import Logo from './ui/Logo';

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
    Header.initHeadroom();
    Header.initHamburgerButton();
  }

  render() {
    return (
      <section className="header">
        <Link href="/"><a><Logo /></a></Link>
        <nav className="layout-row layout-align-start-center">
          <div className="search-button">
            <Link href="/search">
              <a>
                <i className="fa fa-search" /><span className="sr-only">Facebook</span>
              </a>
            </Link>
          </div>
          <ul className="menu">
            <li><Link href="/projects"><a>Проекти</a></Link></li>
            <li><a>Ниття</a></li>
            <li><a>Ше шось</a></li>
            <li><Link href="/page?path=about" as="/pages/about"><a>Про</a></Link></li>
          </ul>
          <i className="menu-hamburger fa fa-bars" />
        </nav>
      </section>
    );
  }
}

export default Header;
