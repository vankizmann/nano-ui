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
    }, [this.$slots["default"] && this.$slots["default"]()]);
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

    if (this.$slots["default"] && !this.square) {
      innerHtml.push(Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.$slots["default"]()]));
    }

    if (this.iconPosition === 'after') {
      innerHtml.push(this.ctor('renderIcon')());
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])(this.nativeType, props, innerHtml);
  }
});

/***/ }),

/***/ "./src/cascader/index.js":
/*!*******************************!*\
  !*** ./src/cascader/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_cascader_panel_cascader_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/cascader-panel/cascader-panel */ "./src/cascader/src/cascader-panel/cascader-panel.js");
/* harmony import */ var _src_cascader_cascader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/cascader/cascader */ "./src/cascader/src/cascader/cascader.js");


/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_cascader_panel_cascader_panel__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_cascader_panel_cascader_panel__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_cascader_cascader__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_cascader_cascader__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/cascader/src/cascader-panel/cascader-panel.js":
/*!***********************************************************!*\
  !*** ./src/cascader/src/cascader-panel/cascader-panel.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);





function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !Object(vue__WEBPACK_IMPORTED_MODULE_0__["isVNode"])(s);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NCascaderPanel',
  props: {
    modelValue: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    clearValue: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    hover: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    options: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    disabled: {
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
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    trigger: {
      "default": function _default() {
        return 'hover';
      },
      type: [String]
    },
    labelProp: {
      "default": function _default() {
        return 'label';
      },
      type: [String]
    },
    valueProp: {
      "default": function _default() {
        return 'value';
      },
      type: [String]
    },
    childProp: {
      "default": function _default() {
        return 'children';
      },
      type: [String]
    },
    disabledProp: {
      "default": function _default() {
        return 'disabled';
      },
      type: [String]
    }
  },
  computed: {
    touch: function touch() {
      return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    },
    mousedown: function mousedown() {
      return this.touch ? 'touchstart' : 'mousedown';
    },
    mousemove: function mousemove() {
      return this.touch ? 'touchmove' : 'mousemove';
    },
    mouseup: function mouseup() {
      return this.touch ? 'touchend' : 'mouseup';
    }
  },
  data: function data() {
    return {
      tempValue: this.modelValue,
      tempHover: this.hover
    };
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
    },
    hover: function hover(value) {
      if (value !== this.tempHover) {
        this.tempHover = value;
      }
    }
  },
  methods: {
    clearCascader: function clearCascader() {
      this.$emit('update:modelValue', this.tempHover = this.tempValue = this.clearValue);
    },
    onHover: function onHover(cascade) {
      var _this = this;

      return function (event) {
        return _this.hoverItem(cascade, event);
      };
    },
    onSelect: function onSelect(cascade) {
      var _this2 = this;

      return function (event) {
        return _this2.selectItem(cascade, event);
      };
    },
    hoverItem: function hoverItem(cascade) {
      var _this3 = this;

      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // Hover intend emulation
      clearTimeout(this.delay);

      var updateHover = function updateHover() {
        _this3.$emit('update:hover', _this3.tempHover = cascade);
      };

      this.delay = setTimeout(updateHover, 130);
    },
    selectItem: function selectItem(cascade) {
      var _this4 = this;

      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      clearTimeout(this.clickTimer);

      if (!this.lastclick) {
        this.lastclick = 0;
      }

      this.lastclick++;
      var trigger = this.touch ? 'click' : this.trigger;
      this.clickTimer = setTimeout(function () {
        return _this4.lastclick = 0;
      }, 240);
      this.hoverTimer = setTimeout(function () {
        return _this4.hoverItem(cascade);
      }, 240);

      if (this.lastclick === 1 && trigger === 'click') {
        return this.hoverItem(cascade, event);
      }

      if (event) {
        event.preventDefault();
      }

      this.clickTimer = setTimeout(function () {
        return _this4.fireSelectItem(cascade);
      }, 50);
    },
    fireSelectItem: function fireSelectItem(cascade) {
      clearTimeout(this.hoverTimer);
      this.lastclick = 0;
      this.$emit('update:modelValue', this.tempValue = cascade);
    }
  },
  renderDisplay: function renderDisplay() {
    var classList = ['n-cascader-panel', 'n-cascader-panel--' + this.size];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderLabelClear')(), this.ctor('renderLabel')(), this.ctor('renderLabelAngle')()]);
  },
  renderOption: function renderOption(item) {
    var _slot;

    var cascade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var value = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(item, this.valueProp);
    var classList = ['n-popover-option'];

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(this.tempValue, item[this.valueProp])) {
      classList.push('n-active');
    }

    var disabled = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(item, this.disabledProp, false);

    if (disabled) {
      classList.push('n-disabled');
    }

    var props = {
      size: this.size,
      type: this.type,
      clickClose: false
    };

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].last(this.tempValue) === value) {
      props.icon = this.icons.checked;
    }

    var tempCascade = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].merge(nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].clone(cascade), [value]);

    if (this.trigger === 'hover') {
      props.onMousemove = nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onHover(tempCascade), 30);
    }

    props['on' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(this.mousedown)] = this.onSelect(tempCascade);
    var children = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(item, this.childProp);

    if (!props.icon && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(children)) {
      props.icon = this.icons.angleRight;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopoverOption"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), _isSlot(_slot = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(item, this.labelProp)) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    });
  },
  renderOptions: function renderOptions(items) {
    var _slot2;

    var _this5 = this;

    var cascade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(items)) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-cascader-panel__items"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "relative": true
    }, _isSlot(_slot2 = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(items, function (item) {
      return _this5.ctor('renderOption')(item, cascade);
    })) ? _slot2 : {
      "default": function _default() {
        return [_slot2];
      }
    })]);
  },
  renderCascade: function renderCascade() {
    var _this6 = this;

    var renderList = [this.ctor('renderOptions')(this.options)];
    var items = this.options,
        cascade = [];
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.tempHover, function (value) {
      if (!items) {
        return;
      }

      cascade.push(value);
      var item = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(items, _defineProperty({}, _this6.valueProp, value));
      items = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(item, _this6.childProp);

      var options = _this6.ctor('renderOptions')(items, cascade);

      renderList.push(options);
    });
    return renderList;
  },
  render: function render() {
    var classList = ['n-cascader-panel', 'n-cascader-panel--' + this.size];

    if (this.disabled) {
      classList.push('n-disabled');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderCascade')()]);
  }
});

/***/ }),

/***/ "./src/cascader/src/cascader/cascader.js":
/*!***********************************************!*\
  !*** ./src/cascader/src/cascader/cascader.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);





function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !Object(vue__WEBPACK_IMPORTED_MODULE_0__["isVNode"])(s);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NCascader',
  props: {
    modelValue: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    clearValue: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    options: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    current: {
      "default": function _default() {
        return null;
      }
    },
    placeholder: {
      "default": function _default() {
        return 'Please select';
      },
      type: [String]
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
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    position: {
      "default": function _default() {
        return 'bottom-start';
      },
      type: [String]
    },
    trigger: {
      "default": function _default() {
        return 'hover';
      },
      type: [String]
    },
    labelProp: {
      "default": function _default() {
        return 'label';
      },
      type: [String]
    },
    valueProp: {
      "default": function _default() {
        return 'value';
      },
      type: [String]
    },
    childProp: {
      "default": function _default() {
        return 'children';
      },
      type: [String]
    },
    disabledProp: {
      "default": function _default() {
        return 'disabled';
      },
      type: [String]
    }
  },
  data: function data() {
    return {
      tempValue: this.modelValue,
      tempHover: this.modelValue,
      focus: false
    };
  },
  methods: {
    clearCascader: function clearCascader() {
      this.focus = true;
      this.$emit('update:modelValue', this.tempValue = this.tempHover = this.clearValue);
    },
    onCascaderInput: function onCascaderInput(value) {
      this.focus = false;
      this.$emit('update:modelValue', this.tempValue = value);
    },
    onCascaderHover: function onCascaderHover(value) {
      this.$emit('update:hover', this.tempHover = value);
    },
    onPopoverInput: function onPopoverInput(value) {
      this.focus = value;
    }
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
    }
  },
  renderLabelClear: function renderLabelClear() {
    if (!this.clearable || nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tempValue)) {
      return null;
    }

    var props = {};

    if (!this.disabled) {
      props.onMousedown = this.clearCascader;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-cascader__clear"
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.times
    }, null)]);
  },
  renderLabelAngle: function renderLabelAngle() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-cascader__angle"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.angleDown
    }, null)]);
  },
  renderLabelItems: function renderLabelItems() {
    var _this = this;

    var items = this.options,
        renderList = [];

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tempValue)) {
      return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
        "class": "n-cascader__placeholder"
      }, [this.trans(this.placeholder)]);
    }

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.tempValue, function (value) {
      if (!items) {
        return;
      }

      var item = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(items, _defineProperty({}, _this.valueProp, value));
      items = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(item, _this.childProp);

      var itemLabel = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
        "class": "n-cascader__item"
      }, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(item, _this.labelProp)]);

      renderList.push(itemLabel);
    });
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-cascader__items"
    }, _isSlot(renderList) ? renderList : {
      "default": function _default() {
        return [renderList];
      }
    });
  },
  renderDisplay: function renderDisplay() {
    var classList = ['n-cascader__display'];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderLabelClear')(), this.ctor('renderLabelItems')(), this.ctor('renderLabelAngle')()]);
  },
  renderItems: function renderItems() {
    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(this.$props, ['modelValue'], {
      hover: this.tempHover,
      modelValue: this.tempValue
    });
    props['onUpdate:hover'] = this.onCascaderHover;
    props['onUpdate:modelValue'] = this.onCascaderInput;
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCascaderPanel"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-cascader__body"
    }, props), null);
  },
  renderPopover: function renderPopover() {
    var _this2 = this;

    var props = {
      trigger: 'click',
      width: 0,
      size: this.size,
      position: this.position,
      scrollClose: true,
      disabled: this.disabled
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "popover",
      "modelValue": _this2.focus,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this2.focus = $event;
      }
    }, props), {
      raw: this.ctor('renderItems')
    });
  },
  render: function render() {
    var classList = ['n-cascader', 'n-cascader--' + this.type, 'n-cascader--' + this.size];

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tempValue)) {
      classList.push('n-empty');
    }

    if (this.clearable) {
      classList.push('n-clearable');
    }

    if (this.focus) {
      classList.push('n-focus');
    }

    if (this.disabled) {
      classList.push('n-disabled');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderDisplay')(), this.ctor('renderPopover')()]);
  }
});

/***/ }),

/***/ "./src/checkbox/index.js":
/*!*******************************!*\
  !*** ./src/checkbox/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/checkbox/checkbox */ "./src/checkbox/src/checkbox/checkbox.js");
/* harmony import */ var _src_checkbox_group_checkbox_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/checkbox-group/checkbox-group */ "./src/checkbox/src/checkbox-group/checkbox-group.js");



/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_1__["default"]);
  App.component(_src_checkbox_group_checkbox_group__WEBPACK_IMPORTED_MODULE_2__["default"].name, _src_checkbox_group_checkbox_group__WEBPACK_IMPORTED_MODULE_2__["default"]);
});

/***/ }),

/***/ "./src/checkbox/src/checkbox-group/checkbox-group.js":
/*!***********************************************************!*\
  !*** ./src/checkbox/src/checkbox-group/checkbox-group.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NCheckboxGroup',
  provide: function provide() {
    return {
      NCheckboxGroup: this
    };
  },
  props: {
    modelValue: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    align: {
      "default": function _default() {
        return 'horizontal';
      },
      type: [String]
    }
  },
  computed: {
    globalChecked: function globalChecked() {
      var checked = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.elements, function (checkbox) {
        return checkbox.tempChecked;
      });
      return checked.length === this.elements.length && this.elements.length !== 0;
    },
    globalIntermediate: function globalIntermediate() {
      var checked = this.elements.filter(function (checkbox) {
        return checkbox.tempChecked;
      });
      return checked.length !== this.elements.length && checked.length !== 0;
    },
    globalDisabled: function globalDisabled() {
      return this.elements.length === 0;
    }
  },
  data: function data() {
    return {
      tempValue: this.modelValue,
      index: -1,
      elements: []
    };
  },
  watch: {
    value: function value() {
      if (this.tempValue = this.modelValue) {
        this.tempValue = this.modelValue;
      }
    }
  },
  methods: {
    addCheckbox: function addCheckbox(checkbox) {
      this.index = -1;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.elements, checkbox, {
        uid: checkbox.uid
      });
      this.elements = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].sort(this.elements, 'sort');
    },
    removeCheckbox: function removeCheckbox(checkbox) {
      this.index = -1;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.elements, {
        uid: checkbox.uid
      });
    },
    toggleCheckbox: function toggleCheckbox(checkbox) {
      var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var index = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].findIndex(this.elements, {
        uid: checkbox.uid
      });

      if (!checkbox.tempChecked) {
        this.index = index;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].toggle(this.tempValue, checkbox.value);

      if (!emit) {
        return;
      }

      this.$emit('update:modelValue', this.tempValue);
    },
    checkCheckbox: function checkCheckbox(checkbox) {
      var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.tempValue, checkbox.value);

      if (!emit) {
        return;
      }

      this.$emit('update:modelValue', this.tempValue);
    },
    uncheckCheckbox: function uncheckCheckbox(checkbox) {
      var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.tempValue, checkbox.value);

      if (!emit) {
        return;
      }

      this.$emit('update:modelValue', this.tempValue);
    },
    shiftCheckbox: function shiftCheckbox(checkbox) {
      var _this = this;

      if (this.index === -1) {
        return this.toggleCheckbox(checkbox, false);
      }

      var index = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].findIndex(this.elements, {
        uid: checkbox.uid
      });
      var checkboxes = this.elements.slice(this.index, index + 1);

      if (index < this.index) {
        checkboxes = this.elements.slice(index, this.index + 1);
      }

      this.index = -1;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(checkboxes, function (checkbox) {
        _this.checkCheckbox(checkbox, false);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(checkboxes, function (checkbox) {
        checkbox.updateFromGroup();
      });
      this.$emit('update:modelValue', this.tempValue);
    },
    toggleAll: function toggleAll() {
      this.globalChecked ? this.uncheckAll() : this.checkAll();
    },
    checkAll: function checkAll() {
      var _this2 = this;

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.elements, function (checkbox) {
        _this2.checkCheckbox(checkbox, false);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.elements, function (checkbox) {
        checkbox.updateFromGroup();
      });
      this.$emit('update:modelValue', this.tempValue);
    },
    uncheckAll: function uncheckAll() {
      var _this3 = this;

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.elements, function (checkbox) {
        _this3.uncheckCheckbox(checkbox, false);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.elements, function (checkbox) {
        checkbox.updateFromGroup();
      });
      this.$emit('update:modelValue', this.tempValue);
    },
    isChecked: function isChecked(value) {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(this.tempValue, value);
    }
  },
  render: function render() {
    var classList = ['n-checkbox-group', 'n-checkbox-group--' + this.size, 'n-checkbox-group--' + this.align];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.$slots["default"]()]);
  }
});

/***/ }),

/***/ "./src/checkbox/src/checkbox/checkbox.js":
/*!***********************************************!*\
  !*** ./src/checkbox/src/checkbox/checkbox.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NCheckbox',
  inject: {
    NCheckboxGroup: {
      "default": undefined
    }
  },
  props: {
    modelValue: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    value: {
      "default": function _default() {
        return null;
      }
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
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
    intermediate: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    global: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    }
  },
  computed: {
    tempComputed: function tempComputed() {
      return !this.global ? this.tempChecked : this.NCheckboxGroup.globalChecked;
    },
    tempIntermediate: function tempIntermediate() {
      return !this.global ? this.intermediate : this.NCheckboxGroup.globalIntermediate;
    },
    tempDisabled: function tempDisabled() {
      return !this.global ? this.disabled : this.NCheckboxGroup.globalDisabled;
    }
  },
  data: function data() {
    return {
      uid: Object(nano_js__WEBPACK_IMPORTED_MODULE_1__["UUID"])(),
      tempChecked: this.modelValue
    };
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempChecked) {
        this.tempChecked = value;
      }
    }
  },
  beforeMount: function beforeMount() {
    if (this.NCheckboxGroup) {
      this.tempChecked = this.NCheckboxGroup.isChecked(this.value);
    }
  },
  mounted: function mounted() {
    if (!this.NCheckboxGroup || this.global) {
      return;
    }

    this.NCheckboxGroup.addCheckbox(this);
  },
  beforeUnmount: function beforeUnmount() {
    if (this.NCheckboxGroup && !this.global) {
      this.NCheckboxGroup.removeCheckbox(this);
    }
  },
  methods: {
    toggle: function toggle() {
      this.$emit('update:modelValue', this.tempChecked = !this.tempChecked);
    },
    check: function check() {
      if (this.NCheckboxGroup) {
        this.NCheckboxGroup.checkCheckbox(this);
      }

      this.$emit('update:modelValue', this.tempChecked = true);
    },
    uncheck: function uncheck() {
      if (this.NCheckboxGroup) {
        this.NCheckboxGroup.uncheckCheckbox(this);
      }

      this.$emit('update:modelValue', this.tempChecked = false);
    },
    eventShiftClick: function eventShiftClick() {
      if (this.NCheckboxGroup) {
        this.NCheckboxGroup.shiftCheckbox(this);
      }

      this.$emit('update:modelValue', this.tempChecked = true);
    },
    eventLocalClick: function eventLocalClick(event) {
      event.preventDefault();

      if (event.shiftKey) {
        return this.eventShiftClick();
      }

      if (this.NCheckboxGroup) {
        this.NCheckboxGroup.toggleCheckbox(this);
      }

      this.$emit('update:modelValue', this.tempChecked = !this.tempChecked);
    },
    eventGlobalClick: function eventGlobalClick() {
      this.NCheckboxGroup.toggleAll();
    },
    updateFromGroup: function updateFromGroup() {
      var checked = this.NCheckboxGroup.isChecked(this.value);

      if (this.tempChecked === checked) {
        return;
      }

      this.$emit('update:modelValue', this.tempChecked = checked);
    }
  },
  renderCheckbox: function renderCheckbox() {
    var interHtml = this.$slots.intermediate && this.$slots.intermediate();

    if (!interHtml) {
      interHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
        "class": this.icons.intermediate
      }, null);
    }

    var checkHtml = this.$slots.checked && this.$slots.checked();

    if (!checkHtml) {
      checkHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
        "class": this.icons.checked
      }, null);
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-checkbox__checkbox"
    }, [this.tempIntermediate ? interHtml : checkHtml]);
  },
  renderLabel: function renderLabel() {
    if (!this.$slots["default"] && !this.$slots.label) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-checkbox__label"
    }, [this.$slots["default"]() || this.$slots.label()]);
  },
  render: function render() {
    var size = this.size;

    if (this.NCheckboxGroup) {
      size = this.NCheckboxGroup.size;
    }

    var classList = ['n-checkbox', 'n-checkbox--' + size, 'n-checkbox--' + this.type];

    if (this.tempComputed) {
      classList.push('n-checked');
    }

    if (this.tempIntermediate) {
      classList.push('n-intermediate');
    }

    if (this.tempDisabled) {
      classList.push('n-disabled');
    }

    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].clone(this.$attrs);

    if (!this.tempDisabled && this.global) {
      props.onMousedown = this.eventGlobalClick;
    }

    if (!this.tempDisabled && !this.global) {
      props.onMousedown = this.eventLocalClick;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [[this.ctor('renderCheckbox')(), this.ctor('renderLabel')()]]);
  }
});

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/config/config */ "./src/config/src/config/config.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_config_config__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/config/src/config/config.js":
/*!*****************************************!*\
  !*** ./src/config/src/config/config.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NConfig',
  props: {
    modelValue: {
      "default": function _default() {
        return {};
      },
      type: [Object]
    },
    config: {
      "default": function _default() {
        return {};
      },
      type: [Object]
    },
    scope: {
      "default": function _default() {
        return this;
      },
      type: [Object]
    }
  },
  data: function data() {
    return {
      tempValue: this.modelValue
    };
  },
  methods: {
    solveAwait: function solveAwait(value) {
      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isEmpty(value)) {
        return true;
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(value) && value.match(/\$\$scope/)) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].has({
          $$scope: this.scope
        }, value);
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(value) && value.match(/\$\$value/)) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].has({
          $$value: this.tempValue
        }, value);
      }

      return false;
    },
    solveValue: function solveValue(value) {
      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(value)) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return value.apply(this.scope, [this.tempValue].concat(args));
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(value) && value.match(/^\$\$scope/)) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get({
          $$scope: this.scope
        }, value);
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(value) && value.match(/^\$\$value/)) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get({
          $$value: this.tempValue
        }, value);
      }

      return value;
    },
    solveEvent: function solveEvent(value) {
      var scope = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign(this.scope, {
        $configRefs: this.$refs
      });

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(value)) {
        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return value.apply(scope, args);
        };
      }

      return value;
    },
    solveContent: function solveContent(value) {
      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(value)) {
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return value.apply(this.scope, [this.$render, this.tempValue].concat(args));
      }

      return value;
    },
    prepareValue: function prepareValue(veModel) {
      if (!veModel.path) {
        return veModel.fallback;
      }

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].has(this.tempValue, veModel.path)) {
        this.deepSet(this.tempValue, veModel.path, veModel.fallback);
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.tempValue, veModel.path);
    },
    inputClosure: function inputClosure(veModel) {
      var _this = this;

      var closure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!veModel.path) {
        return function () {
          return null;
        };
      }

      return function (value) {
        if (closure) {
          closure(value, _this.tempValue);
        }

        _this.deepSet(_this.tempValue, veModel.path, value);
      };
    },
    deepSet: function deepSet(obj, keys, val) {
      keys = typeof keys === 'string' ? keys.split('.') : keys;
      var key = keys.shift();

      if (obj[key] === undefined || obj[key] === null) {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(obj, key, {});
      }

      if (keys.length === 0) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(obj, key, val);
      }

      return this.deepSet(obj[key], keys, val);
    }
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
    }
  },
  renderLayer: function renderLayer(source) {
    var _this2 = this;

    if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isPlain(source)) {
      return source;
    }

    return nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(source, function (setup, component) {
      component = component.replace(/:.*?$/, ''); // Set setup defaults

      setup = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign({
        vIf: true,
        vShow: true,
        vAwait: null,
        "class": null,
        $on: {},
        $props: {},
        $attrs: {}
      }, setup);

      if (!_this2.solveAwait(setup.vAwait)) {
        return null;
      }

      if (!_this2.solveValue(setup.vIf)) {
        return null;
      }

      if (!_this2.solveValue(setup.vShow)) {
        setup.style = {
          display: 'none'
        };
      } // Build default model


      var veModel = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign({
        prop: 'modelValue',
        fallback: null
      }, setup.model); // Delete model from setup

      delete setup.model; // Normalize props

      setup.$props = _this2.solveValue(setup.$props); // Normalize class

      setup["class"] = _this2.solveValue(setup["class"]); // Solve props

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].map(setup.$props, function (value) {
        return _this2.solveValue(value);
      }); // Normalize attrs

      setup.$attrs = _this2.solveValue(setup.$attrs); // Solve attrs

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].map(setup.$attrs, function (value) {
        return _this2.solveValue(value);
      }); // Solve events

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].map(setup.$on, function (value) {
        return _this2.solveEvent(value);
      });

      if (veModel.path) {
        // Override input event
        setup['onUpdate:modelValue'] = _this2.inputClosure(veModel, setup.$on.input); // Set prop in value or get fallback

        setup.$props[veModel.prop] = _this2.prepareValue(veModel);
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign(setup, setup.$props);
      delete setup.$props;
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign(setup, setup.$attrs);
      delete setup.$attrs;
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign(setup, setup.$on);
      delete setup.$on;
      var content = setup.content;
      delete setup.content;
      delete setup.vIf;
      delete setup.vShow;
      delete setup.vAwait; // Solve conten if is functional

      var slots = _this2.solveContent(content, setup);

      var domtypes = ['div', 'span', 'a'];
      var resolved = component;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(domtypes, resolved)) {
        resolved = Object(vue__WEBPACK_IMPORTED_MODULE_1__["resolveComponent"])(component);
      }

      return Object(vue__WEBPACK_IMPORTED_MODULE_1__["h"])(resolved, setup, _this2.ctor('renderLayer')(slots));
    });
  },
  render: function render() {
    return this.ctor('renderLayer')(this.config)[0];
  }
});

/***/ }),

/***/ "./src/confirm/index.js":
/*!******************************!*\
  !*** ./src/confirm/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_confirm_confirm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/confirm/confirm */ "./src/confirm/src/confirm/confirm.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_confirm_confirm__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_confirm_confirm__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/confirm/src/confirm/confirm.js":
/*!********************************************!*\
  !*** ./src/confirm/src/confirm/confirm.js ***!
  \********************************************/
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
  name: 'NConfirm',
  props: {
    visible: {
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
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    width: {
      "default": function _default() {
        return 'auto';
      },
      type: [String]
    },
    position: {
      "default": function _default() {
        return 'center-center';
      },
      type: [String]
    },
    closable: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    }
  },
  watch: {
    visible: function visible() {
      if (this.visible !== this.tempVisible) {
        this.tempVisible = this.visible;
      }
    }
  },
  data: function data() {
    return {
      tempVisible: this.visible
    };
  },
  methods: {
    abort: function abort(event) {
      this.$refs.modal.closeModal(true, 'self');
      this.$emit('abort');
    },
    confirm: function confirm(event) {
      this.$refs.modal.closeModal(true, 'self');
      this.$emit('confirm');
    },
    eventInput: function eventInput(value, source) {
      if (!value && source !== 'self') {
        this.$emit('abort');
      }

      this.$emit('update:visible', this.tempVisible = value);
    }
  },
  renderIcon: function renderIcon() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-confirm__icon"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": this.icons[this.type]
    }, null)]);
  },
  renderBody: function renderBody() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-confirm__body"
    }, [this.$slots["default"] && this.$slots["default"]() || this.trans('Are you sure?')]);
  },
  renderAction: function renderAction() {
    var _slot, _slot2;

    var classList = ['n-confirm__action'];

    if (window.WIN) {
      classList.push('n-reverse');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), {
      "size": this.size,
      "type": this.type,
      "link": true,
      "onClick": this.abort
    }, _isSlot(_slot = this.trans('Abort')) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    }), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), {
      "size": this.size,
      "type": this.type,
      "link": false,
      "onClick": this.confirm
    }, _isSlot(_slot2 = this.trans('Confirm')) ? _slot2 : {
      "default": function _default() {
        return [_slot2];
      }
    })]);
  },
  render: function render() {
    var _this = this;

    var classList = ['n-confirm', 'n-confirm--' + this.type, 'n-confirm--' + this.size];
    var props = {
      type: 'default',
      selector: this.selector,
      width: this.width,
      position: this.position,
      closable: this.closable,
      modelValue: this.tempVisible
    }; // Override input listener

    props['onUpdate:modelValue'] = this.eventInput;
    var innerHtml = {
      raw: function raw() {
        return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
          "class": classList
        }, [_this.ctor('renderIcon')(), _this.ctor('renderBody')(), _this.ctor('renderAction')()]);
      }
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NModal"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "modal"
    }, props), _isSlot(innerHtml) ? innerHtml : {
      "default": function _default() {
        return [innerHtml];
      }
    });
  }
});

/***/ }),

/***/ "./src/datepicker/index.js":
/*!*********************************!*\
  !*** ./src/datepicker/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_datepicker_panel_datepicker_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/datepicker-panel/datepicker-panel */ "./src/datepicker/src/datepicker-panel/datepicker-panel.js");
/* harmony import */ var _src_datepicker_datepicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/datepicker/datepicker */ "./src/datepicker/src/datepicker/datepicker.js");


/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_datepicker_panel_datepicker_panel__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_datepicker_panel_datepicker_panel__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_datepicker_datepicker__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_datepicker_datepicker__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/datepicker/src/datepicker-panel/datepicker-panel.js":
/*!*****************************************************************!*\
  !*** ./src/datepicker/src/datepicker-panel/datepicker-panel.js ***!
  \*****************************************************************/
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
  name: 'NDatepickerPanel',
  props: {
    modelValue: {
      "default": function _default() {
        return null;
      }
    },
    clearValue: {
      "default": function _default() {
        return null;
      }
    },
    arrive: {
      "default": function _default() {
        return null;
      }
    },
    clearArrive: {
      "default": function _default() {
        return null;
      }
    },
    depart: {
      "default": function _default() {
        return null;
      }
    },
    clearDepart: {
      "default": function _default() {
        return null;
      }
    },
    minDate: {
      "default": function _default() {
        return null;
      }
    },
    maxDate: {
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
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    range: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    monthPanels: {
      "default": function _default() {
        return 1;
      },
      type: [Number]
    },
    position: {
      "default": function _default() {
        return 'bottom-start';
      },
      type: [String]
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    format: {
      "default": function _default() {
        return 'YYYY-MM-DD HH:mm:ss';
      },
      type: [String]
    },
    weekdays: {
      "default": function _default() {
        return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
      },
      type: [Array]
    },
    months: {
      "default": function _default() {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      },
      type: [Array]
    }
  },
  computed: {
    yearsGrid: function yearsGrid() {
      return this.tempCache.getYears();
    },
    monthsGrid: function monthsGrid() {
      return this.tempCache.getMonths();
    }
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue.format(this.format)) {
        this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value);
      }
    },
    arrive: function arrive(value) {
      if (value !== this.tempArrive.format(this.format)) {
        this.tempArrive = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value);
      }
    },
    depart: function depart(value) {
      if (value !== this.tempDepart.format(this.format)) {
        this.tempDepart = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value);
      }
    }
  },
  data: function data() {
    return {
      tempView: 'date',
      tempRanger: null,
      cacheArrive: null,
      cacheDepart: null,
      tempValue: nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.modelValue, this.format),
      tempCache: nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.modelValue, this.format),
      tempArrive: nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.arrive),
      tempDepart: nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.depart)
    };
  },
  methods: {
    gotoDate: function gotoDate() {
      this.tempView = 'date';
    },
    gotoMonth: function gotoMonth() {
      this.tempView = 'month';
    },
    gotoYear: function gotoYear() {
      this.tempView = 'year';
    },
    patchDate: function patchDate(now) {
      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(now)) {
        now = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(now);
      } // Copy now to cache


      this.tempCache = now.clone(); // Copy now to value

      this.tempValue = now.clone();
      this.$emit('update:modelValue', this.tempValue.format(this.format));
    },
    patchMonth: function patchMonth(now) {
      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(now)) {
        now = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(now);
      }

      this.tempCache = now.clone();
      this.gotoDate();
    },
    printRange: function printRange(now) {
      this.tempRanger = now.clone();
    },
    patchYear: function patchYear(now) {
      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(now)) {
        now = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(now);
      }

      this.tempCache = now.clone();
      this.gotoMonth();
    },
    patchRange: function patchRange(now) {
      if (this.cacheArrive && !this.cacheDepart) {
        this.cacheDepart = now.clone();
      }

      if (!this.cacheArrive && !this.cacheDepart) {
        this.cacheArrive = now.clone();
      }

      if (!this.cacheArrive || !this.cacheDepart) {
        return;
      }

      this.tempArrive = this.cacheArrive.clone();
      this.tempDepart = this.cacheDepart.clone();
      this.$emit('update:arrive', this.tempArrive.format(this.format));
      this.$emit('update:depart', this.tempDepart.format(this.format));
      this.cacheArrive = null;
      this.cacheDepart = null;
      this.$emit('rangeSelected', [this.tempArrive.format(this.format), this.tempDepart.format(this.format)]);
    }
  },
  renderToolbarPrev: function renderToolbarPrev(closure) {
    var props = {
      type: this.type,
      link: true,
      icon: this.icons.angleLeft,
      onClick: closure
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, null);
  },
  renderToolbarNext: function renderToolbarNext(closure) {
    var props = {
      type: this.type,
      link: true,
      icon: this.icons.angleRight,
      onClick: closure
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, null);
  },
  renderToolbarMonth: function renderToolbarMonth() {
    var props = {
      onClick: this.gotoMonth
    };
    var monthsHtml = [this.months[this.tempCache.month()]];
    var month = this.tempCache.clone().addMonths(this.monthPanels - 1);

    if (month.month() !== this.tempCache.month()) {
      monthsHtml.push(this.months[month.month()]);
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-datepicker-panel__month"
    }, props), [monthsHtml.join(' - ')]);
  },
  renderToolbarYear: function renderToolbarYear() {
    var props = {
      onClick: this.gotoYear
    };
    var yearsHtml = [this.tempCache.year()];
    var month = this.tempCache.clone().addMonths(this.monthPanels - 1);

    if (month.year() !== this.tempCache.year()) {
      yearsHtml.push(month.year());
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-datepicker-panel__year"
    }, props), [yearsHtml.join(' - ')]);
  },
  renderToolbar: function renderToolbar(_ref) {
    var prev = _ref.prev,
        next = _ref.next;
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__toolbar"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__display"
    }, [this.ctor('renderToolbarMonth')(), this.ctor('renderToolbarYear')()]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__prev"
    }, [this.ctor('renderToolbarPrev')(prev)]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__next"
    }, [this.ctor('renderToolbarNext')(next)])]);
  },
  renderDateItem: function renderDateItem(now, month) {
    var _this = this;

    var classList = ['n-datepicker-panel__day'];

    if (now.equalDate()) {
      classList.push('n-today');
    }

    var isSelected = this.tempValue.valid() && now.equalDate(this.tempValue);

    if (isSelected) {
      classList.push('n-selected');
    }

    if (now.month() === month.month()) {
      classList.push('n-current');
    }

    var isNotBeforeMin = !this.minDate || now.after(this.minDate) || now.equalDate(this.minDate);
    var isNotAfterMax = !this.maxDate || now.before(this.maxDate) || now.equalDate(this.maxDate);

    if (!isNotBeforeMin || !isNotAfterMax) {
      classList.push('n-disabled');
    }

    var props = {};

    if (isNotBeforeMin && isNotAfterMax) {
      props.onClick = function () {
        return _this.patchDate(now);
      };
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [now.format('DD')])]);
  },
  renderRangeDateItem: function renderRangeDateItem(now, month) {
    var _this2 = this;

    var classList = ['n-datepicker-panel__day'];

    if (now.equalDate('now')) {
      classList.push('n-today');
    }

    if (now.month() === month.month()) {
      classList.push('n-current');
    }

    var viewMode = 0;

    if (!!this.cacheArrive) {
      viewMode++;
    }

    if (!!this.cacheDepart) {
      viewMode++;
    }

    var isTempValid = this.tempArrive.valid() && this.tempDepart.valid();

    if (viewMode === 0 && isTempValid) {
      if (now.between(this.tempArrive, this.tempDepart)) {
        classList.push('n-between');
        classList.push('n-selected');
      }

      var arriveFirst = this.tempArrive.before(this.tempDepart);

      if (now.equalDate(this.tempArrive)) {
        classList.push(arriveFirst ? 'n-arrive' : 'n-depart');
        classList.push('n-selected');
      }

      if (now.equalDate(this.tempDepart)) {
        classList.push(arriveFirst ? 'n-depart' : 'n-arrive');
        classList.push('n-selected');
      }
    }

    if (viewMode === 1 && this.cacheArrive) {
      if (now.between(this.cacheArrive, this.tempRanger)) {
        classList.push('n-between');
      }

      var _arriveFirst = this.cacheArrive.before(this.tempRanger);

      if (now.equalDate(this.cacheArrive)) {
        classList.push(_arriveFirst ? 'n-arrive' : 'n-depart');
      }

      if (now.equalDate(this.tempRanger)) {
        classList.push(_arriveFirst ? 'n-depart' : 'n-arrive');
      }
    }

    var isNotBeforeMin = !this.minDate || now.after(this.minDate) || now.equalDate(this.minDate);
    var isNotAfterMax = !this.maxDate || now.before(this.maxDate) || now.equalDate(this.maxDate);

    if (!isNotBeforeMin || !isNotAfterMax) {
      classList.push('n-disabled');
    }

    var props = {
      onMouseenter: function onMouseenter() {
        return _this2.printRange(now);
      }
    };

    if (isNotBeforeMin && isNotAfterMax) {
      props.onClick = function () {
        return _this2.patchRange(now);
      };
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [now.format('DD')])]);
  },
  renderDate: function renderDate() {
    var _this3 = this;

    var prev = function prev() {
      _this3.tempCache = _this3.tempCache.prevMonth();
    };

    var next = function next() {
      _this3.tempCache = _this3.tempCache.nextMonth();
    };

    var legendHtml = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.weekdays, function (day) {
      return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
        "class": "n-datepicker-panel__day"
      }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [_this3.trans(day)])]);
    });
    var renderItem = this.ctor('renderDateItem');

    if (this.range) {
      renderItem = this.ctor('renderRangeDateItem');
    }

    var bodyHtml = function bodyHtml(month) {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].chunk(month.getDatesGrid(), 7), function (chunks) {
        return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
          "class": "n-datepicker-panel__week"
        }, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(chunks, function (chunk) {
          return renderItem(chunk, month);
        })]);
      });
    };

    var panelHtml = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].make(this.monthPanels), function (offset) {
      var month = _this3.tempCache.clone().addMonths(offset - 1);

      return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
        "class": "n-datepicker-panel__panel"
      }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
        "class": "n-datepicker-panel__legend"
      }, _isSlot(legendHtml) ? legendHtml : {
        "default": function _default() {
          return [legendHtml];
        }
      }), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
        "class": "n-datepicker-panel__body"
      }, [bodyHtml(month)])]);
    });
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__dateview"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__header"
    }, [this.ctor('renderToolbar')({
      prev: prev,
      next: next
    })]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__panels"
    }, _isSlot(panelHtml) ? panelHtml : {
      "default": function _default() {
        return [panelHtml];
      }
    })]);
  },
  renderMonthItem: function renderMonthItem(now) {
    var _this4 = this;

    var classList = ['n-datepicker-panel__month'];

    if (now.equal(this.tempCache, 'YYYYMM')) {
      classList.push('n-selected');
    }

    if (now.month() === nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make('now').month()) {
      classList.push('n-current');
    }

    var props = {
      onClick: function onClick() {
        return _this4.patchMonth(now);
      }
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.trans(this.months[now.month()])])]);
  },
  renderMonth: function renderMonth() {
    var _slot;

    var _this5 = this;

    var prev = function prev() {
      _this5.tempCache = _this5.tempCache.prevYear();
    };

    var next = function next() {
      _this5.tempCache = _this5.tempCache.nextYear();
    };

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__monthview"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__header"
    }, [this.ctor('renderToolbar')({
      prev: prev,
      next: next
    })]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__body"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__year"
    }, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.monthsGrid, this.ctor('renderMonthItem'))])]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__footer"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), {
      "size": this.type,
      "link": true,
      "onClick": this.gotoDate
    }, _isSlot(_slot = this.trans('Go back')) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    })])]);
  },
  renderYearItem: function renderYearItem(now) {
    var _this6 = this;

    var classList = ['n-datepicker-panel__year'];

    if (now.equal(this.tempCache, 'YYYY')) {
      classList.push('n-selected');
    }

    if (now.year() === nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make('now').year()) {
      classList.push('n-current');
    }

    var props = {
      onClick: function onClick() {
        return _this6.patchYear(now);
      }
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [now.year()])]);
  },
  renderYear: function renderYear() {
    var _slot2;

    var _this7 = this;

    var prev = function prev() {
      _this7.tempCache = _this7.tempCache.prevDecade();
    };

    var next = function next() {
      _this7.tempCache = _this7.tempCache.nextDecade();
    };

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__yearview"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__header"
    }, [this.ctor('renderToolbar')({
      prev: prev,
      next: next
    })]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__body"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__decade"
    }, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.yearsGrid, this.ctor('renderYearItem'))])]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker-panel__footer"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), {
      "size": this.type,
      "link": true,
      "onClick": this.gotoDate
    }, _isSlot(_slot2 = this.trans('Go back')) ? _slot2 : {
      "default": function _default() {
        return [_slot2];
      }
    })])]);
  },
  render: function render() {
    var classList = ['n-datepicker-panel', 'n-datepicker-panel--' + this.size, 'n-datepicker-panel--' + this.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('render' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(this.tempView))()]);
  }
});

