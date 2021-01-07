(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("nano-js"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["nano-js", "vue"], factory);
	else if(typeof exports === 'object')
		exports["nano-ui"] = factory(require("nano-js"), require("vue"));
	else
		root["nano-ui"] = factory(root["Nano"], root["Vue"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_nano_js__, __WEBPACK_EXTERNAL_MODULE_vue__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/button/index.js":
/*!*****************************!*\
  !*** ./src/button/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_button_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/button/button */ "./src/button/src/button/button.js");
/* harmony import */ var _src_button_group_button_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/button-group/button-group */ "./src/button/src/button-group/button-group.js");


/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_button_button__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_button_button__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_button_group_button_group__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_button_group_button_group__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/button/src/button-group/button-group.js":
/*!*****************************************************!*\
  !*** ./src/button/src/button-group/button-group.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NButtonGroup',
  render: function render() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-button-group"
    }, [this.$slots["default"]]);
  }
});

/***/ }),

/***/ "./src/button/src/button/button.js":
/*!*****************************************!*\
  !*** ./src/button/src/button/button.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NButton',
  props: {
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    link: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    square: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    icon: {
      "default": function _default() {
        return null;
      }
    },
    iconPosition: {
      "default": function _default() {
        return 'before';
      },
      type: [String]
    },
    buttonType: {
      "default": function _default() {
        return 'button';
      },
      type: [String]
    },
    nativeType: {
      "default": function _default() {
        return 'button';
      },
      type: [String]
    }
  },
  renderIcon: function renderIcon() {
    if (!this.icon) {
      return null;
    }

    var classList = ['n-icon', 'n-icon--' + this.iconPosition];
    classList.push(this.icon);
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": classList
    }, null);
  },
  render: function render() {
    var classList = ['n-button', 'n-button--' + this.size, 'n-button--' + this.type];

    if (this.icon) {
      classList.push('n-button--icon');
    }

    if (this.link) {
      classList.push('n-button--link');
    }

    if (this.square) {
      classList.push('n-button--square');
    }

    if (this.disabled) {
      classList.push('n-disabled');
    }

    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(this.$attrs, ['class'], {
      "class": this.cmer(classList)
    });

    if (this.disabled) {
      props.disabled = true;
    }

    var innerHtml = [];

    if (this.iconPosition === 'before') {
      innerHtml.push(this.ctor('renderIcon')());
    }

    if (this.$slots["default"]) {
      innerHtml.push(Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.$slots["default"]()]));
    }

    if (this.iconPosition === 'after') {
      innerHtml.push(this.ctor('renderIcon')());
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])(this.nativeType, props, innerHtml);
  }
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: NanoInstall, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NanoInstall", function() { return NanoInstall; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_src_ctor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/src/ctor */ "./src/mixins/src/ctor.js");
/* harmony import */ var _mixins_src_cmer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/src/cmer */ "./src/mixins/src/cmer.js");



