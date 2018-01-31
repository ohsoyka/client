import React from 'react';
import PropTypes from 'prop-types';
import { Parallax, Background } from 'react-parallax';
import Colors from '../services/colors';

class Category extends React.Component {
  componentDidMount() {
    window.balanceText('blockquote');
  }

  render() {
    const { from, to } = Colors.stringToHEXGradient(this.props.title);
    const backgroundImage = this.props.image ? `url("${this.props.image}")` : `linear-gradient(to bottom right, ${from}, ${to})`;

    return (
      <div className="category">
        <Parallax
          strength={300}
          className="category-header"
        >
          <Background className="category-header-background-wrapper">
            <div className="category-header-background" style={{ backgroundImage }} />
          </Background>
          <div className="category-header-content-wrapper">
            <div className="category-header-content text-center layout-row layout-wrap layout-align-center-center">
              <h1 className="category-title balance-text">{this.props.title}</h1>
              <p className="category-description balance-text flex-100">{this.props.description}</p>
            </div>
          </div>
        </Parallax>
      </div>
    );
  }
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Category;
