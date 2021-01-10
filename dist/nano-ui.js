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

/***/ "./node_modules/optiscroll/dist/optiscroll.js":
/*!****************************************************!*\
  !*** ./node_modules/optiscroll/dist/optiscroll.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
* Optiscroll.js v3.2.1
* https://github.com/albertogasparin/Optiscroll/
* 
* @copyright 2018 Alberto Gasparin
* @license Released under MIT LICENSE
*/

;(function ( window, document, Math, undefined ) {
  'use strict';



/**
 * Optiscroll, use this to create instances
 * ```
 * var scrolltime = new Optiscroll(element);
 * ```
 */
var Optiscroll = function Optiscroll(element, options) {
  return new Optiscroll.Instance(element, options || {});
};



var GS = Optiscroll.globalSettings = {
  scrollMinUpdateInterval: 1000 / 40, // 40 FPS
  checkFrequency: 1000,
  pauseCheck: false,
};

Optiscroll.defaults = {
  preventParentScroll: false,
  forceScrollbars: false,
  scrollStopDelay: 300,
  maxTrackSize: 95,
  minTrackSize: 5,
  draggableTracks: true,
  autoUpdate: true,
  classPrefix: 'optiscroll-',
  wrapContent: true,
  rtl: false,
};



Optiscroll.Instance = function (element, options) {
  // instance variables
  this.element = element;
  this.settings = _extend(_extend({}, Optiscroll.defaults), options || {});
  if (typeof options.rtl !== 'boolean') {
    this.settings.rtl = window.getComputedStyle(element).direction === 'rtl';
  }
  this.cache = {};

  this.init();
};



Optiscroll.Instance.prototype = {


  init: function () {
    var element = this.element,
        settings = this.settings,
        shouldCreateScrollbars = false;

    var scrollEl = this.scrollEl = settings.wrapContent
      ? Utils.createWrapper(element)
      : element.firstElementChild;

    toggleClass(scrollEl, settings.classPrefix + 'content', true);
    toggleClass(element, 'is-enabled' + (settings.rtl ? ' is-rtl' : ''), true);

    // initialize scrollbars
    this.scrollbars = {
      v: Scrollbar('v', this),
      h: Scrollbar('h', this),
    };

    // create DOM scrollbars only if they have size or if it's forced
    if(G.scrollbarSpec.width || settings.forceScrollbars) {
      shouldCreateScrollbars = Utils.hideNativeScrollbars(scrollEl, settings.rtl);
    }

    if(shouldCreateScrollbars) {
      _invoke(this.scrollbars, 'create');
    }

    if(G.isTouch && settings.preventParentScroll) {
      toggleClass(element, settings.classPrefix + 'prevent', true);
    }

    // calculate scrollbars
    this.update();

    // bind container events
    this.bind();

    // add instance to global array for timed check
    if(settings.autoUpdate) {
      G.instances.push(this);
    }

    // start the timed check if it is not already running
    if(settings.autoUpdate && !G.checkTimer) {
      Utils.checkLoop();
    }

  },



  bind: function () {
    var listeners = this.listeners = {},
        scrollEl = this.scrollEl;

    // scroll event binding
    listeners.scroll = _throttle(Events.scroll.bind(this), GS.scrollMinUpdateInterval);

    if(G.isTouch) {
      listeners.touchstart = Events.touchstart.bind(this);
      listeners.touchend = Events.touchend.bind(this);
    }

    // Safari does not support wheel event
    listeners.mousewheel = listeners.wheel = Events.wheel.bind(this);

    for (var ev in listeners) {
      scrollEl.addEventListener(ev, listeners[ev], G.passiveEvent);
    }

  },




  update: function () {
    var scrollEl = this.scrollEl,
        cache = this.cache,
        oldcH = cache.clientH,
        sH = scrollEl.scrollHeight,
        cH = scrollEl.clientHeight,
        sW = scrollEl.scrollWidth,
        cW = scrollEl.clientWidth;

    if(sH !== cache.scrollH || cH !== cache.clientH ||
      sW !== cache.scrollW || cW !== cache.clientW) {

      cache.scrollH = sH;
      cache.clientH = cH;
      cache.scrollW = sW;
      cache.clientW = cW;

      // only fire if cache was defined
      if(oldcH !== undefined) {

        // if the element is no more in the DOM
        if(sH === 0 && cH === 0 && !document.body.contains(this.element)) {
          this.destroy();
          return false;
        }

        this.fireCustomEvent('sizechange');
      }

      // this will update the scrollbar
      // and check if bottom is reached
      _invoke(this.scrollbars, 'update');
    }
  },




  /**
   * Animate scrollTo
   */
  scrollTo: function (destX, destY, duration) {
    var cache = this.cache,
        startX, startY, endX, endY;

    G.pauseCheck = true;
    // force update
    this.update();

    startX = this.scrollEl.scrollLeft;
    startY = this.scrollEl.scrollTop;

    endX = +destX;
    if(destX === 'left') { endX = 0; }
    if(destX === 'right') { endX = cache.scrollW - cache.clientW; }
    if(destX === false) { endX = startX; }

    endY = +destY;
    if(destY === 'top') { endY = 0; }
    if(destY === 'bottom') { endY = cache.scrollH - cache.clientH; }
    if(destY === false) { endY = startY; }

    // animate
    this.animateScroll(startX, endX, startY, endY, +duration);

  },



  scrollIntoView: function (elem, duration, delta) {
    var scrollEl = this.scrollEl,
        eDim, sDim,
        leftEdge, topEdge, rightEdge, bottomEdge,
        offsetX, offsetY,
        startX, startY, endX, endY;

    G.pauseCheck = true;
    // force update
    this.update();

    if(typeof elem === 'string') { // selector
      elem = scrollEl.querySelector(elem);
    } else if(elem.length && elem.jquery) { // jquery element
      elem = elem[0];
    }

    if(typeof delta === 'number') { // same delta for all
      delta = { top: delta, right: delta, bottom: delta, left: delta };
    }

    delta = delta || {};
    eDim = elem.getBoundingClientRect();
    sDim = scrollEl.getBoundingClientRect();

    startX = endX = scrollEl.scrollLeft;
    startY = endY = scrollEl.scrollTop;
    offsetX = startX + eDim.left - sDim.left;
    offsetY = startY + eDim.top - sDim.top;

    leftEdge = offsetX - (delta.left || 0);
    topEdge = offsetY - (delta.top || 0);
    rightEdge = offsetX + eDim.width - this.cache.clientW + (delta.right || 0);
    bottomEdge = offsetY + eDim.height - this.cache.clientH + (delta.bottom || 0);

    if(leftEdge < startX) { endX = leftEdge; }
    if(rightEdge > startX) { endX = rightEdge; }

    if(topEdge < startY) { endY = topEdge; }
    if(bottomEdge > startY) { endY = bottomEdge; }

    // animate
    this.animateScroll(startX, endX, startY, endY, +duration);
  },




  animateScroll: function (startX, endX, startY, endY, duration) {
    var self = this,
        scrollEl = this.scrollEl,
        startTime = Date.now();

    if(endX === startX && endY === startY) {
      return;
    }

    if(duration === 0) {
      scrollEl.scrollLeft = endX;
      scrollEl.scrollTop = endY;
      return;
    }

    if(isNaN(duration)) { // undefined or auto
      // 500px in 430ms, 1000px in 625ms, 2000px in 910ms
      duration = Math.pow(Math.max(Math.abs(endX - startX), Math.abs(endY - startY)), 0.54) * 15;
    }

    (function animate () {
      var time = Math.min(1, ((Date.now() - startTime) / duration)),
          easedTime = Utils.easingFunction(time);

      if(endY !== startY) {
        scrollEl.scrollTop = ~~(easedTime * (endY - startY)) + startY;
      }
      if(endX !== startX) {
        scrollEl.scrollLeft = ~~(easedTime * (endX - startX)) + startX;
      }

      self.scrollAnimation = time < 1 ? window.requestAnimationFrame(animate) : null;
    }());
  },




  destroy: function () {
    var self = this,
        element = this.element,
        scrollEl = this.scrollEl,
        listeners = this.listeners,
        child;

    if(!this.scrollEl) { return; }

    // unbind events
    for (var ev in listeners) {
      scrollEl.removeEventListener(ev, listeners[ev]);
    }

    // remove scrollbars elements
    _invoke(this.scrollbars, 'remove');

    // unwrap content
    if (this.settings.wrapContent) {
      while(child = scrollEl.childNodes[0]) {
        element.insertBefore(child, scrollEl);
      }
      element.removeChild(scrollEl);
      this.scrollEl = null;
    }

    // remove classes
    toggleClass(element, this.settings.classPrefix + 'prevent', false);
    toggleClass(element, 'is-enabled', false);

    // defer instance removal from global array
    // to not affect checkLoop _invoke
    window.requestAnimationFrame(function () {
      var index = G.instances.indexOf(self);
      if (index > -1) {
        G.instances.splice(index, 1);
      }
    });
  },




  fireCustomEvent: function (eventName) {
    var cache = this.cache,
        sH = cache.scrollH, sW = cache.scrollW,
        eventData;

    eventData = {
      // scrollbars data
      scrollbarV: _extend({}, cache.v),
      scrollbarH: _extend({}, cache.h),

      // scroll position
      scrollTop: cache.v.position * sH,
      scrollLeft: cache.h.position * sW,
      scrollBottom: (1 - cache.v.position - cache.v.size) * sH,
      scrollRight: (1 - cache.h.position - cache.h.size) * sW,

      // element size
      scrollWidth: sW,
      scrollHeight: sH,
      clientWidth: cache.clientW,
      clientHeight: cache.clientH,
    };

    var event;
    if (typeof CustomEvent === 'function') {
      event = new CustomEvent(eventName, { detail: eventData });
    } else { // IE does not support CustomEvent
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, false, false, eventData);
    }
    this.element.dispatchEvent(event);
  },

};




var Events = {

  scroll: function (ev) {

    if (!G.pauseCheck) {
      this.fireCustomEvent('scrollstart');
    }
    G.pauseCheck = true;

    this.scrollbars.v.update();
    this.scrollbars.h.update();

    this.fireCustomEvent('scroll');

    clearTimeout(this.cache.timerStop);
    this.cache.timerStop = setTimeout(Events.scrollStop.bind(this), this.settings.scrollStopDelay);
  },


  touchstart: function (ev) {
    G.pauseCheck = false;
    this.scrollbars.v.update();
    this.scrollbars.h.update();

    Events.wheel.call(this, ev);
  },


  touchend: function (ev) {
    // prevents touchmove generate scroll event to call
    // scrollstop  while the page is still momentum scrolling
    clearTimeout(this.cache.timerStop);
  },


  scrollStop: function () {
    this.fireCustomEvent('scrollstop');
    G.pauseCheck = false;
  },


  wheel: function (ev) {
    var cache = this.cache,
        cacheV = cache.v,
        cacheH = cache.h,
        preventScroll = this.settings.preventParentScroll && G.isTouch;

    window.cancelAnimationFrame(this.scrollAnimation);

    if(preventScroll && cacheV.enabled && cacheV.percent % 100 === 0) {
      this.scrollEl.scrollTop = cacheV.percent ? (cache.scrollH - cache.clientH - 1) : 1;
    }
    if(preventScroll && cacheH.enabled && cacheH.percent % 100 === 0) {
      this.scrollEl.scrollLeft = cacheH.percent ? (cache.scrollW - cache.clientW - 1) : 1;
    }
  },


};


var Scrollbar = function (which, instance) {

  var isVertical = (which === 'v'),
      parentEl = instance.element,
      scrollEl = instance.scrollEl,
      settings = instance.settings,
      cache = instance.cache,
      scrollbarCache = cache[which] = {},

      sizeProp = isVertical ? 'H' : 'W',
      clientSize = 'client' + sizeProp,
      scrollSize = 'scroll' + sizeProp,
      scrollProp = isVertical ? 'scrollTop' : 'scrollLeft',
      evSuffixes = isVertical ? ['top','bottom'] : ['left','right'],
      evTypesMatcher = /^(mouse|touch|pointer)/,

      rtlMode = G.scrollbarSpec.rtl,
      enabled = false,
      scrollbarEl = null,
      trackEl = null;

  var events = {
    dragData: null,

    dragStart: function (ev) {
      ev.preventDefault();
      var evData = ev.touches ? ev.touches[0] : ev;
      events.dragData = { x: evData.pageX, y: evData.pageY, scroll: scrollEl[scrollProp] };
      events.bind(true, ev.type.match(evTypesMatcher)[1]);
    },

    dragMove: function (ev) {
      var evData = ev.touches ? ev.touches[0] : ev,
          dragMode = settings.rtl && rtlMode === 1 && !isVertical ? -1 : 1,
          delta, deltaRatio;

      ev.preventDefault();
      delta = isVertical ? evData.pageY - events.dragData.y : evData.pageX - events.dragData.x;
      deltaRatio = delta / cache[clientSize];

      scrollEl[scrollProp] = events.dragData.scroll + deltaRatio * cache[scrollSize] * dragMode;
    },

    dragEnd: function (ev) {
      events.dragData = null;
      events.bind(false, ev.type.match(evTypesMatcher)[1]);
    },

    bind: function (on, type) {
      var method = (on ? 'add' : 'remove') + 'EventListener',
          moveEv = type + 'move',
          upEv = type + (type === 'touch' ? 'end' : 'up');

      document[method](moveEv, events.dragMove);
      document[method](upEv, events.dragEnd);
      document[method](type + 'cancel', events.dragEnd);
    },

  };

  return {


    toggle: function (bool) {
      enabled = bool;

      if(trackEl) {
        toggleClass(parentEl, 'has-' + which + 'track', enabled);
      }

      // expose enabled
      scrollbarCache.enabled = enabled;
    },


    create: function () {
      scrollbarEl = document.createElement('div');
      trackEl = document.createElement('b');

      scrollbarEl.className = settings.classPrefix + which;
      trackEl.className = settings.classPrefix + which + 'track';
      scrollbarEl.appendChild(trackEl);
      parentEl.appendChild(scrollbarEl);

      if(settings.draggableTracks) {
        var evTypes = window.PointerEvent ? ['pointerdown'] : ['touchstart', 'mousedown'];
        evTypes.forEach(function (evType) {
          trackEl.addEventListener(evType, events.dragStart);
        });
      }
    },


    update: function () {
      var newSize, oldSize,
          newDim, newRelPos, deltaPos;

      // if scrollbar is disabled and no scroll
      if(!enabled && cache[clientSize] === cache[scrollSize]) {
        return;
      }

      newDim = this.calc();
      newSize = newDim.size;
      oldSize = scrollbarCache.size;
      newRelPos = (1 / newSize) * newDim.position * 100;
      deltaPos = Math.abs(newDim.position - (scrollbarCache.position || 0)) * cache[clientSize];

      if(newSize === 1 && enabled) {
        this.toggle(false);
      }

      if(newSize < 1 && !enabled) {
        this.toggle(true);
      }

      if(trackEl && enabled) {
        this.style(newRelPos, deltaPos, newSize, oldSize);
      }

      // update cache values
      scrollbarCache = _extend(scrollbarCache, newDim);

      if(enabled) {
        this.fireEdgeEv();
      }

    },


    style: function (newRelPos, deltaPos, newSize, oldSize) {
      if(newSize !== oldSize) {
        trackEl.style[ isVertical ? 'height' : 'width' ] = newSize * 100 + '%';
        if (settings.rtl && !isVertical) {
          trackEl.style.marginRight = (1 - newSize) * 100 + '%';
        }
      }
      trackEl.style[G.cssTransform] = 'translate(' +
        (isVertical ? '0%,' + newRelPos + '%' : newRelPos + '%' + ',0%')
        + ')';
    },


    calc: function () {
      var position = scrollEl[scrollProp],
          viewS = cache[clientSize],
          scrollS = cache[scrollSize],
          sizeRatio = viewS / scrollS,
          sizeDiff = scrollS - viewS,
          positionRatio, percent;

      if(sizeRatio >= 1 || !scrollS) { // no scrollbars needed
        return { position: 0, size: 1, percent: 0 };
      }
      if (!isVertical && settings.rtl && rtlMode) {
        position = sizeDiff - position * rtlMode;
      }

      percent = 100 * position / sizeDiff;

      // prevent overscroll effetcs (negative percent)
      // and keep 1px tolerance near the edges
      if(position <= 1) { percent = 0; }
      if(position >= sizeDiff - 1) { percent = 100; }

      // Capped size based on min/max track percentage
      sizeRatio = Math.max(sizeRatio, settings.minTrackSize / 100);
      sizeRatio = Math.min(sizeRatio, settings.maxTrackSize / 100);

      positionRatio = (1 - sizeRatio) * (percent / 100);

      return { position: positionRatio, size: sizeRatio, percent: percent };
    },


    fireEdgeEv: function () {
      var percent = scrollbarCache.percent;

      if(scrollbarCache.was !== percent && percent % 100 === 0) {
        instance.fireCustomEvent('scrollreachedge');
        instance.fireCustomEvent('scrollreach' + evSuffixes[percent / 100]);
      }

      scrollbarCache.was = percent;
    },


    remove: function () {
      // remove parent custom classes
      this.toggle(false);
      // remove elements
      if(scrollbarEl) {
        scrollbarEl.parentNode.removeChild(scrollbarEl);
        scrollbarEl = null;
      }
    },

  };

};


var Utils = {

  hideNativeScrollbars: function (scrollEl, isRtl) {
    var size = G.scrollbarSpec.width,
        scrollElStyle = scrollEl.style;
    if(size === 0) {
      // hide Webkit/touch scrollbars
      var time = Date.now();
      scrollEl.setAttribute('data-scroll', time);
      return Utils.addCssRule('[data-scroll="' + time + '"]::-webkit-scrollbar', 'display:none;width:0;height:0;');
    } else {
      scrollElStyle[isRtl ? 'left' : 'right'] = -size + 'px';
      scrollElStyle.bottom = -size + 'px';
      return true;
    }
  },


  addCssRule: function (selector, rules) {
    var styleSheet = document.getElementById('scroll-sheet');
    if(!styleSheet) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'scroll-sheet';
      styleSheet.appendChild(document.createTextNode('')); // WebKit hack
      document.head.appendChild(styleSheet);
    }
    try {
      styleSheet.sheet.insertRule(selector + ' {' + rules + '}', 0);
      return true;
    } catch (e) { return; }
  },


  createWrapper: function (element, className) {
    var wrapper = document.createElement('div'),
        child;
    while(child = element.childNodes[0]) {
      wrapper.appendChild(child);
    }
    return element.appendChild(wrapper);
  },


  // Global height checker
  // looped to listen element changes
  checkLoop: function () {

    if(!G.instances.length) {
      G.checkTimer = null;
      return;
    }

    if(!G.pauseCheck) { // check size only if not scrolling
      _invoke(G.instances, 'update');
    }

    if(GS.checkFrequency) {
      G.checkTimer = setTimeout(function () {
        Utils.checkLoop();
      }, GS.checkFrequency);
    }
  },


  // easeOutCubic function
  easingFunction: function (t) {
    return (--t) * t * t + 1;
  },


};



