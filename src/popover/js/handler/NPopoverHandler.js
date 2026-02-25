import { Arr, Dom, Mix } from "@kizmann/pico-js";
import { Pointer } from "../../../root/index.js";
import NPopoverElement from "./NPopoverElement.js";

window.PopoverBag = {};

export class NPopoverHandler
{
    static popovers = [];

    static chain = {};

    static init()
    {
        Pointer.bind('NPopover', 'scroll', (e) => {
            this.scroll(e);
        });

        Pointer.bind('NPopover', 'virtualscroll', (e) => {
            this.scroll(e);
        });

        Pointer.bind('NPopover', 'keyescape', (e) => {
            this.escape(e);
        });

        Pointer.bind('NPopover', 'mousedown', (e) => {
            this.mousedown(e);
        });

        Pointer.bind('NPopover', 'mousemove', (e) => {
            this.mousemove(e);
        });

        Pointer.bind('NPopover', 'context', (e) => {
            this.context(e);
        });

        return this;
    }

    static scroll(event)
    {
        Arr.each(this.popovers, (popover) => {
            popover.onScroll(event);
        });
    }

    static mousedown(event)
    {
        Arr.each(this.popovers, (popover) => {
            popover.onMousedown(event);
        });
    }

    static mousemove(event)
    {
        Arr.each(this.popovers, (popover) => {
            popover.onMousemove(event);
        });
    }

    static context(event)
    {
        Arr.each(this.popovers, (popover) => {
            popover.onContext(event);
        });
    }

    static escape(event)
    {
        Arr.each(this.popovers, (popover) => {
            popover.onEscape(event);
        });
    }

    static append(el, config)
    {
        const popover = new NPopoverElement(el, config);

        Arr.append(this.popovers, popover);

        return popover;
    }

    static remove(el, { uid })
    {
        const popover = Arr.find(this.popovers, { uid });

        if ( popover ) {
            popover.destroy();
        }

        Arr.remove(this.popovers, { uid })
    }

    static prevent(uid, el)
    {
        this.chain[uid] = Dom.find(el).data('popover');
    }

    static release(uid)
    {
        delete this.chain[uid];
    }

    static blocked(uid)
    {
        return Arr.has(this.chain, uid);
    }
}

if ( ! globalThis.NPopoverHandler ) {
    globalThis.NPopoverHandler = NPopoverHandler.init();
}

export default NPopoverHandler;
