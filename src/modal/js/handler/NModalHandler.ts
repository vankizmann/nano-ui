import { Arr, Dom, Mix } from "@kizmann/pico-js";
import { Pointer } from "../../../root/index.ts";
import NModalElement from "./NModalElement.ts";

export class NModalHandler
{
    /**
     * @type {Dom}
     */
    static el: Dom;

    /**
     * @type {any[]}
     */
    static indexes : any[] = [];

    /**
     * @type {NModalElement[]}
     */
    static modals : NModalElement[] = [];

    static init()
    {
        this.el = Dom.make('div', {
            class: 'n-modal-backdrop',
        });

        this.el.appendTo(document.body);

        Pointer.bind('NModal', 'keyescape', (e : any) => {
            this.escape(e);
        });

        Pointer.bind('NModal', 'mousedown', (e : any) => {
            this.mousedown(e);
        });

        return this;
    }

    static mousedown(event : any)
    {
        Arr.each(this.modals, (modal : NModalElement) => {
            modal.onMousedown(event);
        });
    }

    static escape(event : any)
    {
        Arr.each(this.modals, (modal : NModalElement) => {
            modal.onEscape(event);
        });
    }

    static append(el : HTMLElement, config : any)
    {
        const modal = new NModalElement(el, config);

        Arr.append(this.modals, modal);

        return modal;
    }

    static remove({ uid } : any)
    {
        const modal = Arr.find(this.modals, { uid });

        if ( Mix.isEmpty(modal) ) {
            throw new Error('Modal not found with id: ' + Mix.str(uid));
        }

        console.log('remove modal', uid, modal)

        if ( modal && modal.destroy ) {
            modal.destroy();
        }

        Arr.remove(this.modals, { uid });
    }

    static open(uid: string, zindex : number): NModalHandler
    {
        Arr.append(this.indexes, [uid, zindex]);

        this.el.style({
            'z-index': zindex
        });

        if ( this.indexes.length > 0 ) {
            this.el.addClass('n-ready');
            Dom.find(document.body).addClass('n-backdrop');
        }

        return this;
    }

    static close(uid : string) :NModalHandler
    {
        Arr.remove(this.indexes, [uid]);

        if ( this.indexes.length < 1 ) {
            this.el.remClass('n-ready');
            Dom.find(document.body).remClass('n-backdrop');
        }

        const last = Arr.last(this.indexes);

        if ( Mix.isEmpty(last) ) {
            return this;
        }

        const style = {
            'z-index': last[1]
        };

        if ( this.indexes.length > 0 ) {
            this.el.style(style);
        }

        return this;
    }

}

if ( !globalThis.NModalHandler ) {
    globalThis.NModalHandler = NModalHandler.init();
}

export default NModalHandler;