// Global variables
var G = Optiscroll.G = {
  isTouch: 'ontouchstart' in window,
  cssTransition: cssTest('transition'),
  cssTransform: cssTest('transform'),
  scrollbarSpec: getScrollbarSpec(),
  passiveEvent: getPassiveSupport(),

  instances: [],
  checkTimer: null,
  pauseCheck: false,
};


// Get scrollbars width, thanks Google Closure Library
function getScrollbarSpec () {
  var htmlEl = document.documentElement,
      outerEl, innerEl, width = 0, rtl = 1; // IE is reverse

  outerEl = document.createElement('div');
  outerEl.style.cssText = 'overflow:scroll;width:50px;height:50px;position:absolute;left:-100px;direction:rtl';

  innerEl = document.createElement('div');
  innerEl.style.cssText = 'width:100px;height:100px';

  outerEl.appendChild(innerEl);
  htmlEl.appendChild(outerEl);
  width = outerEl.offsetWidth - outerEl.clientWidth;
  if (outerEl.scrollLeft > 0) {
    rtl = 0; // webkit is default
  } else {
    outerEl.scrollLeft = 1;
    if (outerEl.scrollLeft === 0) {
      rtl = -1; // firefox is negative
    }
  }
  htmlEl.removeChild(outerEl);

  return { width: width, rtl: rtl };
}


