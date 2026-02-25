/**
 * @class NVirtualbarController
 * @extends {BaseController<NVirtualbarController, NVirtualbarProps, NVirtualbarView, NVirtualbarData>}
 */
export class NVirtualbarController {
    constructor(props: any, context: any);
    /**
     * @type {NScrollbarElement}
     */
    scrollbar: NScrollbarElement;
    timer: any;
    idler: any;
    setup(): this;
    mounted(): void;
    ready(): void;
    buildState(): any;
    startWatch(): void;
    scrollTo(index: any): void;
}
export default NVirtualbarController;
import { NScrollbarElement } from "../handler/NScrollbarElement.js";
