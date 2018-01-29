import React from 'react';
import { current } from '../config';
import Logo from './ui/Logo';

const Footer = () => (
  <div className="footer">
    <div className="container layout-row layout-align-center-center">
      <Logo className="footer-logo" text={false} />
      <div className="flex-100">
        <ul className="footer-menu">
          <li><a>Проекти</a></li>
          <li><a>Ниття</a></li>
          <li><a>Ше шось</a></li>
          <li><a>Про</a></li>
        </ul>
        <hr className="footer-horizontal-line" />
        <ul className="footer-social">
          <li>
            <a className="fa fa-facebook-f" href={current.meta.social.facebook.link}><span className="sr-only">Facebook</span></a>
          </li>
          <li>
            <a className="fa fa-twitter" href={current.meta.social.twitter.link}><span className="sr-only">Twitter</span></a>
          </li>
          <li>
            <a className="fa fa-instagram" href={current.meta.social.instagram.link}><span className="sr-only">Instagram</span></a>
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