var NanoIcons = {
  checked: 'fa fa-check',
  intermediate: 'fa fa-minus',
  clock: 'fa fa-clock',
  calendar: 'fa fa-calendar',
  times: 'fa fa-times',
  primary: 'fa fa-info-circle',
  success: 'fa fa-check-circle',
  warning: 'fa fa-exclamation-circle',
  danger: 'fa fa-times-circle',
  info: 'fa fa-info-circle',
  angleUp: 'fa fa-angle-up',
  angleRight: 'fa fa-angle-right',
  angleDown: 'fa fa-angle-down',
  angleLeft: 'fa fa-angle-left'
};
var NanoStyles = {
  iconPosition: 'before',
  notifyPosition: 'bottom-start'
};
function NanoInstall(App) {
  var Icons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var Styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (global.Nano === undefined) {
    return console.error('Nano JS is not available in scope.');
  }

  global.Nano.install(App.config.globalProperties);
  App.config.globalProperties.ctor = _mixins_src_ctor__WEBPACK_IMPORTED_MODULE_1__["default"].ctor;
  App.config.globalProperties.cmer = _mixins_src_cmer__WEBPACK_IMPORTED_MODULE_2__["default"].cmer;
  App.config.globalProperties.trans = global.Nano.Locale.trans;
  App.config.globalProperties.choice = global.Nano.Locale.choice;

  if (!global.NanoIcons) {
    global.NanoIcons = Nano.Obj.assign(NanoIcons, global.NanoIcons);
  }

  App.config.globalProperties.icons = Nano.Obj.assign(global.NanoIcons, Icons);

  if (!global.NanoStyles) {
    global.NanoStyles = Nano.Obj.assign(NanoStyles, global.NanoStyles);
  }

  App.config.globalProperties.styles = Nano.Obj.assign(global.NanoStyles, Styles); //require('./config/index');
  // require('./chart/index');
  // require('./notification/index');
  // require('./scrollbar/index');
  // require('./resizer/index');
  // require('./virtualscroller/index');
  // require('./draggable/index');
  // require('./loader/index');
  // require('./form/index');

  __webpack_require__(/*! ./button/index */ "./src/button/index.js")["default"](App);

  __webpack_require__(/*! ./input/index */ "./src/input/index.js")["default"](App); // require('./textarea/index');
  // require('./switch/index');
  // require('./checkbox/index');
  // require('./radio/index');


  __webpack_require__(/*! ./select/index */ "./src/select/index.js")["default"](App); // require('./cascader/index');
  // require('./datepicker/index');
  // require('./timepicker/index');
  // require('./transfer/index');
  // require('./file/index');


  __webpack_require__(/*! ./popover/index */ "./src/popover/index.js")["default"](App); // require('./modal/index');
  // require('./confirm/index');
  // require('./table/index');
  // require('./paginator/index');
  // require('./tabs/index');
  // require('./info/index');
  // require('./file-list/index');
  // require('./map/index');
  // require('./wysiwyg/index');

}
global.NanoInstall = NanoInstall;
/* harmony default export */ __webpack_exports__["default"] = (NanoInstall);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/input/index.js":
/*!****************************!*\
  !*** ./src/input/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_input_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/input/input */ "./src/input/src/input/input.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_input_input__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_input_input__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/input/src/input/input.js":
/*!**************************************!*\
  !*** ./src/input/src/input/input.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      "default": function _default() {
        return null;
      }
    },
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    icon: {
      "default": function _default() {
        return null;
      }
    },
    iconPosition: {
      "default": function _default() {
        return 'after';
      },
      type: [String]
    },
    iconDisabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    nativeType: {
      "default": function _default() {
        return 'text';
      },
      type: [String]
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    placeholder: {
      "default": function _default() {
        return '';
      },
      type: [String]
    }
  },
  watch: {
    modelValue: function modelValue() {
      this.tempValue = this.modelValue;
    }
  },
  methods: {
    eventIconClick: function eventIconClick(event) {
      this.$emit('icon-click', event);
    },
    eventInput: function eventInput(event) {
      this.$emit('update:modelValue', this.tempValue = event.target.value);
    }
  },
  data: function data() {
    return {
      tempValue: this.modelValue
    };
  },
  renderIcon: function renderIcon() {
    if (!this.icon) {
      return null;
    }

    var events = {
      click: this.eventIconClick
    };
    var props = {
      type: 'input',
      icon: this.icon,
      size: this.size,
      square: true,
      disabled: this.iconDisabled
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), {
      "props": props,
      "on": events
    }, null);
  },
  renderInput: function renderInput() {
    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(this.$attrs, ['class', 'style']);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].assign(props, {
      value: this.tempValue,
      type: this.nativeType,
      disabled: this.disabled,
      placeholder: this.placeholder,
      onInput: this.eventInput
    });

    if (this.disabled) {
      props.disabled = true;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("input", props, null);
  },
  render: function render() {
    var classList = ['n-input', 'n-input--' + this.size, 'n-input--' + this.type];

    if (this.icon) {
      classList.push('n-input--icon');
      classList.push('n-input--icon-' + this.iconPosition);
    }

    if (this.disabled) {
      classList.push('n-disabled');
    }

    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].only(this.$attrs, ['style'], {
      "class": this.cmer(classList)
    });
    var innerHtml = [];

    if (this.iconPosition === 'before') {
      innerHtml.push(this.ctor('renderIcon')());
    }

    innerHtml.push(this.ctor('renderInput')());

    if (this.iconPosition === 'after') {
      innerHtml.push(this.ctor('renderIcon')());
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])('div', props, innerHtml);
  }
});

/***/ }),

