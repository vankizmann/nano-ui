import Vue from "vue";

import Notifcation from './src/notification/notification';
Vue[Notifcation.alias] = Vue.prototype[Notifcation.alias] = Notifcation.handle;
