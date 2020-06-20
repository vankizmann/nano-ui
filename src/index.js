import CtorMixin from "./mixins/src/ctor";

let scope = {};

if (typeof global !== 'undefined') {
    scope = global;
}

if (typeof window !== 'undefined') {
    scope = window;
}

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
};

export function Install(Vue, Icons = {}, Styles = {})
{
    if ( scope.Nano === undefined ) {
        return console.error('Nano JS is not available in window scope.');
    }

    scope.Nano.install(Vue);

    Vue.prototype.ctor = CtorMixin.ctor;

    Vue.prototype.trans = scope.Nano.Locale.trans;
    Vue.prototype.choice = scope.Nano.Locale.choice;

    if ( ! scope.NanoIcons ) {
        scope.NanoIcons = Nano.Obj.assign(NanoIcons, scope.NanoIcons);
    }

    Vue.prototype.icons = Vue.Obj.assign(scope.NanoIcons, Icons);

    if ( ! scope.NanoStyles ) {
        scope.NanoStyles = Nano.Obj.assign(NanoStyles, scope.NanoStyles);
    }

    Vue.prototype.styles = Vue.Obj.assign(scope.NanoStyles, Styles);

    require('./config/index');
    require('./chart/index');
    require('./notification/index');
    require('./scrollbar/index');
    require('./resizer/index');
    require('./virtualscroller/index');
    require('./draggable/index');
    require('./loader/index');
    require('./form/index');
    require('./button/index');
    require('./input/index');
    require('./textarea/index');
    require('./switch/index');
    require('./checkbox/index');
    require('./radio/index');
    require('./select/index');
    require('./cascader/index');
    require('./datepicker/index');
    require('./timepicker/index');
    require('./transfer/index');
    require('./file/index');
    require('./popover/index');
    require('./modal/index');
    require('./confirm/index');
    require('./table/index');
    require('./paginator/index');
    require('./tabs/index');
    require('./info/index');
    require('./file-list/index');
    require('./map/index');
    // require('./wysiwyg/index');
}

if ( scope.Vue !== undefined ) {
    Install(scope.Vue);
}

export default Install;
