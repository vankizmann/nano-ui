import { Arr, Obj, Dom, Locale } from "@kizmann/pico-js";

import CtorMixin from "./mixins/src/ctor.js";
import CmerMixin from "./mixins/src/cmer.js";
import CsloMixin from "./mixins/src/cslo.js";

export const Icons = {
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

export const Settings = {
    iconPosition: 'before',
    notifySize: 'md',
    notifyPosition: 'bottom-start'
};

export function Install(App, Icons = {})
{
    /**
     * @const window.pi
     */

    if ( typeof window.pi === 'undefined' ) {
        return console.error('pico-js is not available.');
    }

    Obj.each(window.pi, (value, key) => {
        App.config.globalProperties[key] = value;
    });

    App.config.globalProperties.ctor = CtorMixin.ctor;
    App.config.globalProperties.cmer = CmerMixin.cmer;
    App.config.globalProperties.cslo = CsloMixin.cslo;

    App.config.globalProperties.trans = Locale.trans;
    App.config.globalProperties.choice = Locale.choice;

    window.nano.Icons = Obj.assign(Icons, window.nano.Icons);
    window.nano.Settings = Obj.assign(Settings, window.nano.Settings);

    require('./alert/index.js').default(App);
    require('./notification/index.js').default(App);
    require('./empty/index.js').default(App);
    require('./config/index.js').default(App); //!complex 17.1
    require('./scrollbar/index.js').default(App);
    require('./virtualscroller/index.js').default(App);
    require('./draggable/index.js').default(App);
    require('./loader/index.js').default(App);
    require('./resizer/index.js').default(App);
    require('./popover/index.js').default(App);
    require('./modal/index.js').default(App);
    require('./button/index.js').default(App);
    require('./input/index.js').default(App);
    require('./input-number/index.js').default(App);
    require('./textarea/index.js').default(App);
    require('./select/index.js').default(App);
    require('./checkbox/index.js').default(App);
    require('./radio/index.js').default(App);
    require('./slider/index.js').default(App);
    require('./switch/index.js').default(App);
    require('./confirm/index.js').default(App);
    require('./cascader/index.js').default(App);
    require('./datepicker/index.js').default(App);
    require('./timepicker/index.js').default(App);
    require('./datetimepicker/index.js').default(App);
    require('./durationpicker/index.js').default(App);
    require('./transfer/index.js').default(App);
    require('./form/index.js').default(App); // check
    require('./tabs/index.js').default(App);
    require('./tags/index.js').default(App);
    require('./collapse/index.js').default(App);
    require('./table/index.js').default(App); // 18.1 options
    require('./paginator/index.js').default(App);
    require('./info/index.js').default(App); //!complex 16.1
    require('./preview/index.js').default(App);
    require('./map/index.js').default(App);
    require('./file/index.js').default(App);
    require('./rating/index.js').default(App);
    require('./drawer/index.js').default(App);

    // require('./chart/index.js'); // Ignore
    // require('./wysiwyg/index.js'); // Ignore
}

export const Nano = {
    Icons: Icons, Settings: Settings, Install: Install
};

window.keyMods = [];

Dom.find(document).on('keydown', (event) => {
    Arr.add(window.keyMods, event.which);
});

Dom.find(document).on('keyup', (event) => {
    Arr.remove(window.keyMods, event.which);
});

Dom.find(document).on('dragstart', (event) => {
    Arr.add(window.keyMods, event.which);
});

Dom.find(document).on('dragend', (event) => {
    window.keyMods = [];
});

if ( typeof window.nano === 'undefined' ) {
    window.nano = Nano;
}

export default Nano;
