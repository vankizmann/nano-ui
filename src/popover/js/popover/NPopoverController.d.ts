/**
 * @class NPopoverController
 * @extends {BaseController<NPopoverController, NPopoverProps, NPopoverView, NPopoverData>}
 */
export class NPopoverController {
    constructor(props: any, context: any);
    setup(): this;
    mounted(): void;
    popel: import("../handler/NPopoverElement.js").NPopoverElement;
    unmounted(): void;
    onOpen(): void;
    onClose(): void;
}
export default NPopoverController;