/***/ "./src/mixins/src/cmer.js":
/*!********************************!*\
  !*** ./src/mixins/src/cmer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  cmer: function cmer(classList) {
    var attrsList = {};

    if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(classList)) {
      attrsList[classList] = true;
    }

    if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isArray(classList)) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(classList, function (value) {
        return attrsList[value] = true;
      });
    }

    if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isPlain(classList)) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign(attrsList, classList);
    }

    if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(this.$attrs["class"])) {
      attrsList[this.$attrs["class"]] = true;
    }

    if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isArray(this.$attrs["class"])) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.$attrs["class"], function (value) {
        return attrsList[value] = true;
      });
    }

    if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isPlain(this.$attrs["class"])) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign(attrsList, this.$attrs["class"]);
    }

    return attrsList;
  }
});

/***/ }),

/***/ "./src/mixins/src/ctor.js":
/*!********************************!*\
  !*** ./src/mixins/src/ctor.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  ctor: function ctor(key) {
    var _this = this;

    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var ctor = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.$options, key.split('.'), -1); // console.log(ctor);
    // if ( ctor === -1 ) {
    //     ctor = Obj.get(this.$vnode.componentOptions.Ctor,
    //         Arr.merge(['options'], key.split('.')), -1);
    // }

    if (ctor === -1) {
      ctor = fallback;
    }

    if (typeof ctor !== 'function') {
      return ctor;
    }

    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return ctor.apply(_this, args);
    };
  }
});

/***/ }),

/***/ "./src/popover/index.js":
/*!******************************!*\
  !*** ./src/popover/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_popover_popover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/popover/popover */ "./src/popover/src/popover/popover.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_popover_popover__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_popover_popover__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/popover/src/popover/popover.js":
