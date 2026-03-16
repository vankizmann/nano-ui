// nano-ui v2
// ^._.^= ∫ Lilli und Pashi, ich liebe euch

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
import NInfo from "./info/index.ts";
import NEmpty from "./empty/index.ts";
import NModal from "./modal/index.ts";
import NLoader from "./loader/index.ts";
import NDatetime from "./datetime/index.ts";
import NTransfer from "./transfer/index.ts";
import NTabs from "./tabs/index.ts";
import NCollapse from "./collapse/index.ts";
import NVisuals from "./visuals/index.ts";
import NPreview from "./preview/index.ts";
import NSlider from "./slider/index.ts";
import NForm from "./form/index.ts";
import NConfig from "./config/index.ts";
import NChart from "./chart/index.ts";
import NMap from "./map/index.ts";
import ctor from "./root/js/legacy/ctor.ts";
import cmer from "./root/js/legacy/cmer.ts";
import cslo from "./root/js/legacy/cslo.ts";

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
    NDraggable, // copy und remove funktion
    NTable,
    NInfo,
    NEmpty,
    NCascader,
    NModal,
    NLoader,
    NDatetime,
    NTransfer,
    NTabs,
    NCollapse,
    NVisuals,
    NPreview,
    NSlider,
    NForm, // form-frame inview fixen
    NConfig,
    NChart,
    NMap,
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

export function Install(App : any, Icons : any = {}, Settings : any = {})
{
    if ( typeof globalThis.pi === 'undefined' ) {
        return console.error('pico-js is not available.');
    }

    // Obj.each(window.pi, (value, key) => {
    //     App.config.globalProperties[key] = value;
    // });

    App.config.globalProperties.ctor = ctor;
    App.config.globalProperties.cmer = cmer;
    App.config.globalProperties.cslo = cslo;

    if ( ! App.config.globalProperties.Notify ) {
        App.config.globalProperties.Notify = globalThis.Notify;
    }

    if ( ! App.config.globalProperties.Alert ) {
        App.config.globalProperties.Alert = globalThis.Alert;
    }

    if ( ! App.config.globalProperties.Confirm ) {
        App.config.globalProperties.Confirm = globalThis.Confirm;
    }

    if ( ! App.config.globalProperties.trans ) {
        App.config.globalProperties.trans = globalThis.pi.Locale.trans;
    }

    if ( ! App.config.globalProperties.choice ) {
        App.config.globalProperties.choice = globalThis.pi.Locale.choice;
    }

    NanoImports.forEach((NanoModule) => {
        NanoModule(App);
    });

}

export const Nano = {
    Install, /* Legacy */ Icons: {}
};

if ( !globalThis.nano ) {
    globalThis.nano = Nano;
}

export default Nano;
