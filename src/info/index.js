import Vue from "vue";

import Info from './src/info/info';
Vue.component(Info.name, Info);

import InfoColumn from './src/info-column/info-column';
Vue.component(InfoColumn.name, InfoColumn);

import InfoFieldString from './src/info-field/types/info-field-string';
Vue.component(InfoFieldString.name, InfoFieldString);

import InfoFieldBoolean from './src/info-field/types/info-field-boolean';
Vue.component(InfoFieldBoolean.name, InfoFieldBoolean);

import InfoFieldDatetime from './src/info-field/types/info-field-datetime';
Vue.component(InfoFieldDatetime.name, InfoFieldDatetime);

import InfoFieldOption from './src/info-field/types/info-field-option';
Vue.component(InfoFieldOption.name, InfoFieldOption);

import InfoFieldImage from './src/info-field/types/info-field-image';
Vue.component(InfoFieldImage.name, InfoFieldImage);
