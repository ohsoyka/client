import React from 'react';
import PropTypes from 'prop-types';
import prepareHTMLBeforePresenting from '../helpers/prepare-html-before-presenting';

class Page extends React.Component {
  componentDidMount() {
    window.balanceText('blockquote');
  }

  render() {
    const body = prepareHTMLBeforePresenting(this.props.body);

    return (
      <div className="page">
        <h1>{this.props.title}</h1>
        <div className="page-body" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    );
  }
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
};

Page.defaultProps = {
  body: '',
};

export default Page;
