/**
 * @class NSelectController
 * @extends {GroupController<NSelectController, NSelectProps, NSelectView>}
 */
export class NSelectController extends GroupController<NSelectController, any, NSelectView> {
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
export default NSelectController;
import { NSelectView } from "./NSelectView.js";
import { GroupController } from "../../../root/index.js";
