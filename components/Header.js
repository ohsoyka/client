import React from 'react';
import Link from 'next/link';
import Logo from './ui/Logo';

class Header extends React.Component {
  componentDidMount() {
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

  render() {
    return (
      <section className="header">
        <Link href="/"><a><Logo /></a></Link>
        <nav>
          <ul className="menu">
            <li><Link href="/projects"><a>Проекти</a></Link></li>
            <li><a>Ниття</a></li>
            <li><a>Ше шось</a></li>
            <li><Link href="/page?path=about" as="/about"><a>Про</a></Link></li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default Header;
