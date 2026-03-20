import { Dom, Arr, Obj, Run, Hash, Str } from "@kizmann/pico-js";
import { Pointer } from "../../../root/index.ts";
import { NModalHandler } from "./NModalHandler.ts";

export class NModalElement
{
    /**
     * @type {boolean}
     */
    visible : boolean = false;

    /**
     * @type {boolean}
     */
    freeze : boolean = false;

    /**
     * @type {any}
     */
    options : any = {
        target: null,
        listen: true,
        closable: true,
        beforeOpen: null,
        beforeClose: null,
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

        this.options.el.data('modal', options.uid);
    }

    renderBox()
    {
        let { uid, el } = this.options;

        if ( !this.visible ) {
            return el.remClass('n-ready').style(null);
        }

        let zindex = Pointer.zindex();

        NModalHandler.open(...[
            uid, zindex
        ]);

        el.style({
            'z-index': zindex
        });

        el.addClass('n-ready');
    }

    getEventEls(event : any)
    {
        const { el, target, listen } = this.options;

        const [ev, wrap] = [
            Dom.find(event.target), el.child().get(0)
        ];

        let result : any = {
            src: ev.closest(wrap),
        };

        if ( listen && target ) {
            result.tgt = ev.closest(target);
        }

        return result;
    }

    onMousedown(event : any)
    {
        if ( event.which !== 1 ) {
            return;
        }

        const chain = Arr.last(Pointer.chains);

        if ( chain[1] !== this.options.uid ) {
            return;
        }

        let { src, tgt } = this.getEventEls(event);

        if ( !this.visible && !tgt && !src ) {
            return;
        }

        let state = tgt || src;

        if ( this.options.toggle ) {
            state = !this.visible ? state : src;
        }

        const { closable } = this.options;

        if ( !state && !closable ) {
            return;
        }

        this.state(state);
    }

    onEscape(event : any)
    {
        if ( !this.visible ) {
            return;
        }

        const { closable } = this.options;

        if ( !closable ) {
            return;
        }

        this.state(false);
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

    onPromise(prom : any, cb : Function)
    {
        if ( typeof prom !== 'function' ) {
            return cb();
        }

        let response = prom();

        if ( response == null ) {
            return cb();
        }

        if ( typeof response === 'boolean' ) {
            return response && cb();
        }

        this.freeze = true;

        response
            .then(() => {
                cb();
            })
            .finally(() => {
                this.freeze = false
            });
    }

    open(silent : boolean = false)
    {
        if ( this.freeze ) {
            return this;
        }

        const fn = () => {
            this.openRun(silent);
        };

        this.onPromise(...[
            this.options.beforeOpen, fn
        ]);

        return this;
    }

    openRun(silent : boolean = false)
    {
        const { uid } = this.options;

        Run.frame(() => {
            this.renderBox();
        });

        Pointer.prevent(uid, 'modal', null, () => {
            this.close(true);
        });

        if ( !silent && this.options.onOpen ) {
            this.options.onOpen();
        }

        this.visible = true;
    }

    close(forceClose : boolean = false, silent : boolean = false)
    {
        if ( this.freeze ) {
            return this;
        }

        const fn = () => {
            this.closeRun(forceClose, silent);
        };

        this.onPromise(...[
            this.options.beforeClose, fn
        ]);

        return this;
    }

    closeRun(force : boolean = false, silent : boolean = false)
    {
        const { uid } = this.options;

        if ( !force && Pointer.blocked(uid) ) {
            return;
        }

        // Unblock parent el
        Pointer.release(uid);

        // Change backdrop index
        NModalHandler.close(uid);

        Run.frame(() => {
            this.renderBox();
        });

        if ( !silent && this.options.onClose ) {
            this.options.onClose();
        }

        this.visible = false;
    }

}

export default NModalElement;