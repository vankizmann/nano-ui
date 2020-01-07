import CtorMixin from "./mixins/src/ctor";

let scope = {};

if (typeof global !== 'undefined') {
    scope = global;
}

if (typeof window !== 'undefined') {
    scope = window;
}

scope.NanoIcons = {
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

export function Install(Vue, Icons = {})
{
    if ( scope.Nano === undefined ) {
        return console.error('Nano JS is not available in window scope.');
    }

    scope.Nano.install(Vue);

    Vue.prototype.ctor = CtorMixin;

    Vue.prototype.trans = scope.Nano.Locale.trans;
    Vue.prototype.choice = scope.Nano.Locale.choice;

    Vue.prototype.icons = Vue.Obj.assign(scope.NanoIcons, Icons);

    require('./notification/index');
    require('./render/index');
    require('./draggable/index');
    require('./loader/index');
    require('./form/index');
    require('./button/index');
    require('./input/index');
    require('./textarea/index');
    require('./select/index');
    require('./cascader/index');
    require('./datepicker/index');
    require('./timepicker/index');
    require('./transfer/index');
    require('./file/index');
    require('./matrix/index');
    require('./popover/index');
    require('./modal/index');
    require('./confirm/index');
    require('./table/index');
    require('./paginator/index');
    require('./checkbox/index');
    require('./tabs/index');
    require('./info/index');
    require('./file-list/index');
    require('./wysiwyg/index');
}

if ( scope.Vue !== undefined ) {
    Install(scope.Vue);
}

export default Install;
