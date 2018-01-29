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

          <link rel="icon" href="/static/icons/favicon.ico" type="image/x-icon" />
          <link rel="alternate" type="application/rss+xml" title="RSS сайту" href={`${current.clientURL}/rss`} />

          <link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

          <script src="/static/libs/headroom/headroom.js" />
          <script src="/static/libs/masonry/masonry.min.js" />

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