function getPassiveSupport () {
  var passive = false;
  var options = Object.defineProperty({}, 'passive', {
    get: function () { passive = true; },
  });
  window.addEventListener('test', null, options);
  return passive ? { capture: false, passive: true } : false;
}


// Detect css3 support, thanks Modernizr
function cssTest (prop) {
  var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
      el = document.createElement('test'),
      props = [prop, 'Webkit' + ucProp];

  for (var i in props) {
    if(el.style[props[i]] !== undefined) { return props[i]; }
  }
  return '';
}



function toggleClass (el, value, bool) {
  var classes = el.className.split(/\s+/),
      index = classes.indexOf(value);

  if(bool) {
    ~index || classes.push(value);
  } else {
    ~index && classes.splice(index, 1);
  }

  el.className = classes.join(' ');
}




function _extend (dest, src, merge) {
  for(var key in src) {
    if(!src.hasOwnProperty(key) || dest[key] !== undefined && merge) {
      continue;
    }
    dest[key] = src[key];
  }
  return dest;
}


function _invoke (collection, fn, args) {
  var i, j;
  if(collection.length) {
    for(i = 0, j = collection.length; i < j; i++) {
      collection[i][fn].apply(collection[i], args);
    }
  } else {
    for (i in collection) {
      collection[i][fn].apply(collection[i], args);
    }
  }
}