/*!********************************************!*\
  !*** ./src/popover/src/popover/popover.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NPopover',
  provide: function provide() {
    return {
      NPopover: this
    };
  },
  props: {
    modelValue: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    width: {
      "default": function _default() {
        return 0;
      },
      type: [Number]
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    selector: {
      "default": function _default() {
        return null;
      }
    },
    boundary: {
      "default": function _default() {
        return null;
      }
    },
    window: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    trigger: {
      "default": function _default() {
        return 'hover';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'default';
      },
      type: [String]
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    position: {
      "default": function _default() {
        return 'bottom-center';
      },
      type: [String]
    },
    scrollClose: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    framerate: {
      "default": function _default() {
        return 30;
      },
      type: [Number]
    }
  },
  watch: {
    modelValue: function modelValue() {
      this.tempValue = this.modelValue;
    },
    tempValue: function tempValue() {
      this.refreshVisible();
    }
  },
  methods: {
    active: function active() {
      return this.tempValue;
    },
    close: function close() {
      this.$emit('update:modelValue', this.tempValue = false);
    },
    refreshVisible: function refreshVisible() {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).css(null);

      if (!this.tempValue) {
        return clearInterval(this.refresh);
      }

      this.refresh = setInterval(this.updatePosition, 1000 / this.framerate);
      delete this.passedOffset;
    },
    isSameOffset: function isSameOffset(offset) {
      var _this = this;

      if (!this.passedOffset) {
        return false;
      }

      var rainbow = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(['x', 'y'], function (key) {
        return offset[key] === _this.passedOffset[key];
      });
      return !nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(rainbow, false);
    },
    getTargetHorizontal: function getTargetHorizontal(position) {
      var targetRect = this.target.getBoundingClientRect();

      if (this.trigger === 'context') {
        targetRect = {
          top: this.clientY,
          left: this.clientX,
          width: 2,
          height: 2
        };
      }

      var windowRect = this.$el.getBoundingClientRect();

      if (this.width === -1) {
        windowRect.width = targetRect.width;
      }

      var posY = {
        // Set above the tagret element
        start: targetRect.top - windowRect.height,
        // Set at bottom of target element
        end: targetRect.top + targetRect.height
      };
      var posX = {
        // Set on the left of target element
        start: targetRect.left,
        // Set into the center of the target element
        center: targetRect.left + targetRect.width * 0.5 - windowRect.width * 0.5,
        // Set on the right of the target element
        end: targetRect.left + targetRect.width - windowRect.width
      };
      var offset = {
        x: 0,
        y: 0
      };

      if (position === 'top-start') {
        offset = {
          x: posX.start,
          y: posY.start
        };
      }

      if (position === 'top-center') {
        offset = {
          x: posX.center,
          y: posY.start
        };
      }

      if (position === 'top-end') {
        offset = {
          x: posX.end,
          y: posY.start
        };
      }

      if (position === 'bottom-start') {
        offset = {
          x: posX.start,
          y: posY.end
        };
      }

      if (position === 'bottom-center') {
        offset = {
          x: posX.center,
          y: posY.end
        };
      }

      if (position === 'bottom-end') {
        offset = {
          x: posX.end,
          y: posY.end
        };
      }

      if (offset.y < 0) {
        offset.y = 0;
      }

      if (offset.y + windowRect.height > window.innerHeight) {
        offset.y = window.innerHeight - windowRect.height;
      }

      if (offset.x < 0) {
        offset.x = 0;
      }

      if (offset.x + windowRect.width > window.innerWidth) {
        offset.x = window.innerWidth - windowRect.width;
      }

      return offset;
    },
    getTargetVertical: function getTargetVertical(position) {
      var targetRect = this.target.getBoundingClientRect();

      if (this.trigger === 'context') {
        targetRect = {
          top: this.clientY,
          left: this.clientX,
          width: 2,
          height: 2
        };
      }

      var windowRect = this.$el.getBoundingClientRect();

      if (this.width === -1) {
        windowRect.width = targetRect.width;
      }

      var posY = {
        // Set at top edge of the target element
        start: targetRect.top,
        // Set at the middle of the target element
        center: targetRect.top + targetRect.height * 0.5 - windowRect.height * 0.5,
        // Ste at the bottom of the target elemnent
        end: targetRect.top + targetRect.height - windowRect.height
      };
      var posX = {
        // Set to the left of the target element
        start: targetRect.left - windowRect.width,
        // Set to the right of the target element
        end: targetRect.left + targetRect.width
      };
      var offset = {
        x: 0,
        y: 0
      };

      if (position === 'left-start') {
        offset = {
          x: posX.start,
          y: posY.start
        };
      }

      if (position === 'left-center') {
        offset = {
          x: posX.start,
          y: posY.center
        };
      }

      if (position === 'left-end') {
        offset = {
          x: posX.start,
          y: posY.end
        };
      }

      if (position === 'right-start') {
        offset = {
          x: posX.end,
          y: posY.start
        };
      }

      if (position === 'right-center') {
        offset = {
          x: posX.end,
          y: posY.center
        };
      }

      if (position === 'right-end') {
        offset = {
          x: posX.end,
          y: posY.end
        };
      }

      if (offset.y < 0) {
        offset.y = 0;
      }

      if (offset.y + windowRect.height > window.innerHeight) {
        offset.y = window.innerHeight - windowRect.height;
      }

      if (offset.x < 0) {
        offset.x = 0;
      }

      if (offset.x + windowRect.width > window.innerWidth) {
        offset.x = window.innerWidth - windowRect.width;
      }

      return offset;
    },
    getTargetOffset: function getTargetOffset() {
      var position = this.position;

      if (position.match(/^(top|bottom)\-/)) {
        return this.getTargetHorizontal(position);
      }

      if (position.match(/^(left|right)\-/)) {
        return this.getTargetVertical(position);
      }

      return targetRect;
    },
    updatePosition: function updatePosition() {
      var rect = this.target.getBoundingClientRect();

      if (this.isSameOffset(rect)) {
        return;
      }

      var offset = this.getTargetOffset();
      var style = {
        'z-index': window.zIndex++,
        'top': Math.round(offset.y) + 'px',
        'left': Math.round(offset.x) + 'px'
      };

      if (this.width === -1) {
        style.width = rect.width + 'px';
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).css(style);

      if (this.scrollClose && this.passedOffset) {
        this.close();
      }

      this.passedOffset = rect;
    },
    onHover: function onHover(event, el) {
      if (this.disabled) {
        return;
      }

      var target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.target),
          source = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.$el);
      var result = !!target || !!source;

      if (this.tempValue === result) {
        return;
      }

      if (!result) {
        return this.$nextTick(this.close);
      }

      this.$emit('update:modelValue', this.tempValue = result);
    },
    onClick: function onClick(event, el) {
      var keyCode = event.which === 1;

      if (this.disabled || this.tempValue || !keyCode) {
        return;
      }

      var target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.target),
          source = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.$el);
      var result = !!target || !!source;

      if (this.tempValue === result) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      this.$emit('update:modelValue', this.tempValue = result);
    },
    onContext: function onContext(event, el) {
      var keyCode = event.which === 3;

      if (this.disabled || this.tempValue || !keyCode) {
        return;
      }

      var target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.target),
          source = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.$el);
      this.clientX = event.clientX;
      this.clientY = event.clientY;
      var result = !!target || !!source;

      if (this.tempValue === result) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      this.$emit('update:modelValue', this.tempValue = result);
    },
    onExit: function onExit(event, el) {
      if (this.disabled || !this.tempValue) {
        return;
      }

      if (!!nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.$el)) {
        return;
      }

      var target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.target);

      if (this.trigger !== 'context' && !!target) {
        return;
      }

      this.close();
    }
  },
  data: function data() {
    return {
      tempValue: false,
      clientX: 0,
      clientY: 0,
      target: null
    };
  },
  beforeMount: function beforeMount() {
    this.tempValue = this.visible;
  },
  mounted: function mounted() {
    this.target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).previous().get(0);

    if (this.trigger === 'context') {
      this.target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).parent().get(0);
    }

    if (this.window) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).append(this.$el);
    }

    if (this.trigger === 'hover') {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('mousemove', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onHover, 30), this._uid);
    }

    if (this.trigger === 'click') {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('click', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onClick, 30), this._uid);
    }

    if (this.trigger === 'context') {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('contextmenu', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onContext, 30), this._uid);
    }

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('mousedown', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onExit, 30), this._uid);
  },
  beforeUnmount: function beforeUnmount() {
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('mousemove', null, this._uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('click', null, this._uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('contextmenu', null, this._uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('mousedown', null, this._uid);
    this.$el.remove();
  },
  renderBody: function renderBody() {
    if (this.$slots.raw) {
      return this.$slots.raw();
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-popover__frame"
    }, [this.$slots.header && Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-popover__header"
    }, [this.$slots.header()]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-popover__body"
    }, [this.$slots["default"]()]), this.$slots.footer && Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-popover__footer"
    }, [this.$slots.footer()])]);
  },
  render: function render() {
    if (!window.zIndex) {
      window.zIndex = 9000;
    }

    var classList = ['n-popover', 'n-popover--' + this.type, 'n-popover--' + this.position];

    if (this.size) {
      classList.push('n-popover--' + this.size);
    }

    if (!this.tempValue) {
      classList.push('n-hidden');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": this.cmer(classList)
    }, [this.tempValue && this.ctor('renderBody')()]);
  }
});

/***/ }),

