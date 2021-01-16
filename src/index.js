import CtorMixin from "./mixins/src/ctor";
import CmerMixin from "./mixins/src/cmer";

let NanoIcons = {
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

    require('./notification/index').default(App);
    require('./empty/index').default(App);
    //require('./config/index'); //!complex 17.1
    require('./scrollbar/index').default(App);
    require('./virtualscroller/index').default(App);
    require('./draggable/index').default(App);
    // require('./loader/index'); //16.1
    require('./resizer/index').default(App); //check
    require('./popover/index').default(App);
    require('./modal/index').default(App);
    require('./button/index').default(App); // group 14.1
    require('./input/index').default(App);
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
    require('./transfer/index').default(App); // check
    require('./form/index').default(App); // check
    // require('./tabs/index'); // 16.1
    require('./table/index').default(App); // check
    // require('./paginator/index'); // 16.1
    // require('./info/index'); //!complex 16.1

    // require('./map/index'); // SX only ez 17.1
    // require('./file-list/index'); // SX only 17.1
    // require('./file/index'); // SX only 17.1

    // require('./chart/index'); // Ignore
    // require('./wysiwyg/index'); // Ignore
}

global.NanoInstall = NanoInstall;

export default NanoInstall;