/***/ }),

/***/ "./src/datepicker/src/datepicker/datepicker.js":
/*!*****************************************************!*\
  !*** ./src/datepicker/src/datepicker/datepicker.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NDatepicker',
  props: {
    modelValue: {
      "default": function _default() {
        return null;
      }
    },
    clearValue: {
      "default": function _default() {
        return null;
      }
    },
    arrive: {
      "default": function _default() {
        return null;
      }
    },
    clearArrive: {
      "default": function _default() {
        return null;
      }
    },
    depart: {
      "default": function _default() {
        return null;
      }
    },
    clearDepart: {
      "default": function _default() {
        return null;
      }
    },
    minDate: {
      "default": function _default() {
        return null;
      }
    },
    maxDate: {
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
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    placeholder: {
      "default": function _default() {
        return 'Select date';
      },
      type: [String]
    },
    placeholderArrive: {
      "default": function _default() {
        return 'Start date';
      },
      type: [String]
    },
    placeholderDepart: {
      "default": function _default() {
        return 'End date';
      },
      type: [String]
    },
    range: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    rangeSeparator: {
      "default": function _default() {
        return '-';
      },
      type: [String]
    },
    monthPanels: {
      "default": function _default() {
        return 1;
      },
      type: [Number]
    },
    boundary: {
      "default": function _default() {
        return null;
      }
    },
    position: {
      "default": function _default() {
        return 'bottom-start';
      },
      type: [String]
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
    format: {
      "default": function _default() {
        return 'YYYY-MM-DD HH:mm:ss';
      },
      type: [String]
    },
    displayFormat: {
      "default": function _default() {
        return 'YYYY-MM-DD';
      },
      type: [String]
    },
    weekdays: {
      "default": function _default() {
        return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
      },
      type: [Array]
    },
    months: {
      "default": function _default() {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      },
      type: [Array]
    }
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue.format(this.format)) {
        this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value);
      }
    },
    arrive: function arrive(value) {
      if (value !== this.tempArrive.format(this.format)) {
        this.tempArrive = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value);
      }
    },
    depart: function depart(value) {
      if (value !== this.tempDepart.format(this.format)) {
        this.tempDepart = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value);
      }
    }
  },
  data: function data() {
    return {
      focus: false,
      tempValue: nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.modelValue, this.format),
      tempArrive: nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.arrive, this.format),
      tempDepart: nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.depart, this.format)
    };
  },
  methods: {
    clearDatepicker: function clearDatepicker() {
      this.range ? this.clearRangeDatepicker() : this.clearSingleDatepicker();
    },
    clearSingleDatepicker: function clearSingleDatepicker() {
      this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.clearValue, this.format);
      this.$emit('update:modelValue', this.clearValue);
    },
    clearRangeDatepicker: function clearRangeDatepicker() {
      this.tempArrive = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.clearArrive, this.format);
      this.$emit('update:arrive', this.clearValue);
      this.tempDepart = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.clearDepart, this.format);
      this.$emit('update:depart', this.clearDepart);
    },
    onPopoverInput: function onPopoverInput(value) {
      this.focus = value;
    },
    onValueInput: function onValueInput(event) {
      var isNotSameLength = this.displayFormat.length !== event.target.value.length;

      if (isNotSameLength) {
        return;
      }

      var value = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(event.target.value, this.displayFormat);

      if (!value.moment.isValid()) {
        return;
      }

      var moment = this.tempValue.moment.set({
        year: value.moment.year(),
        month: value.moment.month(),
        date: value.moment.date()
      });
      this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(moment);
      this.$emit('update:modelValue', this.tempValue.format(this.format));
    },
    onArriveInput: function onArriveInput(event) {
      var isNotSameLength = this.displayFormat.length !== event.target.value.length;

      if (isNotSameLength) {
        return;
      }

      var value = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(event.target.value, this.displayFormat);

      if (!value.moment.isValid()) {
        return;
      }

      var moment = this.tempValue.moment.set({
        year: value.moment.year(),
        month: value.moment.month(),
        date: value.moment.date()
      });
      this.tempArrive = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(moment);
      this.$emit('update:arrive', this.tempArrive.format(this.format));
    },
    onDepartInput: function onDepartInput(event) {
      var isNotSameLength = this.displayFormat.length !== event.target.value.length;

      if (isNotSameLength) {
        return;
      }

      var value = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(event.target.value, this.displayFormat);

      if (!value.moment.isValid()) {
        return;
      }

      var moment = this.tempValue.moment.set({
        year: value.moment.year(),
        month: value.moment.month(),
        date: value.moment.date()
      });
      this.tempDepart = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(moment);
      this.$emit('update:depart', this.tempDepart.format(this.format));
    },
    onDatepickerInput: function onDatepickerInput(value) {
      this.focus = false;
      this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value, this.format);
      this.$emit('update:modelValue', value);
    },
    onDatepickerDepart: function onDatepickerDepart(value) {
      this.focus = false;
      this.tempDepart = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value, this.format);
      this.$emit('update:depart', value);
    },
    onDatepickerArrive: function onDatepickerArrive(value) {
      this.focus = false;
      this.tempArrive = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value, this.format);
      this.$emit('update:arrive', value);
    }
  },
  renderLabelClear: function renderLabelClear() {
    var isEmpty = !this.tempArrive.initialDate && !this.tempDepart.initialDate;

    if (!this.range) {
      isEmpty = !this.tempValue.initialDate;
    }

    if (!this.clearable || isEmpty) {
      return null;
    }

    var props = {};

    if (!this.disabled) {
      props.onMousedown = this.clearDatepicker;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-datepicker__clear"
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.times
    }, null)]);
  },
  renderLabelAngle: function renderLabelAngle() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker__angle"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.angleDown
    }, null)]);
  },
  renderRange: function renderRange() {
    var arriveProps = {
      value: '',
      disabled: this.disabled,
      placeholder: this.trans(this.placeholderArrive),
      onInput: this.onArriveInput
    };

    if (this.tempArrive.valid()) {
      arriveProps.value = this.tempArrive.format(this.displayFormat, true);
    }

    var departProps = {
      value: '',
      disabled: this.disabled,
      placeholder: this.trans(this.placeholderDepart),
      onInput: this.onDepartInput
    };

    if (this.tempDepart.valid()) {
      departProps.value = this.tempDepart.format(this.displayFormat, true);
    }

    return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker__input"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("input", arriveProps, null)]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker__seperator"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.rangeSeparator])]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker__input"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("input", departProps, null)])];
  },
  renderSingle: function renderSingle() {
    var props = {
      value: '',
      disabled: this.disabled,
      placeholder: this.trans(this.placeholder),
      onInput: this.onValueInput
    };

    if (this.tempValue.valid()) {
      props.value = this.tempValue.format(this.displayFormat, true);
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-datepicker__input"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("input", props, null)]);
  },
  renderDisplay: function renderDisplay() {
    var classList = ['n-datepicker__display'];

    if (this.range) {
      classList.push('n-range');
    }

    var displayHtml = this.ctor('renderSingle');

    if (this.range) {
      displayHtml = this.ctor('renderRange');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderLabelClear')(), displayHtml(), this.ctor('renderLabelAngle')()]);
  },
  renderItems: function renderItems() {
    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(this.$props, ['modelValue'], {
      arrive: this.tempArrive.format(this.format) || null,
      depart: this.tempDepart.format(this.format) || null,
      modelValue: this.tempValue.format(this.format) || null
    });
    props['onUpdate:arrive'] = this.onDatepickerArrive;
    props['onUpdate:depart'] = this.onDatepickerDepart;
    props['onUpdate:modelValue'] = this.onDatepickerInput;
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NDatepickerPanel"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-datepicker__body"
    }, props), null);
  },
  renderPopover: function renderPopover() {
    var _this = this;

    var props = {
      trigger: 'click',
      width: 0,
      size: this.size,
      position: this.position,
      scrollClose: true,
      disabled: this.disabled
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "popover",
      "modelValue": _this.focus,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this.focus = $event;
      }
    }, props), {
      raw: this.ctor('renderItems')
    });
  },
  render: function render() {
    var classList = ['n-datepicker', 'n-datepicker--' + this.type, 'n-datepicker--' + this.size];
    var isEmpty = !this.tempArrive.initialDate && !this.tempDepart.initialDate;

    if (!this.range) {
      isEmpty = !this.tempValue.initialDate;
    }

    if (isEmpty) {
      classList.push('n-empty');
    }

    if (this.clearable) {
      classList.push('n-clearable');
    }

    if (this.focus) {
      classList.push('n-focus');
    }

    if (this.disabled) {
      classList.push('n-disabled');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderDisplay')(), this.ctor('renderPopover')()]);
  }
});

/***/ }),

/***/ "./src/draggable/index.js":
/*!********************************!*\
  !*** ./src/draggable/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_draglist_draglist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/draglist/draglist */ "./src/draggable/src/draglist/draglist.js");
/* harmony import */ var _src_draglist_item_draglist_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/draglist-item/draglist-item */ "./src/draggable/src/draglist-item/draglist-item.js");
/* harmony import */ var _src_draggrid_draggrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/draggrid/draggrid */ "./src/draggable/src/draggrid/draggrid.js");
/* harmony import */ var _src_draggrid_item_draggrid_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/draggrid-item/draggrid-item */ "./src/draggable/src/draggrid-item/draggrid-item.js");




/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_draglist_draglist__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_draglist_draglist__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_draglist_item_draglist_item__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_draglist_item_draglist_item__WEBPACK_IMPORTED_MODULE_1__["default"]); // App.component(Draggrid.name, Draggrid);
  // App.component(DraggridItem.name, DraggridItem);
});

/***/ }),

/***/ "./src/draggable/src/draggable-item/draggable-item.js":
/*!************************************************************!*\
  !*** ./src/draggable/src/draggable-item/draggable-item.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  // name: 'NDraggableItem',
  inject: {
    NDraggable: {
      "default": undefined
    }
  },
  props: {
    value: {
      "default": function _default() {
        return {};
      }
    }
  },
  computed: {
    veItem: function veItem() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].has(this.value, 'item')) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.value, 'item');
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.NDraggable, this[this.NDraggable.pathProp] + '.' + this[this.NDraggable.indexProp]);
    }
  },
  data: function data() {
    return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign({
      veInit: false,
      strategy: 'nodrop'
    }, this.value);
  },
  provide: function provide() {
    return {
      NDraggableItem: this
    };
  },
  methods: {
    "export": function _export() {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(this.NDraggable, this[this.NDraggable.pathProp] + '.' + this[this.NDraggable.indexProp], this.veItem);
    },
    expand: function expand() {
      this.NDraggable.expandItem(this);
    },
    select: function select() {
      this.NDraggable.toggleItem(this);
    },
    remove: function remove() {
      this.NDraggable.removeItem(this);
    },
    copy: function copy() {
      this.NDraggable.copyItem(this);
    },
    update: function update(value) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(this.NDraggable, this[this.NDraggable.pathProp] + '.' + this[this.NDraggable.indexProp], value); // this.veItem = this.getItem();

      this.NDraggable.refreshItems();
    },

    /**
     * Event listeners
     */
    resolveDragPosition: function resolveDragPosition(eventY) {
      var _this = this;

      var safeZone = this.NDraggable.safeZone(this.$el.clientHeight);
      var targetY = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).offset('top', document) - nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).scroll('top', document);
      var parentY = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).offset('top', this.NDraggable.$el) - nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).scroll('top', this.NDraggable.$el);
      var clientY = targetY + this.$el.clientHeight - eventY;
      var finalPositon = -1,
          finalStrategy = 'inner';

      if (clientY > this.$el.clientHeight - safeZone) {
        finalStrategy = 'before';
        finalPositon = parentY;
      }

      var allowDropAfter = this.NDraggable.isExpanded(this) || !nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.veItem, this.NDraggable.childProp, []).length;

      if (clientY < safeZone && allowDropAfter) {
        finalStrategy = 'after';
        finalPositon = parentY + this.$el.clientHeight;
      } // Does not itself and child


      var allowDrop = this.NDraggable.canDrop(this);

      if (allowDrop) {
        // For perfomance optimization only if allowDrop
        var target = this.NDraggable.getTarget(this);
        var allowDropRainbow = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.NDraggable.veCached, function (source) {
          return !nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(_this.NDraggable.allowDrop) ? _this.NDraggable.allowDrop : !!_this.NDraggable.allowDrop(source, target, finalStrategy);
        });
        allowDrop &= !nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(allowDropRainbow, false);
      }

      if (!allowDrop) {
        finalStrategy = 'nodrop';
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).addClass('n-nodrop');
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).addClass('n-dragover');
      this.NDraggable.updateDragIndicator(finalPositon !== -1 && finalStrategy !== 'nodrop', finalPositon || 1);
      this.strategy = finalStrategy;
    },
    eventDragstart: function eventDragstart(event) {
      this.eventDragstartSelect();
      this.NDraggable.$emit('dragstart', event, this);
    },
    eventDragenter: function eventDragenter(event) {
      event.preventDefault();
      return false;
    },
    eventDragover: function eventDragover(event) {
      var _this2 = this;

      if (!this.NDraggable.veCached.length) {
        return;
      }

      event.preventDefault();

      if (this.dragoverFrames === undefined) {
        this.dragoverFrames = 0;
      }

      var timer = function timer() {
        var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isEmpty(val)) {
          _this2.dragoverFrames = val;
        }

        return _this2.dragoverFrames;
      };

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].framerate(this.resolveDragPosition, 30, timer)(event.clientY, event.clientX);
    },
    eventDragleave: function eventDragleave(event) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).removeClass('n-dragover n-nodrop');
    },
    eventDragend: function eventDragend(event) {
      this.NDraggable.removeDragCounter(event);
      this.NDraggable.$emit('dragend', event, this);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].fire('draggable.stop');
    },
    eventDragdrop: function eventDragdrop(event) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).removeClass('n-dragover n-nodrop');

      if (this.strategy === 'nodrop') {
        this.NDraggable.$emit('dragend', event, this);
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].fire('draggable.stop');
      }

      event.preventDefault();
      event.stopPropagation();
      this.NDraggable.$emit('dragdrop', event, this, this.strategy);
    },
    eventClick: function eventClick(event) {
      var isExpand = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(event.target).closest(this.$refs.expand);

      if (this.$refs.expand && isExpand) {
        return;
      }

      var isSelect = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(event.target).closest(this.$refs.select);

      if (this.$refs.select && isSelect) {
        return;
      }

      var target = this.NDraggable.getTarget(this);

      if (this.NDraggable.renderSelect && nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(this.NDraggable.veKeyBuffer, 91)) {
        this.eventClickSelect();
      }

      this.NDraggable.$emit('row-click', target);
    },
    eventDblclick: function eventDblclick(event) {
      var isExpand = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(event.target).closest(this.$refs.expand);

      if (this.$refs.expand && isExpand) {
        return;
      }

      var isSelect = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(event.target).closest(this.$refs.select);

      if (this.$refs.select && isSelect) {
        return;
      }

      var target = this.NDraggable.getTarget(this);
      this.NDraggable.$emit('row-dblclick', target);
    },
    eventClickSelect: function eventClickSelect() {
      var allowSelect = this.NDraggable.canSelect(this);
      allowSelect = allowSelect && (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(this.NDraggable.allowSelect) ? this.NDraggable.allowSelect(this) : this.NDraggable.allowSelect);

      if (allowSelect) {
        this.NDraggable.selectItem(this);
      }

      return allowSelect;
    },
    eventDragstartSelect: function eventDragstartSelect() {
      var allowSelect = this.NDraggable.canSelect(this);
      allowSelect = allowSelect && (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(this.NDraggable.allowSelect) ? this.NDraggable.allowSelect(this) : this.NDraggable.allowSelect);

      if (allowSelect) {
        this.NDraggable.selectItem(this, !this.NDraggable.isSelected(this));
      }

      return allowSelect;
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    var nodeHandle = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el);

    if (this.NDraggable.handle) {
      nodeHandle.find('[draggable="true"]');
    }

    nodeHandle.on('dragstart', this.eventDragstart, this.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].delay(function () {
      return _this3.veInit = true;
    }, 25);
  },
  beforeDestroy: function beforeDestroy() {
    var nodeHandle = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el);

    if (this.NDraggable.handle) {
      nodeHandle.find('[draggable="true"]');
    }

    nodeHandle.off('dragstart', null, this.uid);
  }
});

/***/ }),

/***/ "./src/draggable/src/draggable/draggable.js":
/*!**************************************************!*\
  !*** ./src/draggable/src/draggable/draggable.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ __webpack_exports__["default"] = ({
  // name: 'NDraggable',
  model: {
    prop: 'items'
  },
  props: {
    items: {
      "default": function _default() {
        return [];
      }
    },
    handle: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    renderNode: {
      "default": function _default() {
        return null;
      }
    },
    current: {
      "default": function _default() {
        return null;
      }
    },
    selected: {
      "default": function _default() {
        return [];
      }
    },
    expanded: {
      "default": function _default() {
        return [];
      }
    },
    group: {
      "default": function _default() {
        return ['default'];
      },
      type: [Array]
    },
    allowGroups: {
      "default": function _default() {
        return this.group;
      },
      type: [Array]
    },
    safeZone: {
      "default": function _default() {
        return function (height) {
          return height * 0.51;
        };
      }
    },
    showEmpty: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    itemHeight: {
      "default": function _default() {
        return 34;
      },
      type: [Number]
    },
    itemOffset: {
      "default": function _default() {
        return 30;
      },
      type: [Number]
    },
    viewportHeight: {
      "default": function _default() {
        return false;
      }
    },
    scrollTopOnChange: {
      "default": function _default() {
        return true;
      }
    },
    keyProp: {
      "default": function _default() {
        return 'md5';
      },
      type: [String]
    },
    orderProp: {
      "default": function _default() {
        return 'order';
      },
      type: [String]
    },
    uniqueProp: {
      "default": function _default() {
        return 'id';
      },
      type: [String]
    },
    depthProp: {
      "default": function _default() {
        return 'depth';
      },
      type: [String]
    },
    pathProp: {
      "default": function _default() {
        return 'path';
      },
      type: [String]
    },
    indexProp: {
      "default": function _default() {
        return 'index';
      },
      type: [String]
    },
    cascadeProp: {
      "default": function _default() {
        return 'cascade';
      },
      type: [String]
    },
    childProp: {
      "default": function _default() {
        return 'children';
      },
      type: [String]
    },
    renderSelect: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    renderExpand: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    ghostMode: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    transformDrop: {
      "default": function _default() {
        return function (item) {
          return item;
        };
      }
    },
    disableMove: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    insertNode: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    removeNode: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    allowCurrent: {
      "default": function _default() {
        return true;
      }
    },
    allowSelect: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    allowDrag: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    allowDrop: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    wrapNode: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    updateDelay: {
      "default": function _default() {
        return 100;
      },
      type: [Number]
    },
    keyEvents: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    keyDebounce: {
      "default": function _default() {
        return 100;
      },
      type: [Number]
    },
    loadingInit: {
      "default": function _default() {
        return 0;
      }
    },
    loadingDelay: {
      "default": function _default() {
        return 0;
      },
      type: [Number]
    },
    loadingMax: {
      "default": function _default() {
        return 1250;
      },
      type: [Number]
    },
    loadingMin: {
      "default": function _default() {
        return 350;
      },
      type: [Number]
    },
    useRenderCache: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    }
  },
  data: function data() {
    return {
      veInview: false,
      veLoad: true,
      veCopy: [],
      veItems: [],
      veKeyBuffer: [],
      veCurrent: this.current,
      veSelected: this.selected,
      veExpanded: this.expanded
    };
  },
  provide: function provide() {
    return {
      NDraggable: this
    };
  },
  methods: {
    getParentById: function getParentById(unique) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var item = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].find(this.veItems, _defineProperty({}, this.uniqueProp, unique));

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isEmpty(item)) {
        return fallback;
      }

      var key = item[this.pathProp].replace(/(^veCopy$|\.[^\.]+$)/, '');

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isEmpty(key)) {
        return fallback;
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this, key, fallback);
    },
    scrollTo: function scrollTo() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.$refs.vscroller.scrollTop(y);
    },
    startLoading: function startLoading() {
      if (this.loadingInit && this.veLoad) {
        return this.addLoader(this.loadingInit);
      }

      if (!this.loadingDelay) {
        return;
      }

      var itemDiff = this.veItems.length - (this.veLoadLength || 0);
      var loadingTime = itemDiff * Math.sqrt(itemDiff * 0.5) * this.loadingDelay;
      this.veLoadLength = this.veItems.length;

      if (loadingTime <= 0 || loadingTime <= this.loadingMin) {
        return;
      }

      this.addLoader(Math.min(loadingTime, this.loadingMax));
    },
    addLoader: function addLoader(delay) {
      var _this = this;

      if (!this.$el) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].delay(function () {
          return _this.addLoader(delay);
        }, 50);
      }

      this.veLoad = false;
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].delay(function () {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(_this.$el).addClass('n-load');
      }, 0);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].delay(function () {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(_this.$el).removeClass('n-load');
      }, delay);
    },
    pushItem: function pushItem(item) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (index === null) {
        index = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.veCurrent, this.depthProp, 1) ? this.veCopy.length : nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.veCurrent, this.indexProp) + 1;
      }

      this.veCopy.splice(index, 0, item);
      this.refreshItems();
    },
    exportItems: function exportItems() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(this.items) === nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(this.veCopy)) {
        return;
      }

      this.$emit('input', this.veCopy);
    },
    importItems: function importItems() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      items = items || this.items;

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(items) === nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(this.veCopy)) {
        return;
      }

      if (this.$refs.vscroller && this.scrollTopOnChange) {
        this.$refs.vscroller.scrollTop(0);
      }

      this.veCopy = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].clone(items);
      this.refreshItems();
    },
    refreshItems: function refreshItems() {
      this.veItems = this.itemReducer([], this.veCopy);

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isEmpty(this.loadingDelay)) {
        this.startLoading();
      }

      this.refreshCurrent();
      this.$emit('hook:refreshed');
    },
    moveItems: function moveItems(event, target) {
      var _this2 = this;

      var strategy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'inner';
      target = this.getTarget(target);
      var ids = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veCached, function (item) {
        return item[_this2.uniqueProp];
      });

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isEmpty(ids)) {
        return;
      }

      this.$emit('move', ids.join(','), target[this.uniqueProp], strategy);
      this.$emit('move-code', this.veCached, target, strategy);

      if (this.disableMove) {
        return;
      }

      var cacheBatches = this.getCachedBatches();
      var targetOrder = target[this.indexProp] + 1;

      if (target[this.orderProp] && target[this.orderProp].length > 1) {
        targetOrder = nano_js__WEBPACK_IMPORTED_MODULE_0__["Num"]["int"](target[this.orderProp].slice(0, -1).join(''));
      }

      var batchedBefore = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].filter(nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].vals(cacheBatches).reverse(), function (batch) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Num"]["int"](batch['_key']) >= targetOrder;
      });
      var batchedAfter = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].filter(nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].vals(cacheBatches).reverse(), function (batch) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Num"]["int"](batch['_key']) < targetOrder;
      });

      if (strategy === 'root') {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veCached, function (source) {
          var insertNode = nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(_this2.insertNode) ? _this2.insertNode(source, target) : _this2.insertNode;

          if (!insertNode) {
            return;
          }

          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].push(_this2.veCopy, _this2.transformDrop(source.item));
        });
      }

      if (strategy === 'inner') {
        var finalParent = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this, target[this.pathProp]);
        var finalTarget = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].find(finalParent, _defineProperty({}, this.uniqueProp, target[this.uniqueProp]));

        if (finalTarget[this.childProp] === undefined) {
          finalTarget[this.childProp] = [];
        }

        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(cacheBatches, function (batch) {
          delete batch['_key'];
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch, function (source) {
            // Add item before last item added, also transform item
            nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].push(finalTarget[_this2.childProp], _this2.transformDrop(source.item));
          });
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch, _this2.dropItem);
        });
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veCached, function (source) {
          var insertNode = nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(_this2.insertNode) ? _this2.insertNode(source, target) : _this2.insertNode;

          if (!insertNode) {
            return;
          } // Add item before last item added, also transform item


          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].push(finalTarget[_this2.childProp], _this2.transformDrop(source.item));
        });
      }

      if (strategy === 'after') {
        var delayedItems = [];
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].vals(batchedBefore), function (batch) {
          delete batch['_key'];
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch, function (source) {
            delayedItems.push(source);
          });
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch, _this2.dropItem);
        });
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].vals(delayedItems), function (source) {
          var finalTarget = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(_this2, target[_this2.pathProp]);
          var finalIndex = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].findIndex(finalTarget, _defineProperty({}, _this2.uniqueProp, target[_this2.uniqueProp])); // Add item before last item added, also transform item

          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].insert(finalTarget, finalIndex + 1, _this2.transformDrop(source.item));
        });
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].vals(batchedAfter), function (batch) {
          delete batch['_key'];
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch.reverse(), function (source) {
            var finalTarget = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(_this2, target[_this2.pathProp]);
            var finalIndex = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].findIndex(finalTarget, _defineProperty({}, _this2.uniqueProp, target[_this2.uniqueProp])); // Add item before last item added, also transform item

            nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].insert(finalTarget, finalIndex + 1, _this2.transformDrop(source.item));
          });
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch, _this2.dropItem);
        });
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veCached.reverse(), function (source) {
          var insertNode = nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(_this2.insertNode) ? _this2.insertNode(source, target) : _this2.insertNode;

          if (!insertNode) {
            return;
          }

          var finalTarget = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(_this2, target[_this2.pathProp]);
          var finalIndex = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].findIndex(finalTarget, _defineProperty({}, _this2.uniqueProp, target[_this2.uniqueProp])); // Add item before last item added, also transform item

          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].insert(finalTarget, finalIndex + 1, _this2.transformDrop(source.item));
        });
      }

      if (strategy === 'before') {
        var _delayedItems = [];
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].vals(batchedBefore), function (batch) {
          delete batch['_key'];
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch.reverse(), function (source) {
            _delayedItems.push(source);
          });
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch, _this2.dropItem);
        });
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].vals(_delayedItems).reverse(), function (source) {
          var finalTarget = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(_this2, target[_this2.pathProp]);
          var finalIndex = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].findIndex(finalTarget, _defineProperty({}, _this2.uniqueProp, target[_this2.uniqueProp])); // Add item before last item added, also transform item

          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].insert(finalTarget, finalIndex, _this2.transformDrop(source.item));
        });
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].vals(batchedAfter).reverse(), function (batch) {
          delete batch['_key'];
          var finalTarget = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(_this2, target[_this2.pathProp]);
          var finalIndex = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].findIndex(finalTarget, _defineProperty({}, _this2.uniqueProp, target[_this2.uniqueProp]));
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch.reverse(), function (source) {
            // Add item before last item added, also transform item
            nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].insert(finalTarget, finalIndex, _this2.transformDrop(source.item));
          });
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(batch, _this2.dropItem);
        });
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veCached, function (source) {
          var insertNode = nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(_this2.insertNode) ? _this2.insertNode(source, target) : _this2.insertNode;

          if (!insertNode) {
            return;
          }

          var finalTarget = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(_this2, target[_this2.pathProp]);
          var finalIndex = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].findIndex(finalTarget, _defineProperty({}, _this2.uniqueProp, target[_this2.uniqueProp])); // Add item before last item added, also transform item

          nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].insert(finalTarget, finalIndex, _this2.transformDrop(source.item));
        });
      } // Indicate update items


      this.veModified = true;
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].fire('draggable.done');
    },
    getCachedBatches: function getCachedBatches() {
      var _this3 = this;

      var batches = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].reduce(this.veSelfCached, function (merge, source) {
        var batchKey = source[_this3.orderProp].slice(0, -1).join('') || source[_this3.indexProp] + 1;

        if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].has(merge, batchKey)) {
          merge[batchKey] = [];
        }

        var result = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].only(source, [_this3.uniqueProp, _this3.pathProp, _this3.indexProp]);
        result['item'] = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].clone(source.item);
        merge[batchKey].push(result);
        return merge;
      }, {});
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].map(batches, function (batch) {
        var sorted = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].sort(batch, function (item) {
          return item[_this3.orderProp].join('');
        });
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(sorted, function (item) {
          return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].except(item, ['_key']);
        });
      });
      return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].sort(batches, function (batch) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].first(batch)[_this3.orderProp].join('');
      });
    },
    dropItem: function dropItem(source) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].remove(nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this, source[this.pathProp]), _defineProperty({}, this.uniqueProp, source[this.uniqueProp]));
      this.veCached = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].remove(this.veCached, _defineProperty({}, this.uniqueProp, source[this.uniqueProp]));
      this.veSelfCached = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].remove(this.veSelfCached, _defineProperty({}, this.uniqueProp, source[this.uniqueProp]));
    },
    dropItems: function dropItems() {
      var _this4 = this;

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veSelfCached, function (source) {
        var removeNode = nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(_this4.removeNode) ? _this4.removeNode(source) : _this4.removeNode;

        if (!removeNode) {
          return;
        }

        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].remove(nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(_this4, source[_this4.pathProp]), _defineProperty({}, _this4.uniqueProp, source[_this4.uniqueProp]));
        _this4.veModified = true;
      });

      if (this.veModified) {
        this.refreshItems();
      }
    },
    clearItems: function clearItems() {
      this.veCached = [];
      this.veSelfCached = [];

      if (this.veSelected.length) {
        this.veSelected = [];
        this.updateSelected();
      }

      if (this.veModified) {
        this.$emit('moved', this.veCopy);
      }

      this.veModified = false;
      this.removeDragCounter();
      this.removeDragIndicator();
    },
    cacheItems: function cacheItems(items) {
      var group = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['default'];

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].intersect(group, this.allowGroups).length) {
        this.veCached = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(items, function (item) {
          return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].clone(item);
        });
      }
    },
    updateExpanded: function updateExpanded() {
      this.$emit('update:expanded', this.veExpanded);
    },
    expandItem: function expandItem(id) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(id)) {
        id = id[this.uniqueProp];
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].toggle(this.veExpanded, id);
      this.refreshItems();
      this.updateExpanded();
    },
    isExpanded: function isExpanded(id) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(id)) {
        id = id[this.uniqueProp];
      }

      return !nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(this.veExpanded, id);
    },
    updateSelected: function updateSelected() {
      this.$emit('update:selected', this.veSelected);
    },
    dispatchSelected: function dispatchSelected() {
      var _this5 = this;

      var selected = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veSelected, function (data) {
        return _this5.getTarget(data);
      });
      this.veSelfCached = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].clone(selected);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].fire('draggable.start', selected, this.group);
    },
    getTarget: function getTarget(unique) {
      var _defaultTarget;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(unique)) {
        unique = unique[this.uniqueProp];
      }

      var target = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].find(this.veItems, _defineProperty({}, this.uniqueProp, unique));
      var defaultTarget = (_defaultTarget = {}, _defineProperty(_defaultTarget, this.pathProp, 'veCopy'), _defineProperty(_defaultTarget, this.indexProp, 0), _defineProperty(_defaultTarget, this.uniqueProp, unique), _defaultTarget);

      if (!target) {
        return defaultTarget;
      }

      target['item'] = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this, target[this.pathProp] + '.' + target[this.indexProp]);
      return target;
    },
    highlightItem: function highlightItem(value) {
      var _this6 = this;

      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!prop) {
        prop = this.uniqueProp;
      }

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(value)) {
        value = value[prop];
      }

      var finalProps = [];
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].recursive(this.items, this.childProp, function (item, cascade) {
        if (item[prop] !== value) {
          return;
        }

        finalProps.push(item[_this6.uniqueProp]);
        var keys = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(cascade, function (sub) {
          return sub[_this6.uniqueProp];
        }).filter(function (item) {
          return _this6.veExpanded.indexOf(item) === -1;
        });
        _this6.veExpanded = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].merge(_this6.veExpanded, keys);
      });

      if (!finalProps.length) {
        return;
      }

      this.updateExpanded();
      this.refreshItems();
      this.$nextTick(function () {
        _this6.highlightTimer(finalProps);
      });
    },
    highlightTimer: function highlightTimer() {
      var _this7 = this;

      var finalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      clearTimeout(this.highlightDelay);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).find('.n-highlight').removeClass('n-highlight');
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(finalProps, function (unique, index) {
        if (!index) {
          _this7.scrollToItem(unique);
        }

        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(_this7.$el).find("[data-id=\"".concat(unique, "\"]")).addClass('n-highlight');
      });
      this.highlightDelay = setTimeout(function () {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(_this7.$el).find('.n-highlight').removeClass('n-highlight');
      }, 5000);
    },
    scrollToItem: function scrollToItem(unique) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(unique)) {
        unique = unique[this.uniqueProp];
      }

      var index = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].findIndex(this.veItems, _defineProperty({}, this.uniqueProp, unique)); // Get viewport height

      var height = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).height(); // Get scrolltop from virtual scroller

      var scrollY = this.$refs.vscroller.scrollTop(); // Row is inview

      var veInview = scrollY < this.itemHeight * index && scrollY + height > this.itemHeight * (index + 1);

      if (veInview) {
        return;
      } // New scrolltop value


      scrollX = this.itemHeight * index;
      this.$refs.vscroller.scrollTop(scrollX);
    },
    isCurrent: function isCurrent(unique) {
      if (!this.veCurrent) {
        return false;
      }

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(unique)) {
        unique = unique[this.uniqueProp];
      }

      return this.veCurrent[this.uniqueProp] === unique;
    },
    refreshCurrent: function refreshCurrent() {
      if (!this.veCurrent || !this.veCurrent[this.uniqueProp]) {
        return;
      }

      this.setCurrent(this.veCurrent[this.uniqueProp]);
    },
    updateCurrent: function updateCurrent(current) {
      this.$emit('update:current', this.veCurrent = current);
    },
    setCurrent: function setCurrent(unique) {
      var current = this.getTarget(unique);
      var isSameCurrent = nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(current) === nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(this.veCurrent);

      if (isSameCurrent) {
        return;
      }

      this.updateCurrent(current);
    },
    setDefaultCurrent: function setDefaultCurrent() {
      var current = this.getTarget(this.veItems[0]);
      var isSameCurrent = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(current, this.uniqueProp) === nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.veCurrent, this.uniqueProp);

      if (isSameCurrent) {
        return;
      }

      this.updateCurrent(current);
    },
    currentDblclick: function currentDblclick() {
      if (!this.veCurrent) {
        return null;
      }

      this.$emit('row-dblclick', this.veCurrent);
    },
    currentCollapse: function currentCollapse() {
      if (!this.veCurrent) {
        return null;
      }

      this.expandItem(this.veCurrent);
    },
    currentPrev: function currentPrev() {
      var index = 0;

      if (!this.veCurrent) {
        return this.setDefaultCurrent();
      }

      index = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].findIndex(this.veItems, _defineProperty({}, this.uniqueProp, this.veCurrent[this.uniqueProp]));
      index--;

      if (index < 0) {
        index = this.veItems.length - 1;
      } // Get viewport height


      var height = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).height(); // Get scrolltop from virtual scroller

      var scrollY = this.$refs.vscroller.scrollTop(); // Row is inview

      var veInview = scrollY < this.itemHeight * index && scrollY + height > this.itemHeight * (index + 1);

      if (!veInview) {
        // New scrolltop value
        scrollX = this.itemHeight * index;
        this.$refs.vscroller.scrollTop(scrollX);
      }

      var current = this.getTarget(this.veItems[index]);
      this.updateCurrent(current);
    },
    currentNext: function currentNext() {
      var index = 0;

      if (!this.veCurrent) {
        return this.setDefaultCurrent();
      }

      index = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].findIndex(this.veItems, _defineProperty({}, this.uniqueProp, this.veCurrent[this.uniqueProp]));
      index++;

      if (index > this.veItems.length - 1) {
        index = 0;
      } // Get viewport height


      var height = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).height(); // Get scrolltop from virtual scroller

      var scrollY = this.$refs.vscroller.scrollTop(); // Row is inview

      var veInview = scrollY < this.itemHeight * index && scrollY + height > this.itemHeight * (index + 1);

      if (!veInview) {
        // New scrolltop value
        scrollX = this.itemHeight * (index + 1) - height;
        this.$refs.vscroller.scrollTop(scrollX);
      }

      var current = this.getTarget(this.veItems[index]);
      this.updateCurrent(current);
    },
    removeItem: function removeItem(value) {
      var target = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this, value[this.pathProp]);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].removeIndex(target, value[this.indexProp]);
      this.refreshItems();
    },
    copyItem: function copyItem(value) {
      var target = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this, value[this.pathProp]);
      var item = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign({}, value.veItem, _defineProperty({}, this.uniqueProp, Object(nano_js__WEBPACK_IMPORTED_MODULE_0__["UUID"])()));
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].insert(target, value[this.indexProp] + 1, item);
      this.refreshItems();
    },
    toggleItem: function toggleItem(id) {
      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(id)) {
        id = id[this.uniqueProp];
      }

      if (reset) {
        this.veSelected = [];
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].toggle(this.veSelected, id);
      this.updateSelected();
    },
    toggleAllItems: function toggleAllItems() {
      var _this8 = this;

      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (reset) {
        this.veSelected = [];
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veCopy, function (item) {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].toggle(_this8.veSelected, item[_this8.uniqueProp]);
      });
      this.updateSelected();
    },
    selectItem: function selectItem(id) {
      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(id)) {
        id = id[this.uniqueProp];
      }

      if (reset) {
        this.veSelected = [];
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].add(this.veSelected, id);
      this.updateSelected();
    },
    selectAllItems: function selectAllItems() {
      var _this9 = this;

      this.veSelected = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veCopy, function (item) {
        return item[_this9.uniqueProp];
      });
      this.updateSelected();
    },
    unselectItem: function unselectItem(id) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(id)) {
        id = id[this.uniqueProp];
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].remove(this.veSelected, id);
      this.updateSelected();
    },
    unselectAllItems: function unselectAllItems() {
      this.veSelected = [];
      this.updateSelected();
    },
    canSelect: function canSelect(element) {
      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(element)) {
        element = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].find(this.veItems, _defineProperty({}, this.uniqueProp, element));
      }

      if (!this.veSelected.length) {
        return true;
      }

      var first = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].find(this.veItems, _defineProperty({}, this.uniqueProp, nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].first(this.veSelected)));

      if (!first || !element) {
        return false;
      }

      return element[this.depthProp] === first[this.depthProp];
    },
    isSelected: function isSelected(id) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isString(id)) {
        id = id[this.uniqueProp];
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(this.veSelected, id);
    },
    isAllSelected: function isAllSelected() {
      var _this10 = this;

      var onlyFirstDepth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var items = onlyFirstDepth ? this.veCopy : this.veItems;
      var selected = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].reduce(items, function (merge, item) {
        return merge && nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(_this10.veSelected, item[_this10.uniqueProp]);
      }, true);
      return selected && !!items.length;
    },
    isSelectable: function isSelectable() {
      return !!this.veItems.length;
    },
    isIntermediate: function isIntermediate() {
      var onlyFirstDepth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return !this.isAllSelected(onlyFirstDepth) && !!this.veSelected.length;
    },
    canDrag: function canDrag(element) {
      return true;
    },
    canDrop: function canDrop(element) {
      var _this11 = this;

      var targetPath = element[this.pathProp] + '.' + element[this.indexProp];
      var selected = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veSelected, function (item) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].find(_this11.veItems, _defineProperty({}, _this11.uniqueProp, item));
      });
      var result = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].filter(selected, function (source) {
        var sourcePath = source[_this11.pathProp] + '.' + source[_this11.indexProp];
        return targetPath.indexOf("".concat(sourcePath, ".")) !== -1 || sourcePath === targetPath;
      });
      return !result.length;
    },
    itemReducer: function itemReducer(merge, items) {
      var _this12 = this;

      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'veCopy';
      var orders = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      var cascade = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(items, function (item, index) {
        var _dragObject;

        var dragObject = (_dragObject = {}, _defineProperty(_dragObject, _this12.indexProp, index), _defineProperty(_dragObject, _this12.pathProp, path), _defineProperty(_dragObject, _this12.depthProp, depth), _dragObject);
        dragObject[_this12.uniqueProp] = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(item, _this12.uniqueProp);

        if (!dragObject[_this12.uniqueProp]) {
          nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(_this12, path + '.' + index + '.' + _this12.uniqueProp, dragObject[_this12.uniqueProp] = Object(nano_js__WEBPACK_IMPORTED_MODULE_0__["UUID"])());
        } // Order prop to sort on drag


        dragObject[_this12.orderProp] = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].merge(orders, [index + 1]); // Order prop to sort on drag

        dragObject[_this12.cascadeProp] = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].merge(cascade, [dragObject[_this12.uniqueProp]]); // Md5 item to check for any changes

        dragObject[_this12.keyProp] = nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(dragObject);
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].push(merge, dragObject);

        if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(_this12.veExpanded, dragObject[_this12.uniqueProp])) {
          return;
        }

        var props = [nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(item, _this12.childProp, []), depth + 1, "".concat(path, ".").concat(index, ".").concat(_this12.childProp), dragObject[_this12.orderProp], dragObject[_this12.cascadeProp]];

        _this12.itemReducer.apply(_this12, [merge].concat(props));
      });
      return merge;
    },
    createDragIndicator: function createDragIndicator() {
      if (this.dragIndicator) {
        return;
      }

      this.dragIndicator = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].make('div', {
        classList: ['n-draggable__indicator']
      });
      this.dragIndicator.attr('data-ignore', true);
      this.dragIndicator.appendTo(this.$el);
    },
    updateDragIndicator: function updateDragIndicator() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!this.dragIndicator) {
        this.createDragIndicator();
      }

      if (!state) {
        return this.dragIndicator.css({
          visibility: 'hidden'
        });
      }

      this.dragIndicator.css({
        visibility: 'visible',
        transform: "translateY(".concat(top, "px)")
      });
    },
    removeDragIndicator: function removeDragIndicator() {
      if (this.dragIndicator) {
        this.dragIndicator.get(0).remove();
      }

      delete this.dragIndicator;
    },
    createDragCounter: function createDragCounter(event) {
      if (this.dragCounter) {
        return;
      }

      this.dragCounter = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].make('div', {
        classList: ['n-draggable__counter']
      });
      this.dragCounter.html("<span>".concat(nano_js__WEBPACK_IMPORTED_MODULE_0__["Locale"].choice(':count Item|:count Items', this.veSelected.length), "</span>")); // Append dragimage to body

      this.dragCounter.appendTo(document.body); // Fix data transfer

      event.dataTransfer.setData('text/plain', '');

      if (typeof event.dataTransfer.setDragImage !== 'function') {
        return;
      } // Set finally the drop image


      event.dataTransfer.setDragImage(this.dragCounter.get(0), 0, 0);
    },
    removeDragCounter: function removeDragCounter() {
      if (this.dragCounter) {
        this.dragCounter.get(0).remove();
      }

      delete this.dragCounter;
    },

    /**
     * Event listeners
     */
    eventDragenter: function eventDragenter(event) {
      event.preventDefault();

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(event.target).closest(this.$el)) {
        this.createDragIndicator(event);
      }
    },
    eventDragleave: function eventDragleave(event) {
      event.preventDefault();

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(event.target).closest(this.$el)) {
        this.updateDragIndicator(false);
      }
    },
    eventDragend: function eventDragend(event) {
      event.preventDefault();

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(event.target).closest(this.$el)) {
        this.removeDragIndicator();
      }
    },
    eventEmptyDragenter: function eventEmptyDragenter(event) {
      event.preventDefault();
    },
    eventEmptyDragover: function eventEmptyDragover(event) {
      event.preventDefault();
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).addClass('n-dragover');
    },
    eventEmptyDragleave: function eventEmptyDragleave(event) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).removeClass('n-dragover');
    },
    eventEmptyDragdrop: function eventEmptyDragdrop(event) {
      var _this13 = this,
          _virtualItem;

      event.preventDefault();

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(event.target).closest('[data-id]')) {
        return;
      }

      var allowDropRainbow = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.veCached, function (item) {
        return !nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(_this13.allowDrop) ? _this13.allowDrop : !!_this13.allowDrop(item, null, 'root');
      });

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(allowDropRainbow, false)) {
        return;
      }

      var virtualItem = (_virtualItem = {}, _defineProperty(_virtualItem, this.indexProp, 0), _defineProperty(_virtualItem, this.uniqueProp, null), _virtualItem);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.$el).removeClass('n-dragover');
      this.$emit('dragdrop', event, virtualItem, 'root');
    },
    eventMousemove: function eventMousemove(event, target) {
      this.veInview = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(target).closest(this.$el);
    },
    eventKeydown: function eventKeydown(event) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].add(this.veKeyBuffer, event.which);

      if (!this.veInview || !this.keyEvents) {
        return;
      }

      if (event.which === 13) {
        event.preventDefault();
        this.currentDblclick();
      }

      if (event.which === 32) {
        event.preventDefault();
        this.currentCollapse();
      }

      if (event.which === 38 || event.which === 37) {
        event.preventDefault();

        if (this.lastUpdate && this.lastUpdate > Date.now()) {
          return;
        } else {
          this.lastUpdate = Date.now() + this.keyDebounce;
        }

        this.currentPrev();
      }

      if (event.which === 40 || event.which === 39) {
        event.preventDefault();

        if (this.lastUpdate && this.lastUpdate > Date.now()) {
          return;
        } else {
          this.lastUpdate = Date.now() + this.keyDebounce;
        }

        this.currentNext();
      }
    },
    eventKeyup: function eventKeyup(event) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].remove(this.veKeyBuffer, event.which);
    }
  },
  watch: {
    selected: function selected() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(this.selected) !== nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(this.veSelected)) {
        this.veSelected = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].clone(this.selected);
      }
    },
    expanded: function expanded() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(this.expanded) !== nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].md5(this.veExpanded)) {
        this.veExpanded = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].clone(this.expanded);
      }
    }
  },
  beforeMount: function beforeMount() {
    this.veModified = false;
    this.veCached = [];
    this.veSelfCached = [];
    this.$watch('veCopy', nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].debounce(this.exportItems, this.updateDelay));
    this.$watch('items', nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].debounce(this.importItems, this.updateDelay));
    this.importItems();
  },
  mounted: function mounted() {
    if (this.allowCurrent) {
      this.$on('row-click', this.setCurrent);
    }

    this.$on('dragstart', this.dispatchSelected);
    this.$on('dragstart', this.createDragCounter);
    this.$on('dragstart', this.createDragIndicator);
    this.$on('dragdrop', this.moveItems);
    var ident = {
      _uid: this.uid
    };
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].bind('draggable.start', this.cacheItems, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].bind('draggable.stop', this.clearItems, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].bind('draggable.done', this.dropItems, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).on('dragenter', this.eventDragenter, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).on('dragleave', this.eventDragleave, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).on('dragend', this.eventDragend, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).on('mousemove', this.eventMousemove, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).on('keydown', this.eventKeydown, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).on('keyup', this.eventKeyup, ident);
  },
  beforeDestroy: function beforeDestroy() {
    var ident = {
      _uid: this.uid
    };
    this.$off('row-click');
    this.$off('dragstart');
    this.$off('dragstart');
    this.$off('dragstart');
    this.$off('dragdrop');
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].unbind('draggable.start', ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].unbind('draggable.stop', ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].unbind('draggable.done', ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).off('dragenter', null, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).off('dragleave', null, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).off('dragend', null, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).off('mousemove', null, ident);
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(document).off('keydown', null, ident);
  }
});

