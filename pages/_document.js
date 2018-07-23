import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { current } from '../config';
import styles from '../styles/main.scss';

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const {
      html,
      head,
      errorHtml,
      chunks,
    } = renderPage();

    return {
      html,
      head,
      errorHtml,
      chunks,
    };
  }

  render() {
    return (
      <html lang={current.meta.language}>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" key="content-type" />

          <link rel="icon" href="/static/icons/favicon-black.ico" type="image/x-icon" />
          <link rel="alternate" type="application/rss+xml" title="RSS сайту" href={`${current.clientURL}/rss`} />

          <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet" />

          <script src="/static/libs/headroom/headroom.js" />
          <script src="/static/libs/masonry/masonry.min.js" />
          <script src="/static/libs/balancetext/balancetext.min.js" />
          <script src="/static/libs/linakostenko/linakostenko.min.js" />

          <style dangerouslySetInnerHTML={{ __html: styles }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
