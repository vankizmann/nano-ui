import { Dom, Arr, Obj, Run, Hash, Str } from "@kizmann/pico-js";
import { Pointer } from "../../../root/index.ts";

export class NPopoverElement
{
    /**
     * @type {ResizeObserver}
     */
    observer : ResizeObserver;

    /**
     * @type {boolean}
     */
    visible : boolean = false;

    /**
     * @type {any}
     */
    cursor : any = {
        x: 0, y: 0,
    };

    /**
     * @type {any}
     */
    options : any = {
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

    get uid() : string
    {
        return this.options.uid;
    }

    constructor(el : HTMLElement, options : any = {})
    {
        if ( options.uid == null ) {
            options.uid = Hash.uuid()
        }

        if ( options.target == null ) {
            options.target = Dom.find(el).prev().get(0);
        }

        this.options = Obj.assign(this.options, options, {
            el: Dom.find(el)
        });

        this.observeBox();

        Dom.find(el).appendTo(document.body);
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

        let style : any = {
            'z-index': Pointer.zindex()
        };

        if ( width === -1 ) {
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

        Arr.each(box.self, (v : any, k : any) => {
            style[`--n-self-${k}`] = v + 'px';
        });

        Arr.each(box.rect, (v : any, k : any) => {
            style[`--n-rect-${k}`] = v + 'px';
        });

        el.style(style).addClass('n-ready');
    }

    getEventEls(event : any)
    {
        const el = Dom.find(event.target);

        let result : any = {
            src: el.closest(this.options.el),
        };

        if ( this.options.target ) {
            result.tgt = el.closest(this.options.target);
        }

        return result;
    }

    onMousedown(event : any)
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

    onMousemove(event : any)
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

    onContext(event : any)
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

    onScroll(event : any)
    {
        if ( !this.visible ) {
            return;
        }

        const { el, scrollClose } = this.options;

        if ( !scrollClose ) {
            return;
        }

        let state = false;

        if ( event.detail?.target ) {
            state = el.contains(event.detail.target);
        }

        this.state(state);
    }

    onEscape(event : any)
    {
        if ( !this.visible ) {
            return;
        }

        this.state(!this.options.escapeClose);
    }

    on(event : string, cb : Function)
    {
        this.options[`on${Str.ucfirst(event)}`] = cb;
    }

    state(state : any)
    {
        if ( !this.visible && state ) {
            this.open();
        }

        if ( this.visible && !state ) {
            this.close();
        }

        // Idle if state and visible are equal
    }

    open(silent : boolean = false)
    {
        const { uid, target } = this.options;

        const fn = () => {
            Run.frame(() => this.renderBox());
        };

        const group = Dom.find(target).upnode('[data-popover]')
            .data('popover');

        if ( this.options.multiClose ) {
            Pointer.deblock(uid, 'popover', group, fn);
        }

        Pointer.prevent(uid, 'popover', group, () => {
            this.close(true);
        });

        if ( !this.options.multiClose ) {
            fn();
        }

        if ( !silent && this.options.onOpen ) {
            this.options.onOpen();
        }

        this.visible = true;
    }

    close(force : boolean = false, silent : boolean = false)
    {
        const { uid } = this.options;

        if ( !force && Pointer.blocked(uid) ) {
            return;
        }

        // Unblock parent el
        Pointer.release(uid);

        Run.frame(() => {
            this.renderBox();
        });

        if ( !silent && this.options.onClose ) {
            this.options.onClose();
        }

        this.visible = false;
    }

}

export default NPopoverElement;