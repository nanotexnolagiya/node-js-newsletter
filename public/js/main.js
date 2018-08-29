webpackJsonp([0],{

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

module.exports = {
	$window: $(window),
	$homeSlider: $('.home-slider'),
	$burger: $('.hamburger'),
	$responsiveMenu: $('.responsive-menu')
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

__webpack_require__(128);

__webpack_require__(332);

var _variables = __webpack_require__(126);

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_variables2.default.$burger.on('click', function (e) {
	var $this = $(e.currentTarget);
	$this.toggleClass('is-active');

	_variables2.default.$responsiveMenu.slideToggle();
});

_variables2.default.$window.on('load', function () {
	$('.loader-section').hide();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {

__webpack_require__(129);

var _jquery = __webpack_require__(42);

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__(331);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery2.default;
__webpack_provided_window_dot_jQuery = _jquery2.default;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _variables = __webpack_require__(126);

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_variables2.default.$homeSlider.owlCarousel({
	nav: true,
	items: 1,
	margin: 30,
	dots: false,
	navText: ['<span class="left-arrow"></span>', '<span class="right-arrow"></span>'],
	responsive: {
		// breakpoint from 0 up
		0: {
			items: 1,
			margin: 0
		},
		// breakpoint from 768 up
		768: {
			items: 1,
			margin: 30
		}
	}
});

/***/ })

},[127]);
//# sourceMappingURL=main.js.map