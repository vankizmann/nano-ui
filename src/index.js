import { Arr, Obj, Dom, Locale } from "@kizmann/pico-js";

import CtorMixin from "./mixins/src/ctor";
import CmerMixin from "./mixins/src/cmer";
import CsloMixin from "./mixins/src/cslo";

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

export function Install(App, Icons = {}, Styles = {})
{
    /**
     * @const global.pi
     */

    if ( typeof global.pi === 'undefined' ) {
        return console.error('pico-js is not available.');
    }

    Obj.each(global.pi, (value, key) => {
        App.config.globalProperties[key] = value;
    });

    App.config.globalProperties.ctor = CtorMixin.ctor;
    App.config.globalProperties.cmer = CmerMixin.cmer;
    App.config.globalProperties.cslo = CsloMixin.cslo;

    App.config.globalProperties.trans = Locale.trans;
    App.config.globalProperties.choice = Locale.choice;

    global.nano.Icons = Obj.assign(Icons, global.nano.Icons);
    global.nano.Settings = Obj.assign(Settings, global.nano.Settings);

    require('./notification/index').default(App);
    require('./empty/index').default(App);
    require('./config/index').default(App); //!complex 17.1
    require('./scrollbar/index').default(App);
    require('./virtualscroller/index').default(App);
    require('./draggable/index').default(App);
    require('./loader/index').default(App);
    require('./resizer/index').default(App);
    require('./popover/index').default(App);
    require('./modal/index').default(App);
    require('./button/index').default(App);
    require('./input/index').default(App);
    require('./input-number/index').default(App);
    require('./textarea/index').default(App);
    require('./select/index').default(App);
    require('./checkbox/index').default(App);
    require('./radio/index').default(App);
    require('./switch/index').default(App);
    require('./confirm/index').default(App);
    require('./cascader/index').default(App);
    require('./datepicker/index').default(App);
    require('./timepicker/index').default(App);
    // require('./datetimepicker/index'); 18.1
    require('./transfer/index').default(App);
    require('./form/index').default(App); // check
    require('./tabs/index').default(App);
    require('./table/index').default(App); // 18.1 options
    require('./paginator/index').default(App);
    require('./info/index').default(App); //!complex 16.1
    require('./preview/index').default(App);
    require('./map/index').default(App);
    require('./file/index').default(App);

    // SX only ez 17.1
    // require('./file-list/index'); // SX only 17.1

    // require('./chart/index'); // Ignore
    // require('./wysiwyg/index'); // Ignore
}

export const Nano = {
    Icons: Icons, Settings: Settings, Install: Install
};

global.keyMods = [];

Dom.find(document).on('keydown', (event) => {
    Arr.add(global.keyMods, event.which);
});

Dom.find(document).on('keyup', (event) => {
    Arr.remove(global.keyMods, event.which);
});

if ( typeof global.nano === 'undefined' ) {
    global.nano = Nano;
}

export default Nano;
