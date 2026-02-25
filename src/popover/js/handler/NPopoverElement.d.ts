export class NPopoverElement {
    constructor(el: any, options?: {});
    observer: any;
    visible: boolean;
    blocked: boolean;
    cursor: {
        x: number;
        y: number;
    };
    options: {
        parent: any;
        target: any;
        listen: boolean;
        trigger: string;
        toggle: boolean;
        position: string;
        width: number;
        escapeClose: boolean;
        scrollClose: boolean;
        multiClose: boolean;
    };
    destroy(): void;
    observeBox(): void;
    renderBox(): any;
    getEventEls(event: any): {
        src: any;
    };
    onMousedown(event: any): void;
    onMousemove(event: any): void;
    onContext(event: any): void;
    onScroll(e: any): void;
    onEscape(e: any): void;
    on(event: any, cb: any): void;
    state(state: any): void;
    open(): void;
    close(): void;
}
export default NPopoverElement;
