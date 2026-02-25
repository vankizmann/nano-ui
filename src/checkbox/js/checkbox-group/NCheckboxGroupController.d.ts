/**
 * @class NCheckboxGroupController
 * @extends {GroupController<NCheckboxGroupController, NCheckboxGroupProps, NCheckboxGroupView, NCheckboxGroupData>}
 */
export class NCheckboxGroupController extends GroupController<NCheckboxGroupController, {
    modelValue: import("vue").PropType<any[]>;
} & ({
    disabled: import("vue").PropType<boolean>;
} | {
    size: import("vue").PropType<string>;
} | {
    type: import("vue").PropType<string>;
} | {
    align: import("vue").PropType<string>;
}), NCheckboxGroupView> {
    constructor(props: any, context: any);
    setup(): this;
    global(): void;
    toggle(child: any): void;
    allchecked(): boolean;
    intermediate(): boolean;
}
export default NCheckboxGroupController;
import { NCheckboxGroupView } from "./NCheckboxGroupView.jsx";
import { GroupController } from "../../../root/index.js";
