import { Arr, Dom, Hash, Locale, Obj, Run, Str } from "@kizmann/pico-js";
import NPreviewController from "../preview/NPreviewController";

export class NPreviewElement
{
    /**
     * @var {Dom}
     */
    el : Dom;

    /**
     * @var {any}
     */
    options : any = {
        index: 0,
    };

    get uid() : string
    {
        return this.options.uid;
    }

    get index() : number
    {
        return this.options.index;
    }

    get group() : string
    {
        return this.options.group;
    }

    constructor(options : any = {})
    {
        if ( options.uid == null ) {
            options.uid = Hash.uuid();
        }

        if ( options.group == null ) {
            options.group = Hash.uuid();
        }

        this.options = Obj.assign(...[
            this.options, options
        ]);
    }

    on(event : string, cb : Function)
    {
        this.options[`on${Str.ucfirst(event)}`] = cb;
    }

    animate(direction : string, cb : Function) : NPreviewElement
    {
        this.el.once('transitionend', () => {
            this.close(), cb();
        });

        this.el.addClass(...[
            `n-animate-${direction}`
        ]);

        return this;
    }

    reset()
    {
        this.el.remClass([
            'n-animate-left', 'n-animate-right',
        ]);

        return this;
    }

    open(frame : Dom, mode : string = 'append')
    {
        this.el = Dom.make('div', {
            class: 'n-preview-modal__slide',
        });

        this.el.data(...[
            'preview', this.uid
        ]);

        if ( mode === 'append' ) {
            this.el.appendTo(frame);
        }

        if ( mode === 'prepend' ) {
            this.el.prependTo(frame);
        }

        if ( this.options.onOpen ) {
            this.options.onOpen(this.el);
        }

        return this;
    }

    focus()
    {
        if (this.options.onFocus ) {
            this.options.onFocus();
        }

        return this;
    }

    close()
    {
        if (this.options.onClose ) {
            this.options.onClose();
        }

        if ( this.el ) {
            this.el.remove();
        }

        return this;
    }

}