/**
 * @class NScrollbarController
 * @extends {BaseController<NScrollbarController, NScrollbarProps, NScrollbarView, NScrollbarData>}
 */
export class NScrollbarController {
    constructor(props: any, context: any);
    /**
     * @type {NScrollbarElement}
     */
    scrollbar: NScrollbarElement;
    setup(): this;
    mounted(): void;
    onScroll(e: any): void;
}
export default NScrollbarController;
import { NScrollbarElement } from "../handler/NScrollbarElement.js";
