/**
 * @class NCascaderPanelController
 * @extends {GroupController<NCascaderPanelController, NCascaderPanelProps, NCascaderPanelView, NCascaderPanelData>}
 */
export class NCascaderPanelController extends GroupController<NCascaderPanelController, {
    modelValue: import("vue").PropType<any[] | object>;
    splitValue: import("vue").PropType<any[] | object>;
    placeholder: import("vue").PropType<string>;
    trigger: import("vue").PropType<string>;
    options: import("vue").PropType<any[] | object>;
    visible: import("vue").PropType<any[] | object>;
    labelProp: import("vue").PropType<string>;
    valueProp: import("vue").PropType<string>;
    childProp: import("vue").PropType<string>;
    disabledProp: import("vue").PropType<string>;
} & ({
    load: import("vue").PropType<boolean>;
} | {
    disabled: import("vue").PropType<boolean>;
} | {
    size: import("vue").PropType<string>;
} | {
    type: import("vue").PropType<string>;
}), NCascaderPanelView> {
    constructor(props: any, context: any);
    /**
     * @type {PopoverElement}
     */
    popel: PopoverElement;
    setup(): this;
    buildVirtuals(): any;
    getVisibleChilds(): any[];
    emitMove(item: any): void;
    emitClick(item: any): void;
    emitDblclick(item: any): void;
    updateVisible(item: any): void;
    updateCascade(item: any): void;
}
export default NCascaderPanelController;
import { NCascaderPanelView } from "./NCascaderPanelView.jsx";
import { GroupController } from "../../../root/index.js";
