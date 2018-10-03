import React from 'react';
import Link from 'next/link';

import { current } from '../config';
import Logo from './ui/Logo';

const menuItems = [
  {
    id: 1,
    markup: <Link href="/photography"><a>Фотопортфоліо</a></Link>,
  },
  {
    id: 2,
    markup: <Link href="/page?path=about" as="/pages/about"><a>Про</a></Link>,
  },
];

const Footer = () => (
  <div className="footer">
    <div className="container layout-row layout-align-center-center">
      <Logo className="footer-logo" text="" />
      <div className="flex-100">
        <ul className="footer-menu">
          {
            menuItems.map(item => <li key={item.id}>{item.markup}</li>)
          }
        </ul>
        <hr className="footer-horizontal-line" />
        <ul className="footer-contacts">
          <li>
            <a className="fab fa-facebook-f" href={current.meta.social.facebook.link}><span className="sr-only">Facebook</span></a>
          </li>
          <li>
            <a className="fab fa-twitter" href={current.meta.social.twitter.link}><span className="sr-only">Twitter</span></a>
          </li>
          <li>
            <a className="fab fa-instagram" href={current.meta.social.instagram.link}><span className="sr-only">Instagram</span></a>
          </li>
          <li>
            <a className="fa fa-rss" href={`${current.clientURL}/rss`}><span className="sr-only">RSS</span></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Footer;
