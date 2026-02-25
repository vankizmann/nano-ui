/**
 * @class NRadioGroupController
 * @extends {GroupController<NRadioGroupController, NRadioGroupProps, NRadioGroupView, NRadioGroupData>}
 */
export class NRadioGroupController extends GroupController<NRadioGroupController, {
    modelValue: import("vue").PropType<string | number>;
} & ({
    disabled: import("vue").PropType<boolean>;
} | {
    size: import("vue").PropType<string>;
} | {
    type: import("vue").PropType<string>;
} | {
    align: import("vue").PropType<string>;
}), NRadioGroupView> {
    constructor(props: any, context: any);
    setup(): this;
    apply(child: any): void;
}
export default NRadioGroupController;
import { NRadioGroupView } from "./NRadioGroupView.jsx";
import { GroupController } from "../../../root/index.js";
