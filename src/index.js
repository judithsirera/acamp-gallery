import React, { createRef } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

const SWIPER_MIN_DISTANCE = 50;

class GallerySlider extends React.PureComponent {
  swipeStart = 0;

  constructor(props, context) {
    super(props, context);
    this.imagesContainerRef = createRef(null);
    this.state = {
      loading: true,
      activeWidth: 500,
      activeImage: props.initialImage,
      offsetLeft: 0
    };

    this.calculateOffset = this.calculateOffset.bind(this);
    this.calculateActiveWidth = this.calculateActiveWidth.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getImagesStyles = this.getImagesStyles.bind(this);
    this.handleEndSwipe = this.handleEndSwipe.bind(this);
    this.handleStartSwipe = this.handleStartSwipe.bind(this);
  }

  calculateActiveWidth(callback) {
    const { columnGutter, columnWidth, sideColumns } = this.props;
    const imagesContainerWidth = this.imagesContainerRef.current.clientWidth;
    const spaceTakenBySideImages = columnWidth * (sideColumns * 2);
    const spaceTakenByMargins = columnGutter * (sideColumns * 2);
    const activeWidth = imagesContainerWidth - spaceTakenBySideImages - spaceTakenByMargins;
    this.setState({ activeWidth }, callback);
  }

  calculateOffset() {
    const { activeImage } = this.state;
    const { columnWidth, columnGutter, sideColumns } = this.props;
    const constantOffset = (columnWidth + columnGutter) * sideColumns;
    this.setState({ offsetLeft: constantOffset - (columnWidth + columnGutter) * activeImage });
  }

  componentDidMount() {
    this.calculateActiveWidth(() => {
      this.setState({ loading: false });
      this.calculateOffset();
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    const { activeImage } = this.state;
    if (prevState.activeImage != activeImage) {
      this.calculateOffset();
    }
  }

  handleStartSwipe(event) {
    event.stopPropagation();

    event.target.setPointerCapture(event.pointerId);
    this.swipeStart = event.pageX;
  }

  handleEndSwipe(event) {
    const { images } = this.props;
    const { activeImage } = this.state;
    event.stopPropagation();

    event.target.setPointerCapture(event.pointerId);
    const swipeEnd = event.pageX;

    if (swipeEnd - this.swipeStart > SWIPER_MIN_DISTANCE) {
      if (activeImage > 0) this.setState({ activeImage: activeImage - 1 }); // Right
    } else if (swipeEnd - this.swipeStart < -SWIPER_MIN_DISTANCE) {
      if (activeImage < images.length - 1) this.setState({ activeImage: activeImage + 1 }); // Left
    } else {
      const imageId = parseInt(event?.target?.id); // Click
      if (imageId >= 0) this.setState({ activeImage: imageId });
    }

    this.swipeStart = null;
  }

  getImagesStyles({ src, width, bgOffset }) {
    const { columnGutter } = this.props;
    const { offsetLeft } = this.state;

    const style = {
      backgroundImage: `url(${src})`,
      minWidth: `${width}px`,
      maxWidth: `${width}px`,
      width: `${width}px`,
      margin: `0px ${columnGutter / 2}px`,
      transform: `translateX(${offsetLeft}px)`
    };

    if (bgOffset) style.backgroundPosition = bgOffset;

    return style;
  }

  getImages(image, index) {
    const { activeWidth, activeImage } = this.state;
    const { columnWidth } = this.props;
    const isActive = activeImage === index;
    return (
      <div
        className={classNames(styles.galleryImage)}
        style={this.getImagesStyles({ src: image, width: isActive ? activeWidth : columnWidth })}
        key={index}
        id={index}
      />
    );
  }

  render() {
    const { loading, activeImage } = this.state;
    const { images, loaderElement, height, columnWidth } = this.props;

    const swipeHandlers = {
      onPointerDown: this.handleStartSwipe,
      onPointerUp: this.handleEndSwipe,
      onTouchStart: this.handleStartSwipe,
      onTouchEnd: this.handleEndSwipe
    };

    const hasMoreThanOneImage = images.length > 1;
    const firstImage = images[0];
    const lastImage = images[images.length - 1];

    return (
      <>
        {loading ?? loaderElement}
        <div
          className={classNames(styles.galleryWrapper, loading && styles.hidden)}
          style={{ height: `${height}px` }}>
          {hasMoreThanOneImage && (
            <div
              className={classNames(styles.navigationButton)}
              onClick={() => this.setState({ activeImage: activeImage - 1 })}
              disabled={activeImage === 0}
            />
          )}
          <div
            className={styles.imagesContainer}
            ref={this.imagesContainerRef}
            style={{
              marginLeft: hasMoreThanOneImage ? 16 : null
            }}
            {...swipeHandlers}>
            <div
              className={classNames(styles.galleryImage, styles.disabled)}
              style={this.getImagesStyles({ src: firstImage, width: columnWidth, bgOffset: '0%' })}
            />
            <div
              className={classNames(styles.galleryImage, styles.disabled)}
              style={this.getImagesStyles({ src: firstImage, width: columnWidth, bgOffset: '25%' })}
            />
            {images.map(this.getImages)}
            <div
              className={classNames(styles.galleryImage, styles.disabled)}
              style={this.getImagesStyles({ src: lastImage, width: columnWidth, bgOffset: '75%' })}
            />
            <div
              className={classNames(styles.galleryImage, styles.disabled)}
              style={this.getImagesStyles({ src: lastImage, width: columnWidth, bgOffset: '100%' })}
            />
          </div>
          {hasMoreThanOneImage && (
            <div
              className={classNames(styles.navigationButton)}
              style={{ marginLeft: 16 }}
              onClick={() => this.setState({ activeImage: activeImage + 1 })}
              disabled={activeImage === images.length - 1}
            />
          )}
        </div>
      </>
    );
  }
}

GallerySlider.defaultProps = {
  initialImage: 0,
  height: 460,
  images: [],
  columnGutter: 20,
  columnWidth: 75,
  sideColumns: 2
};

export default GallerySlider;