/***/ "./src/select/index.js":
/*!*****************************!*\
  !*** ./src/select/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_select_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/select/select */ "./src/select/src/select/select.js");
/* harmony import */ var _src_select_option_select_option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/select-option/select-option */ "./src/select/src/select-option/select-option.js");



/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_select_select__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_select_select__WEBPACK_IMPORTED_MODULE_1__["default"]);
  App.component(_src_select_option_select_option__WEBPACK_IMPORTED_MODULE_2__["default"].name, _src_select_option_select_option__WEBPACK_IMPORTED_MODULE_2__["default"]);
});

/***/ }),

/***/ "./src/select/src/select-option/select-option.js":
/*!*******************************************************!*\
  !*** ./src/select/src/select-option/select-option.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NSelectOption',
  inject: {
    NSelect: {
      "default": undefined
    }
  },
  props: {
    value: {
      "default": function _default() {
        return '';
      }
    },
    prop: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    label: {
      "default": function _default() {
        return null;
      }
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    }
  },
  computed: {
    veValue: function veValue() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.prop)) {
        return this.value;
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.value, this.prop);
    }
  },
  beforeMount: function beforeMount() {
    this.NSelect.addOption(this);
  },
  destroyed: function destroyed() {
    this.NSelect.removeOption(this);
  },
  renderOption: function renderOption(index) {
    var _this = this;

    var classList = ['n-popover-option'];

    if (this.NSelect.multiple && nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(this.NSelect.veValue, this.value)) {
      classList.push('n-active');
    }

    if (!this.NSelect.multiple && this.NSelect.veValue === this.value) {
      classList.push('n-active');
    }

    if (this.disabled) {
      classList.push('n-disabled');
    }

    if (this.NSelect.veIndex === index) {
      classList.push('n-current');
    }

    var events = {};

    if (!this.disabled) {
      events.onClick = function (event) {
        return _this.NSelect.toggleOption(_this.veValue, event);
      };
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList,
      "data-option": this._uid
    }, events), [this.$slots["default"] ? this.$slots["default"]() : this.label]);
  },
  render: function render() {
    return null;
  }
});

/***/ }),

