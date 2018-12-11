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
  fade: true,
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
  constructor(props) {
    super(props);

    this.carouselElement = React.createRef();
  }
  componentDidMount() {
    if (!this.props.children.length) {
      return;
    }

    const $carousel = $(this.carouselElement.current.props.className);
    const $arrows = $carousel.find('.slick-arrow');

    let timeout;
    $carousel.on('mousemove', () => {
      $arrows.css('opacity', 0.5);
      clearTimeout(timeout);

      timeout = setTimeout(() => $arrows.css('opacity', 0), 3000);
    });
  }

  render() {
    const settings = { ...defaultSettings, ...this.props };
    const { children, fullScreen, className } = this.props;

    if (!children.length) {
      return null;
    }

    return (
      <Slider {...settings} className={`carousel ${fullScreen ? 'carousel-fullscreen' : ''} ${className}`} ref={this.carouselElement}>
        {children}
      </Slider>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  fullScreen: PropTypes.bool,
  className: PropTypes.string,
};

Carousel.defaultProps = {
  fullScreen: false,
  className: '',
};

export default Carousel;
