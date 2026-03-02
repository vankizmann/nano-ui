import { Arr, Dom } from "@kizmann/pico-js";
import { Pointer } from "../../../root/index.ts";
import NPopoverElement from "./NPopoverElement.ts";

export class NPopoverHandler
{
    /**
     * @type {NPopoverElement[]}
     */
    static popovers : NPopoverElement[] = [];

    static init()
    {
        Pointer.bind('NPopover', 'scroll', (e : any) => {
            this.scroll(e);
        });

        Pointer.bind('NPopover', 'virtualscroll', (e : any) => {
            this.scroll(e);
        });

        Pointer.bind('NPopover', 'keyescape', (e : any) => {
            this.escape(e);
        });

        Pointer.bind('NPopover', 'mousedown', (e : any) => {
            this.mousedown(e);
        });

        Pointer.bind('NPopover', 'mousemove', (e : any) => {
            this.mousemove(e);
        });

        Pointer.bind('NPopover', 'context', (e : any) => {
            this.context(e);
        });

        return this;
    }

    static scroll(event : any)
    {
        Arr.each(this.popovers, (popover : NPopoverElement) => {
            popover.onScroll(event);
        });
    }

    static mousedown(event : any)
    {
        Arr.each(this.popovers, (popover : NPopoverElement) => {
            popover.onMousedown(event);
        });
    }

    static mousemove(event : any)
    {
        Arr.each(this.popovers, (popover : NPopoverElement) => {
            popover.onMousemove(event);
        });
    }

    static context(event : any)
    {
        Arr.each(this.popovers, (popover : NPopoverElement) => {
            popover.onContext(event);
        });
    }

    static escape(event : any)
    {
        Arr.each(this.popovers, (popover : NPopoverElement) => {
            popover.onEscape(event);
        });
    }

    static append(el : HTMLElement, config : any)
    {
        const popover = new NPopoverElement(el, config);

        Arr.append(this.popovers, popover);

        return popover;
    }

    static remove({ uid } : any)
    {
        const popover = Arr.find(this.popovers, { uid });

        if ( popover ) {
            popover.destroy();
        }

        Arr.remove(this.popovers, { uid })
    }

}

if ( !globalThis.NPopoverHandler ) {
    globalThis.NPopoverHandler = NPopoverHandler.init();
}

export default NPopoverHandler;
