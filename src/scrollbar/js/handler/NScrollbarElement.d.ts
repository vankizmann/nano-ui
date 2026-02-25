export class NScrollbarElement {
    constructor(el: any, options?: {});
    native: boolean;
    observer: any;
    el: import("@kizmann/pico-js/types/utils/Dom.js").PicoDom;
    cl: import("@kizmann/pico-js/types/utils/Dom.js").PicoDom;
    wl: import("@kizmann/pico-js/types/utils/Dom.js").PicoDom;
    sbar: any;
    hbar: any;
    vbar: any;
    width: number;
    height: number;
    buffer: {};
    options: {
        uid: any;
        bem: string;
        overflowX: boolean;
        overflowY: boolean;
        scrollPortal: boolean;
        onReady: () => any;
        onUpdate: () => any;
    };
    destroy(): void;
    makePseudo(): void;
    fireScroll(): void;
    returnRect(): Record<string, any>;
    equalRect(rect: any): boolean;
    detectRect(): void;
    adaptBars(): void;
    applyBar(key: any, el: any, rect: any, portal: any): void;
    observeBox(): void;
    onMousedown(e: any, key: any, el: any): void;
    onMousemove(e: any, key: any, { pos, scroll }: {
        pos: any;
        scroll: any;
    }): void;
}
