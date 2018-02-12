import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

const NextArrow = props => (
  <button {...props}><i className="fa fa-arrow-right" /></button>
);

const PrevArrow = props => (
  <button {...props}><i className="fa fa-arrow-left" /></button>
);

const defaultSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
  variableWidth: true,
  adaptiveHeight: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

class Carousel extends React.Component {
  componentDidMount() {
    const $carousel = $('.carousel');
    const $arrows = $carousel.find('.slick-arrow');

    let timeout;
    $carousel.on('mousemove', () => {
      $arrows.css('opacity', 0.5);
      clearTimeout(timeout);

      timeout = setTimeout(() => $arrows.css('opacity', 0), 3000);
    });
  }

  render() {
    const settings = Object.assign({}, defaultSettings, this.props);

    return (
      <Slider {...settings} className={`carousel ${this.props.fullScreen ? 'carousel-fullscreen' : ''}`}>
        {this.props.children}
      </Slider>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  fullScreen: PropTypes.bool,
};

Carousel.defaultProps = {
  fullScreen: false,
};

export default Carousel;
