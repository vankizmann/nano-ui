/**
 * @class NCascaderController
 * @extends {GroupController<NCascaderController, NCascaderProps, NCascaderView, NCascaderData>}
 */
export class NCascaderController extends GroupController<NCascaderController, ({
    placeholder: import("vue").PropType<string>;
    modelValue: import("vue").PropType<any[] | object>;
    splitValue: import("vue").PropType<any[] | object>;
    trigger: import("vue").PropType<string>;
    options: import("vue").PropType<any[] | object>;
    visible: import("vue").PropType<any[] | object>;
    labelProp: import("vue").PropType<string>;
    valueProp: import("vue").PropType<string>;
    childProp: import("vue").PropType<string>;
    disabledProp: import("vue").PropType<string>;
    load: import("vue").PropType<boolean>;
} | {
    placeholder: import("vue").PropType<string>;
    modelValue: import("vue").PropType<any[] | object>;
    splitValue: import("vue").PropType<any[] | object>;
    trigger: import("vue").PropType<string>;
    options: import("vue").PropType<any[] | object>;
    visible: import("vue").PropType<any[] | object>;
    labelProp: import("vue").PropType<string>;
    valueProp: import("vue").PropType<string>;
    childProp: import("vue").PropType<string>;
    disabledProp: import("vue").PropType<string>;
    disabled: import("vue").PropType<boolean>;
} | {
    placeholder: import("vue").PropType<string>;
    modelValue: import("vue").PropType<any[] | object>;
    splitValue: import("vue").PropType<any[] | object>;
    trigger: import("vue").PropType<string>;
    options: import("vue").PropType<any[] | object>;
    visible: import("vue").PropType<any[] | object>;
    labelProp: import("vue").PropType<string>;
    valueProp: import("vue").PropType<string>;
    childProp: import("vue").PropType<string>;
    disabledProp: import("vue").PropType<string>;
    size: import("vue").PropType<string>;
} | {
    placeholder: import("vue").PropType<string>;
    modelValue: import("vue").PropType<any[] | object>;
    splitValue: import("vue").PropType<any[] | object>;
    trigger: import("vue").PropType<string>;
    options: import("vue").PropType<any[] | object>;
    visible: import("vue").PropType<any[] | object>;
    labelProp: import("vue").PropType<string>;
    valueProp: import("vue").PropType<string>;
    childProp: import("vue").PropType<string>;
    disabledProp: import("vue").PropType<string>;
    type: import("vue").PropType<string>;
}) & ({
    clearable: import("vue").PropType<boolean>;
} | {
    clearValue: import("vue").PropType<string | number | boolean>;
} | {
    undefinedText: import("vue").PropType<string>;
} | {
    emptyText: import("vue").PropType<string>;
} | {
    position: import("vue").PropType<string>;
}), NCascaderView> {
    constructor(props: any, context: any);
    /**
     * @type {PopoverElement}
     */
    popel: PopoverElement;
    setup(): this;
    mounted(): void;
    ready(): void;
    buildVirtuals(): any;
    extractValues(value: any, index: any): {
        value: any;
        label: any;
    };
    buildSearched(): any[];
    focusInput(): void;
    resetDisplay(): void;
    scrollToIndex(index?: any): void;
    onEnter(): void;
}
export default NCascaderController;
import { NCascaderView } from "./NCascaderView.jsx";
import { GroupController } from "../../../root/index.js";
