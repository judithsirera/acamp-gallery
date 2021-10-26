"use strict";

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.parse-int.js");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SWIPER_MIN_DISTANCE = 50;

class GallerySlider extends _react.default.PureComponent {
  constructor(props, context) {
    super(props, context);

    _defineProperty(this, "swipeStart", 0);

    this.imagesContainerRef = /*#__PURE__*/(0, _react.createRef)(null);
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

  calculateActiveWidth() {
    let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
    const {
      columnGutter,
      columnWidth,
      sideColumns
    } = this.props;
    const imagesContainerWidth = this.imagesContainerRef.current.clientWidth;
    const spaceTakenBySideImages = columnWidth * (sideColumns * 2);
    const spaceTakenByMargins = columnGutter * (sideColumns * 2);
    const activeWidth = imagesContainerWidth - spaceTakenBySideImages - spaceTakenByMargins;
    this.setState({
      activeWidth
    }, callback);
  }

  calculateOffset() {
    const {
      activeImage
    } = this.state;
    const {
      columnWidth,
      columnGutter
    } = this.props;
    this.setState({
      offsetLeft: -(columnWidth + columnGutter) * activeImage
    });
  }

  componentDidMount() {
    this.calculateActiveWidth(() => {
      this.setState({
        loading: false
      });
      this.calculateOffset();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      activeImage
    } = this.state;

    if (prevProps !== this.props) {
      if (prevProps.images.length !== this.props.images.length) {
        this.forceUpdate();
      } else {
        this.calculateActiveWidth(() => {
          this.calculateOffset();
        });
      }
    } else if (prevState.activeImage != activeImage) {
      this.calculateOffset();
    }
  }

  handleStartSwipe(event) {
    event.stopPropagation();
    event.target.setPointerCapture(event.pointerId);
    this.swipeStart = event.pageX;
  }

  handleEndSwipe(event) {
    const {
      images
    } = this.props;
    const {
      activeImage
    } = this.state;
    event.stopPropagation();
    event.target.setPointerCapture(event.pointerId);
    const swipeEnd = event.pageX;

    if (swipeEnd - this.swipeStart > SWIPER_MIN_DISTANCE) {
      if (activeImage > 0) this.setState({
        activeImage: activeImage - 1
      }); // Right
    } else if (swipeEnd - this.swipeStart < -SWIPER_MIN_DISTANCE) {
      if (activeImage < images.length - 1) this.setState({
        activeImage: activeImage + 1
      }); // Left
    } else {
      var _event$target;

      const imageId = parseInt(event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.id); // Click

      if (imageId >= 0) this.setState({
        activeImage: imageId
      });
    }

    this.swipeStart = null;
  }

  getImagesStyles(_ref) {
    let {
      src,
      isActive,
      bgOffset
    } = _ref;
    const {
      columnGutter,
      containImage,
      columnWidth
    } = this.props;
    const {
      offsetLeft,
      activeWidth
    } = this.state;
    const width = isActive ? activeWidth : columnWidth;
    const style = {
      backgroundImage: "url(".concat(src, ")"),
      minWidth: "".concat(width, "px"),
      maxWidth: "".concat(width, "px"),
      width: "".concat(width, "px"),
      margin: "0px ".concat(columnGutter / 2, "px"),
      transform: "translateX(".concat(offsetLeft, "px)")
    };
    if (bgOffset) style.backgroundPosition = bgOffset;

    if (containImage !== GallerySlider.CONTAIN_OFF) {
      if (containImage === GallerySlider.CONTAIN) style.backgroundSize = 'contain';
      if (containImage === GallerySlider.CONTAIN_ACTIVE_IMAGE && isActive) style.backgroundSize = 'contain';
    }

    console.log(style);
    return style;
  }

  getImages(image, index) {
    const {
      activeImage
    } = this.state;
    const isActive = activeImage === index;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_indexModule.default.galleryImage),
      style: this.getImagesStyles({
        src: image,
        isActive
      }),
      key: index,
      id: index
    });
  }

  getSideColumns(image, isFirstImage) {
    const {
      sideColumns,
      columnWidth
    } = this.props;

    const getBgOffset = index => {
      let offset = 50 / sideColumns * index;
      if (!isFirstImage) offset += 50;
      return "".concat(offset, "%");
    };

    return Array.from(Array(sideColumns), (_, index) => /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_indexModule.default.galleryImage, _indexModule.default.disabled),
      style: this.getImagesStyles({
        src: image,
        isActive: false,
        bgOffset: getBgOffset(index)
      })
    }));
  }

  render() {
    const {
      loading,
      activeImage
    } = this.state;
    const {
      images,
      loaderElement,
      height,
      columnWidth,
      className
    } = this.props;
    const swipeHandlers = {
      onPointerDown: this.handleStartSwipe,
      onPointerUp: this.handleEndSwipe,
      onTouchStart: this.handleStartSwipe,
      onTouchEnd: this.handleEndSwipe
    };
    const hasMoreThanOneImage = images.length > 1;
    const firstImage = images[0];
    const lastImage = images[images.length - 1];
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loading !== null && loading !== void 0 ? loading : loaderElement, /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(className, _indexModule.default.galleryWrapper, loading && _indexModule.default.hidden),
      style: {
        height: "".concat(height, "px")
      }
    }, hasMoreThanOneImage && /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_indexModule.default.navigationButton),
      onClick: () => this.setState({
        activeImage: activeImage - 1
      }),
      disabled: activeImage === 0
    }), /*#__PURE__*/_react.default.createElement("div", _extends({
      className: _indexModule.default.imagesContainer,
      ref: this.imagesContainerRef,
      style: {
        marginLeft: hasMoreThanOneImage ? 16 : null
      }
    }, swipeHandlers), this.getSideColumns(firstImage), images.map(this.getImages), /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_indexModule.default.galleryImage, _indexModule.default.disabled),
      style: this.getImagesStyles({
        src: lastImage,
        width: columnWidth,
        bgOffset: '75%'
      })
    }), this.getSideColumns(lastImage, true)), hasMoreThanOneImage && /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_indexModule.default.navigationButton),
      style: {
        marginLeft: 16
      },
      onClick: () => this.setState({
        activeImage: activeImage + 1
      }),
      disabled: activeImage === images.length - 1
    })));
  }

}

GallerySlider.defaultProps = {
  initialImage: 0,
  height: 460,
  images: [],
  columnGutter: 20,
  columnWidth: 75,
  sideColumns: 2,
  containImage: 'off'
};
GallerySlider.CONTAIN = 'contain';
GallerySlider.CONTAIN_ACTIVE_IMAGE = 'contain_active';
GallerySlider.CONTAIN_OFF = 'off';
var _default = GallerySlider;
exports.default = _default;