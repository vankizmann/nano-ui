import Vue from "vue";
import CtorMixin from "./mixins/src/ctor";
import CmerMixin from "./mixins/src/cmer";

let NanoIcons = {
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
    angleLeft: 'fa fa-angle-left',
};

let NanoStyles = {
    iconPosition: 'before',
    notifyPosition: 'bottom-start'
};

export function NanoInstall(App, Icons = {}, Styles = {})
{
    if ( global.Nano === undefined ) {
        return console.error('Nano JS is not available in scope.');
    }

    global.Nano.install(App.config.globalProperties);

    App.config.globalProperties.ctor = CtorMixin.ctor;
    App.config.globalProperties.cmer = CmerMixin.cmer;

    App.config.globalProperties.trans = global.Nano.Locale.trans;
    App.config.globalProperties.choice = global.Nano.Locale.choice;

    if ( ! global.NanoIcons ) {
        global.NanoIcons = Nano.Obj.assign(NanoIcons, global.NanoIcons);
    }

    App.config.globalProperties.icons = Nano.Obj.assign(global.NanoIcons, Icons);

    if ( ! global.NanoStyles ) {
        global.NanoStyles = Nano.Obj.assign(NanoStyles, global.NanoStyles);
    }

    App.config.globalProperties.styles = Nano.Obj.assign(global.NanoStyles, Styles);

    //require('./config/index');
    // require('./chart/index');
    // require('./notification/index');
    // require('./scrollbar/index');
    // require('./resizer/index');
    // require('./virtualscroller/index');
    // require('./draggable/index');
    // require('./loader/index');
    // require('./form/index');
    require('./button/index').default(App);
    require('./input/index').default(App);
    // require('./textarea/index');
    // require('./switch/index');
    // require('./checkbox/index');
    // require('./radio/index');
    require('./select/index').default(App);
    // require('./cascader/index');
    // require('./datepicker/index');
    // require('./timepicker/index');
    // require('./transfer/index');
    // require('./file/index');
    require('./popover/index').default(App);
    // require('./modal/index');
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

export default NanoInstall;
