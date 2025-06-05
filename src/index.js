import { Arr, Obj, Dom, Locale } from "@kizmann/pico-js";

import CtorMixin from "./mixins/src/ctor.js";
import CmerMixin from "./mixins/src/cmer.js";
import CsloMixin from "./mixins/src/cslo.js";

import Alert from "./alert/index.js";
import Notification from "./notification/index.js";
import Empty from "./empty/index.js";
import Config from "./config/index.js";
import Scrollbar from "./scrollbar/index.js";
import Virtualscroller from "./virtualscroller/index.js";
import Draggable from "./draggable/index.js";
import Loader from "./loader/index.js";
import Resizer from "./resizer/index.js";
import Popover from "./popover/index.js";
import Modal from "./modal/index.js";
import Button from "./button/index.js";
import Input from "./input/index.js";
import InputNumber from "./input-number/index.js";
import Textarea from "./textarea/index.js";
import Select from "./select/index.js";
import Checkbox from "./checkbox/index.js";
import Radio from "./radio/index.js";
import Slider from "./slider/index.js";
import Switch from "./switch/index.js";
import Confirm from "./confirm/index.js";
import Cascader from "./cascader/index.js";
import Datepicker from "./datepicker/index.js";
import Timepicker from "./timepicker/index.js";
import Datetimepicker from "./datetimepicker/index.js";
import Durationpicker from "./durationpicker/index.js";
import Transfer from "./transfer/index.js";
import Form from "./form/index.js";
import Tabs from "./tabs/index.js";
import Tags from "./tags/index.js";
import Collapse from "./collapse/index.js";
import Table from "./table/index.js";
import Paginator from "./paginator/index.js";
import Info from "./info/index.js";
import Preview from "./preview/index.js";
import Map from "./map/index.js";
import File from "./file/index.js";
import Rating from "./rating/index.js";
import Drawer from "./drawer/index.js";

const NanoImports = [
    Alert,
    Notification,
    Empty,
    Config,
    Scrollbar,
    Virtualscroller,
    Draggable,
    Loader,
    Resizer,
    Popover,
    Modal,
    Button,
    Input,
    InputNumber,
    Textarea,
    Select,
    Checkbox,
    Radio,
    Slider,
    Switch,
    Confirm,
    Cascader,
    Datepicker,
    Timepicker,
    Datetimepicker,
    Durationpicker,
    Transfer,
    Form,
    Tabs,
    Tags,
    Collapse,
    Table,
    Paginator,
    Info,
    Preview,
    Map,
    File,
    Rating,
    Drawer
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

    window.nano.Icons = Obj.assign(window.nano.Icons, Icons);
    window.nano.Settings = Obj.assign(window.nano.Settings, Settings);

    Arr.each(NanoImports, (NanoModule) => {
        NanoModule(App);
    });

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