/***/ }),

/***/ "./src/draggable/src/draggrid-item/draggrid-item.js":
/*!**********************************************************!*\
  !*** ./src/draggable/src/draggrid-item/draggrid-item.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _draggable_item_draggable_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../draggable-item/draggable-item */ "./src/draggable/src/draggable-item/draggable-item.js");




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NDraggridItem',
  "extends": _draggable_item_draggable_item__WEBPACK_IMPORTED_MODULE_2__["default"],
  renderNode: function renderNode() {
    var props = {
      index: this[this.NDraggable.indexProp],
      value: this.veItem,
      remove: this.remove,
      copy: this.copy,
      "export": this["export"]
    };
    var renderNode = null;

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isFunction(this.NDraggable.renderNode)) {
      renderNode = this.NDraggable.renderNode(props);
    }

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(this.NDraggable.renderNode)) {
      renderNode = this.$render(this.NDraggable.renderNode, {
        props: props
      });
    }

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(renderNode) && this.$scopedSlots["default"]) {
      renderNode = this.$scopedSlots["default"](props);
    }

    var attrs = {
      width: '100%',
      flex: '1 1 auto'
    };
    return this.NDraggable.wrapNode ? this.$render('div', {
      attrs: attrs
    }, [renderNode]) : renderNode;
  },
  renderSelect: function renderSelect() {
    if (!this.NDraggable.renderSelect) {
      return null;
    }

    var allowSelect = this.NDraggable.canSelect(this);
    allowSelect = allowSelect && (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isFunction(this.NDraggable.allowSelect) ? this.NDraggable.allowSelect(this) : this.NDraggable.allowSelect);
    var isChecked = this.NDraggable.isSelected(this); // TODO: Decouple is checked from draggable (Not anynmore?)

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "ref": "select",
      "class": "n-draggrid-item__select"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCheckbox"), {
      "disabled": !allowSelect,
      "checked": isChecked,
      "onInput": this.select
    }, null)]);
  },
  render: function render($render) {
    this.$render = $render;
    var style = {};

    if (this.NDraggable.itemHeight) {
      style.height = this.NDraggable.itemHeight + 'px';
    }

    var isBelowThreshold = this.NDraggable.veItems.length <= this.NDraggable.threshold;

    if (!this.NDraggable.ghostMode || isBelowThreshold) {
      this.veInit = true;
    }

    var events = {
      click: this.eventClick,
      dblclick: this.eventDblclick,
      dragenter: this.eventDragenter,
      dragover: this.eventDragover,
      dragleave: this.eventDragleave,
      dragend: this.eventDragend,
      dragdrop: this.eventDragdrop,
      drop: this.eventDragdrop
    };
    var classList = ['n-draggrid-item'];

    if (this.NDraggable.isSelected(this)) {
      classList.push('n-selected');
    }

    if (this.NDraggable.isCurrent(this)) {
      classList.push('n-current');
    }

    if (this.NDraggable.isExpanded(this)) {
      classList.push('n-expanded');
    }

    if (!this.veInit) {
      classList.push('n-ghost');
      return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
        "class": classList,
        "style": style
      }, null);
    }

    var allowDrag = !this.NDraggable.handle; // Is selectable

    allowDrag = allowDrag && (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isFunction(this.NDraggable.allowSelect) ? this.NDraggable.allowSelect(this) : this.NDraggable.allowSelect); // Is draggable

    allowDrag = allowDrag && (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isFunction(this.NDraggable.allowDrag) ? this.NDraggable.allowDrag(this) : this.NDraggable.allowDrag); // Get unique prop

    var id = this.value[this.NDraggable.uniqueProp];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "data-id": id,
      "class": classList,
      "style": style,
      "on": events,
      "draggable": allowDrag
    }, [this.ctor('renderNode')(), this.ctor('renderSelect')()]);
  }
});

/***/ }),

/***/ "./src/draggable/src/draggrid/draggrid.js":
/*!************************************************!*\
  !*** ./src/draggable/src/draggrid/draggrid.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _draggable_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../draggable/draggable */ "./src/draggable/src/draggable/draggable.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NDraggrid',
  "extends": _draggable_draggable__WEBPACK_IMPORTED_MODULE_2__["default"],
  props: {
    safeZone: {
      "default": function _default() {
        return function (height) {
          return -2;
        };
      }
    },
    itemHeight: {
      "default": function _default() {
        return 120;
      },
      type: [Number]
    },
    viewportHeight: {
      "default": function _default() {
        return false;
      }
    },
    scrollTopOnChange: {
      "default": function _default() {
        return false;
      }
    },
    wrapNode: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    }
  },
  renderEmpty: function renderEmpty() {
    if (!this.showEmpty) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draggrid__empty"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.$slots.empty || this.trans('No entries')])]);
  },
  renderItem: function renderItem(props) {
    var data = {
      key: props.value[this.keyProp],
      props: props
    };
    return this.$render('NDraggridItem', data, [this.$scopedSlots["default"]]);
  },
  renderItems: function renderItems() {
    var _this = this;

    var events = {
      dragenter: this.eventEmptyDragenter,
      dragover: this.eventEmptyDragover,
      dragleave: this.eventEmptyDragleave,
      dragdrop: this.eventEmptyDragdrop,
      drop: this.eventEmptyDragdrop
    };
    var renderItems = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.veItems, function (value) {
      return _this.ctor('renderItem')({
        value: value
      });
    });
    return this.$render('NScrollbar', {
      ref: 'viewport',
      on: events
    }, [renderItems]);
  },
  render: function render($render) {
    this.$render = $render;

    if (!this.$slots.empty) {
      this.$slots.empty = [this.ctor('renderEmpty')()];
    }

    this.$slots["default"] = this.$slots.empty;

    if (this.veItems.length) {
      this.$slots["default"] = [this.ctor('renderItems')()];
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draggrid"
    }, [this.$slots["default"]]);
  }
});

/***/ }),

/***/ "./src/draggable/src/draghandler/draghandler.js":
/*!******************************************************!*\
  !*** ./src/draggable/src/draghandler/draghandler.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var NDragCounter = /*#__PURE__*/function () {
  function NDragCounter() {
    _classCallCheck(this, NDragCounter);

    _defineProperty(this, "$el", null);

    this.$el = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].make('div', {
      classList: ['n-draggable__counter']
    });
    this.$el.appendTo(document.body);
  }

  _createClass(NDragCounter, [{
    key: "get",
    value: function get(event, count) {
      this.$el.html("<span>".concat(nano_js__WEBPACK_IMPORTED_MODULE_0__["Locale"].choice(':count Item|:count Items', count), "</span>")); // Fix data transfer

      event.dataTransfer.setData('text/plain', '');

      if (typeof event.dataTransfer.setDragImage !== 'function') {
        return;
      } // Set finally the drop image


      event.dataTransfer.setDragImage(this.$el.get(0), 0, 0);
    }
  }]);

  return NDragCounter;
}();

global.DragCounter = new NDragCounter();

var NDragIndicator = /*#__PURE__*/function () {
  function NDragIndicator() {
    _classCallCheck(this, NDragIndicator);

    _defineProperty(this, "$el", null);

    _defineProperty(this, "parent", null);

    this.$el = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].make('div', {
      classList: ['n-draggable__indicator']
    });
    this.$el.appendTo(document.body);
  }

  _createClass(NDragIndicator, [{
    key: "resolve",
    value: function resolve(event, safezone, el) {
      var strategy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'inner';
      var rect = el.getBoundingClientRect();

      if (event.clientY < rect.y + safezone) {
        strategy = 'before';
      }

      if (event.clientY > rect.y + rect.height - safezone) {
        strategy = 'after';
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(el).hasClass('n-expanded')) {
        strategy = strategy === 'after' ? 'inner' : strategy;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(['before', 'after'], strategy) ? this.show(rect, strategy) : this.hide();
      return strategy;
    }
  }, {
    key: "show",
    value: function show(rect, strategy) {
      var style = {
        top: rect.y,
        left: rect.x,
        width: rect.width
      };

      if (strategy === 'after') {
        style.top = rect.y + rect.height;
      }

      this.$el.css(nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].map(style, function (item) {
        return item + 'px';
      }));
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$el.css(null);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$el.get(0).remove();
    }
  }]);

  return NDragIndicator;
}();

global.DragIndicator = new NDragIndicator();

var NDraghandler = /*#__PURE__*/function () {
  function NDraghandler(rootNode) {
    _classCallCheck(this, NDraghandler);

    _defineProperty(this, "uid", null);

    _defineProperty(this, "uniqueProp", 'id');

    _defineProperty(this, "childProp", 'children');

    _defineProperty(this, "rootNode", null);

    _defineProperty(this, "childNodes", {});

    _defineProperty(this, "dropNodes", []);

    _defineProperty(this, "cacheNodes", []);

    _defineProperty(this, "strategy", 'nodrop');

    _defineProperty(this, "frames", 0);

    _defineProperty(this, "timeout", 0);

    this.rootNode = rootNode;
    nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(global, ['DragHandler', this.uid = Object(nano_js__WEBPACK_IMPORTED_MODULE_0__["UUID"])()], this);
  }

  _createClass(NDraghandler, [{
    key: "destroy",
    value: function destroy() {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].unset(global, ['DragHandler', this.uid], this);
    }
  }, {
    key: "bindRoot",
    value: function bindRoot() {
      var _this = this;

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).on('dragenter', function (event) {
        _this.onDragenterRoot(event);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).on('dragover', function (event) {
        _this.onDragoverRoot(event);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).on('dragleave', function (event) {
        _this.onDragleaveRoot(event);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).on('dragend', function (event) {
        _this.onDragendRoot(event);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).on('drop', function (event) {
        _this.onDragdropRoot(event);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).on('dragdrop', function (event) {
        _this.onDragdropRoot(event);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].bind('NDrag:start', this.bindDragstart.bind(this), this.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].bind('NDrag:end', this.bindDragend.bind(this), this.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].bind('NDrag:drop', this.bindDragdrop.bind(this), this.uid);
    }
  }, {
    key: "unbindRoot",
    value: function unbindRoot() {
      var events = ['dragstart', 'dragenter', 'dragover', 'dragleave', 'dragend', 'drop', 'dragdrop'];
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).off(events);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].unbind('NDrag:start', this.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].unbind('NDrag:end', this.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].unbind('NDrag:drop', this.uid);
    }
  }, {
    key: "onDragenterRoot",
    value: function onDragenterRoot(event) {
      event.preventDefault();
    }
  }, {
    key: "onDragoverRoot",
    value: function onDragoverRoot(event) {
      var _this2 = this;

      var isNode = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(event.target).closest('.n-draglist-item');

      if (isNode || !this.cacheNodes.length) {
        return;
      }

      event.preventDefault();

      if (this.frames && new Date() - this.frames < 35) {
        return;
      }

      var allowDrop = this.rootNode.allowDrop;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(allowDrop)) {
        allowDrop = function allowDrop() {
          return _this2.rootNode.allowDrop;
        };
      }

      var rainbow = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.cacheNodes, function (node) {
        return !!allowDrop(node, null, _this2.strategy);
      });
      this.strategy = 'root';

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(rainbow, false)) {
        this.strategy = 'nodrop';
      }

      global.DragIndicator.hide();

      if (this.strategy !== 'nodrop') {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).addClass('n-dragover');
      } else {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).removeClass('n-dragover');
      }

      if (this.strategy === 'nodrop') {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).addClass('n-nodrop');
      } else {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).removeClass('n-nodrop');
      }

      this.frames = new Date();
    }
  }, {
    key: "onDragleaveRoot",
    value: function onDragleaveRoot(event) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).removeClass('n-dragover n-nodrop');
    }
  }, {
    key: "onDragendRoot",
    value: function onDragendRoot(event) {
      if (!this.cacheNodes.length) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).removeClass('n-dragover n-nodrop');

      if (this.strategy !== 'root') {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].fire('NDrag:end');
    }
  }, {
    key: "onDragdropRoot",
    value: function onDragdropRoot(event) {
      if (!this.cacheNodes.length) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(this.rootNode.$el).removeClass('n-dragover n-nodrop');

      if (this.strategy !== 'root') {
        return;
      }

      event.preventDefault();
      this.moveNodes(null, this.strategy);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].fire('NDrag:drop');
    }
  }, {
    key: "bindDragstart",
    value: function bindDragstart(group, cache) {
      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(this.rootNode.allowGroups, group)) {
        this.cacheNodes = JSON.parse(JSON.stringify(cache));
      }
    }
  }, {
    key: "bindDragend",
    value: function bindDragend() {
      this.cacheNodes = this.dropNodes = [];
    }
  }, {
    key: "bindDragdrop",
    value: function bindDragdrop() {
      if (!this.dropNodes.length) {
        return;
      }

      this.rootNode.tempSelected = [];
      this.rootNode.$emit('update:selected', this.rootNode.tempSelected);

      if (!this.rootNode.removeNode) {
        return;
      }

      var clone = {
        items: nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].clone(this.rootNode.items)
      };
      this.unlinkNodes(clone);
      this.removeNodes(clone);
      this.rootNode.$emit('update:items', clone.items);
    }
  }, {
    key: "onDragstartNode",
    value: function onDragstartNode(event, node) {
      var _this3 = this;

      if (!this.rootNode.isSelected(node)) {
        this.rootNode.$emit('update:selected', this.rootNode.tempSelected = [node.value.id]);
      }

      var cache = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.rootNode.tempSelected, function (id) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].find(_this3.rootNode.virtuals, {
          id: id
        });
      });
      global.DragCounter.get(event, cache.length);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].map(cache, function (value) {
        return {
          value: value,
          item: nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(_this3.rootNode, value.route)
        };
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].fire('NDrag:start', this.rootNode.group, this.dropNodes = cache);
    }
  }, {
    key: "onDragenterNode",
    value: function onDragenterNode(event, node) {
      event.preventDefault();
    }
  }, {
    key: "onDragoverNode",
    value: function onDragoverNode(event, node) {
      var _this4 = this;

      if (!this.cacheNodes.length) {
        return;
      }

      event.preventDefault();

      if (this.frames && new Date() - this.frames < 35) {
        return;
      }

      var safezone = this.rootNode.safezone(node.$el.clientHeight);
      this.strategy = global.DragIndicator.resolve(event, safezone, node.$el);
      var targetNode = {
        value: node.value,
        item: node.item
      };
      var allowDrop = this.rootNode.allowDrop;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isFunction(allowDrop)) {
        allowDrop = function allowDrop() {
          return _this4.rootNode.allowDrop;
        };
      }

      var rainbow = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.cacheNodes, function (node) {
        return !!allowDrop(node, targetNode, _this4.strategy);
      });
      var isInSelf = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(node.value.cascade, this.rootNode.tempSelected);
      rainbow.push(!isInSelf);

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].has(rainbow, false)) {
        this.strategy = 'nodrop';
      }

      if (this.strategy === 'nodrop') {
        global.DragIndicator.hide();
      }

      if (this.strategy !== 'nodrop') {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el).addClass('n-dragover');
      } else {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el).removeClass('n-dragover');
      }

      if (this.strategy === 'nodrop') {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el).addClass('n-nodrop');
      } else {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el).removeClass('n-nodrop');
      }

      this.frames = new Date();
    }
  }, {
    key: "onDragleaveNode",
    value: function onDragleaveNode(event, node) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el).removeClass('n-dragover n-nodrop');
      global.DragIndicator.hide();
    }
  }, {
    key: "onDragendNode",
    value: function onDragendNode(event, node) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el).removeClass('n-dragover n-nodrop');
      global.DragIndicator.hide();
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].fire('NDrag:end');
    }
  }, {
    key: "onDragdropNode",
    value: function onDragdropNode(event, node) {
      if (!this.cacheNodes.length) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el).removeClass('n-dragover n-nodrop');
      global.DragIndicator.hide();

      if (this.strategy === 'nodrop') {
        return;
      }

      event.preventDefault();
      this.moveNodes(node, this.strategy);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Event"].fire('NDrag:drop');
    }
  }, {
    key: "bindNode",
    value: function bindNode(node) {
      var _this5 = this;

      if (this.childNodes[node._.uid]) {
        this.unbindNode(node);
      }

      var $el = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el);

      if (this.rootNode.handle) {
        $el = handle.find('[draggable]');
      }

      $el.on('dragstart', function (event) {
        _this5.onDragstartNode(event, node);
      });
      $el.on('dragenter', function (event) {
        _this5.onDragenterNode(event, node);
      });
      $el.on('dragover', function (event) {
        _this5.onDragoverNode(event, node);
      });
      $el.on('dragleave', function (event) {
        _this5.onDragleaveNode(event, node);
      });
      $el.on('dragend', function (event) {
        _this5.onDragendNode(event, node);
      });
      $el.on('drop', function (event) {
        _this5.onDragdropNode(event, node);
      });
      $el.on('dragdrop', function (event) {
        _this5.onDragdropNode(event, node);
      });
      this.childNodes[node._.uid] = node;
    }
  }, {
    key: "unbindNode",
    value: function unbindNode(node) {
      var $el = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el);

      if (this.rootNode.handle) {
        $el = handle.find('[draggable]');
      }

      $el.off(['dragstart', 'dragenter', 'dragover', 'dragleave', 'dragend', 'drop', 'dragdrop']);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find(node.$el).removeClass('n-dragover n-nodrop');
      global.DragIndicator.hide();
      delete this.childNodes[node._.uid];
    }
  }, {
    key: "moveNodes",
    value: function moveNodes(target, strategy) {
      var clone = {
        items: nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].clone(this.rootNode.items)
      };

      if (this.rootNode.removeNode) {
        this.unlinkNodes(clone);
      }

      this.cacheNodes = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.cacheNodes, this.rootNode.transformDrop);

      if (this.rootNode.insertNode && strategy === 'root') {
        clone = this.moveNodesRoot(clone, target);
      }

      if (this.rootNode.insertNode && strategy === 'inner') {
        clone = this.moveNodesInto(clone, target);
      }

      if (this.rootNode.insertNode && strategy === 'before') {
        clone = this.moveNodesBefore(clone, target);
      }

      if (this.rootNode.insertNode && strategy === 'after') {
        clone = this.moveNodesAfter(clone, target);
      }

      if (this.rootNode.removeNode) {
        clone = this.removeNodes(clone);
      }

      var sources = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.cacheNodes, function (node) {
        return node.value.id;
      });
      this.dropNodes = this.rootNode.tempSelected = [];
      this.rootNode.$emit('move', sources, nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(target, 'value.id'), strategy);
      this.rootNode.$emit('moveraw', this.cacheNodes, target, strategy);
      this.rootNode.$emit('update:selected', this.rootNode.tempSelected);
      this.rootNode.$emit('update:items', clone.items);
    }
  }, {
    key: "unlinkNodes",
    value: function unlinkNodes(clone) {
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.dropNodes, function (node) {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(clone, node.value.route, null);
      });
    }
  }, {
    key: "removeNodes",
    value: function removeNodes(clone) {
      var _this6 = this;

      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'items';
      clone[prop] = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].filter(clone[prop], function (node) {
        return !!node;
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].map(clone[prop], function (node) {
        if (!node[_this6.childProp]) {
          return node;
        }

        return _this6.removeNodes(node, _this6.childProp);
      });
      return clone;
    }
  }, {
    key: "moveNodesRoot",
    value: function moveNodesRoot(clone) {
      if (this.rootNode.disableMove) {
        return clone;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.cacheNodes, function (node) {
        clone.items.push(node.item);
      });
      return clone;
    }
  }, {
    key: "moveNodesInto",
    value: function moveNodesInto(clone, target) {
      if (this.rootNode.disableMove) {
        return clone;
      }

      var targetRoute = [target.value.route, this.childProp].join('.');
      var children = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(clone, targetRoute, []);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.cacheNodes, function (node) {
        children.push(node.item);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(clone, targetRoute, children);
      return clone;
    }
  }, {
    key: "moveNodesBefore",
    value: function moveNodesBefore(clone, target) {
      if (this.rootNode.disableMove) {
        return clone;
      }

      var targetRoute = target.value.route.replace(/\.[0-9]+$/, '');
      var items = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(clone, targetRoute);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.cacheNodes, function (node, index) {
        items.splice(target.value.index + index, 0, node.item);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(clone, targetRoute, items);
      return clone;
    }
  }, {
    key: "moveNodesAfter",
    value: function moveNodesAfter(clone, target) {
      if (this.rootNode.disableMove) {
        return clone;
      }

      var targetRoute = target.value.route.replace(/\.[0-9]+$/, '');
      var items = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(clone, targetRoute);
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].each(this.cacheNodes, function (node, index) {
        items.splice(target.value.index + index + 1, 0, node.item);
      });
      nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].set(clone, targetRoute, items);
      return clone;
    }
  }, {
    key: "reduce",
    value: function reduce(items) {
      var _this7 = this;

      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].reduce(items, function (merge, item, index) {
        return _this7.reduceItem.apply(_this7, [merge, item, nano_js__WEBPACK_IMPORTED_MODULE_0__["Num"]["int"](index)].concat(props));
      }, []);
    }
  }, {
    key: "reduceItem",
    value: function reduceItem(merge, item, index) {
      var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var route = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'items';
      var cascades = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
      // Get a unique id
      var unique = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(item, this.uniqueProp, Object(nano_js__WEBPACK_IMPORTED_MODULE_0__["UUID"])()); // Add unique to cascader

      var tempCascade = nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].merge(cascades, [unique]);
      var virtual = {
        index: index,
        depth: depth,
        route: [route, index].join('.'),
        parent: nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].last(cascades),
        cascade: tempCascade
      };
      virtual[this.uniqueProp] = unique;
      var children = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(item, this.childProp, []);

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Any"].isEmpty(children)) {
        return nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].merge(merge, [virtual]);
      }

      var childRoute = [route, index, this.childProp].join('.');
      var props = [depth + 1, childRoute, tempCascade];
      return nano_js__WEBPACK_IMPORTED_MODULE_0__["Arr"].merge(merge, [virtual], this.reduce.apply(this, [children].concat(props)));
    }
  }]);

  return NDraghandler;
}();

