import NSignal from "./signal/index.ts";
import NInput from "./input/index.ts";
import NButton from "./button/index.ts";
import NCheckbox from "./checkbox/index.ts";
import NRadio from "./radio/index.ts";
import NSelect from "./select/index.ts";
import NSwitch from "./switch/index.ts";
import NCascader from "./cascader/index.ts";
import NPopover from "./popover/index.ts";
import NScrollbar from "./scrollbar/index.ts";
import NResizer from "./resizer/index.ts";
import NDraggable from "./draggable/index.ts";
import NTable from "./table/index.ts";
import NEmpty from "./empty/index.ts";
import NModal from "./modal/index.ts";
import NLoader from "./loader/index.ts";
import NDatetime from "./datetime/index.ts";
import NTransfer from "./transfer/index.ts";
import NTabs from "./tabs/index.ts";
import NCollapse from "./collapse/index.ts";
import NVisuals from "./visuals/index.ts";

const NanoImports = [
    NSignal,
    NInput,
    NButton,
    NCheckbox,
    NRadio,
    NSelect,
    NSwitch,
    NPopover,
    NScrollbar,
    NResizer,
    NDraggable,
    NTable,
    NEmpty,
    NCascader,
    NModal,
    NLoader,
    NDatetime,
    NTransfer,
    NTabs,
    NCollapse,
    NVisuals,
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

export function Install(App : any, Icons : any = {}, Settings : any = {})
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

    // require('./chart/index.ts'); // Ignore
    // require('./wysiwyg/index.ts'); // Ignore
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

if ( !globalThis.nano ) {
    globalThis.nano = Nano;
}

console.log(globalThis.nano)

export default Nano;
