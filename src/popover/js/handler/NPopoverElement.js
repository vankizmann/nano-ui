import { Mix, Dom, Arr, Obj, Run, Hash, Str } from "@kizmann/pico-js";
import { Pointer } from "../../../root/index.js";
import { NPopoverHandler } from "./NPopoverHandler.js";

export class NPopoverElement
{
    observer;
    visible = false;
    blocked = false;

    cursor = {
        x: 0, y: 0,
    };

    options = {
        parent: null,
        target: null,
        listen: true,
        trigger: 'hover',
        toggle: false,
        position: 'bottom-center',
        width: 0,
        escapeClose: true,
        scrollClose: true,
        multiClose: true,
    };

    constructor(el, options = {})
    {
        if ( !options.uid ) {
            options.uid = Hash.uuid()
        }

        if ( options.target == null ) {
            options.target = Dom.find(el).prev().get(0);
        }

        this.options = Obj.assign(this.options, options, {
            el: Dom.find(el)
        });

        this.observeBox();
    }

    destroy()
    {
        this.observer.disconnect();
    }

    observeBox()
    {
        const { el, uid } = this.options;

        el.data('popover', uid);

        this.observer = new ResizeObserver(() => {
            this.renderBox();
        });

        this.observer.observe(el.el);
    }

    renderBox()
    {
        let { el, target, trigger, position, width } = this.options;

        if ( !this.visible ) {
            return el.attr('style', null);
        }

        let style = {
            'z-index': Pointer.zindex()
        };

        if ( width === - 1 ) {
            style.width = Dom.find(target).width() + 'px'
        }

        el.style(style);

        let config = [
            target, position,
        ];

        if ( trigger === 'context' ) {
            Arr.add(config, this.cursor);
        }

        let box = el.popover(...config);

        el.data('position', box.position);

        style = {
            top: box.y + 'px', left: box.x + 'px',
        };

        Arr.each(box.self, (v, k) => {
            style[`--n-self-${k}`] = v + 'px';
        });

        Arr.each(box.rect, (v, k) => {
            style[`--n-rect-${k}`] = v + 'px';
        });

        el.style(style).addClass('n-ready');
    }

    getEventEls(event)
    {
        const el = Dom.find(event.target);

        let result = {
            src: el.closest(this.options.el),
        };

        if ( this.options.target ) {
            result.tgt = el.closest(this.options.target);
        }

        return result;
    }

    onMousedown(event)
    {
        if ( !this.options.listen ) {
            return;
        }

        if ( this.options.trigger === 'hover' ) {
            return this.onMousemove(event);
        }

        if ( this.options.trigger === 'context' ) {
            return this.onContext(event);
        }

        let { src, tgt } = this.getEventEls(event);

        if ( !this.visible && !tgt && !src ) {
            return;
        }

        let state = tgt || src;

        if ( this.options.toggle ) {
            state = !this.visible ? state : src;
        }

        this.state(state);
    }

    onMousemove(event)
    {
        if ( !this.options.listen ) {
            return;
        }

        if ( this.options.trigger !== 'hover' ) {
            return;
        }

        let { src, tgt } = this.getEventEls(event);

        if ( !this.visible && !tgt && !src ) {
            return;
        }

        this.state(tgt || src);
    }

    onContext(event)
    {
        if ( !this.options.listen ) {
            return;
        }

        if ( this.options.trigger !== 'context' ) {
            return;
        }

        this.cursor = {
            x: event.clientX, y: event.clientY,
        };

        let { src, tgt } = this.getEventEls(event);

        if ( !this.visible && !tgt && !src ) {
            return;
        }

        let state = tgt || src;

        if ( event.button !== 2 ) {
            state = state ? this.visible : false;
        }

        if ( this.options.toggle ) {
            state = !this.visible ? state : src;
        }

        this.state(state);
    }

    onScroll(e)
    {
        if ( !this.visible ) {
            return;
        }

        const { el, scrollClose } = this.options;

        if ( !scrollClose ) {
            return;
        }

        let state = false;

        if ( e.detail?.target ) {
            state = el.contains(e.detail.target);
        }

        this.state(state);
    }

    onEscape(e)
    {
        if ( !this.visible ) {
            return;
        }

        this.state(!this.options.escapeClose);
    }

    on(event, cb)
    {
        this.options[`on${Str.ucfirst(event)}`] = cb;
    }

    state(state)
    {
        if ( !this.visible && state ) {
            this.open();
        }

        if ( this.visible && !state ) {
            this.close();
        }

        // Idle if state and visible are equal
    }

    open()
    {
        const { uid, target } = this.options;

        Run.frame(() => {
            this.renderBox();
        });

        const chain = target.closest('[data-popover]');

        if ( chain ) {
            NPopoverHandler.prevent(uid, chain);
        }

        if ( this.options.onOpen ) {
            this.options.onOpen();
        }

        Run.delay(() => {
            this.blocked = false;
        }, 300);

        this.blocked = true;
        this.visible = true;
    }

    close()
    {
        const { uid } = this.options;

        if ( this.blocked || NPopoverHandler.blocked(uid) ) {
            return;
        }

        // Unblock parent el
        NPopoverHandler.release(uid);

        Run.frame(() => {
            this.renderBox();
        });

        if ( this.options.onClose ) {
            this.options.onClose();
        }

        this.visible = false;
    }

}

export default NPopoverElement;