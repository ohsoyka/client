import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.Component {
  componentDidMount() {
    window.balanceText('blockquote');
  }

  render() {
    return (
      <div className="page">
        <h1>{this.props.title}</h1>
        <div className="page-body" dangerouslySetInnerHTML={{ __html: this.props.body }} />
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