/* harmony default export */ __webpack_exports__["default"] = (NDraghandler);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/draggable/src/draglist-item/draglist-item.js":
/*!**********************************************************!*\
  !*** ./src/draggable/src/draglist-item/draglist-item.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ "./src/draggable/index.js");
/* harmony import */ var _draggable_item_draggable_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../draggable-item/draggable-item */ "./src/draggable/src/draggable-item/draggable-item.js");





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NDraglistItem',
  inject: {
    NDraggable: {
      "default": undefined
    }
  },
  props: {
    value: {
      required: true
    }
  },
  computed: {
    item: function item() {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.NDraggable, this.value.route);
    }
  },
  mounted: function mounted() {
    this.NDraggable.drag.bindNode(this);
  },
  beforeUnmount: function beforeUnmount() {
    this.NDraggable.drag.unbindNode(this);
  },
  methods: {
    hasChildren: function hasChildren() {
      return this.NDraggable.hasChildren(this);
    },
    isDisabled: function isDisabled() {
      return this.NDraggable.isDisabled(this);
    },
    isHighlight: function isHighlight() {
      return this.NDraggable.isHighlight(this);
    },
    isCurrent: function isCurrent() {
      return this.NDraggable.isCurrent(this);
    },
    isDraggable: function isDraggable() {
      return this.NDraggable.isDraggable(this);
    },
    isExpanded: function isExpanded() {
      return this.NDraggable.isExpanded(this);
    },
    expandItem: function expandItem() {
      this.NDraggable.expandItem(this);
    },
    isSelected: function isSelected() {
      return this.NDraggable.isSelected(this);
    },
    selectItem: function selectItem() {
      this.NDraggable.selectItem(this);
    },
    onClick: function onClick() {
      this.NDraggable.setCurrent(this);
      this.NDraggable.$emit('row-click', this);
    },
    onDblclick: function onDblclick() {
      this.NDraggable.setCurrent(this);
      this.NDraggable.$emit('row-dblclick', this);
    }
  },
  renderElement: function renderElement() {
    var props = {
      value: this.value,
      item: this.item
    };
    var renderFunction = this.$slots["default"];

    if (this.NDraggable.renderNode) {
      renderFunction = this.NDraggable.renderNode;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draglist-item__element"
    }, [renderFunction(props)]);
  },
  renderSpacer: function renderSpacer() {
    var width = this.value.depth * this.NDraggable.itemOffset;

    if (!width) {
      return null;
    }

    var style = {
      width: width + 'px'
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draglist-item__spacer",
      "style": style
    }, null);
  },
  renderHandle: function renderHandle() {
    if (!this.NDraggable.renderHandle) {
      return null;
    }

    var props = {};

    if (this.isDraggable()) {
      props.draggable = true;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-draglist-item__handle"
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draglist-item__ellipsis"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.handle
    }, null)])]);
  },
  renderExpand: function renderExpand() {
    if (!this.NDraggable.renderExpand) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draglist-item__expand",
      "onMousedown": this.expandItem
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draglist-item__angle"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.angleRight
    }, null)])]);
  },
  renderSelect: function renderSelect() {
    if (!this.NDraggable.renderSelect) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draglist-item__select",
      "onMousedown": this.selectItem
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draglist-item__checkbox"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.checked
    }, null)])]);
  },
  render: function render() {
    var classList = ['n-draglist-item'];

    if (this.hasChildren()) {
      classList.push('n-children');
    }

    if (this.isDisabled()) {
      classList.push('n-disabled');
    }

    if (this.isSelected()) {
      classList.push('n-selected');
    }

    if (this.isExpanded()) {
      classList.push('n-expanded');
    }

    if (this.isCurrent()) {
      classList.push('n-current');
    }

    if (this.isHighlight()) {
      classList.push('n-highlight');
    }

    var props = {
      onClick: this.onClick,
      onDblclick: this.onDblclick
    };

    if (!this.NDraggable.handle && this.isDraggable()) {
      props.draggable = true;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [this.ctor('renderSpacer')(), this.ctor('renderExpand')(), this.ctor('renderSelect')(), this.ctor('renderElement')()]);
  }
});

/***/ }),

/***/ "./src/draggable/src/draglist/draglist.js":
/*!************************************************!*\
  !*** ./src/draggable/src/draglist/draglist.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _draghandler_draghandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../draghandler/draghandler */ "./src/draggable/src/draghandler/draghandler.js");




function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NDraglist',
  model: {
    prop: 'items'
  },
  props: {
    items: {
      "default": function _default() {
        return [];
      }
    },
    renderNode: {
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
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    current: {
      "default": function _default() {
        return null;
      }
    },
    selected: {
      "default": function _default() {
        return [];
      }
    },
    expanded: {
      "default": function _default() {
        return [];
      }
    },
    handle: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    group: {
      "default": function _default() {
        return ['default'];
      },
      type: [Array]
    },
    allowGroups: {
      "default": function _default() {
        return ['default'];
      },
      type: [Array]
    },
    safezone: {
      "default": function _default() {
        return function (height) {
          return height * 0.265;
        };
      }
    },
    showEmptyIcon: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    itemHeight: {
      "default": function _default() {
        return 34;
      },
      type: [Number]
    },
    itemOffset: {
      "default": function _default() {
        return 30;
      },
      type: [Number]
    },
    overflowY: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    overflowX: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    offsetY: {
      "default": function _default() {
        return 10;
      },
      type: [Number]
    },
    offsetX: {
      "default": function _default() {
        return 10;
      },
      type: [Number]
    },
    scrollTopOnChange: {
      "default": function _default() {
        return false;
      }
    },
    uniqueProp: {
      "default": function _default() {
        return 'id';
      },
      type: [String]
    },
    childProp: {
      "default": function _default() {
        return 'children';
      },
      type: [String]
    },
    renderCurrent: {
      "default": function _default() {
        return true;
      }
    },
    renderHandle: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    renderSelect: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    renderExpand: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    transformDrop: {
      "default": function _default() {
        return function (node) {
          return node;
        };
      }
    },
    disableMove: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    insertNode: {
      "default": function _default() {
        return true;
      }
    },
    removeNode: {
      "default": function _default() {
        return true;
      }
    },
    allowSelect: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    allowDrag: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    allowDrop: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    keyEvents: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    highlightTimeout: {
      "default": function _default() {
        return 7000;
      },
      type: [Number]
    }
  },
  provide: function provide() {
    return {
      NDraggable: this
    };
  },
  data: function data() {
    return {
      uid: Object(nano_js__WEBPACK_IMPORTED_MODULE_1__["UUID"])(),
      virtuals: [],
      visible: [],
      childNodes: {},
      highlight: [],
      firstSelected: null,
      tempCurrent: this.current,
      tempExpanded: this.expanded,
      tempSelected: this.selected
    };
  },
  beforeMount: function beforeMount() {
    this.drag = new _draghandler_draghandler__WEBPACK_IMPORTED_MODULE_2__["default"](this);
  },
  mounted: function mounted() {
    this.drag.bindRoot();
    this.$watch('tempSelected', this.watchSelected, {
      deep: true
    });
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].async(this.refreshVirtuals);
  },
  beforeUnmount: function beforeUnmount() {
    this.drag.unbindRoot();
  },
  unmounted: function unmounted() {
    this.drag.destroy();
  },
  watch: {
    items: function items() {
      if (this.scrollTopOnChange) {
        this.scrollTo();
      }

      this.refreshVirtuals();
    },
    virtuals: function virtuals() {
      this.filterVirtuals();
    },
    selected: function selected(value) {
      this.tempSelected = value;
    },
    current: function current(value) {
      this.tempCurrent = value;
    }
  },
  methods: {
    watchSelected: function watchSelected() {
      if (!this.tempSelected.length) {
        return this.firstSelected = null;
      }

      var first = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(this.virtuals, _defineProperty({}, this.uniqueProp, this.tempSelected[0]));
      this.firstSelected = first;
    },
    refreshVirtuals: function refreshVirtuals() {
      this.virtuals = this.drag.reduce(this.items);
      console.log('Total virtual items mounted: ' + this.virtuals.length);
    },
    filterVirtuals: function filterVirtuals() {
      var _this = this;

      this.visible = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.virtuals, function (node) {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].contains(_this.tempExpanded, node.cascade.slice(0, -1));
      });
    },
    scrollTo: function scrollTo() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.$refs.virtualscroller.scrollTo(x, y);
    },
    isDraggable: function isDraggable(node) {
      var _this2 = this;

      var canDrag = this.allowDrag;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isFunction(canDrag)) {
        canDrag = function canDrag() {
          return _this2.allowDrag;
        };
      }

      return canDrag(node);
    },
    isHighlight: function isHighlight(node) {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(this.highlight, node.value[this.uniqueProp]);
    },
    highlightNode: function highlightNode(value) {
      var _this3 = this;

      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      clearTimeout(this.refresh);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].recursive(this.items, this.childProp, function (node, cascade) {
        if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(node, key || _this3.uniqueProp) !== value) {
          return;
        }

        nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(cascade, function (item) {
          nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(_this3.tempExpanded, item[_this3.uniqueProp]);
        });
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(_this3.highlight, node[_this3.uniqueProp]);
      });

      if (!this.highlight.length) {
        return;
      }

      this.$nextTick(this.scrollToHighlight);
      this.refresh = setTimeout(function () {
        return _this3.highlight = [];
      }, this.highlightTimeout);
      this.filterVirtuals();
    },
    scrollToHighlight: function scrollToHighlight() {
      if (!this.highlight.length) {
        return;
      }

      var index = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].findIndex(this.visible, _defineProperty({}, this.uniqueProp, nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].first(this.highlight)));
      this.$refs.virtualscroller.scrollIntoView(index);
    },
    isCurrent: function isCurrent(node) {
      return this.renderCurrent && this.tempCurrent && node.value[this.uniqueProp] === this.tempCurrent[this.uniqueProp];
    },
    setCurrent: function setCurrent(node) {
      var isSameNode = this.tempCurrent && this.tempCurrent[this.uniqueProp] === node.value[this.uniqueProp];

      if (isSameNode) {
        return;
      }

      this.$emit('update:current', this.tempCurrent = node.item);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].fire('NDraglist:syncCurrent', node.item, this.uid);
    },
    setRawCurrent: function setRawCurrent(index) {
      var route = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.visible, [index, 'route']);

      if (!route) {
        return this.setRawCurrent(0);
      }

      var item = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this, route);
      this.$refs.virtualscroller.scrollIntoView(index);
      this.$emit('update:current', this.tempCurrent = item);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].fire('NDraglist:syncCurrent', item, this.uid);
    },
    setNextCurrent: function setNextCurrent() {
      if (!this.visible.length) {
        return;
      }

      var reset = 0;

      if (!this.tempCurrent) {
        return this.setRawCurrent(reset);
      }

      var index = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].findIndex(this.visible, _defineProperty({}, this.uniqueProp, this.tempCurrent[this.uniqueProp]));

      if (index !== -1) {
        index++;
      }

      if (index >= this.visible.length) {
        index = reset;
      }

      this.setRawCurrent(index);
    },
    setPrevCurrent: function setPrevCurrent() {
      if (!this.visible.length) {
        return;
      }

      var reset = this.visible.length - 1;

      if (!this.tempCurrent) {
        return this.setRawCurrent(reset);
      }

      var index = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].findIndex(this.visible, _defineProperty({}, this.uniqueProp, this.tempCurrent[this.uniqueProp]));

      if (index !== -1) {
        index--;
      }

      if (index < 0) {
        index = reset;
      }

      this.setRawCurrent(index);
    },
    syncCurrent: function syncCurrent() {
      return ['NDraglist:syncCurrent', this.uid];
    },
    isDisabled: function isDisabled(node) {
      return this.firstSelected && node.value.depth !== this.firstSelected.depth;
    },
    hasChildren: function hasChildren(node) {
      return !!this.getChildren(node).length;
    },
    getChildren: function getChildren(node) {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(node.item, this.childProp, []);
    },
    isExpanded: function isExpanded(node) {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(this.tempExpanded, node.value[this.uniqueProp]);
    },
    expandItem: function expandItem(node) {
      if (!this.hasChildren(node)) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].toggle(this.tempExpanded, node.value[this.uniqueProp]);
      this.filterVirtuals();
    },
    expandCurrent: function expandCurrent() {
      if (!this.tempCurrent) {
        return;
      }

      var children = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.tempCurrent, this.childProp);

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(children)) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].toggle(this.tempExpanded, this.tempCurrent[this.uniqueProp]);
      this.filterVirtuals();
    },
    isSelected: function isSelected(node) {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(this.tempSelected, node.value[this.uniqueProp]);
    },
    isTotalSelected: function isTotalSelected() {
      var visible = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.visible, function (item) {
        return !item.depth;
      });
      return visible.length === this.tempSelected;
    },
    isInterSelected: function isInterSelected() {
      var visible = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.visible, function (item) {
        return !item.depth;
      });
      return visible.length !== this.tempSelected && this.tempSelected;
    },
    selectItem: function selectItem(node) {
      if (this.isDisabled(node)) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].toggle(this.tempSelected, node.value[this.uniqueProp]);
      this.$emit('update:selected', this.tempSelected);
    },
    selectAll: function selectAll() {
      var _this4 = this;

      var visible = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.visible, function (item) {
        return !item.depth;
      });
      var indexies = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(visible, function (item) {
        return item[_this4.uniqueProp];
      });

      if (indexies.length === this.tempSelected.length) {
        return this.$emit('update:selected', this.tempSelected = []);
      }

      this.$emit('update:selected', this.tempSelected = indexies);
    },
    unselectAll: function unselectAll() {
      if (this.tempSelected.length) {
        this.$emit('update:selected', this.tempSelected = []);
      }
    },
    bindKeydown: function bindKeydown() {
      if (!this.keyEvents) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on('keydown', this.onKeydown, this.uid);
    },
    unbindKeydown: function unbindKeydown() {
      if (!this.keyEvents) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('keydown', null, this.uid);
    },
    onKeydown: function onKeydown(event) {
      if (event.which === 32) {
        event.preventDefault();
        event.stopPropagation();
        this.expandCurrent();
      }

      if (event.which === 38) {
        event.preventDefault();
        event.stopPropagation();
        this.setPrevCurrent();
      }

      if (event.which === 40) {
        event.preventDefault();
        event.stopPropagation();
        this.setNextCurrent();
      }
    }
  },
  renderEmpty: function renderEmpty() {
    var _this5 = this;

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NEmptyIcon"), {
      "disabled": !this.showEmptyIcon,
      "class": "n-draglist__empty"
    }, {
      "default": function _default() {
        return [_this5.$slots.empty && _this5.$slots.empty() || _this5.trans('No entries')];
      }
    });
  },
  renderItem: function renderItem(props) {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NDraglistItem"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "data-unique": props.value[this.uniqueProp]
    }, nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(props, ['index'])), {
      "default": this.$slots["default"]
    });
  },
  render: function render() {
    var classList = ['n-draglist', 'n-draglist--' + this.size, 'n-draglist--' + this.type];

    if (!this.items.length) {
      classList.push('n-empty');
    }

    var passed = ['threshold', 'itemHeight', 'overflowX', 'overflowY', 'offsetX', 'offsetY'];
    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].only(this.$props, passed, {
      items: this.visible,
      onMouseenter: this.bindKeydown,
      onMouseleave: this.unbindKeydown
    });
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NVirtualscroller"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "virtualscroller",
      "class": classList
    }, props), {
      "default": this.ctor('renderItem'),
      empty: this.ctor('renderEmpty')
    });
  }
});

/***/ }),

/***/ "./src/empty/index.js":
/*!****************************!*\
  !*** ./src/empty/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_empty_icon_empty_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/empty-icon/empty-icon */ "./src/empty/src/empty-icon/empty-icon.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_empty_icon_empty_icon__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_empty_icon_empty_icon__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/empty/src/empty-icon/empty-icon.js":
/*!************************************************!*\
  !*** ./src/empty/src/empty-icon/empty-icon.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NEmptyIcon',
  props: {
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'ufo';
      },
      type: [String]
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    }
  },
  render: function render() {
    var classList = ['n-empty-icon', 'n-empty-icon--' + this.size, 'n-empty-icon--' + this.type];

    if (this.disabled) {
      classList.push('n-disabled');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-empty-icon__frame"
    }, null), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-empty-icon__text"
    }, [this.$slots["default"] && this.$slots["default"]()])]);
  }
});

/***/ }),

/***/ "./src/form/index.js":
/*!***************************!*\
  !*** ./src/form/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_form_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/form/form */ "./src/form/src/form/form.js");
/* harmony import */ var _src_form_group_form_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/form-group/form-group */ "./src/form/src/form-group/form-group.js");
/* harmony import */ var _src_form_item_form_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/form-item/form-item */ "./src/form/src/form-item/form-item.js");



/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_form_form__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_form_form__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_form_group_form_group__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_form_group_form_group__WEBPACK_IMPORTED_MODULE_1__["default"]);
  App.component(_src_form_item_form_item__WEBPACK_IMPORTED_MODULE_2__["default"].name, _src_form_item_form_item__WEBPACK_IMPORTED_MODULE_2__["default"]);
});

/***/ }),

/***/ "./src/form/src/form-group/form-group.js":
/*!***********************************************!*\
  !*** ./src/form/src/form-group/form-group.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NFormGroup',
  inject: {
    NForm: {
      "default": undefined
    }
  },
  props: {
    modelValue: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    label: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    icon: {
      "default": function _default() {
        return '';
      }
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    align: {
      "default": function _default() {
        return 'vertical';
      },
      type: [String]
    },
    collapse: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    tooltip: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    tooltipPosition: {
      "default": function _default() {
        return 'bottom-start';
      },
      type: [String]
    }
  },
  data: function data() {
    return {
      tempValue: this.modelValue
    };
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
    }
  },
  methods: {
    collapseGroup: function collapseGroup() {
      this.$emit('update:modelValue', this.tempValue = !this.tempValue);
    }
  },
  renderCollapse: function renderCollapse() {
    if (!this.collapse) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSwitch"), {
      "size": "sm",
      "modelValue": this.tempValue
    }, null);
  },
  renderIcon: function renderIcon() {
    if (!this.icon) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": ['n-icon', this.icon]
    }, null);
  },
  renderText: function renderText() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-form-group__label"
    }, [this.ctor('renderIcon')(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])(" "), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.label])]);
  },
  renderAction: function renderAction() {
    if (!this.$slots.action) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-form-group__action"
    }, [this.$slots.action()]);
  },
  renderLabel: function renderLabel() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("legend", {
      "class": "n-form-group__legend",
      "onClick": this.collapseGroup
    }, [this.ctor('renderCollapse')(), this.ctor('renderText')(), this.ctor('renderAction')()]);
  },
  renderTooltip: function renderTooltip() {
    var _this = this;

    if (!this.tooltip) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), {
      "type": "tooltip",
      "position": this.tooltipPosition
    }, {
      "default": function _default() {
        return [_this.tooltip];
      }
    });
  },
  renderBody: function renderBody() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-form-group__body"
    }, [this.$slots["default"] && this.$slots["default"]()]);
  },
  render: function render() {
    var classList = ['n-form-group', 'n-form-group--' + this.align];

    if (this.collapse) {
      classList.push('n-collapse');
    }

    if (!this.tempValue) {
      classList.push('n-hidden');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("fieldset", {
      "class": classList
    }, [this.ctor('renderLabel')(), this.ctor('renderTooltip')(), this.ctor('renderBody')()]);
  }
});

/***/ }),

/***/ "./src/form/src/form-item/form-item.js":
/*!*********************************************!*\
  !*** ./src/form/src/form-item/form-item.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NFormItem',
  inject: {
    NForm: {
      "default": undefined
    },
    NTabs: {
      "default": undefined
    },
    NTabsItem: {
      "default": undefined
    }
  },
  props: {
    prop: {
      "default": function _default() {
        return 'id';
      },
      type: [String]
    },
    label: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    tooltip: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    tooltipPosition: {
      "default": function _default() {
        return 'bottom-start';
      },
      type: [String]
    },
    tooltipWindow: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    }
  },
  methods: {
    focusInput: function focusInput() {
      var $input = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).find('input');

      if (!$input.empty()) {
        return $input.get(0).focus();
      }

      $input = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.input).childs();

      if (!$input.empty()) {
        return $input.get(0).click();
      }

      console.log('I dont belong here :o');
    },
    gotoInput: function gotoInput() {
      var errors = this.NForm.errors;

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(errors)) {
        return;
      }

      if (!this.NTabs || !this.NTabsItem) {
        return;
      }

      var keys = nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].keys(errors);

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].first(keys) !== this.prop) {
        return;
      }

      this.NTabs.changeTab(this.NTabsItem.name);
    }
  },
  data: function data() {
    return {
      uid: Object(nano_js__WEBPACK_IMPORTED_MODULE_1__["UUID"])()
    };
  },
  beforeMount: function beforeMount() {
    this.NForm.addItem(this);
  },
  mounted: function mounted() {// this.NForm.$on('errors', this.gotoInput);
  },
  beforeUnmount: function beforeUnmount() {
    this.NForm.removeItem(this);
  },
  renderTooltip: function renderTooltip() {
    var _this = this;

    if (!this.tooltip && !this.$slots.tooltip) {
      return null;
    }

    var props = {
      position: this.tooltipPosition
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "type": "tooltip"
    }, props), {
      "default": function _default() {
        return [_this.$slots.tooltip && _this.$slots.tooltip() || _this.tooltip];
      }
    });
  },
  renderLabel: function renderLabel() {
    if (!this.label && !this.$slots.label) {
      return null;
    }

    var labelHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-form-item__label"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("label", {
      "onClick": this.focusInput
    }, [this.$slots.label && this.$slots.label() || this.label])]);

    return [labelHtml, this.ctor('renderTooltip')()];
  },
  renderError: function renderError() {
    if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].has(this.NForm.errors, this.prop)) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-form-item__error"
    }, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.NForm.errors, this.prop)]);
  },
  renderInput: function renderInput() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "ref": "input",
      "class": "n-form-item__input"
    }, [this.$slots["default"] && this.$slots["default"]()]);
  },
  render: function render() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-form-item"
    }, [this.ctor('renderLabel')(), this.ctor('renderInput')(), this.ctor('renderError')()]);
  }
});

/***/ }),

/***/ "./src/form/src/form/form.js":
/*!***********************************!*\
  !*** ./src/form/src/form/form.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NForm',
  model: {
    prop: 'form'
  },
  props: {
    form: {
      "default": function _default() {
        return {};
      },
      type: [Object]
    },
    errors: {
      "default": function _default() {
        return {};
      },
      type: [Object]
    },
    align: {
      "default": function _default() {
        return 'vertical';
      },
      type: [String]
    },
    prevent: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    forceChange: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    forceErrors: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    }
  },
  methods: {
    onSubmit: function onSubmit(event) {
      if (this.prevent) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    addItem: function addItem(item) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.elements, item, {
        uid: item.uid
      });
    },
    removeItem: function removeItem(item) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.elements, {
        uid: item.uid
      });
    },
    setForm: function setForm(form) {
      var veForm = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].clone(form);

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].md5(veForm) !== nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].md5(this.veForm) || this.forceChange) {
        this.$emit('change');
      }

      this.veForm = veForm;
    },
    setErrors: function setErrors(errors) {
      var veErrors = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].clone(errors);

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].md5(veErrors) !== nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].md5(this.veErrors) || this.forceErrors) {
        this.$emit('errors');
      }

      this.veErrors = veErrors;
    }
  },
  data: function data() {
    return {
      uid: Object(nano_js__WEBPACK_IMPORTED_MODULE_1__["UUID"])(),
      elements: []
    };
  },
  provide: function provide() {
    return {
      NForm: this
    };
  },
  mounted: function mounted() {
    // this.$watch('form', () => this.setForm(this.form),
    //     { deep: true });
    // this.$watch('errors', () => this.setErrors(this.errors),
    //     { deep: true });
    // let ident = {
    //     _uid: this.uid
    // };
    // if ( this.propagation ) {
    //     return;
    // }
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).on('submit', this.onSubmit, this._.uid);
  },
  beforeUnmount: function beforeUnmount() {
    // let ident = {
    //     _uid: this.uid
    // };
    // if ( this.propagation ) {
    //     return;
    // }
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).off('submit', null, this._.uid);
  },
  render: function render() {
    var classList = ['n-form', 'n-form--' + this.align];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("form", {
      "class": classList
    }, [this.$slots["default"] && this.$slots["default"]()]);
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
/* harmony import */ var _mixins_src_ctor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mixins/src/ctor */ "./src/mixins/src/ctor.js");
/* harmony import */ var _mixins_src_cmer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/src/cmer */ "./src/mixins/src/cmer.js");


var NanoIcons = {
  handle: 'fa fa-ellipsis-v',
  checked: 'fa fa-check',
  circle: 'fa fa-circle',
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
  angleLeft: 'fa fa-angle-left',
  angleDoubleLeft: 'fa fa-angle-double-left',
  angleDoubleRight: 'fa fa-angle-double-right'
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
  App.config.globalProperties.ctor = _mixins_src_ctor__WEBPACK_IMPORTED_MODULE_0__["default"].ctor;
  App.config.globalProperties.cmer = _mixins_src_cmer__WEBPACK_IMPORTED_MODULE_1__["default"].cmer;
  App.config.globalProperties.trans = global.Nano.Locale.trans;
  App.config.globalProperties.choice = global.Nano.Locale.choice;

  if (!global.NanoIcons) {
    global.NanoIcons = Nano.Obj.assign(NanoIcons, global.NanoIcons);
  }

  App.config.globalProperties.icons = Nano.Obj.assign(global.NanoIcons, Icons);

  if (!global.NanoStyles) {
    global.NanoStyles = Nano.Obj.assign(NanoStyles, global.NanoStyles);
  }

  App.config.globalProperties.styles = Nano.Obj.assign(global.NanoStyles, Styles);

  __webpack_require__(/*! ./notification/index */ "./src/notification/index.js")["default"](App);

  __webpack_require__(/*! ./empty/index */ "./src/empty/index.js")["default"](App);

  __webpack_require__(/*! ./config/index */ "./src/config/index.js")["default"](App); //!complex 17.1


  __webpack_require__(/*! ./scrollbar/index */ "./src/scrollbar/index.js")["default"](App);

  __webpack_require__(/*! ./virtualscroller/index */ "./src/virtualscroller/index.js")["default"](App);

  __webpack_require__(/*! ./draggable/index */ "./src/draggable/index.js")["default"](App);

  __webpack_require__(/*! ./loader/index */ "./src/loader/index.js")["default"](App);

  __webpack_require__(/*! ./resizer/index */ "./src/resizer/index.js")["default"](App); //check


  __webpack_require__(/*! ./popover/index */ "./src/popover/index.js")["default"](App);

  __webpack_require__(/*! ./modal/index */ "./src/modal/index.js")["default"](App);

  __webpack_require__(/*! ./button/index */ "./src/button/index.js")["default"](App); // group 17.1


  __webpack_require__(/*! ./input/index */ "./src/input/index.js")["default"](App);

  __webpack_require__(/*! ./textarea/index */ "./src/textarea/index.js")["default"](App);

  __webpack_require__(/*! ./select/index */ "./src/select/index.js")["default"](App);

  __webpack_require__(/*! ./checkbox/index */ "./src/checkbox/index.js")["default"](App);

  __webpack_require__(/*! ./radio/index */ "./src/radio/index.js")["default"](App);

  __webpack_require__(/*! ./switch/index */ "./src/switch/index.js")["default"](App);

  __webpack_require__(/*! ./confirm/index */ "./src/confirm/index.js")["default"](App);

  __webpack_require__(/*! ./cascader/index */ "./src/cascader/index.js")["default"](App);

  __webpack_require__(/*! ./datepicker/index */ "./src/datepicker/index.js")["default"](App);

  __webpack_require__(/*! ./timepicker/index */ "./src/timepicker/index.js")["default"](App); // require('./datetimepicker/index'); 18.1


  __webpack_require__(/*! ./transfer/index */ "./src/transfer/index.js")["default"](App); // check


  __webpack_require__(/*! ./form/index */ "./src/form/index.js")["default"](App); // check


  __webpack_require__(/*! ./tabs/index */ "./src/tabs/index.js")["default"](App);

  __webpack_require__(/*! ./table/index */ "./src/table/index.js")["default"](App); // 18.1 matrix, options, select


  __webpack_require__(/*! ./paginator/index */ "./src/paginator/index.js")["default"](App);

  __webpack_require__(/*! ./info/index */ "./src/info/index.js")["default"](App); //!complex 16.1
  // require('./map/index'); // SX only ez 17.1
  // require('./file-list/index'); // SX only 17.1
  // require('./file/index'); // SX only 17.1
  // require('./chart/index'); // Ignore
  // require('./wysiwyg/index'); // Ignore

}
global.NanoInstall = NanoInstall;
/* harmony default export */ __webpack_exports__["default"] = (NanoInstall);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/info/index.js":
/*!***************************!*\
  !*** ./src/info/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_info_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/info/info */ "./src/info/src/info/info.js");
/* harmony import */ var _src_info_column_info_column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/info-column/info-column */ "./src/info/src/info-column/info-column.js");
/* harmony import */ var _src_info_field_types_info_field_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/info-field/types/info-field-string */ "./src/info/src/info-field/types/info-field-string.js");
/* harmony import */ var _src_info_field_types_info_field_boolean__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/info-field/types/info-field-boolean */ "./src/info/src/info-field/types/info-field-boolean.js");
/* harmony import */ var _src_info_field_types_info_field_datetime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/info-field/types/info-field-datetime */ "./src/info/src/info-field/types/info-field-datetime.js");
/* harmony import */ var _src_info_field_types_info_field_option__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/info-field/types/info-field-option */ "./src/info/src/info-field/types/info-field-option.js");
/* harmony import */ var _src_info_field_types_info_field_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/info-field/types/info-field-image */ "./src/info/src/info-field/types/info-field-image.js");







/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_info_info__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_info_info__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_info_column_info_column__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_info_column_info_column__WEBPACK_IMPORTED_MODULE_1__["default"]);
  App.component(_src_info_field_types_info_field_string__WEBPACK_IMPORTED_MODULE_2__["default"].name, _src_info_field_types_info_field_string__WEBPACK_IMPORTED_MODULE_2__["default"]);
  App.component(_src_info_field_types_info_field_boolean__WEBPACK_IMPORTED_MODULE_3__["default"].name, _src_info_field_types_info_field_boolean__WEBPACK_IMPORTED_MODULE_3__["default"]);
  App.component(_src_info_field_types_info_field_datetime__WEBPACK_IMPORTED_MODULE_4__["default"].name, _src_info_field_types_info_field_datetime__WEBPACK_IMPORTED_MODULE_4__["default"]);
  App.component(_src_info_field_types_info_field_option__WEBPACK_IMPORTED_MODULE_5__["default"].name, _src_info_field_types_info_field_option__WEBPACK_IMPORTED_MODULE_5__["default"]);
  App.component(_src_info_field_types_info_field_image__WEBPACK_IMPORTED_MODULE_6__["default"].name, _src_info_field_types_info_field_image__WEBPACK_IMPORTED_MODULE_6__["default"]);
});

/***/ }),

/***/ "./src/info/src/info-column/info-column.js":
/*!*************************************************!*\
  !*** ./src/info/src/info-column/info-column.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NInfoColumn',
  inject: {
    NInfo: {
      "default": undefined
    }
  },
  props: {
    prop: {
      "default": function _default() {
        return 'id';
      },
      type: [String]
    },
    label: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'string';
      },
      type: [String]
    },
    options: {
      "default": function _default() {
        return [];
      },
      type: [Object, Array, Function]
    },
    optionsValue: {
      "default": function _default() {
        return '$value';
      },
      type: [String]
    },
    optionsLabel: {
      "default": function _default() {
        return '$value';
      },
      type: [String]
    },
    emptyText: {
      "default": function _default() {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Locale"].trans('-');
      },
      type: [String]
    },
    trueText: {
      "default": function _default() {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Locale"].trans('Yes');
      },
      type: [String]
    },
    falseText: {
      "default": function _default() {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Locale"].trans('No');
      },
      type: [String]
    },
    datetimeFormat: {
      "default": function _default() {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Locale"].trans('YYYY-MM-DD HH:mm');
      },
      type: [String]
    }
  },
  data: function data() {
    return {
      uid: Object(nano_js__WEBPACK_IMPORTED_MODULE_1__["UUID"])()
    };
  },
  beforeMount: function beforeMount() {
    this.NInfo.addColumn(this);
  },
  beforeUnmount: function beforeUnmount() {
    this.NInfo.removeColumn(this);
  },
  renderLabel: function renderLabel() {
    if (this.$slots.label) {
      return this.$slots.label();
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-info-column__label"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.label])]);
  },
  renderBody: function renderBody(props) {
    if (this.$slots["default"]) {
      return this.$slots.label();
    }

    var passed = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(props, [], {
      column: this
    });
    var component = Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])('NInfoField' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(this.type));
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-info-column__value"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])(component, passed)]);
  },
  renderCell: function renderCell(props) {},
  render: function render() {
    return null;
  }
});

/***/ }),

/***/ "./src/info/src/info-field/info-field.js":
/*!***********************************************!*\
  !*** ./src/info/src/info-field/info-field.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_src_ctor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../mixins/src/ctor */ "./src/mixins/src/ctor.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  inject: {
    NInfo: {
      "default": undefined
    }
  },
  props: {
    column: {
      required: true
    },
    item: {
      required: true
    }
  },
  computed: {
    input: function input() {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.item, this.column.prop);
    }
  },
  render: function render() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-info__field"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.input])]);
  }
});

/***/ }),

/***/ "./src/info/src/info-field/types/info-field-boolean.js":
/*!*************************************************************!*\
  !*** ./src/info/src/info-field/types/info-field-boolean.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _info_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../info-field */ "./src/info/src/info-field/info-field.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NInfoFieldBoolean',
  "extends": _info_field__WEBPACK_IMPORTED_MODULE_2__["default"],
  render: function render() {
    var className = ['n-info__field', 'n-info__field--' + this.column.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": className
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].convertBoolean(this.input, this.column.trueText, this.column.falseText)])]);
  }
});

/***/ }),

/***/ "./src/info/src/info-field/types/info-field-datetime.js":
/*!**************************************************************!*\
  !*** ./src/info/src/info-field/types/info-field-datetime.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _info_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../info-field */ "./src/info/src/info-field/info-field.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NInfoFieldDatetime',
  "extends": _info_field__WEBPACK_IMPORTED_MODULE_2__["default"],
  render: function render() {
    var className = ['n-info__field', 'n-info__field--' + this.column.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": className
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].convertDatetime(this.input, this.column.datetimeFormat, this.column.emptyText)])]);
  }
});

/***/ }),

/***/ "./src/info/src/info-field/types/info-field-image.js":
/*!***********************************************************!*\
  !*** ./src/info/src/info-field/types/info-field-image.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _info_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../info-field */ "./src/info/src/info-field/info-field.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NInfoFieldImage',
  "extends": _info_field__WEBPACK_IMPORTED_MODULE_1__["default"],
  render: function render() {
    var classList = ['n-info__field', 'n-info__field--' + this.column.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "style": 'background-image: url(\'' + this.input + '\');'
    }, null)]);
  }
});

