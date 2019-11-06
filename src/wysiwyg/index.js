import Vue from "vue";

import Wysiwyg from "./src/wysiwyg/wysiwyg";
Vue.component(Wysiwyg.name, Wysiwyg);

import WysiwygPluginBold from "./src/wysiwyg-plugin/plugins/wysiwyg-plugin-bold";
Vue.component(WysiwygPluginBold.name, WysiwygPluginBold);

import WysiwygPluginLink from "./src/wysiwyg-plugin/plugins/wysiwyg-plugin-link";
Vue.component(WysiwygPluginLink.name, WysiwygPluginLink);