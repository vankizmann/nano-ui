import Vue from "vue";

import RenderDiv from './src/render-div/render-div';
Vue.component(RenderDiv.name, RenderDiv);

import RenderScrollbar from './src/render-scrollbar/render-scrollbar.beta';
Vue.component(RenderScrollbar.name, RenderScrollbar);

import RenderList from './src/render-list/render-list.beta2';
Vue.component(RenderList.name, RenderList);