/***/ }),

/***/ "./src/info/src/info-field/types/info-field-option.js":
/*!************************************************************!*\
  !*** ./src/info/src/info-field/types/info-field-option.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _info_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../info-field */ "./src/info/src/info-field/info-field.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NInfoFieldOption',
  "extends": _info_field__WEBPACK_IMPORTED_MODULE_2__["default"],
  render: function render() {
    var _this = this;

    var options = typeof this.column.options === 'function' ? this.column.options(this.value) : this.column.options;
    options = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].map(nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].keys(options), function (index) {
      return {
        $value: options[index],
        $index: index
      };
    });
    var className = ['n-info__field', 'n-info__field--' + this.column.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": className
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isArray(this.veValue) ? [this.veValue] : this.veValue, function (value) {
      var option = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(options, function (option) {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].string(nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(option, _this.column.optionsValue)) === nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].string(value);
      });
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(option, _this.column.optionsLabel, value);
    }).join(', ') || this.column.emptyText])]);
  }
});

/***/ }),

/***/ "./src/info/src/info-field/types/info-field-string.js":
/*!************************************************************!*\
  !*** ./src/info/src/info-field/types/info-field-string.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _info_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../info-field */ "./src/info/src/info-field/info-field.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NInfoFieldString',
  "extends": _info_field__WEBPACK_IMPORTED_MODULE_2__["default"],
  render: function render() {
    var className = ['n-info__field', 'n-info__field--' + this.column.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": className
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].convertString(this.input, this.column.emptyText)])]);
  }
});

/***/ }),

/***/ "./src/info/src/info/info.js":
/*!***********************************!*\
  !*** ./src/info/src/info/info.js ***!
  \***********************************/
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
  name: 'NInfo',
  model: {
    prop: 'item'
  },
  props: {
    item: {
      "default": function _default() {
        return null;
      }
    },
    syncEvent: {
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
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    relative: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    showEmptyIcon: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    }
  },
  data: function data() {
    return {
      uid: Object(nano_js__WEBPACK_IMPORTED_MODULE_1__["UUID"])(),
      elements: [],
      options: [],
      tempValue: this.item
    };
  },
  mounted: function mounted() {
    this.bindSyncEvent();
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindSyncEvent();
  },
  methods: {
    bindSyncEvent: function bindSyncEvent() {
      var _this = this;

      if (!this.syncEvent) {
        return;
      }

      this.options = this.syncEvent;

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isFunction(this.options)) {
        this.options = this.options(this);
      }

      var syncFunction = function syncFunction(value) {
        var uid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (uid === _this.options[1]) {
          _this.setValue(value);
        }
      };

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].bind(this.options[0], syncFunction, this.uid);
    },
    unbindSyncEvent: function unbindSyncEvent() {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].unbind(this.options[0], this.uid);
    },
    setValue: function setValue(value) {
      this.$emit('update:modelValue', this.tempValue = value);
    },
    addColumn: function addColumn(column) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.elements, column, {
        uid: column.uid
      });
    },
    removeColumn: function removeColumn(column) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.elements, {
        uid: column.uid
      });
    }
  },
  provide: function provide() {
    return {
      NInfo: this
    };
  },
  renderEmpty: function renderEmpty() {
    var _this2 = this;

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NEmptyIcon"), {
      "disabled": !this.showEmptyIcon,
      "class": "n-info__empty"
    }, {
      "default": function _default() {
        return [_this2.$slots.empty && _this2.$slots.empty() || _this2.trans('No entry')];
      }
    });
  },
  renderBody: function renderBody() {
    var _this3 = this;

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tempValue)) {
      return this.ctor('renderEmpty')();
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-info__body"
    }, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.elements, function (column) {
      return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
        "class": "n-info__column"
      }, [column.ctor('renderLabel')({
        item: _this3.tempValue
      }), column.ctor('renderBody')({
        item: _this3.tempValue
      })]);
    })]);
  },
  render: function render() {
    var _slot;

    var classList = ['n-info', 'n-info--' + this.type, 'n-info--' + this.size];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "relative": this.relative
    }, _isSlot(_slot = this.ctor('renderBody')()) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    }), this.$slots["default"]()]);
  }
});

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
        return '';
      },
      type: [String]
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
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
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
      tempValue: this.modelValue || ''
    };
  },
  renderIcon: function renderIcon() {
    if (!this.icon) {
      return null;
    }

    var disabled = this.disabled || this.iconDisabled;
    var props = {
      type: 'input',
      icon: this.icon,
      size: this.size,
      square: true,
      disabled: disabled,
      onClick: this.eventIconClick
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, null);
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
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])('input', props);
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

/***/ "./src/loader/index.js":
/*!*****************************!*\
  !*** ./src/loader/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_loader_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/loader/loader */ "./src/loader/src/loader/loader.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_loader_loader__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_loader_loader__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/loader/src/loader/loader.js":
/*!*****************************************!*\
  !*** ./src/loader/src/loader/loader.js ***!
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
  name: 'NLoader',
  inject: {
    NLoader: {
      "default": undefined
    }
  },
  provide: function provide() {
    return {
      NLoader: this
    };
  },
  props: {
    visible: {
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
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    minimum: {
      "default": function _default() {
        return 300;
      },
      type: [Number]
    },
    debounce: {
      "default": function _default() {
        return 100;
      },
      type: [Number]
    }
  },
  data: function data() {
    return {
      tempVisible: this.visible
    };
  },
  methods: {
    applyTimer: function applyTimer() {
      this.timing = Date.now();

      if (this.visible) {
        return this.tempVisible = this.visible;
      }

      this.startTimer();
    },
    startTimer: function startTimer() {
      var _this = this;

      var timing = Date.now() - this.timing;

      if (timing < this.minimum) {
        return this.restartTimer(timing);
      }

      this.timeout = setTimeout(function () {
        return _this.tempVisible = false;
      }, this.debounce);
    },
    restartTimer: function restartTimer() {
      var timing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(this.startTimer, this.minimum - timing + 10);
    }
  },
  watch: {
    visible: function visible() {
      this.applyTimer();
    }
  },
  mounted: function mounted() {
    this.applyTimer();
  },
  render: function render() {
    var classList = ['n-loader', 'n-loader--' + this.size, 'n-loader--' + this.type];

    if (this.tempVisible) {
      classList.push('n-load');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.$slots["default"] && this.$slots["default"]()]);
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
    var ctor = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.$options, key.split('.'), -1); //console.log(this.$options, ctor);
    // console.log(ctor);
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

/***/ "./src/modal/index.js":
/*!****************************!*\
  !*** ./src/modal/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_modal_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/modal/modal */ "./src/modal/src/modal/modal.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_modal_modal__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_modal_modal__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/modal/src/modal/modal.js":
/*!**************************************!*\
  !*** ./src/modal/src/modal/modal.js ***!
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
  name: 'NModal',
  inject: {
    NScrollbar: {
      "default": undefined
    }
  },
  props: {
    modelValue: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    listen: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    width: {
      "default": function _default() {
        return '50%';
      },
      type: [String]
    },
    height: {
      "default": function _default() {
        return 'auto';
      },
      type: [String]
    },
    title: {
      "default": function _default() {
        return '';
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
        return 'center-center';
      },
      type: [String]
    },
    closable: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    renderClose: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    }
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
    },
    tempValue: function tempValue() {
      this.startRefreshTimeout();
    }
  },
  provide: function provide() {
    return {
      NModal: this
    };
  },
  data: function data() {
    return {
      target: null,
      tempValue: this.modelValue
    };
  },
  mounted: function mounted() {
    this.target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).previous().get(0);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('mousedown', this.eventClick, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('keydown', this.eventKeydown, this._.uid); // if ( ! this.$listeners.close ) {
    //     this.$on('close', this.close);
    // }
    // this.target = Dom.find(this.$el).previous().get(0);
    // if ( ! Any.isEmpty(this.selector) ) {
    //     this.target = Dom.find(this.$el).parent().find(this.selector).get(0);
    // }

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).append(this.$el);
  },
  beforeUnmount: function beforeUnmount() {
    this.$el.remove();
  },
  unmounted: function unmounted() {
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).off('mousedown', null, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).off('keydown', null, this._.uid);
  },
  methods: {
    openModal: function openModal() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.tempValue) {
        return;
      }

      if (this.closable || force) {
        this.tempValue = true;
      }

      this.$emit('update:modelValue', true, source);
    },
    closeModal: function closeModal() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!this.tempValue) {
        return;
      }

      if (this.closable || force) {
        this.tempValue = false;
      }

      this.$emit('update:modelValue', false, source);
    },
    stopRefreshTimeout: function stopRefreshTimeout() {
      clearInterval(this.refresh);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).removeClass('n-ready');
    },
    startRefreshTimeout: function startRefreshTimeout() {
      var _this = this;

      if (!this.tempValue) {
        return this.stopRefreshTimeout();
      }

      window.zIndex += 1;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).attr('data-modal', window.zIndex);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).css({
        'z-index': window.zIndex
      });
      this.refresh = setTimeout(function () {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(_this.$el).addClass('n-ready');
      }, 100);
    },
    eventClick: function eventClick(event, el) {
      if (!this.listen || this.disabled || event.which !== 1) {
        return;
      }

      var result = !!nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.target);

      if (!result && !this.tempValue) {
        return;
      }

      if (this.tempValue && this.closable) {
        result = !nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.$refs.backdrop);
      }

      if (result === this.tempValue) {
        return;
      }

      if (!result) {
        return this.closeModal(false, 'escape');
      }

      this.openModal(true, 'selector');
    },
    eventKeydown: function eventKeydown(event, el) {
      if (!this.tempValue || event.which !== 27) {
        return;
      }

      var extractIndex = function extractIndex(modal) {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(modal).attr('data-modal');
      };

      var indexes = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find('.n-modal:not(.n-hidden)').each(extractIndex);
      var index = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).attr('data-modal');

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].last(indexes.sort()) !== index) {
        return;
      }

      this.closeModal(false, 'escape');
    }
  },
  renderClose: function renderClose() {
    var _this2 = this;

    if (!this.renderClose || !this.closable) {
      return null;
    }

    var props = {
      onClick: function onClick() {
        return _this2.closeModal(false, 'escape');
      }
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-modal__close"
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": this.icons.times
    }, null)]);
  },
  renderHeader: function renderHeader() {
    if (!this.$slots.header && !this.title) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-modal__header"
    }, [[this.$slots.header && this.$slots.header({
      closeModal: this.closeModal
    }) || this.title, this.ctor('renderClose')()]]);
  },
  renderFooter: function renderFooter() {
    if (!this.$slots.footer) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-modal__footer"
    }, [this.$slots.footer({
      closeModal: this.closeModal
    })]);
  },
  renderBody: function renderBody() {
    var _this3 = this;

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-modal__body"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "ref": "scrollbar",
      "relative": true,
      "wrapClass": "n-modal__wrap"
    }, {
      "default": function _default() {
        return [_this3.$slots["default"] && _this3.$slots["default"]({
          closeModal: _this3.closeModal
        })];
      }
    })]);
  },
  renderFrame: function renderFrame() {
    if (!this.tempValue) {
      return null;
    }

    var style = {
      width: this.width,
      height: this.height
    };
    var innerHtml = [this.ctor('renderHeader')(), this.ctor('renderBody')(), this.ctor('renderFooter')()];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-modal__frame",
      "style": style
    }, [this.$slots.raw ? this.$slots.raw() : innerHtml]);
  },
  renderBackdrop: function renderBackdrop() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "ref": "backdrop",
      "class": "n-modal__backdrop"
    }, null);
  },
  render: function render() {
    if (!window.zIndex) {
      window.zIndex = 9000;
    }

    var classList = ['n-modal', 'n-modal--' + this.size, 'n-modal--' + this.type, 'n-modal--' + this.position];

    if (this.renderClose) {
      classList.push('n-closable');
    }

    if (!this.tempValue) {
      classList.push('n-hidden');
    }

    var innerHtml = null;

    if (this.tempValue) {
      innerHtml = this.ctor('renderFrame')();
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [[innerHtml, this.ctor('renderBackdrop')()]]);
  }
});

/***/ }),

/***/ "./src/notification/index.js":
/*!***********************************!*\
  !*** ./src/notification/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_notification_notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/notification/notification */ "./src/notification/src/notification/notification.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.config.globalProperties[_src_notification_notification__WEBPACK_IMPORTED_MODULE_0__["default"].alias] = window[_src_notification_notification__WEBPACK_IMPORTED_MODULE_0__["default"].alias] = _src_notification_notification__WEBPACK_IMPORTED_MODULE_0__["default"].handle;
});

/***/ }),

/***/ "./src/notification/src/notification/notification.js":
/*!***********************************************************!*\
  !*** ./src/notification/src/notification/notification.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Notify; });
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_0__);
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Notification = /*#__PURE__*/function () {
  function Notification(text) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'primary';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Notification);

    _defineProperty(this, "el", null);

    _defineProperty(this, "text", '');

    _defineProperty(this, "icon", '');

    _defineProperty(this, "type", '');

    _defineProperty(this, "options", {
      duration: 4500,
      iconPrimary: global.NanoIcons.info,
      iconSecondary: global.NanoIcons.info,
      iconSuccess: global.NanoIcons.success,
      iconWarning: global.NanoIcons.warning,
      iconDanger: global.NanoIcons.danger,
      iconInfo: global.NanoIcons.info
    });

    this.text = text;
    this.type = type;
    this.options = nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].assign(this.options, options);
    this.render();
  }

  _createClass(Notification, [{
    key: "getIcon",
    value: function getIcon() {
      return nano_js__WEBPACK_IMPORTED_MODULE_0__["Obj"].get(this.options, 'icon' + nano_js__WEBPACK_IMPORTED_MODULE_0__["Str"].ucfirst(this.type));
    }
  }, {
    key: "append",
    value: function append() {
      var _this = this;

      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
      this.el.appendTo(el);
      setTimeout(function () {
        return _this.el.addClass('n-active');
      }, 100);
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.el.get(0).remove();
      return this;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var classList = ['n-notification', 'n-notification--' + this.type];
      this.el = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].make('div', {
        classList: classList.join(' '),
        onclick: function onclick() {
          return _this2.remove();
        }
      });
      var icon = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].make('div', {
        classList: 'n-notification__icon'
      });
      icon.appendTo(this.el);
      var iconSpan = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].make('span', {
        classList: this.getIcon()
      });
      iconSpan.appendTo(icon);
      var text = nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].make('div', {
        classList: 'n-notification__text'
      });
      text.html(this.text).appendTo(this.el);
    }
  }]);

  return Notification;
}();

var Notify = /*#__PURE__*/function () {
  function Notify() {
    _classCallCheck(this, Notify);
  }

  _createClass(Notify, null, [{
    key: "handle",
    value: function handle() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var uid = Notify.create.apply(Notify, [undefined].concat(args));
      var wrapper = Notify.getWrapper(); // Append element to dom

      Notify.notifications[uid].append(wrapper); // Queue remove

      setTimeout(function () {
        return Notify.remove(uid);
      }, Notify.notifications[uid].options.duration);
      return uid;
    }
  }, {
    key: "create",
    value: function create() {
      var uid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(nano_js__WEBPACK_IMPORTED_MODULE_0__["UUID"])();

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      Notify.notifications[uid] = _construct(Notification, args);
      return uid;
    }
  }, {
    key: "remove",
    value: function remove(uid) {
      if (Notify.notifications[uid] === undefined) {
        return;
      } // Remove dom element


      Notify.notifications[uid].remove(); // Remove from list

      delete Notify.notifications[uid];
    }
  }, {
    key: "getWrapper",
    value: function getWrapper() {
      if (!window.zIndex) {
        window.zIndex = 9000;
      }

      var style = {
        'z-index': window.zIndex + 100
      };
      var classList = ['n-notification-frame', 'n-' + this.position];

      if (nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find('.n-notification-frame').empty() === true) {
        nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].make('div', {
          classList: classList.join(' ')
        }).appendTo(document.body);
      }

      nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find('.n-notification-frame').css(style);
      return nano_js__WEBPACK_IMPORTED_MODULE_0__["Dom"].find('.n-notification-frame');
    }
  }]);

  return Notify;
}();

_defineProperty(Notify, "alias", 'Notify');

_defineProperty(Notify, "position", global.NanoStyles.notifyPosition);

_defineProperty(Notify, "notifications", {});


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/paginator/index.js":
/*!********************************!*\
  !*** ./src/paginator/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_paginator_paginator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/paginator/paginator */ "./src/paginator/src/paginator/paginator.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_paginator_paginator__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_paginator_paginator__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/paginator/src/paginator/paginator.js":
/*!**************************************************!*\
  !*** ./src/paginator/src/paginator/paginator.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);




function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !Object(vue__WEBPACK_IMPORTED_MODULE_0__["isVNode"])(s);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NPaginator',
  props: {
    page: {
      "default": function _default() {
        return 1;
      },
      type: [Number]
    },
    limit: {
      "default": function _default() {
        return 100;
      },
      type: [Number]
    },
    limitOptions: {
      "default": function _default() {
        return [25, 50, 100, 500, 1000, 2500];
      }
    },
    total: {
      "default": function _default() {
        return 0;
      },
      type: [Number]
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    maxPages: {
      "default": function _default() {
        return 5;
      },
      type: [Number]
    },
    layout: {
      "default": function _default() {
        return ['limit', 'count', 'spacer', 'goto', 'pages'];
      },
      type: [Array]
    }
  },
  computed: {
    pages: function pages() {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Num"].ceil(this.total / this.tempLimit);
    },
    pageOptions: function pageOptions() {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].make(this.pages || 1);
    }
  },
  data: function data() {
    return {
      tempPage: this.page,
      tempLimit: this.limit
    };
  },
  methods: {
    forcePage: function forcePage(page) {
      if (page !== this.tempPage) {
        this.tempPage = page;
      }
    },
    updatePaginate: function updatePaginate() {
      var paginate = {
        page: this.tempPage,
        limit: this.tempLimit
      };
      this.$emit('paginate', paginate);
    },
    onPrevPage: function onPrevPage() {
      this.onPageInput(this.tempPage - 1);
    },
    onNextPage: function onNextPage() {
      this.onPageInput(this.tempPage + 1);
    },
    onFirstPage: function onFirstPage() {
      this.onPageInput(1);
    },
    onLastPage: function onLastPage() {
      this.onPageInput(this.pages);
    },
    onPageInput: function onPageInput(value) {
      this.$emit('update:page', this.tempPage = value);
      this.updatePaginate();
    },
    onLimitInput: function onLimitInput(value) {
      this.$emit('update:limit', this.tempLimit = value);

      if (this.pages < this.tempPage) {
        this.$emit('update:page', this.tempPage = 1);
      }

      this.updatePaginate();
    }
  },
  watch: {
    page: function page(value) {
      if (value !== this.tempPage) {
        this.tempPage = value;
      }
    },
    limit: function limit(value) {
      if (value !== this.tempLimit) {
        this.tempLimit = value;
      }
    }
  },
  renderLimit: function renderLimit() {
    var _this = this;

    var props = {
      modelValue: this.tempLimit,
      size: this.size,
      type: this.type,
      optionsValue: '$value.value',
      optionsLabel: '$value.label'
    };
    props.options = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.limitOptions, function (limit) {
      return {
        value: limit,
        label: _this.choice(':count items', limit)
      };
    });
    props['onUpdate:modelValue'] = this.onLimitInput;
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-paginator__limit"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelect"), props, null)]);
  },
  renderCount: function renderCount() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-paginator__count"
    }, [this.choice('No items|Total :count item|Total :count items', this.total)]);
  },
  renderSpacer: function renderSpacer() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-paginator__spacer"
    }, null);
  },
  renderGoto: function renderGoto() {
    var props = {
      modelValue: this.tempPage,
      size: this.size,
      type: this.type,
      undefinedText: '?',
      optionsValue: '$value.value',
      optionsLabel: '$value.label'
    };
    props.options = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].reduce(this.pageOptions, function (merge, index) {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].push(merge, {
        value: index,
        label: index
      });
    }, []);
    props['onUpdate:modelValue'] = this.onPageInput;
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-paginator__goto"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelect"), props, null)]);
  },
  renderPrev: function renderPrev() {
    var props = {
      type: this.type,
      square: true,
      size: this.size,
      icon: this.icons.angleLeft,
      onClick: this.onPrevPage
    };

    if (this.tempPage - 1 < 1) {
      props.disabled = true;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, null);
  },
  renderNext: function renderNext() {
    var props = {
      type: this.type,
      square: true,
      size: this.size,
      icon: this.icons.angleRight,
      onClick: this.onNextPage
    };

    if (this.tempPage + 1 > this.pages) {
      props.disabled = true;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, null);
  },
  renderFirst: function renderFirst() {
    if (this.pages < this.maxPages) {
      return null;
    }

    var props = {
      type: this.type,
      square: true,
      size: this.size,
      icon: this.icons.angleDoubleLeft,
      onClick: this.onFirstPage
    };

    if (this.tempPage - 1 < 1) {
      props.disabled = true;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, null);
  },
  renderLast: function renderLast() {
    if (this.pages < this.maxPages) {
      return null;
    }

    var props = {
      type: this.type,
      square: true,
      size: this.size,
      icon: this.icons.angleDoubleRight,
      onClick: this.onLastPage
    };

    if (this.tempPage + 1 > this.pages) {
      props.disabled = true;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, null);
  },
  renderPage: function renderPage(index) {
    var _this2 = this;

    var page = this.tempPage;
    var pages = Math.abs(this.maxPages / 2);

    if (page < pages) {
      page = pages;
    }

    var global = Array(this.pages).length;

    if (page > global - pages) {
      page = global - pages;
    }

    var current = nano_js__WEBPACK_IMPORTED_MODULE_1__["Num"]["int"](index);

    if (current < page - pages) {
      return null;
    }

    if (current > Math.max(1, page + pages)) {
      return null;
    }

    var props = {
      type: this.type,
      size: this.size
    };

    if (current === this.tempPage) {
      props.disabled = true;
    }

    props.onClick = function () {
      _this2.onPageInput(current);
    };

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, _isSlot(current) ? current : {
      "default": function _default() {
        return [current];
      }
    });
  },
  renderPages: function renderPages() {
    var _this3 = this;

    var pages = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.pageOptions, function (index) {
      return _this3.ctor('renderPage')(index);
    });
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-paginator__pages"
    }, [this.ctor('renderFirst')(), this.ctor('renderPrev')()].concat(_toConsumableArray(pages), [this.ctor('renderNext')(), this.ctor('renderLast')()]));
  },
  renderSlot: function renderSlot(view) {
    var renderFunction = this.ctor('render' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(view));

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isFunction(renderFunction)) {
      return renderFunction();
    }

    return this.$slots[view] && this.$slots[view]();
  },
  render: function render() {
    var _this4 = this;

    var className = ['n-paginator', 'n-paginator--' + this.size, 'n-paginator--' + this.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": className
    }, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.layout, function (view) {
      return _this4.ctor('renderSlot')(view);
    })]);
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
/* harmony import */ var _src_popover_option_popover_option__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/popover-option/popover-option */ "./src/popover/src/popover-option/popover-option.js");


/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_popover_popover__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_popover_popover__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_popover_option_popover_option__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_popover_option_popover_option__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/popover/src/popover-option/popover-option.js":
/*!**********************************************************!*\
  !*** ./src/popover/src/popover-option/popover-option.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NPopoverOption',
  inject: {
    NPopover: {
      "default": undefined
    }
  },
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
    focus: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    active: {
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
        return '';
      },
      type: [String]
    },
    iconPosition: {
      "default": function _default() {
        return 'before';
      },
      type: [String]
    },
    clickClose: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    }
  },
  computed: {
    tempSize: function tempSize() {
      if (this.NPopover) {
        return this.NPopover.size;
      }

      return this.size;
    }
  },
  methods: {
    onClick: function onClick(event) {
      if (this.NPopover && this.clickClose) {
        this.NPopover.close();
      }

      this.$emit('click', event);
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
    var classList = ['n-popover-option', 'n-popover-option--' + this.type, 'n-popover-option--' + this.tempSize];

    if (this.disabled) {
      classList.push('n-disabled');
    }

    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].clone(this.$attrs);

    if (!this.disabled) {
      props.onClick = this.onClick;
    }

    if (this.disabled) {
      props.disabled = true;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("a", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList,
      "href": "javascript:void(0)"
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.$slots["default"]()]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])(" "), this.ctor('renderIcon')()]);
  }
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
  inject: {
    NPopover: {
      "default": undefined
    }
  },
  props: {
    modelValue: {
      "default": function _default() {
        return null;
      }
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
    listen: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
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
        return 15;
      },
      type: [Number]
    }
  },
  computed: {
    touch: function touch() {
      return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    },
    mousedown: function mousedown() {
      return this.touch ? 'touchstart' : 'mousedown';
    },
    mousemove: function mousemove() {
      return this.touch ? 'touchmove' : 'mousemove';
    },
    mouseup: function mouseup() {
      return this.touch ? 'touchend' : 'mouseup';
    }
  },
  data: function data() {
    return {
      tempValue: false,
      clientX: 0,
      clientY: 0,
      target: null,
      prevent: false
    };
  },
  watch: {
    modelValue: function modelValue() {
      this.tempValue = this.modelValue;
    },
    tempValue: function tempValue() {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(this.refreshVisible, 50);
    }
  },
  beforeMount: function beforeMount() {
    this.tempValue = this.modelValue;
  },
  mounted: function mounted() {
    this.target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).previous().get(0);

    if (this.trigger === 'context') {
      this.target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).parent().get(0);
    }

    if (this.window) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).append(this.$el);
    }

    if (this.listen && this.trigger === 'hover') {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('mousemove', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onHover, 30), this._.uid);
    }

    if (this.listen && this.trigger === 'click') {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on(this.mousedown, nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onClick, 30), this._.uid);
    }

    if (this.listen && this.trigger === 'context') {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('contextmenu', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onContext, 30), this._.uid);
    }

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on(this.mousedown, nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onExit, 30), this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].bind('NPopover:close', this.onCloseEvent, this._.uid);
  },
  beforeUnmount: function beforeUnmount() {
    this.$el.remove();
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('mousemove', null, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('mousedown', null, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('contextmenu', null, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].unbind('NPopover:close', this._.uid);
  },
  methods: {
    active: function active() {
      return this.tempValue;
    },
    open: function open() {
      this.$emit('update:modelValue', this.tempValue = true);
    },
    close: function close() {
      var scrollClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.prevent) {
        return;
      }

      delete this.timer;

      if (!scrollClose) {
        this.$emit('close');
      }

      if (scrollClose) {
        this.$emit('scrollClose');
      }

      this.$emit('update:modelValue', this.tempValue = false);
    },
    pause: function pause() {
      this.prevent = true;
    },
    unpause: function unpause() {
      this.prevent = false;
    },
    onCloseEvent: function onCloseEvent(uid) {
      if (this.tempValue && this._.uid !== uid) {
        this.close();
      }
    },
    refreshVisible: function refreshVisible() {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).css(null);

      if (!this.tempValue) {
        return this.stopRefreshInterval();
      }

      this.startRefreshInterval();
      delete this.passedOffset;
    },
    startRefreshInterval: function startRefreshInterval() {
      var _this = this;

      this.refresh = setInterval(this.updatePosition, 1000 / this.framerate);

      var onReady = function onReady() {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(_this.$el).addClass('n-ready');

        if (_this.NPopover) {
          _this.NPopover.pause();
        }

        nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].fire('NPopover:close', _this._.uid);
      };

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(onReady, 100);
    },
    stopRefreshInterval: function stopRefreshInterval() {
      clearInterval(this.refresh);

      if (this.NPopover) {
        this.NPopover.unpause();
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).removeClass('n-ready');
    },
    isSameOffset: function isSameOffset(offset) {
      var _this2 = this;

      if (!this.passedOffset) {
        return false;
      }

      var rainbow = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(['x', 'y'], function (key) {
        return offset[key] === _this2.passedOffset[key];
      });
      return !nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(rainbow, false);
    },
    isSameSize: function isSameSize(size) {
      var _this3 = this;

      if (!this.passedSize) {
        return false;
      }

      var rainbow = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(['width', 'height'], function (key) {
        return size[key] === _this3.passedSize[key];
      });
      return !nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(rainbow, false);
    },
    getTargetHorizontal: function getTargetHorizontal(position) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
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

      var inverse = this.position;

      if (position.match(/^(top)\-/)) {
        inverse = inverse.replace(/^(top)\-/, 'bottom-');
      }

      if (position.match(/^(bottom)\-/)) {
        inverse = inverse.replace(/^(bottom)\-/, 'top-');
      }

      var broken = offset.y + windowRect.height > window.innerHeight || offset.y < 0;

      if (this.scrollClose && broken && !fallback) {
        return this.getTargetHorizontal(inverse, offset);
      }

      if (fallback && broken) {
        offset = fallback;
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
        offset.x = window.innerWidth - windowRect.width - (window.innerWidth - document.body.clientWidth);
      }

      return offset;
    },
    getTargetVertical: function getTargetVertical(position) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
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

      var inverse = this.position;

      if (position.match(/^(left)\-/)) {
        inverse = inverse.replace(/^(left)\-/, 'right-');
      }

      if (position.match(/^(right)\-/)) {
        inverse = inverse.replace(/^(right)\-/, 'left-');
      }

      var broken = offset.x + windowRect.width > window.innerWidth || offset.x < 0;

      if (this.scrollClose && broken && !fallback) {
        return this.getTargetVertical(inverse, offset);
      }

      if (fallback && broken) {
        offset = fallback;
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
        offset.x = window.innerWidth - windowRect.width - (window.innerWidth - document.body.clientWidth);
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
      var size = this.$el.getBoundingClientRect(),
          rect = this.target.getBoundingClientRect();
      var isSameSize = this.isSameSize(size);

      if (isSameSize && this.isSameOffset(rect)) {
        return;
      }

      if (!this.timer) {
        this.timer = Date.now();
      }

      this.passedSize = size;

      if (this.width) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).css({
          width: this.width + 'px'
        });
      }

      var offset = this.getTargetOffset();
      var scroll = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).scroll();
      var style = {
        'z-index': window.zIndex++,
        'top': Math.round(offset.y + scroll.top) + 'px',
        'left': Math.round(offset.x + scroll.left) + 'px'
      };

      if (this.width === -1) {
        style.width = rect.width + 'px';
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).css(style);
      var isScrollClose = this.passedOffset && isSameSize && Date.now() - this.timer > 500;

      if (this.scrollClose && isScrollClose) {
        this.close(true);
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
      var keyCode = event.which === 1 || event.which === 0;

      if (this.disabled || this.tempValue || !keyCode) {
        return;
      }

      var target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.target),
          source = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).closest(this.$el);
      var result = !!target || !!source;

      if (this.tempValue === result) {
        return;
      }

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

      if (result) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (this.tempValue === result) {
        return;
      }

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

    var classList = ['n-popover', 'n-popover--' + this.type, 'n-popover--' + this.size, 'n-popover--' + this.position];

    if (!this.tempValue) {
      classList.push('n-hidden');
    }

    var viewBody = this.modelValue;

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isNull(this.modelValue)) {
      viewBody = this.tempValue;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [viewBody && this.ctor('renderBody')()]);
  }
});

/***/ }),

/***/ "./src/radio/index.js":
/*!****************************!*\
  !*** ./src/radio/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_radio_radio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/radio/radio */ "./src/radio/src/radio/radio.js");
/* harmony import */ var _src_radio_group_radio_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/radio-group/radio-group */ "./src/radio/src/radio-group/radio-group.js");


/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_radio_radio__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_radio_radio__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_radio_group_radio_group__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_radio_group_radio_group__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/radio/src/radio-group/radio-group.js":
/*!**************************************************!*\
  !*** ./src/radio/src/radio-group/radio-group.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NRadioGroup',
  provide: function provide() {
    return {
      NRadioGroup: this
    };
  },
  props: {
    modelValue: {
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
    align: {
      "default": function _default() {
        return 'horizontal';
      },
      type: [String]
    }
  },
  data: function data() {
    return {
      tempValue: this.modelValue,
      elements: []
    };
  },
  watch: {
    modelValue: function modelValue() {
      if (this.modelValue !== this.tempValue) {
        this.tempValue = this.modelValue;
      }
    }
  },
  methods: {
    addRadio: function addRadio(radio) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.elements, radio, {
        uid: radio.uid
      });
    },
    removeRadio: function removeRadio(radio) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.elements, {
        uid: radio.uid
      });
    },
    checkRadio: function checkRadio(radio) {
      this.tempValue = radio.value;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.elements, function (radio) {
        radio.updateFromGroup();
      });
      this.$emit('update:modelValue', this.tempValue);
    },
    isChecked: function isChecked(value) {
      return this.tempValue === value;
    }
  },
  render: function render() {
    var classList = ['n-radio-group', 'n-radio-group--' + this.size, 'n-radio-group--' + this.align];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.$slots["default"]()]);
  }
});

/***/ }),

/***/ "./src/radio/src/radio/radio.js":
/*!**************************************!*\
  !*** ./src/radio/src/radio/radio.js ***!
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
  name: 'NRadio',
  model: {
    prop: 'checked'
  },
  inject: {
    NRadioGroup: {
      "default": undefined
    }
  },
  props: {
    value: {
      "default": function _default() {
        return null;
      }
    },
    checked: {
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
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    }
  },
  computed: {
    uid: function uid() {
      return this._.uid;
    }
  },
  data: function data() {
    return {
      tempChecked: this.checked
    };
  },
  watch: {
    checked: function checked() {
      if (this.checked !== this.tempChecked) {
        this.tempChecked = this.checked;
      }
    }
  },
  beforeMount: function beforeMount() {
    if (this.NRadioGroup) {
      this.tempChecked = this.NRadioGroup.isChecked(this.value);
    }
  },
  mounted: function mounted() {
    if (this.NRadioGroup) {
      this.NRadioGroup.addRadio(this);
    }
  },
  beforeUnmount: function beforeUnmount() {
    if (this.NRadioGroup) {
      this.NRadioGroup.removeRadio(this);
    }
  },
  methods: {
    check: function check() {
      if (this.NRadioGroup) {
        this.NRadioGroup.checkRadio(this);
      }

      this.$emit('update:modelValue', this.tempChecked = true);
    },
    updateFromGroup: function updateFromGroup() {
      var checked = this.NRadioGroup.isChecked(this.value);

      if (this.tempChecked === checked) {
        return;
      }

      this.$emit('update:modelValue', this.tempChecked = checked);
    }
  },
  renderRadio: function renderRadio() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-radio__radio"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, null)]);
  },
  renderLabel: function renderLabel() {
    if (!this.$slots["default"] && !this.$slots.label) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-radio__label"
    }, [this.$slots["default"]() || this.$slots.label()]);
  },
  render: function render() {
    var classList = ['n-radio', 'n-radio--' + this.size, 'n-radio--' + this.type];

    if (this.tempChecked) {
      classList.push('n-checked');
    }

    if (this.disabled) {
      classList.push('n-disabled');
    }

    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].clone(this.$attrs);

    if (!this.disabled) {
      props.onMousedown = this.check;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [this.ctor('renderRadio')(), this.ctor('renderLabel')()]);
  }
});

/***/ }),

/***/ "./src/resizer/index.js":
/*!******************************!*\
  !*** ./src/resizer/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_resizer_resizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/resizer/resizer */ "./src/resizer/src/resizer/resizer.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_resizer_resizer__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_resizer_resizer__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/resizer/src/resizer/resizer.js":
