/**
 * @class NResizerController
 * @extends {BaseController<NResizerController, NResizerProps, NResizerView, NResizerData>}
 */
export class NResizerController {
    constructor(props: any, context: any);
    observer: any;
    setup(): this;
    onMounted(): void;
    onUnmounted(): void;
    observeOffset(): void;
    detectOffset(e?: {}): any;
    onMousedown(e: any): void;
    onMousemove(e: any): void;
    onMouseup(e: any): void;
    onGroupSignal(group: any): void;
}
export default NResizerController;
