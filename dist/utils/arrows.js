"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrowRight = exports.ArrowLeft = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ArrowLeft = _ref => {
  let {
    width = 16,
    height = 16
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      transform: 'rotate(180deg)'
    }
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "m6.5 5.5 3 3-3 3",
    stroke: "#050709",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round"
  }));
};

exports.ArrowLeft = ArrowLeft;

const ArrowRight = _ref2 => {
  let {
    width = 16,
    height = 16
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "m6.5 5.5 3 3-3 3",
    stroke: "#050709",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round"
  }));
};

exports.ArrowRight = ArrowRight;