/*!********************************************!*\
  !*** ./src/resizer/src/resizer/resizer.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);



var _name$inject$props$co;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ __webpack_exports__["default"] = (_name$inject$props$co = {
  name: 'NResizer',
  inject: {
    NScrollbar: {
      "default": undefined
    }
  },
  props: {
    modelValue: {
      "default": function _default() {
        return 0;
      },
      type: [Number]
    },
    minWidth: {
      "default": function _default() {
        return 60;
      },
      type: [Number]
    },
    maxWidth: {
      "default": function _default() {
        return 0;
      },
      type: [Number]
    },
    group: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    position: {
      "default": function _default() {
        return 'right';
      },
      type: [String]
    },
    resizerWidth: {
      "default": function _default() {
        return 9;
      },
      type: [Number]
    }
  },
  computed: {
    touch: function touch() {
      return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    },
    mousedown: function mousedown() {
      return this.touch ? 'touchstart' : 'mousedown';
    },
    mousemove: function mousemove() {
      return this.touch ? 'touchmove' : 'mousemove';
    },
    mouseup: function mouseup() {
      return this.touch ? 'touchend' : 'mouseup';
    }
  },
  data: function data() {
    return {
      sizeFixed: false,
      tempValue: this.modelValue
    };
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
    }
  },
  mounted: function mounted() {
    if (!this.modelValue) {
      this.updateWidth();
    }

    if (this.NScrollbar) {
      this.bindSizechange();
    }

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].bind('NResizer:move', this.forceWidth, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(window).on('resize', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].debounce(this.onResize, 500), this._.uid);
  },
  updated: function updated() {
    this.updateWidth();
  },
  unmounted: function unmounted() {
    if (this.NScrollbar) {
      this.unbindSizechange();
    }

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].unbind('NResizer:move', this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(window).off('resize', null, this._.uid);
  },
  methods: {
    forceWidth: function forceWidth(group) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(group, this.group)) {
        return;
      }

      if (!this.tempValue || !this.group.length) {
        return;
      }

      this.sizeFixed = true;
      var style = {
        width: this.tempValue + 'px',
        flex: '0 0 auto'
      };
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).css(style);
    },
    updateWidth: function updateWidth() {
      var width = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).width();

      if (width === this.tempValue) {
        return;
      }

      this.$emit('update:modelValue', this.tempValue = width);
      this.updateHandle();
    },
    updateHandle: function updateHandle() {
      var style = {};

      if (this.position === 'left') {
        style.transform = "translateX(-".concat(this.tempValue + this.resizerWidth, "px)");
      }

      if (this.position === 'right') {
        style.transform = "translateX(".concat(this.tempValue - this.resizerWidth, "px)");
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.handle).css(style);
    },
    bindSizechange: function bindSizechange() {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.NScrollbar.$el).on('resized', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].debounce(this.updateWidth, 50), this._.uid);
    },
    unbindSizechange: function unbindSizechange() {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.NScrollbar.$el).off('resized', null, this._.uid);
    },
    onResize: function onResize() {
      if (this.NScrollbar) {
        return;
      }

      this.updateWidth();
    },
    getTouchEvent: function getTouchEvent(event) {
      if (!this.touch) {
        return event;
      }

      return event.touches[0] || event.changedTouches[0];
    },
    onLeftMousedown: function onLeftMousedown(event) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has([0, 1], event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.group.length) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].fire('NResizer:move', this.group);
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('n-move');
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).addClass('n-move');
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on(this.mouseup, nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onLeftMouseup, 60), this._.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on(this.mousemove, nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onLeftMousemove, 60), this._.uid);
    },
    onLeftMousemove: function onLeftMousemove(event) {
      this.clientX = window.innerWidth - this.getTouchEvent(event).clientX;
      var offsetX = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).offset('right');
      var scrollX = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).scroll('right');
      var targetWidth = this.clientX + scrollX - offsetX - this.resizerWidth / 2;

      if (this.minWidth) {
        targetWidth = Math.max(targetWidth, this.minWidth - this.resizerWidth);
      }

      if (this.maxWidth) {
        targetWidth = Math.min(targetWidth, this.maxWidth - this.resizerWidth);
      }

      var style = {
        transform: "translateX(-".concat(targetWidth, "px)")
      };
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.handle).css(style);
    },
    onLeftMouseup: function onLeftMouseup(event) {
      event.preventDefault();
      event.stopPropagation();
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off(this.mouseup, null, this._.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off(this.mousemove, null, this._.uid);

      if (!this.clientX) {
        return;
      }

      var offsetX = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).offset('right');
      var scrollX = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).scroll('right');
      var targetWidth = this.clientX + scrollX - offsetX;

      if (this.minWidth) {
        targetWidth = Math.max(targetWidth, this.minWidth);
      }

      if (this.maxWidth) {
        targetWidth = Math.min(targetWidth, this.maxWidth);
      }

      this.tempValue = Math.round(targetWidth);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).removeClass('n-move');
      var style = {
        transform: "translateX(-".concat(targetWidth - this.resizerWidth, "px)")
      };
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.handle).css(style);
      delete this.clientX;

      if (this.group.length) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].fire('NResizer:moved', this.group);
      }

      this.$emit('update:modelValue', this.tempValue);
    },
    onRightMousedown: function onRightMousedown(event) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has([0, 1], event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.group.length) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].fire('NResizer:move', this.group);
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('n-move');
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).addClass('n-move');
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on(this.mouseup, nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onRightMouseup, 60), this._.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on(this.mousemove, nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onRightMousemove, 60), this._.uid);
    },
    onRightMousemove: function onRightMousemove(event) {
      this.clientX = this.getTouchEvent(event).clientX;
      var offsetX = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).offset('left');
      var scrollX = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).scroll('left');
      var targetWidth = this.clientX + scrollX - offsetX - this.resizerWidth / 2;

      if (this.minWidth) {
        targetWidth = Math.max(targetWidth, this.minWidth - this.resizerWidth);
      }

      if (this.maxWidth) {
        targetWidth = Math.min(targetWidth, this.maxWidth - this.resizerWidth);
      }

      var style = {
        transform: "translateX(".concat(targetWidth, "px)")
      };
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.handle).css(style);
    },
    onRightMouseup: function onRightMouseup(event) {
      event.preventDefault();
      event.stopPropagation();
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off(this.mousemove, null, this._.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off(this.mouseup, null, this._.uid);

      if (!this.clientX) {
        return;
      }

      var offsetX = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).offset('left');
      var scrollX = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).scroll('left');
      var targetWidth = this.clientX + scrollX - offsetX;

      if (this.minWidth) {
        targetWidth = Math.max(targetWidth, this.minWidth);
      }

      if (this.maxWidth) {
        targetWidth = Math.min(targetWidth, this.maxWidth);
      }

      this.tempValue = Math.round(targetWidth);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).removeClass('n-move');
      var style = {
        transform: "translateX(".concat(targetWidth - this.resizerWidth, "px)")
      };
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.handle).css(style);
      var frameStyle = {
        width: this.tempValue + 'px',
        flex: '0 0 auto'
      };
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).css(frameStyle);
      delete this.clientX;

      if (this.group.length) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].fire('NResizer:moved', this.group);
      }

      this.$emit('update:modelValue', this.tempValue);
    }
  }
}, _defineProperty(_name$inject$props$co, "watch", {
  modelValue: function modelValue(value) {
    if (value !== this.tempValue) {
      this.tempValue = value;
    }
  }
}), _defineProperty(_name$inject$props$co, "renderHandle", function renderHandle() {
  if (this.disabled) {
    return null;
  }

  var classList = ['n-resizer__handle'];
  var props = {};

  if (this.position === 'right') {
    props['on' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(this.mousedown)] = this.onRightMousedown;
  }

  if (this.position === 'left') {
    props['on' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(this.mousedown)] = this.onLeftMousedown;
  }

  return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
    "ref": "handle",
    "class": classList
  }, props), null);
}), _defineProperty(_name$inject$props$co, "render", function render() {
  var classList = ['n-resizer', 'n-resizer--' + this.position];
  var style = {};

  if (this.minWidth) {
    style['min-width'] = this.minWidth + 'px';
  }

  if (this.maxWidth) {
    style['max-width'] = this.maxWidth + 'px';
  }

  return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
    "class": classList,
    "style": style
  }, [[this.$slots["default"](), this.ctor('renderHandle')()]]);
}), _name$inject$props$co);

/***/ }),

/***/ "./src/scrollbar/index.js":
/*!********************************!*\
  !*** ./src/scrollbar/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_scrollbar_scrollbar_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/scrollbar/scrollbar.next */ "./src/scrollbar/src/scrollbar/scrollbar.next.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_scrollbar_scrollbar_next__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_scrollbar_scrollbar_next__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/scrollbar/src/scrollbar/scrollbar.next.js":
/*!*******************************************************!*\
  !*** ./src/scrollbar/src/scrollbar/scrollbar.next.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);



function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NScrollbar',
  provide: function provide() {
    return {
      NScrollbar: this
    };
  },
  props: {
    options: {
      "default": function _default() {
        return {};
      },
      type: [Object]
    },
    relative: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    fixture: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    overflowY: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    overflowX: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    offsetY: {
      "default": function _default() {
        return 10;
      },
      type: [Number]
    },
    offsetX: {
      "default": function _default() {
        return 10;
      },
      type: [Number]
    },
    framerate: {
      "default": function _default() {
        return 30;
      },
      type: [Number]
    },
    wrapClass: {
      "default": function _default() {
        return 'n-scrollbar__wrap';
      }
    }
  },
  computed: {
    touch: function touch() {
      return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    },
    mousedown: function mousedown() {
      return this.touch ? 'touchstart' : 'mousedown';
    },
    mousemove: function mousemove() {
      return this.touch ? 'touchmove' : 'mousemove';
    },
    mouseup: function mouseup() {
      return this.touch ? 'touchend' : 'mouseup';
    }
  },
  data: function data() {
    return {
      vbar: 0,
      hbar: 0
    };
  },
  mounted: function mounted() {
    this.bindAdaptHeight();
    this.bindAdaptWidth(); // this.bindOptiscroll();

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].bind('NScrollbar:resize', this.onResize, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].bind('NResizer:moved', this.onUpdate, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(window).on('resize', this.onResize, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).on('sizechange', this.onSizechange, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).on('scroll', this.onScroll, this._.uid);
  },
  updated: function updated() {
    if (this.passedHeight || this.passedWidth) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('n-ready');
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindAdaptHeight();
    this.unbindAdaptWidth(); // this.unbindOptiscroll();

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].unbind('NScrollbar:resize', this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].unbind('NResizer:moved', this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(window).off('resize', null, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).off('sizechange', null, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).off('scroll', null, this._.uid);
  },
  methods: {
    scrollTo: function scrollTo() {
      var _this = this;

      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(function () {
        return _this.onScrollTo(x, y);
      }, delay);
    },
    onScrollTo: function onScrollTo() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.$refs.content.scrollTop = y;
      this.$refs.content.scrollLeft = x;
    },
    scrollIntoView: function scrollIntoView(selector) {
      var _this2 = this;

      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(function () {
        return _this2.onScrollIntoView(selector);
      }, 0);
    },
    onScrollIntoView: function onScrollIntoView(selector) {
      var $el = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).find(selector);
      var scrollTop = this.$refs.content.scrollTop;
      var offsetTop = $el.offsetTop(this.$el);

      if (offsetTop < scrollTop) {
        this.$refs.content.scrollTop = offsetTop;
      }

      if (offsetTop + $el.height() >= scrollTop + this.outerHeight) {
        this.$refs.content.scrollTop = offsetTop - this.outerHeight + $el.height();
      }

      var scrollLeft = this.$refs.content.scrollLeft;
      var offsetLeft = $el.offsetLeft(this.$el);

      if (offsetLeft < scrollLeft) {
        this.$refs.content.scrollLeft = offsetLeft;
      }

      if (offsetLeft + $el.width() >= scrollLeft + this.outerWidth) {
        this.$refs.content.scrollLeft = offsetLeft - this.outerWidth + $el.width();
      }
    },
    adaptScrollHeight: function adaptScrollHeight() {
      var offsetHeight = this.$refs.content.clientHeight - this.$refs.content.offsetHeight;
      var offsetWidth = this.$refs.content.clientWidth - this.$refs.content.offsetWidth;
      var outerHeight = this.$refs.content.clientHeight || 0;

      if (offsetHeight === 0 && this.overflowX) {
        outerHeight -= 15;
      }

      var innerHeight = this.$refs.content.scrollHeight || 0;

      if (offsetHeight === 0 && this.overflowX) {
        innerHeight -= 15;
      }

      var isSameOld = outerHeight === this.outerHeight && innerHeight === this.innerHeight;

      if (isSameOld) {
        return;
      }

      this.outerHeight = outerHeight;
      this.innerHeight = innerHeight;
      var height = outerHeight / innerHeight * outerHeight;
      var barHeight = Math.max(height, 50);
      var maxHeight = Math.ceil(outerHeight / innerHeight * (innerHeight - outerHeight));
      this.heightRatio = (maxHeight - (barHeight - height) - this.offsetY) / maxHeight;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.vbar).css({
        height: (this.barHeight = Math.ceil(barHeight)) + 'px'
      });

      if (offsetWidth !== 0 && this.overflowY) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('has-native-vbar');
      }

      if (outerHeight && outerHeight < innerHeight) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('has-vtrack');
      }

      if (!outerHeight || outerHeight >= innerHeight) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).removeClass('has-vtrack');
      }

      this.adaptScrollPosition();
    },
    adaptScrollWidth: function adaptScrollWidth() {
      var offsetWidth = this.$refs.content.clientWidth - this.$refs.content.offsetWidth;
      var offsetHeight = this.$refs.content.clientHeight - this.$refs.content.offsetHeight;
      var outerWidth = this.$refs.content.clientWidth || 0;

      if (offsetWidth === 0 && this.overflowY) {
        outerWidth -= 15;
      }

      var innerWidth = this.$refs.content.scrollWidth || 0;

      if (offsetWidth === 0 && this.overflowY) {
        innerWidth -= 15;
      }

      var isSameOld = outerWidth === this.outerWidth && innerWidth === this.innerWidth;

      if (isSameOld) {
        return;
      }

      this.outerWidth = outerWidth;
      this.innerWidth = innerWidth;
      var width = outerWidth / innerWidth * outerWidth;
      var barWidth = Math.max(width, 50);
      var maxWidth = Math.ceil(outerWidth / innerWidth * (innerWidth - outerWidth));
      this.widthRatio = (maxWidth - (barWidth - width) - this.offsetX) / maxWidth;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.hbar).css({
        width: (this.barWidth = Math.ceil(barWidth)) + 'px'
      });

      if (offsetHeight && this.overflowX) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('has-native-hbar');
      }

      if (outerWidth && outerWidth < innerWidth) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('has-htrack');
      }

      if (!outerWidth || outerWidth >= innerWidth) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).removeClass('has-htrack');
      }

      this.adaptScrollPosition();
    },
    adaptScrollPosition: function adaptScrollPosition() {
      var scroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!scroll.top) {
        scroll.top = this.$refs.content.scrollTop;
      }

      if (!scroll.left) {
        scroll.left = this.$refs.content.scrollLeft;
      }

      this.vbar = Math.ceil(this.outerHeight / this.innerHeight * scroll.top * this.heightRatio) || 0;
      this.hbar = Math.ceil(this.outerWidth / this.innerWidth * scroll.left * this.widthRatio) || 0;
    },
    adaptHeight: function adaptHeight() {
      var height = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.content).child().height();
      var window = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).innerHeight();

      if (this.overflowY) {
        this.adaptScrollHeight();
      }

      if (height === this.passedHeight) {
        return;
      }

      var offsetHeight = this.$refs.content.clientHeight - this.$refs.content.offsetHeight;

      if (window) {
        this.passedHeight = height;
      }

      if (offsetHeight === 0 && this.touch) {
        height -= 15;
      }

      var style = {
        height: height + 1 + 'px'
      };

      if (!this.relative) {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(this.onSizechange, 100);
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.spacer).child().css(style);
    },
    bindAdaptHeight: function bindAdaptHeight() {
      this.refreshHeight = setInterval(this.adaptHeight, 1000 / this.framerate);
    },
    unbindAdaptHeight: function unbindAdaptHeight() {
      clearInterval(this.refreshHeight);
    },
    adaptWidth: function adaptWidth() {
      if (this.resizeTimer) {
        return;
      }

      var width = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.content).child().width();
      var window = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).innerWidth();

      if (width === this.passedWidth) {
        return;
      }

      var offsetWidth = this.$refs.content.clientWidth - this.$refs.content.offsetWidth;

      if (this.overflowX) {
        this.adaptScrollWidth();
      }

      if (window) {
        this.passedWidth = width;
      }

      if (offsetWidth === 0 && this.touch) {
        width -= 15;
      }

      var style = {
        width: width + 'px'
      };

      if (this.fixture) {
        this.onUpdate();
      }

      if (!this.relative) {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(this.onSizechange, 100);
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.spacer).child().css(style);
    },
    bindAdaptWidth: function bindAdaptWidth() {
      this.refreshWidth = setInterval(this.adaptWidth, 1000 / this.framerate);
    },
    unbindAdaptWidth: function unbindAdaptWidth() {
      clearInterval(this.refreshWidth);
    },
    onScroll: function onScroll(event) {
      var scroll = {
        top: this.$refs.content.scrollTop,
        left: this.$refs.content.scrollLeft
      };
      this.$emit('scrollupdate', scroll.top, scroll.left);
      this.adaptScrollPosition(scroll);
    },
    onSizechange: function onSizechange(event) {
      var height = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).height();

      if (this.passedHeight || this.passedWidth) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('is-ready');
      }

      this.$emit('sizechange', height);
    },
    onResize: function onResize(event) {
      if (!this.fixture) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.content).child().css(null);
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(this.onUpdate, 500);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).fire('resized');
    },
    onUpdate: function onUpdate() {
      if (!this.fixture) {
        return;
      }

      var $inner = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.content).child();
      var height = $inner.actual(function () {
        return $inner.scrollHeight();
      });

      if (height !== this.passedHeight) {
        $inner.css({
          height: height + 'px'
        });
      }

      var width = $inner.actual(function () {
        return $inner.scrollWidth();
      });

      if (width !== this.passedWidth) {
        $inner.css({
          width: width + 'px'
        });
      }

      delete this.resizeTimer;
    },
    getTouchEvent: function getTouchEvent(event) {
      if (!this.touch) {
        return event;
      }

      return event.touches[0] || event.changedTouches[0];
    },
    onVbarMousedown: function onVbarMousedown(event) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has([0, 1], event.which)) {
        return;
      }

      event.stopPropagation();
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on(this.mousemove, this.onVbarMousemove, this._.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on(this.mouseup, this.onVbarMouseup, this._.uid);
      this.scrollTop = this.$refs.content.scrollTop;
      this.clientY = this.getTouchEvent(event).clientY;
    },
    onVbarMousemove: function onVbarMousemove(event) {
      var clientY = this.getTouchEvent(event).clientY;
      var top = this.outerHeight / this.innerHeight * this.scrollTop * this.heightRatio;
      var offset = clientY - this.clientY + top;
      var height = this.outerHeight - this.barHeight - this.offsetY;
      this.$refs.content.scrollTop = offset / height * (this.innerHeight - this.outerHeight);
    },
    onVbarMouseup: function onVbarMouseup(event) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off(this.mousemove, null, this._.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off(this.mouseup, null, this._.uid);
    },
    onHbarMousedown: function onHbarMousedown(event) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has([0, 1], event.which)) {
        return;
      }

      event.stopPropagation();
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on(this.mousemove, this.onHbarMousemove, this._.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on(this.mouseup, this.onHbarMouseup, this._.uid);
      this.scrollLeft = this.$refs.content.scrollLeft;
      this.clientX = event.clientX;
    },
    onHbarMousemove: function onHbarMousemove(event) {
      var top = this.outerWidth / this.innerWidth * this.scrollLeft * this.widthRatio;
      var offset = event.clientX - this.clientX + top;
      var width = this.outerWidth - this.barWidth - this.offsetX;
      this.$refs.content.scrollLeft = offset / width * (this.innerWidth - this.outerWidth);
    },
    onHbarMouseup: function onHbarMouseup(event) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off(this.mousemove, null, this._.uid);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off(this.mouseup, null, this._.uid);
    }
  },
  render: function render() {
    var classList = ['n-scrollbar'];

    if (this.touch) {
      classList.push('n-scrollbar--touch');
    }

    if (this.overflowY) {
      classList.push('n-overflow-y');
    }

    if (this.overflowX) {
      classList.push('n-overflow-x');
    }

    var vbarProps = _defineProperty({
      style: {
        transform: "translateY(".concat(this.vbar, "px)")
      }
    }, 'on' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(this.mousedown), this.onVbarMousedown);

    var hbarProps = _defineProperty({
      style: {
        transform: "translateX(".concat(this.hbar, "px)")
      }
    }, 'on' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(this.mousedown), this.onHbarMousedown);

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(this.$attrs, ['class'])), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-scrollbar-content",
      "ref": "content"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": this.wrapClass
    }, [this.$slots["default"] && this.$slots["default"]()])]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-scrollbar-spacer",
      "ref": "spacer"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": this.wrapClass
    }, null)]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "hbar",
      "class": "n-scrollbar-h"
    }, hbarProps), null), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "vbar",
      "class": "n-scrollbar-v"
    }, vbarProps), null)]);
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
  inheritAttrs: false,
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
    label: {
      "default": function _default() {
        return null;
      }
    },
    valueProp: {
      "default": function _default() {
        return null;
      }
    },
    labelProp: {
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
    tempValue: function tempValue() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.valueProp)) {
        return this.value;
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.value, this.valueProp);
    },
    tempLabel: function tempLabel() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.labelProp)) {
        return this.label;
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.value, this.labelProp);
    }
  },
  mounted: function mounted() {
    this.NSelect.addOption(this);
  },
  beforeUnmount: function beforeUnmount() {
    this.NSelect.removeOption(this);
  },
  methods: {
    toggleItem: function toggleItem(event) {
      event.preventDefault();

      if (event.which !== 1) {
        return;
      }

      if (this.disabled) {
        return;
      }

      this.NSelect.toggleOption(this.tempValue, event);
    }
  },
  renderOption: function renderOption(index) {
    var _this = this;

    var classList = [];
    var isMultipleActive = this.NSelect.multiple && nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(this.NSelect.tempValue, this.tempValue);

    if (isMultipleActive) {
      classList.push('n-active');
    }

    var isSingleActive = !this.NSelect.multiple && this.NSelect.tempValue === this.tempValue;

    if (isSingleActive) {
      classList.push('n-active');
    }

    if (this.NSelect.index === nano_js__WEBPACK_IMPORTED_MODULE_1__["Num"]["int"](index)) {
      classList.push('n-focus');
    }

    var props = {
      'disabled': this.disabled,
      'onMousedown': this.toggleItem,
      'type': this.NSelect.type,
      'clickClose': !this.NSelect.multiple
    };

    if (isSingleActive || isMultipleActive) {
      props.icon = this.icons.checked;
    } // Required for scrolldown


    props['data-option'] = this._.uid;
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopoverOption"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), {
      "default": function _default() {
        return [_this.$slots["default"] && _this.$slots["default"]() || _this.tempLabel];
      }
    });
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
    clearValue: {
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
    multiple: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    collapse: {
      "default": function _default() {
        return true;
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
        return 'No items';
      },
      type: [String]
    },
    undefinedText: {
      "default": function _default() {
        return 'Undefined item';
      },
      type: [String]
    },
    collapseText: {
      "default": function _default() {
        return '+:count item|+:count items';
      },
      type: [String]
    },
    allowCreate: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    options: {
      "default": function _default() {
        return [];
      },
      type: [Array, Object]
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
      tempValue: this.modelValue,
      tempClear: this.clearValue,
      focus: false,
      search: '',
      index: -1,
      elements: [],
      searched: []
    };
  },
  provide: function provide() {
    return {
      NSelect: this
    };
  },
  watch: {
    modelValue: function modelValue() {
      this.tempValue = this.modelValue;
    },
    search: function search() {
      this.searchOptions();
    },
    focus: function focus() {
      this.$nextTick(this.scrollToClosest);
    }
  },
  methods: {
    clear: function clear() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.focusInput();
      this.$emit('update:modelValue', this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].clone(this.tempClear));
    },
    addOption: function addOption(option) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.elements, option, {
        tempValue: option.tempValue
      });
    },
    removeOption: function removeOption(option) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.elements, {
        tempValue: option.tempValue
      });
    },
    resetInput: function resetInput() {
      this.index = -1;
      this.search = '';
    },
    focusInput: function focusInput() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (event) {
        event.preventDefault();
      }

      this.$refs.input.focus();
    },
    onFocusInput: function onFocusInput() {
      if (!this.focus) {
        this.$refs.popover.open();
      }

      clearInterval(this.refresh);
    },
    onInputInput: function onInputInput(event) {
      this.search = event.target.value;
    },
    onKeydownInput: function onKeydownInput(event) {
      if (!this.focus) {
        return this.onFocusInput();
      }

      if (event.which === 13) {
        this.createOrToggle();
      }

      if (event.which === 38) {
        this.selectPrev();
      }

      if (event.which === 40) {
        this.selectNext();
      }
    },
    searchOptions: function searchOptions() {
      this.index = -1;

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.search)) {
        return this.searched = this.elements;
      }

      var searchRegex = new RegExp(this.search, 'i');
      var searched = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.elements, function (option) {
        return option.label.match(searchRegex);
      });
      this.searched = searched;
    },
    toggleOption: function toggleOption(value) {
      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(value)) {
        return;
      }

      if (event) {
        event.preventDefault();
      }

      var tempValue = this.tempValue;

      if (this.multiple) {
        this.focusInput();
      }

      if (!this.multiple) {
        tempValue = value;
      }

      if (this.multiple) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].toggle(tempValue, value);
      }

      if (!this.multiple) {
        this.$refs.popover.close();
      }

      if (this.tempValue === tempValue) {
        return;
      }

      this.$emit('update:modelValue', this.tempValue = tempValue);
    },
    getOptionLabel: function getOptionLabel(value) {
      var option = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(this.elements, {
        tempValue: value
      });

      if (!option && this.allowCreate) {
        return value;
      }

      if (!option && !this.allowCreate) {
        return this.trans(this.undefinedText);
      }

      return option.tempLabel;
    },
    selectPrev: function selectPrev() {
      var newIndex = this.index - 1;

      if (newIndex < 0) {
        newIndex = this.searched.length - 1;
      }

      this.index = newIndex;
      this.scrollToCurrent();
    },
    selectNext: function selectNext() {
      var newIndex = this.index + 1;

      if (newIndex > this.searched.length - 1) {
        newIndex = 0;
      }

      this.index = newIndex;
      this.scrollToCurrent();
    },
    createOrToggle: function createOrToggle() {
      if (this.allowCreate && this.search) {
        return this.createOption();
      }

      var selected = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].get(this.searched, this.index);

      if (this.searched.length === 1) {
        selected = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].first(this.searched);
      }

      if (!selected || selected.disabled) {
        return;
      }

      this.toggleOption(selected.tempValue);
    },
    createOption: function createOption() {
      this.toggleOption(this.search);
      this.search = '';
    },
    scrollToCurrent: function scrollToCurrent() {
      if (!this.focus) {
        return;
      }

      var selected = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].get(this.searched, this.index);

      if (!selected || !this.$refs.scrollbar) {
        return;
      }

      this.$refs.scrollbar.scrollIntoView("[data-option=\"".concat(selected._.uid, "\"]"));
    },
    scrollToClosest: function scrollToClosest() {
      if (!this.focus) {
        return;
      }

      var value = this.tempValue;

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isArray(this.tempValue)) {
        value = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].first(this.tempValue);
      }

      if (!value) {
        return;
      }

      var target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(this.elements, {
        tempValue: value
      });

      if (!target) {
        return;
      }

      this.$refs.scrollbar.scrollIntoView("[data-option=\"".concat(target._.uid, "\"]"));
    }
  },
  created: function created() {
    if (this.multiple && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isArray(this.tempValue)) {
      this.tempValue = [];
    }

    if (this.multiple && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isArray(this.clearValue)) {
      this.tempClear = [];
    }
  },
  beforeMount: function beforeMount() {
    this.searchOptions();
  },
  renderLabelClear: function renderLabelClear() {
    if (!this.clearable || nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tempValue)) {
      return null;
    }

    var props = {};

    if (!this.disabled) {
      props.onMousedown = this.clear;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-select__clear"
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.times
    }, null)]);
  },
  renderLabelAngle: function renderLabelAngle() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__angle"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.angleDown
    }, null)]);
  },
  renderLabelItem: function renderLabelItem(value) {
    var _this = this;

    var classList = ['n-select__item'];
    var props = {
      "class": this.icons.times
    };

    if (!this.disabled) {
      props.onMousedown = function (event) {
        return _this.toggleOption(value, event);
      };
    }

    var labelHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.getOptionLabel(value)]);

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [[labelHtml, Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", props, null)]]);
  },
  renderLabelCollapse: function renderLabelCollapse() {
    var first = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].first(this.tempValue);

    if (!first) {
      return null;
    }

    var firstHtml = this.ctor('renderLabelItem')(first);

    if (this.tempValue.length === 1) {
      return firstHtml;
    }

    var count = this.tempValue.length - 1;

    var collapseHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__item"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.choice(this.collapseText, count)])]);

    return [firstHtml, collapseHtml];
  },
  renderLabelItems: function renderLabelItems() {
    var _this2 = this;

    if (this.collapse) {
      return this.ctor('renderLabelCollapse')();
    }

    return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.tempValue, function (value) {
      return _this2.ctor('renderLabelItem')(value);
    });
  },
  renderMultiple: function renderMultiple() {
    var isEmptyValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tempValue) && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isNumber(this.tempValue);
    var props = {
      value: this.search,
      placeholder: this.placeholder,
      disabled: this.disabled,
      onFocus: this.onFocusInput,
      onInput: this.onInputInput,
      onKeydown: this.onKeydownInput
    };

    if (!this.focus) {
      props.value = null;
    }

    if (!isEmptyValue) {
      props.placeholder = null;
    }

    var inputHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__input"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("input", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "input"
    }, props), null)]);

    return [this.ctor('renderLabelClear')(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__items"
    }, [[this.ctor('renderLabelItems')(), inputHtml]]), this.ctor('renderLabelAngle')()];
  },
  renderSingle: function renderSingle() {
    var isEmptyValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tempValue) && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isNumber(this.tempValue);
    var modelLabel = this.getOptionLabel(this.tempValue);

    if (isEmptyValue) {
      modelLabel = null;
    }

    var props = {
      value: this.search,
      placeholder: this.placeholder,
      disabled: this.disabled,
      onFocus: this.onFocusInput,
      onInput: this.onInputInput,
      onKeydown: this.onKeydownInput
    };

    if (!this.focus) {
      props.value = modelLabel;
    }

    if (!isEmptyValue) {
      props.placeholder = modelLabel;
    }

    return [this.ctor('renderLabelClear')(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__input"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("input", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "input"
    }, props), null)]), this.ctor('renderLabelAngle')()];
  },
  renderDisplay: function renderDisplay() {
    var classList = ['n-select__display'];

    if (this.multiple) {
      classList.push('n-multiple');
    }

    var displayHtml = this.ctor('renderSingle');

    if (this.multiple) {
      displayHtml = this.ctor('renderMultiple');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [displayHtml()]);
  },
  renderItems: function renderItems() {
    var _slot, _slot2;

    var emptyHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__empty"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NEmptyIcon"), null, _isSlot(_slot = this.trans(this.emptyText)) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    })]);

    if (!this.searched.length) {
      return emptyHtml;
    }

    var options = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].each(this.searched, function (option, index) {
      return option.ctor('renderOption')(index);
    });
    var props = {
      relative: true,
      size: this.size
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "scrollbar",
      "class": "n-select__body"
    }, props), _isSlot(_slot2 = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].values(options)) ? _slot2 : {
      "default": function _default() {
        return [_slot2];
      }
    });
  },
  renderPopover: function renderPopover() {
    var _this3 = this;

    var props = {
      trigger: 'click',
      width: -1,
      listen: true,
      size: this.size,
      scrollClose: true,
      disabled: this.disabled,
      onClose: this.resetInput
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "popover",
      "modelValue": _this3.focus,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this3.focus = $event;
      }
    }, props), {
      raw: this.ctor('renderItems')
    });
  },
  renderOptions: function renderOptions() {
    var _this4 = this;

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.options)) {
      return this.$slots["default"]();
    }

    var optionRender = function optionRender($value, $index) {
      var props = {
        label: nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get({
          $value: $value,
          $index: $index
        }, _this4.optionsLabel, null),
        value: nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get({
          $value: $value,
          $index: $index
        }, _this4.optionsValue, null)
      };
      return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelectOption"), props, null);
    };

    return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].values(nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].each(this.options, optionRender));
  },
  render: function render() {
    var classList = ['n-select', 'n-select--' + this.type, 'n-select--' + this.size];
    var isEmptyValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tempValue) && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isNumber(this.tempValue);

    if (isEmptyValue) {
      classList.push('n-empty');
    }

    if (this.clearable) {
      classList.push('n-clearable');
    }

    if (this.focus) {
      classList.push('n-focus');
    }

    if (this.disabled) {
      classList.push('n-disabled');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList,
      "onClick": this.focusInput
    }, [this.ctor('renderDisplay')(), this.ctor('renderPopover')(), this.ctor('renderOptions')()]);
  }
});

/***/ }),

/***/ "./src/switch/index.js":
/*!*****************************!*\
  !*** ./src/switch/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_switch_switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/switch/switch */ "./src/switch/src/switch/switch.js");


/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_switch_switch__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_switch_switch__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/switch/src/switch/switch.js":
/*!*****************************************!*\
  !*** ./src/switch/src/switch/switch.js ***!
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
  name: 'NSwitch',
  props: {
    modelValue: {
      "default": function _default() {
        return false;
      }
    },
    onValue: {
      "default": function _default() {
        return true;
      }
    },
    offValue: {
      "default": function _default() {
        return false;
      }
    },
    onType: {
      "default": function _default() {
        return 'primary';
      }
    },
    offType: {
      "default": function _default() {
        return 'default';
      }
    },
    size: {
      "default": function _default() {
        return 'md';
      }
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    }
  },
  data: function data() {
    return {
      tempValue: this.modelValue
    };
  },
  methods: {
    eventClick: function eventClick() {
      var tempValue = this.onValue;

      if (this.tempValue === this.onValue) {
        tempValue = this.offValue;
      }

      this.$emit('input', this.tempValue = tempValue);
    }
  },
  watch: {
    modelValue: function modelValue() {
      if (this.modelValue !== this.tempValue) {
        this.tempValue = this.modelValue;
      }
    }
  },
  renderSwitch: function renderSwitch() {
    var classList = ['n-switch__switch'];
    var props = {};

    if (!this.disabled) {
      props.onMousedown = this.eventClick;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, null)]);
  },
  renderLabel: function renderLabel() {
    if (!this.$slots["default"]) {
      return null;
    }

    var classList = ['n-switch__label'];
    var props = {};

    if (!this.disabled) {
      props.onMousedown = this.eventClick;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [this.$slots["default"]()]);
  },
  render: function render() {
    var classList = ['n-switch', 'n-switch--' + this.size];

    if (this.tempValue === this.onValue) {
      classList.push('n-switch--' + this.onType);
    }

    if (this.tempValue === this.offValue) {
      classList.push('n-switch--' + this.offType);
    }

    if (this.tempValue === this.onValue) {
      classList.push('n-on');
    }

    if (this.tempValue === this.offValue) {
      classList.push('n-off');
    }

    if (this.disabled) {
      classList.push('n-disabled');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderSwitch')(), this.ctor('renderLabel')()]);
  }
});

/***/ }),

/***/ "./src/table/index.js":
/*!****************************!*\
  !*** ./src/table/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_table_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/table/table */ "./src/table/src/table/table.js");
/* harmony import */ var _src_table_column_table_column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/table-column/table-column */ "./src/table/src/table-column/table-column.js");
/* harmony import */ var _src_table_cell_types_table_cell_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/table-cell/types/table-cell-string */ "./src/table/src/table-cell/types/table-cell-string.js");
/* harmony import */ var _src_table_cell_types_table_cell_boolean__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/table-cell/types/table-cell-boolean */ "./src/table/src/table-cell/types/table-cell-boolean.js");
/* harmony import */ var _src_table_cell_types_table_cell_datetime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/table-cell/types/table-cell-datetime */ "./src/table/src/table-cell/types/table-cell-datetime.js");
/* harmony import */ var _src_table_cell_types_table_cell_option__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/table-cell/types/table-cell-option */ "./src/table/src/table-cell/types/table-cell-option.js");
/* harmony import */ var _src_table_cell_types_table_cell_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/table-cell/types/table-cell-image */ "./src/table/src/table-cell/types/table-cell-image.js");
/* harmony import */ var _src_table_cell_types_table_cell_matrix__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/table-cell/types/table-cell-matrix */ "./src/table/src/table-cell/types/table-cell-matrix.js");
/* harmony import */ var _src_table_filter_types_table_filter_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/table-filter/types/table-filter-string */ "./src/table/src/table-filter/types/table-filter-string.js");
/* harmony import */ var _src_table_filter_types_table_filter_boolean__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/table-filter/types/table-filter-boolean */ "./src/table/src/table-filter/types/table-filter-boolean.js");
/* harmony import */ var _src_table_filter_types_table_filter_datetime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./src/table-filter/types/table-filter-datetime */ "./src/table/src/table-filter/types/table-filter-datetime.js");
/* harmony import */ var _src_table_filter_types_table_filter_option__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./src/table-filter/types/table-filter-option */ "./src/table/src/table-filter/types/table-filter-option.js");












