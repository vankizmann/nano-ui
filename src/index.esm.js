// import { Arr, Obj, Dom, Locale } from "@kizmann/pico-js";

import NInput from "./input/index.js";
// import NButton from "./button/index.js";
// import NCheckbox from "./checkbox/index.js";
// import NRadio from "./radio/index.js";
// import NSelect from "./select/index.js";
// import NSwitch from "./switch/index.js";
// import NCascader from "./cascader/index.js";
// import NPopover from "./popover/index.js";
// import NScrollbar from "./scrollbar/index.js";
// import NResizer from "./resizer/index.js";
// import NDraggable from "./draggable/index.js";
// import NTable from "./table/index.js";
// import NEmpty from "./empty/index.js";

const NanoImports = [
    // Alert,
    // Notification,
    // Empty,
    // Config,
    // Scrollbar,
    // Virtualscroller,
    // Draggable,
    // Loader,
    // Resizer,
    // Popover,
    // Modal,
    // Button,
    // Input,
    // InputNumber,
    // Textarea,
    // Select,
    // Checkbox,
    // Radio,
    // Slider,
    // Switch,
    // Confirm,
    // Cascader,
    // Datepicker,
    // Timepicker,
    // Datetimepicker,
    // Durationpicker,
    // Transfer,
    // Form,
    // Tabs,
    // Tags,
    // Collapse,
    // Table,
    // Paginator,
    // Info,
    // Preview,
    // Map,
    // File,
    // Rating,
    // Drawer,
    // Chart,
    // NForm,
    NInput,
    // NButton,
    // NCheckbox,
    // NRadio,
    // NSelect,
    // NSwitch,
    // NPopover,
    // NScrollbar,
    // NResizer,
    // NDraggable,
    // NTable,
    // NEmpty,
    // NCascader,
];

export const Icons = {
    handle: 'fa fa-ellipsis-v',
    checked: 'fa fa-check',
    circle: 'fa fa-circle',
    intermediate: 'fa fa-minus',
    clock: 'fa fa-clock',
    calendar: 'fa fa-calendar',
    times: 'fa fa-times',
    primary: 'fa fa-info-circle',
    secondary: 'fa fa-info-circle',
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

export function Install(App, Icons = {}, Settings = {})
{
    // if ( typeof window.pi === 'undefined' ) {
    //     return console.error('pico-js is not available.');
    // }
    //
    // Obj.each(window.pi, (value, key) => {
    //     App.config.globalProperties[key] = value;
    // });
    //
    // App.config.globalProperties.ctor = CtorMixin.ctor;
    // App.config.globalProperties.cmer = CmerMixin.cmer;
    // App.config.globalProperties.cslo = CsloMixin.cslo;
    //
    // App.config.globalProperties.trans = Locale.trans;
    // App.config.globalProperties.choice = Locale.choice;
    //
    // window.nano.Icons = Obj.assign(window.nano.Icons, Icons);
    // window.nano.Settings = Obj.assign(window.nano.Settings, Settings);

    NanoImports.forEach((NanoModule) => {
        NanoModule(App);
    });

    // require('./chart/index.js'); // Ignore
    // require('./wysiwyg/index.js'); // Ignore
}

export const Nano = {
    Icons: Icons, Settings: Settings, Install: Install
};

// window.keyMods = [];
//
// Dom.find(document).on('keydown', (event) => {
//     Arr.add(window.keyMods, event.which);
// });
//
// Dom.find(document).on('keyup', (event) => {
//     Arr.remove(window.keyMods, event.which);
// });
//
// Dom.find(document).on('dragstart', (event) => {
//     Arr.add(window.keyMods, event.which);
// });
//
// Dom.find(document).on('dragend', (event) => {
//     window.keyMods = [];
// });
//
// if ( typeof window.nano === 'undefined' ) {
//     window.nano = Nano;
// }

if ( ! globalThis.nano ) {
    globalThis.nano = Nano;
}

export default Nano;
