
import * as Vue from "vue/dist/vue.esm-bundler";
window.Vue = Vue;

// docsify.js
window.$docsify = require('docsify')

// moment.js
window.moment = require('moment');

// pico.js
window.pi = require('@kizmann/pico-js');


window.pi.Dom.ready(() => {
    require('./theme/basic.js');
    require('./theme/docsify.js');

    // docsify.js search plugin
    require('docsify/lib/plugins/search');
});