/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_table_table__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_table_table__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_table_column_table_column__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_table_column_table_column__WEBPACK_IMPORTED_MODULE_1__["default"]);
  App.component(_src_table_cell_types_table_cell_string__WEBPACK_IMPORTED_MODULE_2__["default"].name, _src_table_cell_types_table_cell_string__WEBPACK_IMPORTED_MODULE_2__["default"]);
  App.component(_src_table_cell_types_table_cell_boolean__WEBPACK_IMPORTED_MODULE_3__["default"].name, _src_table_cell_types_table_cell_boolean__WEBPACK_IMPORTED_MODULE_3__["default"]);
  App.component(_src_table_cell_types_table_cell_datetime__WEBPACK_IMPORTED_MODULE_4__["default"].name, _src_table_cell_types_table_cell_datetime__WEBPACK_IMPORTED_MODULE_4__["default"]);
  App.component(_src_table_cell_types_table_cell_option__WEBPACK_IMPORTED_MODULE_5__["default"].name, _src_table_cell_types_table_cell_option__WEBPACK_IMPORTED_MODULE_5__["default"]);
  App.component(_src_table_cell_types_table_cell_image__WEBPACK_IMPORTED_MODULE_6__["default"].name, _src_table_cell_types_table_cell_image__WEBPACK_IMPORTED_MODULE_6__["default"]);
  App.component(_src_table_cell_types_table_cell_matrix__WEBPACK_IMPORTED_MODULE_7__["default"].name, _src_table_cell_types_table_cell_matrix__WEBPACK_IMPORTED_MODULE_7__["default"]);
  App.component(_src_table_filter_types_table_filter_string__WEBPACK_IMPORTED_MODULE_8__["default"].name, _src_table_filter_types_table_filter_string__WEBPACK_IMPORTED_MODULE_8__["default"]);
  App.component(_src_table_filter_types_table_filter_boolean__WEBPACK_IMPORTED_MODULE_9__["default"].name, _src_table_filter_types_table_filter_boolean__WEBPACK_IMPORTED_MODULE_9__["default"]);
  App.component(_src_table_filter_types_table_filter_datetime__WEBPACK_IMPORTED_MODULE_10__["default"].name, _src_table_filter_types_table_filter_datetime__WEBPACK_IMPORTED_MODULE_10__["default"]);
  App.component(_src_table_filter_types_table_filter_option__WEBPACK_IMPORTED_MODULE_11__["default"].name, _src_table_filter_types_table_filter_option__WEBPACK_IMPORTED_MODULE_11__["default"]);
});

/***/ }),

/***/ "./src/table/src/table-cell/table-cell.js":
/*!************************************************!*\
  !*** ./src/table/src/table-cell/table-cell.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  inject: {
    NTable: {
      "default": undefined
    }
  },
  props: {
    column: {
      required: true
    },
    value: {
      required: true
    },
    item: {
      required: true
    }
  },
  computed: {
    input: function input() {
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.item, this.column.prop);
    }
  },
  render: function render() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.input])]);
  }
});

/***/ }),

/***/ "./src/table/src/table-cell/types/table-cell-boolean.js":
/*!**************************************************************!*\
  !*** ./src/table/src/table-cell/types/table-cell-boolean.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-cell */ "./src/table/src/table-cell/table-cell.js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableCellBoolean',
  "extends": _table_cell__WEBPACK_IMPORTED_MODULE_1__["default"],
  render: function render() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].convertBoolean(this.input, this.column.trueText, this.column.falseText)])]);
  }
});

/***/ }),

/***/ "./src/table/src/table-cell/types/table-cell-datetime.js":
/*!***************************************************************!*\
  !*** ./src/table/src/table-cell/types/table-cell-datetime.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-cell */ "./src/table/src/table-cell/table-cell.js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableCellDatetime',
  "extends": _table_cell__WEBPACK_IMPORTED_MODULE_1__["default"],
  render: function render() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].convertDatetime(this.input, this.column.datetimeFormat, this.column.emptyText)])]);
  }
});

/***/ }),

/***/ "./src/table/src/table-cell/types/table-cell-image.js":
/*!************************************************************!*\
  !*** ./src/table/src/table-cell/types/table-cell-image.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-cell */ "./src/table/src/table-cell/table-cell.js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_2__);






function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !Object(vue__WEBPACK_IMPORTED_MODULE_0__["isVNode"])(s);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableCellImage',
  "extends": _table_cell__WEBPACK_IMPORTED_MODULE_1__["default"],
  computed: {
    preview: function preview() {
      return nano_js__WEBPACK_IMPORTED_MODULE_2__["Obj"].get(this.value, this.column.previewProp);
    }
  },
  methods: {
    getYoutube: function getYoutube() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].isEmpty(this.preview)) {
        return null;
      }

      var page = this.preview.match(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/);

      if (page === null) {
        return null;
      }

      var matchId = this.preview.match(/(\?v=.*?)(?=&|$)/);

      if (matchId !== null && matchId.length === 2) {
        return matchId[0].replace(/^\?v=/, '');
      }

      var matchPath = this.preview.match(/(\.be\/.*?)(?=\?|$)/);

      if (matchPath !== null && matchPath.length === 2) {
        return matchPath[0].replace(/^\.be\//, '');
      }

      var matchEmbed = this.preview.match(/(\/embed\/)(.*?$)/);

      if (matchEmbed !== null && matchEmbed.length === 3) {
        return matchEmbed[0].replace(/^\/embed\//, '');
      }

      return null;
    },
    getVimeo: function getVimeo() {
      if (nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].isEmpty(this.preview)) {
        return null;
      }

      var page = this.preview.match(/^https?:\/\/(www\.|player\.)?vimeo\.com/);

      if (page === null) {
        return null;
      }

      var matchUrl = this.preview.match(/(\/[0-9]+)(&|$)/);

      if (matchUrl !== null && matchUrl.length === 3) {
        return matchUrl[0].replace(/(^\/|&$)/, '');
      }

      return null;
    }
  },
  renderYoutube: function renderYoutube(id) {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "table-cell-preview__streamable"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("iframe", {
      "src": 'https://www.youtube.com/embed/' + id,
      "fwidth": "640",
      "height": "320",
      "frame-border": "0"
    }, null)]);
  },
  renderVimeo: function renderVimeo(id) {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "table-cell-preview__streamable"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("iframe", {
      "src": 'https://player.vimeo.com/video/' + id,
      "fwidth": "640",
      "height": "320",
      "frame-border": "0"
    }, null)]);
  },
  renderImage: function renderImage() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "table-cell-preview__image"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("img", {
      "src": this.preview
    }, null)]);
  },
  renderPreview: function renderPreview() {
    var htmlPreview = null;

    if (!this.preview) {
      return null;
    }

    var linkYoutube = this.getYoutube();

    if (linkYoutube) {
      htmlPreview = this.ctor('renderYoutube')(linkYoutube);
    }

    var linkVimeo = this.getVimeo();

    if (linkVimeo) {
      htmlPreview = this.ctor('renderVimeo')(linkVimeo);
    }

    if (nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].isEmpty(htmlPreview)) {
      htmlPreview = this.ctor('renderImage')();
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NModal"), {
      "type": "preview",
      "window": true
    }, _isSlot(htmlPreview) ? htmlPreview : {
      "default": function _default() {
        return [htmlPreview];
      }
    });
  },
  render: function render() {
    var classList = ['n-table-cell', 'n-table-cell--' + this.column.type];

    if (this.preview) {
      classList.push('has-preview');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "style": 'background-image: url(\'' + this.input + '\');'
    }, null)]);
  }
});

/***/ }),

/***/ "./src/table/src/table-cell/types/table-cell-matrix.js":
/*!*************************************************************!*\
  !*** ./src/table/src/table-cell/types/table-cell-matrix.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-cell */ "./src/table/src/table-cell/table-cell.js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_2__);





function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableCellMatrix',
  "extends": _table_cell__WEBPACK_IMPORTED_MODULE_1__["default"],
  methods: {
    toggleMatrix: function toggleMatrix() {
      var item = nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].find(this.column.veValue, _defineProperty({}, this.NTable.uniqueProp, this.value[this.NTable.uniqueProp]));

      if (!item) {
        item = nano_js__WEBPACK_IMPORTED_MODULE_2__["Obj"].assign({}, this.value, _defineProperty({}, this.column.prop, 0));
      }

      var matrix = nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].toggle(nano_js__WEBPACK_IMPORTED_MODULE_2__["Num"].matrix(nano_js__WEBPACK_IMPORTED_MODULE_2__["Num"]["int"](item[this.column.prop])), nano_js__WEBPACK_IMPORTED_MODULE_2__["Num"]["int"](this.column.matrix));
      item[this.column.prop] = nano_js__WEBPACK_IMPORTED_MODULE_2__["Num"].combine(matrix);
      nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].replace(this.column.veValue, item, _defineProperty({}, this.NTable.uniqueProp, item[this.NTable.uniqueProp]));
      this.column.$emit('input', this.column.veValue);
    },
    isChecked: function isChecked() {
      var item = nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].find(this.column.veValue, _defineProperty({}, this.NTable.uniqueProp, this.value[this.NTable.uniqueProp]));

      if (!item) {
        return false;
      }

      var matrix = nano_js__WEBPACK_IMPORTED_MODULE_2__["Num"].matrix(item[this.column.prop]);

      if (nano_js__WEBPACK_IMPORTED_MODULE_2__["Num"]["int"](this.column.matrix) === -1) {
        return true;
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].has(matrix, nano_js__WEBPACK_IMPORTED_MODULE_2__["Num"]["int"](this.column.matrix));
    }
  },
  render: function render() {
    var classList = ['n-table-cell', 'n-table-cell--' + this.column.type];
    var checkedState = this.isChecked();
    var disabled = nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].isFunction(this.column.disabled) ? this.column.disabled(this.value) : this.column.disabled;
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["withDirectives"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCheckbox"), {
      "checked": checkedState,
      "disabled": disabled && !checkedState
    }, null), [[Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveDirective"])("on:input"), this.toggleMatrix]])]);
  }
});

/***/ }),

/***/ "./src/table/src/table-cell/types/table-cell-option.js":
/*!*************************************************************!*\
  !*** ./src/table/src/table-cell/types/table-cell-option.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-cell */ "./src/table/src/table-cell/table-cell.js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableCellOption',
  "extends": _table_cell__WEBPACK_IMPORTED_MODULE_1__["default"],
  render: function render() {
    var _this = this;

    var options = nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].isFunction(this.column.options) ? this.column.options(this.value) : this.column.options;
    options = nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].map(nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].clone(options), function (value, index) {
      return {
        $value: value,
        $index: index
      };
    });
    var className = ['n-table-cell', 'n-table-cell--' + this.column.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": className
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].each(!nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].isObject(this.input) ? [this.input] : this.input, function (value) {
      var option = nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].find(options, function (item) {
        return nano_js__WEBPACK_IMPORTED_MODULE_2__["Obj"].get(item, _this.column.optionsValue) == value;
      });
      return nano_js__WEBPACK_IMPORTED_MODULE_2__["Obj"].get(option, _this.column.optionsLabel, _this.column.undefinedText);
    }).join(', ') || this.column.emptyText])]);
  }
});

/***/ }),

/***/ "./src/table/src/table-cell/types/table-cell-string.js":
/*!*************************************************************!*\
  !*** ./src/table/src/table-cell/types/table-cell-string.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-cell */ "./src/table/src/table-cell/table-cell.js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableCellString',
  "extends": _table_cell__WEBPACK_IMPORTED_MODULE_1__["default"],
  render: function render() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].convertString(this.input, this.column.emptyText)])]);
  }
});

/***/ }),

/***/ "./src/table/src/table-column/table-column.js":
/*!****************************************************!*\
  !*** ./src/table/src/table-column/table-column.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableColumn',
  inject: {
    NTable: {
      "default": undefined
    }
  },
  props: {
    value: {
      "default": function _default() {
        return null;
      }
    },
    prop: {
      "default": function _default() {
        return 'id';
      },
      type: [String]
    },
    label: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    tooltip: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'string';
      },
      type: [String]
    },
    align: {
      "default": function _default() {
        return 'left';
      },
      type: [String]
    },
    sort: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    filter: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    visible: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean, Function]
    },
    breakpoint: {
      "default": function _default() {
        return 0;
      },
      type: [Number]
    },
    previewProp: {
      "default": function _default() {
        return 'preview';
      },
      type: [String]
    },
    matrix: {
      "default": function _default() {
        return 1;
      },
      type: [Number, String]
    },
    options: {
      "default": function _default() {
        return [];
      },
      type: [Object, Array, Function]
    },
    optionsValue: {
      "default": function _default() {
        return '$value';
      },
      type: [String]
    },
    optionsLabel: {
      "default": function _default() {
        return '$value';
      },
      type: [String]
    },
    sortProp: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    filterProp: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    fluid: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    fixedWidth: {
      "default": function _default() {
        return 0;
      }
    },
    width: {
      "default": function _default() {
        return 170;
      }
    },
    minWidth: {
      "default": function _default() {
        return 120;
      }
    },
    maxWidth: {
      "default": function _default() {
        return 0;
      }
    },
    emptyText: {
      "default": function _default() {
        return '-';
      },
      type: [String]
    },
    undefinedText: {
      "default": function _default() {
        return '-';
      },
      type: [String]
    },
    trueText: {
      "default": function _default() {
        return 'Yes';
      },
      type: [String]
    },
    falseText: {
      "default": function _default() {
        return 'No';
      },
      type: [String]
    },
    datetimeFormat: {
      "default": function _default() {
        return 'YYYY-MM-DD HH:mm';
      },
      type: [String]
    }
  },
  provide: function provide() {
    return {
      NTableColumn: this
    };
  },
  data: function data() {
    return {
      uid: Object(nano_js__WEBPACK_IMPORTED_MODULE_1__["UUID"])(),
      tempWidth: 0
    };
  },
  methods: {
    detectVisibity: function detectVisibity() {
      var visible = this.visible;

      if (this.breakpoint) {
        visible &= nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.NTable.$el).width() > this.breakpoint;
      }

      return visible;
    },
    sortByColumn: function sortByColumn(event) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(event.target).closest('.n-table-column__filter')) {
        this.NTable.sortByColumn(this);
      }
    }
  },
  beforeMount: function beforeMount() {
    this.NTable.addColumn(this);
  },
  beforeUnmount: function beforeUnmount() {
    this.NTable.removeColumn(this);
  },
  renderHead: function renderHead() {
    var _this = this;

    var classList = ['n-table-column', 'n-table-column--' + this.align, 'n-table-column--' + this.type];
    var sortDirection = this.NTable.getColumnSorted(this);

    if (sortDirection) {
      classList.push('n-sorted', 'n-' + sortDirection);
    }

    if (this.fluid) {
      classList.push('n-fluid');
    }

    if (this.fixedWidth) {
      classList.push('n-fixed');
    }

    if (this.NTable.getColumnFiltered(this)) {
      classList.push('n-filtered');
    }

    var style = {};

    if (!this.NTable.getColumnVisiblity(this)) {
      style.display = 'none';
    }

    if (this.fixedWidth) {
      style.width = this.fixedWidth + 'px';
    }

    var props = {
      minWidth: this.minWidth,
      maxWidth: this.maxWidth,
      disabled: !!this.fixedWidth,
      group: [this.NTable.uid]
    };

    if (this.sort) {
      props.onMousedown = this.sortByColumn;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NResizer"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "column",
      "class": classList,
      "style": style,
      "modelValue": _this.tempWidth,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this.tempWidth = $event;
      }
    }, props), {
      "default": function _default() {
        return [_this.ctor('renderHeadSort')(), _this.ctor('renderHeadLabel')(), _this.ctor('renderHeadFilter')()];
      }
    });
  },
  renderHeadLabel: function renderHeadLabel() {
    var _this2 = this;

    var classList = ['n-table-column__label'];

    var labelHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.label])]);

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tooltip)) {
      return labelHtml;
    }

    var tooltipHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), {
      "type": "tooltip"
    }, {
      "default": function _default() {
        return [_this2.tooltip];
      }
    });

    return [labelHtml, tooltipHtml];
  },
  renderHeadSort: function renderHeadSort() {
    if (!this.sort) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-table-column__sort"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", null, null)]);
  },
  renderHeadFilter: function renderHeadFilter() {
    if (!this.filter) {
      return null;
    }

    var angleHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-table-column__filter"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.angleDown
    }, null)]);

    var component = Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])('NTableFilter' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(this.type));
    return [angleHtml, Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])(component, {
      column: this
    })];
  },
  renderBody: function renderBody(props) {
    var classList = ['n-table-cell', 'n-table-cell--' + this.align, 'n-table-cell--' + this.type];

    if (this.fluid) {
      classList.push('n-fluid');
    }

    if (this.tempWidth) {
      classList.push('n-fixed');
    }

    var index = this.NTable.getColumnIndex(this);
    var offset = 0;

    if (index === 0) {
      offset = props.value.depth * this.NTable.itemOffset;
    }

    var style = {
      width: this.tempWidth - offset + 'px'
    };

    if (this.minWidth) {
      style.minWidth = this.minWidth - offset + 'px';
    }

    if (this.maxWidth) {
      style.maxWidth = this.maxWidth - offset + 'px';
    }

    if (!this.NTable.getColumnVisiblity(this)) {
      style.display = 'none';
    }

    var passed = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(this.$attrs, [], _objectSpread(_objectSpread({}, props), {}, {
      "class": classList,
      style: style,
      column: this
    }));
    var component = Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])('NTableCell' + nano_js__WEBPACK_IMPORTED_MODULE_1__["Str"].ucfirst(this.type));
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])(component, passed);
  },
  render: function render() {
    return null;
  }
});

/***/ }),

/***/ "./src/table/src/table-filter/table-filter.js":
/*!****************************************************!*\
  !*** ./src/table/src/table-filter/table-filter.js ***!
  \****************************************************/
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
  inject: {
    NTable: {
      "default": undefined
    }
  },
  props: {
    column: {
      required: true
    }
  },
  computed: {
    tempFilter: function tempFilter() {
      return this.NTable.getColumnFilter(this.column);
    },
    canReset: function canReset() {
      return !this.NTable.getColumnFiltered(this.column);
    },
    canApply: function canApply() {
      return !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.filter.value);
    }
  },
  data: function data() {
    return {
      filter: nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].clone(this.tempFilter),
      visible: false
    };
  },
  beforeMount: function beforeMount() {
    this.mountFilter();
  },
  mounted: function mounted() {
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].bind('NTable:reset', this.resetFilter, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).on('keydown', this.onKeydown, this._.uid);
  },
  beforeUnmount: function beforeUnmount() {
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].unbind('NTable:reset', this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('keydown', null, this._.uid);
  },
  methods: {
    getFilterProp: function getFilterProp() {
      return this.column.filterProp || this.column.prop;
    },
    getDefaultFilter: function getDefaultFilter() {
      return {
        type: this.column.type,
        value: null,
        property: this.getFilterProp()
      };
    },
    mountFilter: function mountFilter() {
      if (this.filter) {
        return this.applyFilter();
      }

      this.filter = this.getDefaultFilter();

      if (!this.canApply) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.NTable.tempFilter, this.filter, {
        property: this.getFilterProp()
      });
    },
    resetFilter: function resetFilter(uid) {
      if (this.NTable.uid !== uid) {
        return;
      }

      this.filter = this.getDefaultFilter();
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.NTable.tempFilter, this.filter, {
        property: this.getFilterProp()
      });
    },
    onKeydown: function onKeydown(event) {
      if (!this.visible) {
        return;
      }

      if (event.which === 13 && this.canApply) {
        this.applyFilter();
      }

      if (event.which === 13 && !this.canApply) {
        this.clearFilter();
      }

      var closeAnyway = event.which === 13 && this.NTable.closeFilterOnEnter;

      if (closeAnyway || event.which === 27) {
        this.$refs.popover.close();
      }
    },
    applyFilter: function applyFilter() {
      var filter = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].clone(this.filter);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.NTable.tempFilterProps, this.getFilterProp());
      this.NTable.replaceFilter(filter, {
        property: this.getFilterProp()
      });
    },
    clearFilter: function clearFilter() {
      var filter = this.getDefaultFilter();
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.NTable.tempFilterProps, this.getFilterProp());
      this.NTable.replaceFilter(filter, {
        property: this.getFilterProp()
      });
      this.filter = filter;
    }
  },
  renderForm: function renderForm() {
    return null;
  },
  renderApply: function renderApply() {
    var _slot;

    var props = {
      type: 'primary',
      link: true,
      size: 'xs',
      disabled: !this.canApply
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])(props, {
      "onClick": this.applyFilter
    }), _isSlot(_slot = this.trans('Apply')) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    });
  },
  renderReset: function renderReset() {
    var _slot2;

    var props = {
      type: 'danger',
      link: true,
      size: 'xs',
      disabled: this.canReset
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])(props, {
      "onClick": this.clearFilter
    }), _isSlot(_slot2 = this.trans('Reset')) ? _slot2 : {
      "default": function _default() {
        return [_slot2];
      }
    });
  },
  renderFooter: function renderFooter() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-table-filter__footer"
    }, [this.ctor('renderReset')(), this.ctor('renderApply')()]);
  },
  render: function render() {
    var _this = this;

    var props = {
      "class": 'n-table-filter__popover',
      trigger: 'click',
      size: 'sm',
      width: 220
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "popover",
      "modelValue": _this.visible,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this.visible = $event;
      }
    }, props), {
      "default": this.ctor('renderForm'),
      footer: this.ctor('renderFooter')
    });
  }
});

/***/ }),

/***/ "./src/table/src/table-filter/types/table-filter-boolean.js":
/*!******************************************************************!*\
  !*** ./src/table/src/table-filter/types/table-filter-boolean.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-filter */ "./src/table/src/table-filter/table-filter.js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_2__);






function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !Object(vue__WEBPACK_IMPORTED_MODULE_0__["isVNode"])(s);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableFilterBoolean',
  "extends": _table_filter__WEBPACK_IMPORTED_MODULE_1__["default"],
  methods: {
    getDefaultFilter: function getDefaultFilter() {
      return {
        type: this.column.type,
        value: null,
        operator: 'in',
        property: this.getFilterProp()
      };
    }
  },
  renderForm: function renderForm() {
    var _slot, _slot2;

    var _this = this;

    var options = {
      1: this.trans(this.column.trueText),
      0: this.trans(this.column.falseText)
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NForm"), null, _isSlot(_slot2 = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NFormItem"), null, _isSlot(_slot = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelect"), {
      "size": "sm",
      "modelValue": _this.filter.value,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this.filter.value = $event;
      },
      "options": options,
      "clearable": true
    }, null)) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    })) ? _slot2 : {
      "default": function _default() {
        return [_slot2];
      }
    });
  }
});

/***/ }),

/***/ "./src/table/src/table-filter/types/table-filter-datetime.js":
/*!*******************************************************************!*\
  !*** ./src/table/src/table-filter/types/table-filter-datetime.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-filter */ "./src/table/src/table-filter/table-filter.js");





function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !Object(vue__WEBPACK_IMPORTED_MODULE_0__["isVNode"])(s);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableFilterDatetime',
  "extends": _table_filter__WEBPACK_IMPORTED_MODULE_1__["default"],
  methods: {
    getDefaultFilter: function getDefaultFilter() {
      return {
        type: this.column.type,
        value: null,
        operator: 'eq',
        property: this.getFilterProp()
      };
    }
  },
  renderForm: function renderForm() {
    var _slot, _slot2;

    var _this = this;

    var options = {
      eq: this.trans('Exact date'),
      lt: this.trans('Before date'),
      gt: this.trans('After date')
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NForm"), null, {
      "default": function _default() {
        return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NFormItem"), null, _isSlot(_slot = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NDatepicker"), {
          "size": "sm",
          "modelValue": _this.filter.value,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return _this.filter.value = $event;
          },
          "format": _this.column.datetimeFormat
        }, null)) ? _slot : {
          "default": function _default() {
            return [_slot];
          }
        }), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NFormItem"), null, _isSlot(_slot2 = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelect"), {
          "size": "sm",
          "modelValue": _this.filter.operator,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return _this.filter.operator = $event;
          },
          "options": options
        }, null)) ? _slot2 : {
          "default": function _default() {
            return [_slot2];
          }
        })];
      }
    });
  }
});

/***/ }),

/***/ "./src/table/src/table-filter/types/table-filter-option.js":
/*!*****************************************************************!*\
  !*** ./src/table/src/table-filter/types/table-filter-option.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-filter */ "./src/table/src/table-filter/table-filter.js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_2__);






function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !Object(vue__WEBPACK_IMPORTED_MODULE_0__["isVNode"])(s);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableFilterOption',
  "extends": _table_filter__WEBPACK_IMPORTED_MODULE_1__["default"],
  methods: {
    resetFilter: function resetFilter() {
      this.form.value = [];
      this.form.operator = 'in';
    }
  },
  data: function data() {
    var defaults = {
      property: this.column.filterProp,
      type: this.column.type,
      value: [],
      operator: 'in'
    };
    var form = this.getFilterProps(defaults);

    if (!nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].isArray(form.value)) {
      form.value = nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].string(form.value).split(',');
    }

    return {
      form: form
    };
  },
  renderForm: function renderForm() {
    var _slot2, _slot3, _slot4;

    var _this = this;

    var options = nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].isFunction(this.column.options) ? this.column.options(null) : this.column.options;
    options = nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].map(nano_js__WEBPACK_IMPORTED_MODULE_2__["Any"].keys(options), function (index) {
      return {
        $value: options[index],
        $index: index
      };
    });
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NForm"), {
      "form": this.form
    }, {
      "default": function _default() {
        return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NFormItem"), null, _isSlot(_slot3 = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCheckboxGroup"), {
          "size": "small",
          "align": "vertical",
          "modelValue": _this.form.value,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return _this.form.value = $event;
          }
        }, _isSlot(_slot2 = nano_js__WEBPACK_IMPORTED_MODULE_2__["Arr"].each(options, function (option) {
          var _slot;

          return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCheckbox"), {
            "size": "small",
            "value": nano_js__WEBPACK_IMPORTED_MODULE_2__["Obj"].get(option, _this.column.optionsValue)
          }, _isSlot(_slot = nano_js__WEBPACK_IMPORTED_MODULE_2__["Obj"].get(option, _this.column.optionsLabel)) ? _slot : {
            "default": function _default() {
              return [_slot];
            }
          });
        })) ? _slot2 : {
          "default": function _default() {
            return [_slot2];
          }
        })) ? _slot3 : {
          "default": function _default() {
            return [_slot3];
          }
        }), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NFormItem"), null, _isSlot(_slot4 = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelect"), {
          "size": "small",
          "modelValue": _this.form.operator,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return _this.form.operator = $event;
          }
        }, {
          "default": function _default() {
            return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelectOption"), {
              "value": "in",
              "label": _this.trans('Includes value')
            }, null), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelectOption"), {
              "value": "ni",
              "label": _this.trans('Excludes value')
            }, null)];
          }
        })) ? _slot4 : {
          "default": function _default() {
            return [_slot4];
          }
        })];
      }
    });
  }
});

/***/ }),

/***/ "./src/table/src/table-filter/types/table-filter-string.js":
/*!*****************************************************************!*\
  !*** ./src/table/src/table-filter/types/table-filter-string.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table-filter */ "./src/table/src/table-filter/table-filter.js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_2__);






function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !Object(vue__WEBPACK_IMPORTED_MODULE_0__["isVNode"])(s);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTableFilterString',
  "extends": _table_filter__WEBPACK_IMPORTED_MODULE_1__["default"],
  methods: {
    getDefaultFilter: function getDefaultFilter() {
      return {
        type: this.column.type,
        value: null,
        operator: 'li',
        property: this.getFilterProp()
      };
    }
  },
  renderForm: function renderForm() {
    var _slot, _slot2;

    var _this = this;

    var options = {
      li: this.trans('Includes value'),
      nl: this.trans('Excludes value'),
      eq: this.trans('Equal value'),
      ne: this.trans('Except value')
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NForm"), null, {
      "default": function _default() {
        return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NFormItem"), null, _isSlot(_slot = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NInput"), {
          "size": "sm",
          "modelValue": _this.filter.value,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return _this.filter.value = $event;
          }
        }, null)) ? _slot : {
          "default": function _default() {
            return [_slot];
          }
        }), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NFormItem"), null, _isSlot(_slot2 = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NSelect"), {
          "size": "sm",
          "modelValue": _this.filter.operator,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return _this.filter.operator = $event;
          },
          "options": options
        }, null)) ? _slot2 : {
          "default": function _default() {
            return [_slot2];
          }
        })];
      }
    });
  }
});

/***/ }),

/***/ "./src/table/src/table/table.js":
/*!**************************************!*\
  !*** ./src/table/src/table/table.js ***!
  \**************************************/
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
  name: 'NTable',
  provide: function provide() {
    return {
      NTable: this
    };
  },
  props: {
    items: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    visible: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    current: {
      "default": function _default() {
        return null;
      },
      type: [Array]
    },
    selected: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    expanded: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    filter: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    sortProp: {
      "default": function _default() {
        return 'id';
      },
      type: [String]
    },
    sortDir: {
      "default": function _default() {
        return 'desc';
      },
      type: [String]
    },
    closeFilterOnEnter: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    group: {
      "default": function _default() {
        return ['default'];
      },
      type: [Array]
    },
    allowGroups: {
      "default": function _default() {
        return ['default'];
      },
      type: [Array]
    },
    safezone: {
      "default": function _default() {
        return function (height) {
          return height * 0.51;
        };
      }
    },
    showEmptyIcon: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    itemHeight: {
      "default": function _default() {
        return 34;
      },
      type: [Number]
    },
    itemOffset: {
      "default": function _default() {
        return 30;
      },
      type: [Number]
    },
    scrollTopOnChange: {
      "default": function _default() {
        return false;
      }
    },
    uniqueProp: {
      "default": function _default() {
        return 'id';
      },
      type: [String]
    },
    childProp: {
      "default": function _default() {
        return 'children';
      },
      type: [String]
    },
    renderSelect: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    renderExpand: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    renderCurrent: {
      "default": function _default() {
        return true;
      }
    },
    transformDrop: {
      "default": function _default() {
        return function (node) {
          return node;
        };
      }
    },
    disableMove: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    insertNode: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    removeNode: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    allowSelect: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    allowDrag: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    allowDrop: {
      "default": function _default() {
        return function () {
          return true;
        };
      }
    },
    bufferItems: {
      "default": function _default() {
        return 24;
      },
      type: [Number]
    },
    threshold: {
      "default": function _default() {
        return 20;
      },
      type: [Number]
    },
    keyEvents: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    highlightTimeout: {
      "default": function _default() {
        return 7000;
      },
      type: [Number]
    }
  },
  computed: {
    checked: function checked() {
      return !!this.tempSelected.length && this.tempSelected.length === this.items.length;
    },
    intermediate: function intermediate() {
      return !!this.tempSelected.length && this.tempSelected.length !== this.items.length;
    }
  },
  data: function data() {
    return {
      uid: Object(nano_js__WEBPACK_IMPORTED_MODULE_1__["UUID"])(),
      elements: [],
      tempVisible: this.visible,
      tempVisibleProps: [],
      tempSelected: [],
      tempSortProp: this.sortProp,
      tempSortDir: this.sortDir,
      tempFilter: this.filter,
      tempFilterProps: []
    };
  },
  mounted: function mounted() {
    this.$watch('tempVisible', this.makeVisibleProps, {
      deep: true
    });

    if (!this.tempVisible.length) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.elements, this.detectVisible);
    }
  },
  methods: {
    addColumn: function addColumn(column) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.elements, column, {
        uid: column.uid
      });
    },
    removeColumn: function removeColumn(column) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.elements, {
        uid: column.uid
      });
    },
    getColumnIndex: function getColumnIndex(column) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(column)) {
        column = column['prop'];
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].findIndex(this.tempVisibleProps, column);
    },
    getColumnVisiblity: function getColumnVisiblity(column) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(column)) {
        column = column.prop;
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(this.tempVisible, column);
    },
    getColumnSorted: function getColumnSorted(column) {
      var prop = column;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(prop)) {
        prop = column.sortProp;
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(prop)) {
        prop = column.prop;
      }

      if (this.tempSortProp !== prop) {
        return null;
      }

      return this.tempSortDir;
    },
    getColumnFilter: function getColumnFilter(column) {
      var prop = column;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(prop)) {
        prop = column.filterProp;
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(prop)) {
        prop = column.prop;
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(this.tempFilter, {
        property: prop
      });
    },
    getColumnFiltered: function getColumnFiltered(column) {
      var prop = column;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(prop)) {
        prop = column.filterProp;
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(prop)) {
        prop = column.prop;
      }

      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(this.tempFilterProps, prop);
    },
    detectVisible: function detectVisible(column) {
      if (column.detectVisibity()) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.tempVisible, column.prop);
      }
    },
    makeVisibleProps: function makeVisibleProps() {
      this.tempVisibleProps = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].intersect(nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].extract(this.elements, 'prop'), this.tempVisible);
    },
    sortByColumn: function sortByColumn(column) {
      var prop = column;

      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isString(prop)) {
        prop = column.sortProp;
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(prop)) {
        prop = column.prop;
      }

      var dir = this.tempSortDir;

      if (prop === this.tempSortProp && this.tempSortDir === 'desc') {
        dir = 'asc';
      }

      if (prop === this.tempSortProp && this.tempSortDir === 'asc') {
        dir = 'desc';
      }

      if (this.tempSortDir !== dir) {
        this.$emit('update:sortDir', this.tempSortDir = dir);
      }

      if (this.tempSortProp !== prop) {
        this.$emit('update:sortProp', this.tempSortProp = prop);
      }

      this.$emit('sort', this.tempSortProp, this.tempSortDir);
    },
    replaceFilter: function replaceFilter(filter, search) {
      var _this = this;

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].replace(this.tempFilter, filter, search);
      var filters = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.tempFilter, function (filter) {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].has(_this.tempFilterProps, filter.property);
      });
      this.$emit('update:filter', filters);
      this.$emit('filter', filters, this.tempFilterProps);
    },
    resetFilter: function resetFilter() {
      this.tempFilter = this.tempFilterProps = [];
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Event"].fire('NTable:reset', this.uid);
      this.$emit('update:filter', this.tempFilter);
      this.$emit('filter', this.tempFilter, this.tempFilterProps);
    },
    selectAll: function selectAll() {
      this.$refs.draggable.selectAll();
    },
    highlightNode: function highlightNode(value) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.$refs.draggable.highlightNode(value, key);
    },
    syncCurrent: function syncCurrent() {
      return this.$refs.draggable.syncCurrent();
    },
    refreshCurrent: function refreshCurrent() {
      this.$refs.draggable.refreshCurrent();
    }
  },
  renderExpand: function renderExpand() {
    if (!this.renderExpand) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draglist-item__expand"
    }, null);
  },
  renderSelect: function renderSelect() {
    if (!this.renderSelect) {
      return null;
    }

    var props = {
      modelValue: this.checked,
      intermediate: this.intermediate,
      disabled: !this.items.length,
      onClick: this.selectAll
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-draglist-item__select"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCheckbox"), props, null)]);
  },
  renderBody: function renderBody(props) {
    var columns = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].each(this.elements, function (column) {
      return column.ctor('renderBody')(props);
    });
    return nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].values(columns);
  },
  renderContext: function renderContext() {
    var _this2 = this;

    var _slot, _slot2;

    var columns = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].each(this.elements, function (column) {
      return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCheckbox"), {
        "class": "n-table__checkbox",
        "value": column.prop
      }, {
        "default": function _default() {
          return [column.label];
        }
      });
    });
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), {
      "trigger": "context",
      "width": 140
    }, _isSlot(_slot2 = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCheckboxGroup"), {
      "modelValue": _this2.tempVisible,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this2.tempVisible = $event;
      },
      "align": "vertical"
    }, _isSlot(_slot = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].values(columns)) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    })) ? _slot2 : {
      "default": function _default() {
        return [_slot2];
      }
    });
  },
  renderHead: function renderHead() {
    var defaultRender = [this.ctor('renderExpand')(), this.ctor('renderSelect')(), this.ctor('renderContext')()];
    var columns = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].each(this.elements, function (column) {
      return column.ctor('renderHead')();
    });
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-table__header"
    }, [defaultRender, Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])(" "), nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].values(columns)]);
  },
  render: function render() {
    var _slot3;

    var _this3 = this;

    var except = ['visible', 'filter', 'sortProp', 'sortDir', 'closeFilterOnEnter'];
    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(this.$props, except, {
      items: this.items,
      selected: this.tempSelected,
      overflowX: false,
      renderNode: this.ctor('renderBody')
    });

    props['onRowClick'] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this3.$emit.apply(_this3, ['row-click'].concat(args));
    };

    props['onRowDblclick'] = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this3.$emit.apply(_this3, ['row-dblclick'].concat(args));
    };

    props['onUpdate:items'] = function (value) {
      _this3.$emit('update:items', value);
    };

    props['onUpdate:current'] = function (value) {
      _this3.$emit('update:current', value);
    };

    props['onUpdate:expanded'] = function (value) {
      _this3.$emit('update:expanded', value);
    };

    props['onUpdate:selected'] = function (value) {
      _this3.$emit('update:selected', _this3.tempSelected = value);
    };

    var draggableHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-table__body"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NDraglist"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "draggable"
    }, props, {
      "offsetX": 25
    }), {
      "default": function _default() {
        return _this3.ctor('renderBody')();
      }
    })]);

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-table",
      "style": "min-height: 500px;"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "class": "n-table__wrap",
      "fixture": true,
      "overflowY": false
    }, _isSlot(_slot3 = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-table__inner"
    }, [[this.ctor('renderHead')(), draggableHtml]])) ? _slot3 : {
      "default": function _default() {
        return [_slot3];
      }
    }), this.$slots["default"] && this.$slots["default"]()]);
  }
});

