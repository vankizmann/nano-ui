
let scope = {};

if (typeof global !== 'undefined') {
    scope = global;
}

if (typeof window !== 'undefined') {
    scope = window;
}

export function Install(Vue)
{
    if ( scope.Nano === undefined ) {
        return console.error('Nano JS is not available in window scope.');
    }

    scope.Nano.install(Vue);

    Vue.prototype.trans = scope.Nano.Locale.trans;
    Vue.prototype.choice = scope.Nano.Locale.choice;

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
