import React from 'react';
import PropTypes from 'prop-types';
import { Parallax, Background } from 'react-parallax';
import generateBackgroundGradient from '../helpers/generate-background-gradient';

class Project extends React.Component {
  componentDidMount() {
    window.balanceText('blockquote');
  }

  render() {
    const { averageColor } = this.props.image;
    const { from, to } = generateBackgroundGradient(this.props);
    const backgroundImage = `url("${this.props.image.large}"), linear-gradient(to bottom right, ${from}, ${to})`;

    return (
      <div className="project">
        <Parallax
          strength={300}
          className="project-header"
        >
          <Background className="project-header-background-wrapper">
            <div className="project-header-background" style={{ backgroundImage }} />
          </Background>
          <div className="project-header-content-wrapper">
            <div className="project-header-content text-center layout-row layout-wrap layout-align-center-center">
              <h1 className="project-title balance-text">{this.props.title}</h1>
              <p className="project-description balance-text flex-100">{this.props.description}</p>
            </div>
          </div>
        </Parallax>
        <div className="project-body">
          {this.props.body && <p>{this.props.body}</p>}
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    original: PropTypes.string,
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
    averageColor: PropTypes.arrayOf(PropTypes.number),
  }),
  description: PropTypes.string.isRequired,
  body: PropTypes.string,
};

Project.defaultProps = {
  body: '',
  image: {},
};

export default Project;