/***/ }),

/***/ "./src/tabs/index.js":
/*!***************************!*\
  !*** ./src/tabs/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_tabs_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/tabs/tabs */ "./src/tabs/src/tabs/tabs.js");
/* harmony import */ var _src_tabs_item_tabs_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/tabs-item/tabs-item */ "./src/tabs/src/tabs-item/tabs-item.js");


/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_tabs_tabs__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_tabs_tabs__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_tabs_item_tabs_item__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_tabs_item_tabs_item__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/tabs/src/tabs-item/tabs-item.js":
/*!*********************************************!*\
  !*** ./src/tabs/src/tabs-item/tabs-item.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTabsItem',
  inject: {
    NTabs: {
      "default": undefined
    }
  },
  provide: function provide() {
    return {
      NTabsItem: this
    };
  },
  props: {
    label: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    name: {
      "default": function _default() {
        return 'default';
      },
      type: [String]
    },
    icon: {
      "default": function _default() {
        return '';
      },
      type: [String]
    },
    sort: {
      "default": function _default() {
        return 0;
      },
      type: [Number]
    },
    preload: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    keep: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    }
  },
  methods: {
    changeTab: function changeTab() {
      this.NTabs.changeTab(this.name);
    }
  },
  data: function data() {
    return {
      _key: null,
      init: false
    };
  },
  beforeMount: function beforeMount() {
    this.NTabs.addTab(this);
  },
  beforeUnmount: function beforeUnmount() {
    this.NTabs.removeTab(this);
  },
  renderHeaderIcon: function renderHeaderIcon() {
    if (!this.$slots.icon && !this.icon) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-tabs__tab-icon"
    }, [this.$slots.icon && this.$slots.icon() || Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icon
    }, null)]);
  },
  renderHeaderLabel: function renderHeaderLabel() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-tabs__tab-label"
    }, [this.$slots.label && this.$slots.label() || Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.label])]);
  },
  renderHeader: function renderHeader() {
    var _this = this;

    var classList = ['n-tabs__tab'];

    if (this.NTabs.tempValue === this.name) {
      classList.push('n-active');
    }

    var props = {
      onClick: function onClick() {
        return _this.changeTab(_this.name);
      }
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [this.ctor('renderHeaderIcon')(), this.ctor('renderHeaderLabel')()]);
  },
  render: function render() {
    var renderBody = this.NTabs.tempValue === this.name;

    if (this.NTabs.tempValue !== this.name && this.keep) {
      renderBody = this.init;
    }

    if (this.NTabs.tempValue !== this.name && this.preload) {
      renderBody = true;
    }

    if (!renderBody) {
      return null;
    }

    this.init = true;
    var classList = ['n-tabs-item'];
    var style = {};

    if (this.NTabs.tempValue !== this.name) {
      style.display = 'none';
    }

    if (this.$slots.raw) {
      return this.$slots.raw();
    }

    var element = 'div';

    if (!this.NTabs.relative) {
      element = Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])('NScrollbar');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])(element, {
      "class": classList,
      style: style
    }, [this.$slots["default"] && this.$slots["default"]()]);
  }
});

/***/ }),

/***/ "./src/tabs/src/tabs/tabs.js":
/*!***********************************!*\
  !*** ./src/tabs/src/tabs/tabs.js ***!
  \***********************************/
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
  name: 'NTabs',
  provide: function provide() {
    return {
      NTabs: this
    };
  },
  props: {
    modelValue: {
      "default": function _default() {
        return 'default';
      },
      type: [String]
    },
    relative: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    }
  },
  data: function data() {
    return {
      elements: [],
      width: 0,
      offset: 0,
      tempValue: this.modelValue
    };
  },
  methods: {
    addTab: function addTab(tab) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.elements, tab, {
        name: tab.name
      });
    },
    removeTab: function removeTab(tab) {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.elements, {
        name: tab.name
      });
    },
    getTab: function getTab() {
      var _this = this;

      var updateEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var currentTab = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(this.elements, {
        name: this.value
      });
      var sorted = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].sort(this.elements, 'sort');

      if (!currentTab) {
        currentTab = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].first(sorted);
      }

      var repeatNext = function repeatNext() {
        return _this.getTab(updateEvent);
      };

      if (!currentTab) {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(repeatNext, 250);
      }

      if (currentTab.name === this.tempValue || !updateEvent) {
        return;
      }

      this.$emit('update:modelValue', this.tempValue = currentTab.name);
    },
    changeTab: function changeTab(value) {
      if (this.tempValue === value) {
        return;
      }

      this.$emit('update:modelValue', this.tempValue = value);
    }
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
    }
  },
  mounted: function mounted() {
    this.getTab(false);
  },
  updated: function updated() {
    var width = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).find('.n-active').width();
    this.width = width < 0 ? 0 : width;
    var offset = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).find('.n-active').offset('left', this.$el);
    this.offset = offset < 0 ? 0 : offset;
  },
  renderHeaderIndicator: function renderHeaderIndicator() {
    var transform = "scaleX(".concat(this.width / 100, ") ") + "translateX(".concat(this.offset / (this.width / 100), "px)");
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-tabs__indicator",
      "style": {
        transform: transform
      }
    }, null);
  },
  renderHeader: function renderHeader() {
    var _slot;

    if (this.elements.length <= 1) {
      return null;
    } // FIXME: As soon vue doesnt bug


    var sorted = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].sort(this.elements, 'sort');
    var tabs = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].make(sorted.length), function (tab, index) {
      return sorted[index].ctor('renderHeader')();
    });
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "relative": true
    }, _isSlot(_slot = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-tabs__header"
    }, [[tabs, this.ctor('renderHeaderIndicator')()]])) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    });
  },
  renderBody: function renderBody() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-tabs__body"
    }, [this.$slots["default"] && this.$slots["default"]()]);
  },
  render: function render() {
    var classList = ['n-tabs', 'n-tabs--' + this.size, 'n-tabs--' + this.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderHeader')(), this.ctor('renderBody')()]);
  }
});

/***/ }),

/***/ "./src/textarea/index.js":
/*!*******************************!*\
  !*** ./src/textarea/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_textarea_textarea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/textarea/textarea */ "./src/textarea/src/textarea/textarea.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_textarea_textarea__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_textarea_textarea__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/textarea/src/textarea/textarea.js":
/*!***********************************************!*\
  !*** ./src/textarea/src/textarea/textarea.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTextarea',
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
    size: {
      "default": function _default() {
        return 'md';
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
    },
    autoRows: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    maxRows: {
      "default": function _default() {
        return 12;
      },
      type: [Number]
    },
    minRows: {
      "default": function _default() {
        return 4;
      },
      type: [Number]
    },
    maxLength: {
      "default": function _default() {
        return 0;
      },
      type: [Number]
    }
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
    }
  },
  methods: {
    eventInput: function eventInput(event) {
      this.$emit('update:modelValue', this.tempValue = event.target.value);
    }
  },
  data: function data() {
    return {
      tempValue: this.modelValue || ''
    };
  },
  renderInput: function renderInput() {
    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(this.$attrs, ['class', 'style']);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].assign(props, {
      value: this.tempValue,
      rows: this.minRows,
      disabled: this.disabled,
      placeholder: this.placeholder,
      onInput: this.eventInput
    });

    if (this.maxLength !== 0) {
      props.maxLength = this.maxLength;
    }

    var currentRows = (this.tempValue.match(/\n/g) || []).length + 1;

    if (this.autoRows && props.rows < currentRows) {
      props.rows = currentRows <= this.maxRows ? currentRows : this.maxRows;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])('textarea', props);
  },
  render: function render() {
    var classList = ['n-textarea', 'n-textarea--' + this.size, 'n-textarea--' + this.type];

    if (this.disabled) {
      classList.push('n-disabled');
    }

    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].only(this.$attrs, ['style'], {
      "class": this.cmer(classList)
    });
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["h"])('div', props, [this.ctor('renderInput')()]);
  }
});

/***/ }),

/***/ "./src/timepicker/index.js":
/*!*********************************!*\
  !*** ./src/timepicker/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_timepicker_panel_timepicker_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/timepicker-panel/timepicker-panel */ "./src/timepicker/src/timepicker-panel/timepicker-panel.js");
/* harmony import */ var _src_timepicker_timepicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/timepicker/timepicker */ "./src/timepicker/src/timepicker/timepicker.js");


/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_timepicker_panel_timepicker_panel__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_timepicker_panel_timepicker_panel__WEBPACK_IMPORTED_MODULE_0__["default"]);
  App.component(_src_timepicker_timepicker__WEBPACK_IMPORTED_MODULE_1__["default"].name, _src_timepicker_timepicker__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "./src/timepicker/src/timepicker-panel/timepicker-panel.js":
/*!*****************************************************************!*\
  !*** ./src/timepicker/src/timepicker-panel/timepicker-panel.js ***!
  \*****************************************************************/
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
  name: 'NTimepickerPanel',
  props: {
    modelValue: {
      "default": function _default() {
        return null;
      }
    },
    clearValue: {
      "default": function _default() {
        return null;
      }
    },
    placeholder: {
      "default": function _default() {
        return 'Select time';
      },
      type: [String]
    },
    size: {
      "default": function _default() {
        return 'md';
      }
    },
    type: {
      "default": function _default() {
        return 'primary';
      }
    },
    disabled: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    format: {
      "default": function _default() {
        return 'YYYY-MM-DD HH:mm:ss';
      },
      type: [String]
    },
    displayFormat: {
      "default": function _default() {
        return 'HH:mm:ss';
      },
      type: [String]
    },
    hoursInterval: {
      "default": function _default() {
        return 1;
      },
      type: [Number]
    },
    minutesInterval: {
      "default": function _default() {
        return 1;
      },
      type: [Number]
    },
    secondsInterval: {
      "default": function _default() {
        return 1;
      },
      type: [Number]
    }
  },
  computed: {
    hoursGrid: function hoursGrid() {
      return this.tempValue.getHours(this.hoursInterval);
    },
    minutesGrid: function minutesGrid() {
      return this.tempValue.getMinutes(this.minutesInterval);
    },
    secondsGrid: function secondsGrid() {
      return this.tempValue.getSeconds(this.secondsInterval);
    }
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue.format(this.format)) {
        this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value);
      }
    }
  },
  data: function data() {
    return {
      tempValue: nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.modelValue)
    };
  },
  methods: {
    eventSelect: function eventSelect(now) {
      this.$emit('update:modelValue', (this.tempValue = now.clone()).format(this.format));
    }
  },
  renderToolbar: function renderToolbar() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-timepicker-panel__toolbar"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-timepicker-panel-display"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": "n-timepicker-panel__time"
    }, [this.tempValue.format(this.displayFormat) || this.placeholder])])]);
  },
  renderHourItem: function renderHourItem(now) {
    var _this = this;

    var classList = ['n-timepicker-panel__item'];

    if (this.tempValue.valid() && now.hour() === this.tempValue.hour()) {
      classList.push('n-selected');
    }

    var props = {
      onMousedown: function onMousedown() {
        return _this.eventSelect(now);
      }
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [now.format('HH')])]);
  },
  renderHourPanel: function renderHourPanel() {
    var _slot;

    if (!this.displayFormat.match('HH')) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "class": "n-timepicker-panel__panel",
      "wrapClass": "n-timepicker-panel__wrap"
    }, _isSlot(_slot = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.hoursGrid, this.ctor('renderHourItem'))) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    });
  },
  renderMinuteItem: function renderMinuteItem(now) {
    var _this2 = this;

    var classList = ['n-timepicker-panel__item'];

    if (this.tempValue.valid() && now.minute() === this.tempValue.minute()) {
      classList.push('n-selected');
    }

    var props = {
      onMousedown: function onMousedown() {
        return _this2.eventSelect(now);
      }
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [now.format('mm')])]);
  },
  renderMinutePanel: function renderMinutePanel() {
    var _slot2;

    if (!this.displayFormat.match('mm')) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "class": "n-timepicker-panel__panel",
      "wrapClass": "n-timepicker-panel__wrap"
    }, _isSlot(_slot2 = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.minutesGrid, this.ctor('renderMinuteItem'))) ? _slot2 : {
      "default": function _default() {
        return [_slot2];
      }
    });
  },
  renderSecondItem: function renderSecondItem(now) {
    var _this3 = this;

    var classList = ['n-timepicker-panel__item'];

    if (this.tempValue.valid() && now.second() === this.tempValue.second()) {
      classList.push('n-selected');
    }

    var props = {
      onMousedown: function onMousedown() {
        return _this3.eventSelect(now);
      }
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [now.format('ss')])]);
  },
  renderSecondPanel: function renderSecondPanel() {
    var _slot3;

    if (!this.displayFormat.match('ss')) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "class": "n-timepicker-panel__panel"
    }, _isSlot(_slot3 = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-timepicker-panel__wrap"
    }, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.secondsGrid, this.ctor('renderSecondItem'))])) ? _slot3 : {
      "default": function _default() {
        return [_slot3];
      }
    });
  },
  render: function render() {
    var classList = ['n-timepicker-panel', 'n-timepicker-panel--' + this.size, 'n-timepicker-panel--' + this.type];

    if (this.disabled) {
      classList.push('n-disabled');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-timepicker-panel__header"
    }, [this.ctor('renderToolbar')()]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-timepicker-panel__body"
    }, [this.ctor('renderHourPanel')(), this.ctor('renderMinutePanel')(), this.ctor('renderSecondPanel')()])]);
  }
});

/***/ }),

/***/ "./src/timepicker/src/timepicker/timepicker.js":
/*!*****************************************************!*\
  !*** ./src/timepicker/src/timepicker/timepicker.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTimepicker',
  props: {
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
    placeholder: {
      "default": function _default() {
        return 'Select time';
      },
      type: [String]
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    position: {
      "default": function _default() {
        return 'bottom-start';
      },
      type: [String]
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
    format: {
      "default": function _default() {
        return 'YYYY-MM-DD HH:mm:ss';
      },
      type: [String]
    },
    displayFormat: {
      "default": function _default() {
        return 'HH:mm:ss';
      },
      type: [String]
    },
    hoursInterval: {
      "default": function _default() {
        return 1;
      },
      type: [Number]
    },
    minutesInterval: {
      "default": function _default() {
        return 1;
      },
      type: [Number]
    },
    secondsInterval: {
      "default": function _default() {
        return 1;
      },
      type: [Number]
    }
  },
  computed: {
    hoursGrid: function hoursGrid() {
      return this.tempValue.getHours(this.hoursInterval);
    },
    minutesGrid: function minutesGrid() {
      return this.tempValue.getMinutes(this.minutesInterval);
    },
    secondsGrid: function secondsGrid() {
      return this.tempValue.getSeconds(this.secondsInterval);
    }
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue.format(this.format)) {
        this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value);
      }
    }
  },
  data: function data() {
    return {
      focus: false,
      tempValue: nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.value)
    };
  },
  methods: {
    clearTimepicker: function clearTimepicker() {
      this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(this.clearValue, this.format);
      this.$emit('update:modelValue', this.clearValue);
    },
    onPopoverInput: function onPopoverInput(value) {
      this.focus = value;
    },
    onValueInput: function onValueInput(event) {
      var isNotSameLength = this.displayFormat.length !== event.target.value.length;

      if (isNotSameLength) {
        return;
      }

      var value = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(event.target.value, this.displayFormat);

      if (!value.moment.isValid()) {
        return;
      }

      var moment = this.tempValue.moment.set({
        hour: value.moment.hour(),
        minute: value.moment.minute(),
        second: value.moment.second()
      });
      this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(moment);
      this.$emit('update:modelValue', this.tempValue.format(this.format));
    },
    onTimepickerInput: function onTimepickerInput(value) {
      this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Now"].make(value, this.format);
      this.$emit('update:modelValue', value);
    }
  },
  renderLabelClear: function renderLabelClear() {
    if (!this.clearable || !this.tempValue.valid()) {
      return null;
    }

    var props = {};

    if (!this.disabled) {
      props.onMousedown = this.clearTimepicker;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-timepicker__clear"
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.times
    }, null)]);
  },
  renderLabelAngle: function renderLabelAngle() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-timepicker__angle"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
      "class": this.icons.angleDown
    }, null)]);
  },
  renderSingle: function renderSingle() {
    var props = {
      value: '',
      disabled: this.disabled,
      placeholder: this.trans(this.placeholder),
      onInput: this.onValueInput
    };

    if (this.tempValue.valid()) {
      props.value = this.tempValue.format(this.displayFormat, true);
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-timepicker__input"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("input", props, null)]);
  },
  renderDisplay: function renderDisplay() {
    var classList = ['n-timepicker__display'];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderLabelClear')(), this.ctor('renderSingle')(), this.ctor('renderLabelAngle')()]);
  },
  renderPanel: function renderPanel() {
    var props = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].except(this.$props, ['modelValue'], {
      modelValue: this.tempValue.format(this.format) || null
    });
    props['onUpdate:modelValue'] = this.onTimepickerInput;
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NTimepickerPanel"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-timepicker__body"
    }, props), null);
  },
  renderPopover: function renderPopover() {
    var _this = this;

    var props = {
      trigger: 'click',
      width: 0,
      size: this.size,
      position: this.position,
      scrollClose: true,
      disabled: this.disabled
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "popover",
      "modelValue": _this.focus,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this.focus = $event;
      }
    }, props), {
      raw: this.ctor('renderPanel')
    });
  },
  render: function render() {
    var classList = ['n-timepicker', 'n-timepicker--' + this.type, 'n-timepicker--' + this.size];

    if (!this.tempValue.valid()) {
      classList.push('n-empty');
    }

    if (this.clearable) {
      classList.push('n-clearable');
    }

    if (this.focus) {
      classList.push('n-focus');
    }

    if (this.disabled) {
      classList.push('n-disabled');
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [this.ctor('renderDisplay')(), this.ctor('renderPopover')()]);
  }
});

/***/ }),

/***/ "./src/transfer/index.js":
/*!*******************************!*\
  !*** ./src/transfer/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_transfer_transfer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/transfer/transfer */ "./src/transfer/src/transfer/transfer.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_transfer_transfer__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_transfer_transfer__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/transfer/src/transfer/transfer.js":
/*!***********************************************!*\
  !*** ./src/transfer/src/transfer/transfer.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);




function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NTransfer',
  props: {
    modelValue: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    size: {
      "default": function _default() {
        return 'md';
      },
      type: [String]
    },
    type: {
      "default": function _default() {
        return 'primary';
      },
      type: [String]
    },
    options: {
      "default": function _default() {
        return [];
      },
      type: [Array]
    },
    sourceLabel: {
      "default": function _default() {
        return 'Source';
      },
      type: [String]
    },
    targetLabel: {
      "default": function _default() {
        return 'Target';
      },
      type: [String]
    },
    labelProp: {
      "default": function _default() {
        return 'label';
      },
      type: [String]
    },
    uniqueProp: {
      "default": function _default() {
        return 'id';
      },
      type: [String]
    }
  },
  computed: {
    sourceChecked: function sourceChecked() {
      return !!this.selectedSource.length && this.selectedSource.length === this.tempSource.length;
    },
    sourceIntermediate: function sourceIntermediate() {
      return !!this.selectedSource.length && this.selectedSource.length !== this.tempSource.length;
    },
    targetChecked: function targetChecked() {
      return !!this.selectedTarget.length && this.selectedTarget.length === this.tempTarget.length;
    },
    targetIntermediate: function targetIntermediate() {
      return !!this.selectedTarget.length && this.selectedTarget.length !== this.tempTarget.length;
    },
    tempSource: function tempSource() {
      var _this = this;

      var source = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.options, function (item) {
        return !nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(_this.tempValue, _defineProperty({}, _this.uniqueProp, item[_this.uniqueProp]));
      });

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.sourceSearch)) {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].clone(source);
      }

      var searchPattern = new RegExp(this.sourceSearch, 'i');
      source = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(source, function (item) {
        return item[_this.labelProp].match(searchPattern);
      });
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].clone(source);
    },
    tempTarget: function tempTarget() {
      var _this2 = this;

      var target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(this.options, function (item) {
        return !!nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(_this2.tempValue, _defineProperty({}, _this2.uniqueProp, item[_this2.uniqueProp]));
      });

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.targetSearch)) {
        return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].clone(target);
      }

      var searchPattern = new RegExp(this.targetSearch, 'i');
      target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].filter(target, function (item) {
        return item[_this2.labelProp].match(searchPattern);
      });
      return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].clone(target);
    }
  },
  data: function data() {
    return {
      uid: Object(nano_js__WEBPACK_IMPORTED_MODULE_1__["UUID"])(),
      tempValue: this.modelValue,
      sourceSearch: '',
      targetSearch: '',
      selectedSource: [],
      selectedTarget: []
    };
  },
  watch: {
    modelValue: function modelValue(value) {
      if (value !== this.tempValue) {
        this.tempValue = value;
      }
    }
  },
  methods: {
    moveItemsTarget: function moveItemsTarget(options) {
      var _this3 = this;

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(options, function (source) {
        var item = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(_this3.options, _defineProperty({}, _this3.uniqueProp, source));
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(_this3.tempValue, item, _defineProperty({}, _this3.uniqueProp, source));
      });
      this.$emit('input', this.tempValue);
    },
    moveItemsSource: function moveItemsSource(options) {
      var _this4 = this;

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(options, function (source) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(_this4.tempValue, _defineProperty({}, _this4.uniqueProp, source));
      });
      this.$emit('input', this.tempValue);
    },
    moveRowTarget: function moveRowTarget(node) {
      // Get node unique
      var target = node.value[this.uniqueProp]; // Remove item from selected list

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.selectedTarget, target);
      this.tempValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.tempValue, _defineProperty({}, this.uniqueProp, target));
      this.$emit('update:modelValue', this.tempValue);
    },
    moveRowSource: function moveRowSource(node) {
      // Get node unique
      var source = node.value[this.uniqueProp]; // Remove item from selected list

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.selectedSource, source);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(this.tempValue, node.item, source, _defineProperty({}, this.uniqueProp, source));
      this.$emit('update:modelValue', this.tempValue);
    },
    moveToSource: function moveToSource() {
      var _this5 = this;

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.selectedTarget, function (target) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(_this5.tempValue, _defineProperty({}, _this5.uniqueProp, target));
      });
      this.selectedTarget = [];
      this.$emit('update:modelValue', this.tempValue);
    },
    moveToTarget: function moveToTarget() {
      var _this6 = this;

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.selectedSource, function (source) {
        var item = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].find(_this6.options, _defineProperty({}, _this6.uniqueProp, source));
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].add(_this6.tempValue, item, _defineProperty({}, _this6.uniqueProp, source));
      });
      this.selectedSource = [];
      this.$emit('update:modelValue', this.tempValue);
    },
    updateSelectedSource: function updateSelectedSource(selected) {
      this.selectedSource = selected;
    },
    updateSelectedTarget: function updateSelectedTarget(selected) {
      this.selectedTarget = selected;
    }
  },
  renderSourceSelect: function renderSourceSelect() {
    var _this7 = this;

    var props = {
      modelValue: this.sourceChecked,
      size: this.size,
      type: this.type,
      intermediate: this.sourceIntermediate,
      disabled: !this.tempSource.length
    };

    props['onUpdate:modelValue'] = function () {
      _this7.$refs.source.selectAll();
    };

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__select"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCheckbox"), props, null)]);
  },
  renderSourceTitle: function renderSourceTitle() {
    var labelHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": "n-transfer__item-title"
    }, [this.sourceLabel]);

    var counterHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": "n-transfer__item-count"
    }, [this.tempSource.length]);

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__title"
    }, [[labelHtml, counterHtml]]);
  },
  renderSourceHeader: function renderSourceHeader() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__header"
    }, [this.ctor('renderSourceSelect')(), this.ctor('renderSourceTitle')()]);
  },
  renderSourceSearch: function renderSourceSearch() {
    var _this8 = this;

    var props = {
      placeholder: this.trans('Search item'),
      size: this.size,
      type: this.type,
      icon: this.icons.times,
      iconDisabled: !this.sourceSearch
    };

    props['onIconClick'] = function () {
      _this8.sourceSearch = '';
    };

    props['onUpdate:modelValue'] = function () {
      _this8.selectedSource = [];
    };

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__search"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NInput"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "modelValue": _this8.sourceSearch,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this8.sourceSearch = $event;
      }
    }, props), null)]);
  },
  renderSourceBody: function renderSourceBody() {
    var props = {
      group: [this.uid + 'source'],
      allowGroups: [this.uid + 'target'],
      items: this.tempSource,
      size: this.size,
      type: this.type,
      renderSelect: true,
      selected: this.selectedSource,
      safezone: function safezone() {
        return -10;
      },
      disableMove: true,
      renderNode: this.ctor('renderNode'),
      onMove: this.moveItemsSource,
      'onRowDblclick': this.moveRowSource,
      'onUpdate:selected': this.updateSelectedSource
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NDraglist"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "source",
      "class": "n-transfer__body"
    }, props), null);
  },
  renderTargetSelect: function renderTargetSelect() {
    var _this9 = this;

    var props = {
      modelValue: this.targetChecked,
      size: this.size,
      type: this.type,
      intermediate: this.targetIntermediate,
      disabled: !this.tempTarget.length
    };

    props['onUpdate:modelValue'] = function () {
      _this9.$refs.target.selectAll();
    };

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__select"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NCheckbox"), props, null)]);
  },
  renderTargetTitle: function renderTargetTitle() {
    var labelHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": "n-transfer__item-title"
    }, [this.targetLabel]);

    var counterHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": "n-transfer__item-count"
    }, [this.tempTarget.length]);

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__title"
    }, [[labelHtml, counterHtml]]);
  },
  renderTargetHeader: function renderTargetHeader() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__header"
    }, [this.ctor('renderTargetSelect')(), this.ctor('renderTargetTitle')()]);
  },
  renderTargetSearch: function renderTargetSearch() {
    var _this10 = this;

    var props = {
      placeholder: this.trans('Search item'),
      size: this.size,
      type: this.type,
      icon: this.icons.times,
      iconDisabled: !this.targetSearch
    };

    props['onIconClick'] = function () {
      _this10.targetSearch = '';
    };

    props['onUpdate:modelValue'] = function () {
      _this10.selectedTarget = [];
    };

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__search"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NInput"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "modelValue": _this10.targetSearch,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this10.targetSearch = $event;
      }
    }, props), null)]);
  },
  renderTargetBody: function renderTargetBody() {
    var props = {
      group: [this.uid + 'target'],
      allowGroups: [this.uid + 'source'],
      items: this.tempTarget,
      size: this.size,
      type: this.type,
      renderSelect: true,
      selected: this.selectedTarget,
      safezone: function safezone() {
        return -1;
      },
      disableMove: true,
      renderNode: this.ctor('renderNode'),
      onMove: this.moveItemsTarget,
      'onRowDblclick': this.moveRowTarget,
      'onUpdate:selected': this.updateSelectedTarget
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NDraglist"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "target",
      "class": "n-transfer__body"
    }, props), null);
  },
  renderNode: function renderNode(props) {
    if (this.$slots["default"]) {
      return this.$slots["default"](props);
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__item"
    }, [nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(props.item, this.labelProp)]);
  },
  renderMoveSource: function renderMoveSource() {
    var props = {
      disabled: !this.selectedSource.length,
      size: this.size,
      type: this.type,
      square: true,
      icon: this.icons.angleRight,
      onClick: this.moveToTarget
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, null);
  },
  renderMoveTarget: function renderMoveTarget() {
    var props = {
      disabled: !this.selectedTarget.length,
      size: this.size,
      type: this.type,
      square: true,
      icon: this.icons.angleLeft,
      onClick: this.moveToSource
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NButton"), props, null);
  },
  render: function render($render) {
    var classList = ['n-transfer', 'n-transfer--' + this.size, 'n-transfer--' + this.type];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__panel"
    }, [this.ctor('renderSourceHeader')(), this.ctor('renderSourceSearch')(), this.ctor('renderSourceBody')()]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__controls"
    }, [this.ctor('renderMoveSource')(), this.ctor('renderMoveTarget')()]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-transfer__panel"
    }, [this.ctor('renderTargetHeader')(), this.ctor('renderTargetSearch')(), this.ctor('renderTargetBody')()])]);
  }
});

/***/ }),

/***/ "./src/virtualscroller/index.js":
/*!**************************************!*\
  !*** ./src/virtualscroller/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_virtualscroller_virtualscroller_beta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/virtualscroller/virtualscroller.beta */ "./src/virtualscroller/src/virtualscroller/virtualscroller.beta.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_virtualscroller_virtualscroller_beta__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_virtualscroller_virtualscroller_beta__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/virtualscroller/src/virtualscroller/virtualscroller.beta.js":
/*!*************************************************************************!*\
  !*** ./src/virtualscroller/src/virtualscroller/virtualscroller.beta.js ***!
  \*************************************************************************/
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
  name: 'NVirtualscroller',
  model: {
    prop: 'items'
  },
  props: {
    items: {
      "default": function _default() {
        return [];
      }
    },
    itemHeight: {
      "default": function _default() {
        return 30;
      }
    },
    renderNode: {
      "default": function _default() {
        return null;
      }
    },
    overflowY: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    overflowX: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    },
    offsetY: {
      "default": function _default() {
        return 10;
      },
      type: [Number]
    },
    offsetX: {
      "default": function _default() {
        return 10;
      },
      type: [Number]
    },
    threshold: {
      "default": function _default() {
        return 40;
      },
      type: [Number]
    },
    bufferItems: {
      "default": function _default() {
        return 40;
      },
      type: [Number]
    }
  },
  data: function data() {
    var state = {
      startIndex: 0,
      endIndex: 0
    };
    return {
      state: state,
      height: 0,
      scrollTop: 0
    };
  },
  watch: {
    'items': function items() {
      this.updateRender();
    }
  },
  methods: {
    isIndexRendered: function isIndexRendered(index) {
      if (this.items.length <= this.threshold) {
        return true;
      }

      return this.state.startIndex < index && this.state.endIndex > index;
    },
    scrollIntoView: function scrollIntoView(index) {
      if (!this.$refs.scrollbar) {
        return;
      }

      if (index === -1 || index >= this.items.length) {
        index = this.items.length;
      }

      if (!this.isIndexRendered(index)) {
        return this.scrollToIndex(index);
      }

      var selector = "[data-index=\"".concat(index, "\"]");
      this.$refs.scrollbar.scrollIntoView(selector);
    },
    scrollToIndex: function scrollToIndex(index) {
      if (!this.$refs.scrollbar) {
        return;
      }

      if (index === -1 || index >= this.items.length) {
        index = this.items.length;
      }

      var targetTop = index * this.itemHeight;

      if (this.scrollTop > targetTop) {
        return this.scrollTo(0, targetTop);
      }

      targetTop = targetTop - this.height + this.itemHeight;
      this.scrollTo(0, targetTop);
    },
    scrollTo: function scrollTo() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!this.$refs.scrollbar) {
        return;
      }

      this.$refs.scrollbar.scrollTo(x, y);
    },
    clearState: function clearState() {
      this.state = {
        startIndex: 0,
        endIndex: 0
      };
    },
    updateRender: function updateRender() {
      if (this.items.length <= this.threshold) {
        return this.clearState();
      }

      this.scrollTop = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get(this.$refs.scrollbar, '$refs.content.scrollTop');
      this.refreshDriver();
    },
    onScrollupdate: function onScrollupdate(scrollTop) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isNumber(scrollTop)) {
        return;
      }

      if (this.items.length <= this.threshold) {
        return this.clearState();
      }

      this.scrollTop = scrollTop;
      this.refreshDriver();
    },
    onSizechange: function onSizechange(height) {
      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isNumber(height)) {
        return;
      }

      if (this.items.length <= this.threshold) {
        return this.clearState();
      }

      this.height = height;
      this.refreshDriver();
    },
    refreshDriver: function refreshDriver() {
      var startItem = Math.round(this.scrollTop / this.itemHeight);
      var endItem = Math.round((this.scrollTop + this.height) / this.itemHeight);
      var startIndex = startItem - this.bufferItems;

      if (startIndex < 0) {
        startIndex = 0;
      }

      var endIndex = endItem + this.bufferItems;

      if (endIndex > this.items.length) {
        endIndex = this.items.length;
      }

      var newState = {
        startIndex: startIndex,
        endIndex: endIndex
      };

      if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEqual(newState, this.state)) {
        this.state = newState;
      }
    }
  },
  renderItem: function renderItem(passed) {
    passed.index = passed.index + this.state.startIndex;
    var topOffset = Math.round(this.itemHeight * passed.index);
    var renderFunction = this.$slots["default"]; // Finally render node

    if (this.renderNode) {
      renderFunction = this.renderNode;
    }

    var props = {
      'data-index': passed.index
    };
    props.style = {
      top: topOffset + 'px',
      height: this.itemHeight + 'px'
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": "n-virtualscroller__item"
    }, props), [renderFunction(passed)]);
  },
  renderItems: function renderItems() {
    var _this = this;

    if (!this.items.length) {
      return this.$slots.empty && this.$slots.empty() || null;
    }

    ;
    var items = nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].slice(this.items, this.state.startIndex, this.state.endIndex);

    if (this.items.length <= this.threshold) {
      items = this.items;
    }

    return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(items, function (value, index) {
      return _this.ctor('renderItem')({
        value: value,
        index: index
      });
    });
  },
  render: function render() {
    var _slot;

    var props = {
      overflowY: this.overflowY,
      overflowX: this.overflowX,
      offsetY: this.offsetY,
      offsetX: this.offsetX,
      onSizechange: this.onSizechange,
      onScrollupdate: nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onScrollupdate, 15)
    };
    var style = {};

    if (this.items.length) {
      style.height = this.items.length * this.itemHeight + 'px';
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "scrollbar"
    }, props), _isSlot(_slot = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-virtualscroller__inner",
      "style": style
    }, [this.ctor('renderItems')()])) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    });
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