function _throttle(fn, threshhold) {
  var last, deferTimer;
  return function () {
    var context = this,
        now = Date.now(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}



  // AMD export
  if(true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){
      return Optiscroll;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  // commonjs export
  if( true && module.exports) {
    module.exports = Optiscroll;
  }

  window.Optiscroll = Optiscroll;

})(window, document, Math);


/***/ }),

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
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].remove(this.elements, {
        uid: checkbox.uid
      });
      this.index = -1;
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
    uid: function uid() {
      return this._.uid;
    },
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
    var classList = ['n-checkbox', 'n-checkbox--' + this.size, 'n-checkbox--' + this.type];

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

  __webpack_require__(/*! ./scrollbar/index */ "./src/scrollbar/index.js")["default"](App);

  __webpack_require__(/*! ./popover/index */ "./src/popover/index.js")["default"](App);

  __webpack_require__(/*! ./button/index */ "./src/button/index.js")["default"](App);

  __webpack_require__(/*! ./input/index */ "./src/input/index.js")["default"](App);

  __webpack_require__(/*! ./textarea/index */ "./src/textarea/index.js")["default"](App);

  __webpack_require__(/*! ./select/index */ "./src/select/index.js")["default"](App);

  __webpack_require__(/*! ./checkbox/index */ "./src/checkbox/index.js")["default"](App);

  __webpack_require__(/*! ./radio/index */ "./src/radio/index.js")["default"](App);

  __webpack_require__(/*! ./switch/index */ "./src/switch/index.js")["default"](App);

  __webpack_require__(/*! ./modal/index */ "./src/modal/index.js")["default"](App); // require('./confirm/index');
  //require('./config/index');
  // require('./chart/index');
  // require('./resizer/index');
  // require('./virtualscroller/index');
  // require('./draggable/index');
  // require('./loader/index');
  // require('./form/index');
  // require('./cascader/index');
  // require('./datepicker/index');
  // require('./timepicker/index');
  // require('./transfer/index');
  // require('./file/index');
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
      this.$emit('click:icon', event);
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
  model: {
    prop: 'visible'
  },
  inject: {
    NScrollbar: {
      "default": undefined
    }
  },
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
    boundary: {
      "default": function _default() {
        return document.body;
      }
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
    closeOutside: {
      "default": function _default() {
        return false;
      },
      type: [Boolean]
    },
    transitionModal: {
      "default": function _default() {
        return 'n-fade-up';
      },
      type: [String]
    },
    transitionBackdrop: {
      "default": function _default() {
        return 'n-fade';
      },
      type: [String]
    }
  },
  watch: {
    visible: function visible() {
      if (this.visible !== this.veVisible) {
        this.veVisible = this.visible;
      }
    }
  },
  methods: {
    open: function open() {
      this.$emit('input', this.veVisible = true);
    },
    close: function close(event) {
      if (event) {
        event.stopPropagation();
      }

      this.$emit('input', this.veVisible = false);
    },
    addClass: function addClass() {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('n-open');
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.target).addClass('n-open');
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).addClass('n-open');
    },
    removeClass: function removeClass() {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).removeClass('n-open');
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.target).removeClass('n-open');
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).removeClass('n-open');
    },
    eventClick: function eventClick(event, target) {
      if (event.which !== 1) {
        return;
      }

      if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(target).closest('.n-disabled')) {
        return;
      }

      var result = !!nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(target).closest(this.target) || this.veVisible;

      if (this.veVisible && this.closeOutside) {
        result = !nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(target).closest(this.$refs.backdrop);
      }

      if (result === this.veVisible) {
        return;
      }

      if (!result) {
        return this.$emit('close');
      }

      this.$emit('input', this.veVisible = !!result);
    },
    eventKeydown: function eventKeydown(event, target) {
      var _this = this;

      if (!this.veVisible || !this.closable) {
        return;
      }

      if (event.which !== 27) {
        return;
      }

      var toIndex = 0;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find('.n-modal.n-open').each(function (el) {
        if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).attr('data-index') < toIndex) {
          return;
        }

        toIndex = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(el).attr('data-index');
      });
      var meIndex = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).attr('data-index');

      if (toIndex !== meIndex) {
        return;
      }

      this.$nextTick(function () {
        return _this.$emit('close');
      });
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
      veVisible: this.visible
    };
  },
  mounted: function mounted() {
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('click', this.eventClick, {
      _uid: this.uid
    });
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('keydown', this.eventKeydown, {
      _uid: this.uid
    }); // if ( ! this.$listeners.close ) {
    //     this.$on('close', this.close);
    // }

    this.target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).previous().get(0);

    if (!nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.selector)) {
      this.target = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).parent().find(this.selector).get(0);
    }

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).append(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    this.$off('close');
    this.$el.remove();
  },
  destroyed: function destroyed() {
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).off('click', null, {
      _uid: this.uid
    });
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).off('keydown', null, {
      _uid: this.uid
    });
  },
  renderClose: function renderClose() {
    var _this2 = this;

    if (!this.closable) {
      return null;
    }

    var events = {
      click: function click() {
        return _this2.$emit('close');
      }
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-modal__close",
      "on": events
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", {
      "class": this.icons.times
    }, null)]);
  },
  renderHeader: function renderHeader() {
    if (!this.$slots.header && !this.title) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-modal__header"
    }, [[this.$slots.header() || this.title, this.ctor('renderClose')()]]);
  },
  renderFooter: function renderFooter() {
    if (!this.$slots.footer) {
      return null;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-modal__footer"
    }, [this.$slots.footer]);
  },
  renderBody: function renderBody() {
    var _this3 = this;

    var style = {
      width: this.width,
      height: this.height
    };

    var rawHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "key": this.veVisible ? '1' : '0',
      "class": "n-modal__frame",
      "style": style
    }, [this.$slots.raw && this.$slots.raw()]);

    if (this.$slots.raw) {
      return rawHtml;
    }

    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "key": this.veVisible ? '1' : '0',
      "class": "n-modal__frame",
      "style": style
    }, [this.ctor('renderHeader')(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-modal__body"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NScrollbar"), {
      "ref": "scrollbar",
      "class": "n-modal__wrap",
      "relative": true
    }, {
      "default": function _default() {
        return [_this3.$slots["default"]];
      }
    })]), this.ctor('renderFooter')()]);
  },
  renderBackdrop: function renderBackdrop() {
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "ref": "backdrop",
      "key": this.veVisible ? '1' : '0',
      "class": "n-modal__backdrop"
    }, null);
  },
  renderModal: function renderModal() {
    var _this4 = this;

    if (!window.zIndex) {
      window.zIndex = 9000;
    }

    var style = {
      zIndex: window.zIndex++
    };
    var classList = ['n-modal', 'n-modal--' + this.type, 'n-modal--' + this.position];

    if (this.closable) {
      classList.push('n-closable');
    }

    var events = {
      'beforeEnter': this.addClass,
      'afterLeave': this.removeClass
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": classList,
      "style": style,
      "data-index": window.zIndex
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("transition"), {
      "name": this.transitionModal,
      "mode": "out-in"
    }, {
      "default": function _default() {
        return [_this4.veVisible ? _this4.ctor('renderBody')() : null];
      }
    }), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("transition"), {
      "name": this.transitionBackdrop,
      "mode": "out-in",
      "on": events
    }, {
      "default": function _default() {
        return [_this4.veVisible ? _this4.ctor('renderBackdrop')() : null];
      }
    })]);
  },
  render: function render() {
    return this.ctor('renderModal')();
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
    clickClose: {
      "default": function _default() {
        return true;
      },
      type: [Boolean]
    }
  },
  computed: {
    size: function size() {
      return this.NPopover.size;
    }
  },
  methods: {
    onClick: function onClick(event) {
      if (this.clickClose) {
        this.NPopover.close();
      }
    }
  },
  render: function render() {
    var classList = ['n-popover-option', 'n-popover-option--' + this.type, 'n-popover-option--' + this.size];

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
    }, props), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("span", null, [this.$slots["default"]()])]);
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
        return 15;
      },
      type: [Number]
    }
  },
  watch: {
    modelValue: function modelValue() {
      this.tempValue = this.modelValue;
    },
    tempValue: function tempValue() {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(this.refreshVisible, 50);
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

    if (this.trigger === 'hover') {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('mousemove', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onHover, 30), this._.uid);
    }

    if (this.trigger === 'click') {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('mousedown', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onClick, 30), this._.uid);
    }

    if (this.trigger === 'context') {
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('contextmenu', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onContext, 30), this._.uid);
    }

    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document.body).on('mousedown', nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].framerate(this.onExit, 30), this._.uid);
  },
  beforeUnmount: function beforeUnmount() {
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('mousemove', null, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('mousedown', null, this._.uid);
    nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(document).off('contextmenu', null, this._.uid);
    this.$el.remove();
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

      if (scrollClose) {
        this.$emit('scrollClose');
      }

      this.$emit('update:modelValue', this.tempValue = false);
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
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(function () {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(_this.$el).addClass('n-ready');
      }, 100);
    },
    stopRefreshInterval: function stopRefreshInterval() {
      clearInterval(this.refresh);
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

      var inverse = this.position;

      if (position.match(/^(top)\-/)) {
        inverse = inverse.replace(/^(top)\-/, 'bottom-');
      }

      if (position.match(/^(bottom)\-/)) {
        inverse = inverse.replace(/^(bottom)\-/, 'top-');
      }

      var broken = offset.y + windowRect.height > window.innerHeight || offset.y < 0;

      if (this.scrollClose && broken) {
        return this.getTargetHorizontal(inverse);
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

      var inverse = this.position;

      if (position.match(/^(left)\-/)) {
        inverse = inverse.replace(/^(left)\-/, 'right-');
      }

      if (position.match(/^(right)\-/)) {
        inverse = inverse.replace(/^(right)\-/, 'left-');
      }

      var broken = offset.x + windowRect.width > window.innerWidth || offset.x < 0;

      if (this.scrollClose && broken) {
        return this.getTargetVertical(inverse);
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

      if (this.width) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).css({
          width: this.width + 'px'
        });
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

/***/ "./src/scrollbar/index.js":
/*!********************************!*\
  !*** ./src/scrollbar/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_scrollbar_scrollbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/scrollbar/scrollbar */ "./src/scrollbar/src/scrollbar/scrollbar.js");

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  App.component(_src_scrollbar_scrollbar__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_scrollbar_scrollbar__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "./src/scrollbar/src/scrollbar/scrollbar.js":
/*!**************************************************!*\
  !*** ./src/scrollbar/src/scrollbar/scrollbar.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-js */ "nano-js");
/* harmony import */ var nano_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var optiscroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! optiscroll */ "./node_modules/optiscroll/dist/optiscroll.js");
/* harmony import */ var optiscroll__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(optiscroll__WEBPACK_IMPORTED_MODULE_2__);




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
    framerate: {
      "default": function _default() {
        return 15;
      },
      type: [Number]
    }
  },
  methods: {
    scrollTo: function scrollTo(selector) {
      var _this = this;

      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(function () {
        return _this.onScrollTo(selector, offset);
      }, delay);
    },
    onScrollTo: function onScrollTo(selector) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.content).find(selector).offset('top', this.$refs.content);
      this.optiscroll.scrollTo(0, y + offset, 0);
    },
    scrollIntoView: function scrollIntoView(selector) {
      var _this2 = this;

      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(function () {
        return _this2.onScrollIntoView(selector);
      }, delay);
    },
    onScrollIntoView: function onScrollIntoView(selector) {
      this.optiscroll.scrollIntoView(selector, 0);
    },
    bindOptiscroll: function bindOptiscroll() {
      var _this3 = this;

      optiscroll__WEBPACK_IMPORTED_MODULE_2___default.a.globalSettings.checkFrequency = 250;
      optiscroll__WEBPACK_IMPORTED_MODULE_2___default.a.globalSettings.scrollMinUpdateInterval = 25;
      var options = {
        classPrefix: 'n-scrollbar-',
        minTrackSize: 15,
        forceScrollbars: true,
        autoUpdate: true,
        preventParentScroll: true,
        wrapContent: false
      };
      this.optiscroll = new optiscroll__WEBPACK_IMPORTED_MODULE_2___default.a(this.$el, options);
      nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].delay(function () {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(_this3.$el).addClass('is-ready');
      }, 500);
    },
    unbindOptiscroll: function unbindOptiscroll() {
      this.optiscroll.destroy();
    },
    adaptHeight: function adaptHeight() {
      var height = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.content).child().height();
      var window = nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).height();

      if (height === this.passedHeight) {
        return;
      }

      if (window >= height) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).addClass('is-fixed');
      }

      if (window < height) {
        nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$el).removeClass('is-fixed');
      }

      if (window) {
        this.passedHeight = height;
      }

      if (!this.relative) {
        return;
      }

      nano_js__WEBPACK_IMPORTED_MODULE_1__["Dom"].find(this.$refs.spacer).child().css({
        height: height + 'px'
      });
    },
    bindAdaptHeight: function bindAdaptHeight() {
      this.refresh = setInterval(this.adaptHeight, 1000 / this.framerate);
    },
    unbindAdaptHeight: function unbindAdaptHeight() {
      clearInterval(this.refresh);
    }
  },
  mounted: function mounted() {
    this.bindAdaptHeight();
    this.bindOptiscroll();
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindAdaptHeight();
    this.unbindOptiscroll();
  },
  render: function render() {
    var classList = ['n-scrollbar', 'is-fixed'];
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "class": classList
    }, this.$attrs), [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-scrollbar-content",
      "ref": "content"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", null, [this.$slots["default"]()])]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-scrollbar-spacer",
      "ref": "spacer"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", null, null)])]);
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
    }; // Required for scrolldown

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
      }

      this.focusInput();
      this.focus = true;
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
    focusInput: function focusInput() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (event) {
        event.preventDefault();
      }

      this.$refs.input.focus();
    },
    blurInput: function blurInput() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.$refs.input.blur();
    },
    onFocusInput: function onFocusInput() {
      clearInterval(this.refresh);
      this.$refs.popover.open();
    },
    onBlurInput: function onBlurInput() {
      var _this = this;

      setTimeout(function () {
        _this.index = -1;
        _this.search = '';

        _this.$refs.popover.close();
      }, 100);
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

      if (!selected) {
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
    var _this2 = this;

    var classList = ['n-select__item'];
    var props = {
      "class": this.icons.times
    };

    if (!this.disabled) {
      props.onMousedown = function (event) {
        return _this2.toggleOption(value, event);
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
    var _this3 = this;

    if (this.collapse) {
      return this.ctor('renderLabelCollapse')();
    }

    return nano_js__WEBPACK_IMPORTED_MODULE_1__["Arr"].each(this.tempValue, function (value) {
      return _this3.ctor('renderLabelItem')(value);
    });
  },
  renderMultiple: function renderMultiple() {
    var isEmptyValue = nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.tempValue) && !nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isNumber(this.tempValue);
    var props = {
      value: this.search,
      placeholder: this.placeholder,
      disabled: this.disabled,
      onBlur: this.onBlurInput,
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

    return [this.ctor('renderLabelClear')(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__items"
    }, [this.ctor('renderLabelItems')(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__input"
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("input", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "input"
    }, props), null)])]), this.ctor('renderLabelAngle')()];
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
      onBlur: this.onBlurInput,
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
    var _slot;

    var emptyHtml = Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
      "class": "n-select__empty"
    }, [this.trans(this.emptyText)]);

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
    }, props), _isSlot(_slot = nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].values(options)) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    });
  },
  renderPopover: function renderPopover() {
    var _this4 = this;

    var props = {
      trigger: 'click',
      width: -1,
      size: this.size,
      scrollClose: true,
      disabled: this.disabled,
      onScrollClose: this.blurInput
    };
    return Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("NPopover"), Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
      "ref": "popover",
      "modelValue": _this4.focus,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return _this4.focus = $event;
      }
    }, props), {
      raw: this.ctor('renderItems')
    });
  },
  renderOptions: function renderOptions() {
    var _this5 = this;

    if (nano_js__WEBPACK_IMPORTED_MODULE_1__["Any"].isEmpty(this.options)) {
      return this.$slots["default"]();
    }

    var optionRender = function optionRender($value, $index) {
      var props = {
        label: nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get({
          $value: $value,
          $index: $index
        }, _this5.optionsLabel, null),
        value: nano_js__WEBPACK_IMPORTED_MODULE_1__["Obj"].get({
          $value: $value,
          $index: $index
        }, _this5.optionsValue, null)
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
      "onMousedown": this.focusInput
    }, [this.ctor('renderDisplay')(), this.ctor('renderOptions')(), this.ctor('renderPopover')()]);
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