/***/ "./src/select/src/select/select.js":
/*!*****************************************!*\
  !*** ./src/select/src/select/select.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);






function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !Object(vue__WEBPACK_IMPORTED_MODULE_0__["isVNode"])(s);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NSelect',
  props: {
    modelValue: {
      "default": function _default() {
        return null;
      }
    },
    value: {
      "default": function _default() {
        return null;
      }
    },
    clearValue: {
      "default": function _default() {
        return null;
      }
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    position: {
      "default": function _default() {
        return 'bottom-center';
      },
      type: [String]
    },
    boundary: {
      "default": function _default() {
        return null;
      }
    },
    multiple: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    clearable: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    placeholder: {
      "default": function _default() {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Locale"].trans('Please select');
      },
      type: [String]
    },
    emptyText: {
      "default": function _default() {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Locale"].trans('No items');
      },
      type: [String]
    },
    undefinedText: {
      "default": function _default() {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Locale"].trans('Undefined item');
      }
    },
    allowCreate: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    options: {
      "default": function _default() {
        return null;
      }
    },
    optionsValue: {
      "default": function _default() {
        return '$index';
      },
      type: [String]
    },
    optionsLabel: {
      "default": function _default() {
        return '$value';
      },
      type: [String]
    },
    optionsDisabled: {
      "default": function _default() {
        return 'null';
      },
      type: [String]
    }
  },
  data: function data() {
    return {
      veValue: this.modelValue,
      veClearValue: this.clearValue,
      veOpen: false,
      veSearch: '',
      veIndex: -1,
      veOptions: [],
      veSearched: []
    };
  },
  provide: function provide() {
    return {
      NSelect: this
    };
  },
  watch: {
    value: function value() {
      if (this.veValue !== this.modelValue) {
        this.veValue = this.modelValue;
      }
    }
  },
  methods: {
    clear: function clear() {
      this.$emit('update:modelValue', this.veValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].clone(this.veClearValue));
    },
    addOption: function addOption(option) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.veOptions, option, {
        veValue: option.veValue
      });
    },
    removeOption: function removeOption(option) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.veOptions, {
        veValue: option.veValue
      });
    },
    searchOptions: function searchOptions() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.veSearch)) {
        return this.veSearched = this.veOptions;
      }

      var searchRegex = new RegExp(this.veSearch, 'i');
      this.veSearched = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.veOptions, function (option) {
        return option.label.match(searchRegex);
      });
    },
    toggleOption: function toggleOption(value, event) {
      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(value)) {
        return;
      }

      if (event) {
        event.stopPropagation();
      }

      var veValue = this.veValue;

      if (!this.multiple) {
        this.$refs.popover.close();
      }

      if (!this.multiple) {
        veValue = value;
      }

      if (this.multiple) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].toggle(veValue, value);
      }

      if (this.veValue !== veValue) {
        console.log('woo?', veValue);
        this.$emit('update:modelValue', this.veValue = veValue);
      }
    },
    getOptionLabel: function getOptionLabel(value) {
      var option = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(this.veOptions, {
        value: value
      });

      if (!option && this.allowCreate) {
        return value;
      }

      if (!option && !this.allowCreate) {
        return this.undefinedText;
      }

      return option.label;
    },
    openSelect: function openSelect() {
      clearTimeout(this.focusDelay);
      this.veOpen = true;

      if (this.$refs.input) {
        this.$refs.input.focus();
      }

      this.veIndex = -1;
    },
    closeSelect: function closeSelect() {
      clearTimeout(this.focusDelay);
      this.veOpen = false;

      if (this.$refs.input) {
        this.$refs.input.blur();
      }

      this.veSearch = '';
      this.veIndex = -1;
    },
    selectPrev: function selectPrev() {
      var newIndex = this.veIndex - 1;

      if (newIndex < 0) {
        newIndex = this.veOptions.length - 1;
      }

      this.veIndex = newIndex;
    },
    selectNext: function selectNext() {
      var newIndex = this.veIndex + 1;

      if (newIndex > this.veOptions.length - 1) {
        newIndex = 0;
      }

      this.veIndex = newIndex;
    },
    toggleSelected: function toggleSelected() {
      var selected = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].get(this.veSearched, this.veIndex);

      if (this.veSearched.length === 1) {
        selected = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].get(this.veSearched, 0);
        this.veSearch = '';
      }

      if (!selected) {
        return;
      }

      this.toggleOption(selected.veValue);
    },
    scrollToClosest: function scrollToClosest() {
      var value = this.veValue;

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isArray(this.veValue)) {
        value = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].first(this.veValue);
      }

      if (!value) {
        return;
      }

      var target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(this.veOptions, {
        value: value
      });

      if (!target) {
        return;
      }

      var container = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.popover.$el).find('.n-select__items').get(0);
      var selector = "[data-option=\"".concat(target._uid, "\"]");
      var offset = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(container).find(selector).offset('top', container);
      this.$refs.scrollbar.scrollTo(offset, 0, 250);
    },
    eventUpdateSearch: function eventUpdateSearch(event) {
      this.veSearch = event.target.value;
      this.$once('hook:updated', this.$refs.popover.refresh);
      this.veIndex = -1;
    },
    eventFocusSearch: function eventFocusSearch(event) {
      this.focusDelay = setTimeout(this.openSelect, 200);
    },
    eventBlurSearch: function eventBlurSearch(event) {
      var _this = this;

      clearTimeout(this.focusDelay);
      this.focusDelay = setTimeout(function () {
        if (_this.veOpen && _this.$refs.input) {
          _this.$refs.input.focus();
        }
      }, 200);
    },
    eventKeydownSearch: function eventKeydownSearch(event) {
      if (event.which === 13) {
        if (this.allowCreate && this.veIndex === -1) {
          this.toggleOption(this.veSearch);
          this.veSearch = '';
        }

        if (!this.allowCreate || this.veIndex !== -1) {
          this.toggleSelected();
        }
      }

      if (event.which === 38) {
        this.selectPrev();
      }

      if (event.which === 40) {
        this.selectNext();
      }

      if (event.which === 9 || event.which === 27) {
        this.$refs.popover.close();
      }
    },
    eventPopoverInput: function eventPopoverInput(input) {
      if (input) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(this.scrollToClosest, 100);
      }

      input ? this.openSelect() : this.closeSelect();
    }
  },
  created: function created() {
    if (this.multiple && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isArray(this.veValue)) {
      this.veValue = [];
    }

    if (this.multiple && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isArray(this.veClearValue)) {
      this.veClearValue = [];
    }
  },
  beforeMount: function beforeMount() {
    this.$watch('veSearch', this.searchOptions);
    this.searchOptions();
  },
  renderLabelInput: function renderLabelInput() {
    var events = {
      input: this.eventUpdateSearch,
      focus: this.eventFocusSearch,
      blur: this.eventBlurSearch,
      keydown: this.eventKeydownSearch
    };
    var style = {};

    if (!this.multiple && !this.veOpen && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.veValue)) {
      style.opacity = 0;
    }

    var attrs = {
      type: 'text',
      disabled: this.disabled
    };

    if (!this.multiple && this.veOpen) {
      attrs.placeholder = this.getOptionLabel(this.veValue);
    }

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.veValue) && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isNumber(this.veValue)) {
      attrs.placeholder = this.placeholder;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("input", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "input",
      "class": "n-select__input",
      "style": style,
      "value": this.veSearch
    }, events, attrs), null);
  },
  renderLabelClear: function renderLabelClear() {
    if (!this.clearable || nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.veValue)) {
      return null;
    }

    var events = {
      onClick: this.clear
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-select__clear"
    }, events), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": this.icons.times
    }, null)]);
  },
  renderLabelItem: function renderLabelItem(value) {
    var _this2 = this;

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.veValue) && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isNumber(this.veValue)) {
      return null;
    }

    var classList = ['n-select__item'];
    var style = {};

    if (!this.multiple && this.veOpen) {
      style.display = 'none';
    }

    if (!this.multiple && this.veSearch) {
      style.display = 'none';
    }

    var events = {
      click: function click() {
        return _this2.toggleOption(value);
      }
    };
    var removeHtml = null;

    if (this.multiple) {
      removeHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
        "on": events,
        "class": this.icons.times
      }, null);
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": classList,
      "style": style
    }, [[this.getOptionLabel(value), removeHtml]]);
  },
  renderLabelAngle: function renderLabelAngle() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__angle"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": this.icons.angleDown
    }, null)]);
  },
  renderLabel: function renderLabel() {
    var _this3 = this;

    var values = this.veValue;

    if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isArray(values)) {
      values = [values];
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__label"
    }, [this.ctor('renderLabelClear')(), nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(values, function (value) {
      return _this3.ctor('renderLabelItem')(value);
    }), this.ctor('renderLabelInput')(), this.ctor('renderLabelAngle')()]);
  },
  renderDisplay: function renderDisplay() {
    var classList = ['n-select', 'n-select--' + this.size];

    if (this.multiple) {
      classList.push('n-select--multiple');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderLabel')()]);
  },
  renderItems: function renderItems() {
    var _slot;

    if (!this.veSearched.length) {
      return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
        "class": "n-select__empty"
      }, [this.emptyText]);
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "ref": "scrollbar",
      "class": "n-select__items",
      "relative": true
    }, _isSlot(_slot = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.veSearched, function (option, index) {
      return option.ctor('renderOption')(index);
    })) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    });
  },
  renderPopover: function renderPopover() {
    var _slot2;

    var props = {
      visible: this.veOpen,
      type: 'select',
      trigger: 'click',
      width: -1,
      size: this.size,
      disabled: this.disabled,
      position: this.position,
      window: !this.boundary
    };
    var events = {
      onInput: this.eventPopoverInput
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "popover"
    }, props, events), _isSlot(_slot2 = this.ctor('renderItems')()) ? _slot2 : {
      "default": function _default() {
        return [_slot2];
      }
    });
  },
  renderOptions: function renderOptions() {
    var _this4 = this;

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.options)) {
      return null;
    }

    return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.options, function ($value, $index) {
      var _slot3;

      var props = {
        value: nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get({
          $value: $value,
          $index: $index
        }, _this4.optionsValue, null),
        disabled: nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get({
          $value: $value,
          $index: $index
        }, _this4.optionsDisabled, false)
      };
      return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelectOption"), props, _isSlot(_slot3 = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get({
        $value: $value,
        $index: $index
      }, _this4.optionsLabel, null)) ? _slot3 : {
        "default": function _default() {
          return [_slot3];
        }
      });
    });
  },
  render: function render() {
    var classList = ['n-select__wrapper'];

    if (this.disabled) {
      classList.push('n-disabled');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderDisplay')(), this.ctor('renderPopover')(), this.ctor('renderOptions')(), this.$slots["default"] && this.$slots["default"]()]);
  }
});

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ }),

/***/ "nano-js":
/*!*******************************************************************************************!*\
  !*** external {"root":"Nano","commonjs":"nano-js","commonjs2":"nano-js","amd":"nano-js"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_nano_js__;

/***/ }),

/***/ "vue":
/*!******************************************************************************!*\
  !*** external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vue__;

/***/ })

/******/ });
});
//# sourceMappingURL=nano-ui.js.map