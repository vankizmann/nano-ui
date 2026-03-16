import { Dom, Hash, Locale, Obj, Run } from "@kizmann/pico-js";
import { Styler } from "../../../root/index.ts";
import NModalHandler from "../../../modal/js/handler/NModalHandler.ts";
import NModalElement from "../../../modal/js/handler/NModalElement.ts";

export class NConfirmElement
{
    /**
     * @var {Dom}
     */
    el : Dom;

    /**
     * @var {NModalElement}
     */
    modal : NModalElement;

    /**
     * @type {Function}
     */
    signal : Function;

    /**
     * @var {any}
     */
    options : any = {
        uid: null,
        text: null,
        theme: 'dark',
        size: null,
        type: null,
        cancelText: null,
        confirmText: null,
    };

    /**
     * @type {string}
     */
    get uid() : string
    {
        return this.options.uid;
    }

    constructor(options : any)
    {
        if ( options.uid == null ) {
            options.uid = Hash.uuid();
        }

        const texts = {
            cancelText: Locale.trans('Cancel'),
            confirmText: Locale.trans('Confirm'),
        };

        this.options = Obj.assign(...[
            this.options, texts, options
        ]);

        this.signal = () => {
            console.warn('Confirm calling empty signal!');
        };

        this.el = this.render();
    }

    promise()
    {
        return new Promise((resolve, reject) => {

            const confirm = () => {
                this.close(), Run.frame(() => resolve(1));
            };

            const cancel = () => {
                this.close(), Run.frame(() => reject(0));
            };

            this.signal = (val : boolean) => {
                val ? confirm() : cancel();
            }

            this.open();
        });
    }

    open()
    {
        let modalProps : any = {
            uid: this.options.uid, listen: false,
        };

        modalProps.onClose = () => {
            this.signal(false);
        };

        this.modal = NModalHandler.append(...[
            this.el.get(0), modalProps
        ]);

        Run.frame(() => {
            this.modal.openRun(true);
        });
    }

    close()
    {
        if ( this.modal.visible ) {
            this.modal.closeRun(false, true);
        }

        // Remove modal blocking
        NModalHandler.remove(this.modal);

        // Remove element from dom
        this.el.get(0).remove();

        // Clear for memory
        [this.el, this.modal] = [null, null];
    }

    render()
    {
        const root = Dom.make('div', {
            class: Styler.bem('n-confirm', this.options),
        });

        root.appendTo(document.body);

        const frame = Dom.make('div', {
            class: 'n-confirm__frame',
        });

        frame.appendTo(root);

        const body = Dom.make('div', {
            class: 'n-confirm__body',
        });

        body.appendTo(frame);

        const iconCls = Styler.icon(...[
            this.options.type, 'confirm'
        ]);

        const icon = Dom.make('div', {
            class: 'n-confirm__icon',
            html: `<i class="${iconCls}"></i>`,
        });

        icon.appendTo(body);

        const text = Dom.make('div', {
            class: 'n-confirm__text',
            html: `<p>${this.options.text}</p>`,
        });

        text.appendTo(body);

        const action = Dom.make('div', {
            class: 'n-confirm__action',
        });

        action.appendTo(frame);

        const cancelCls = Styler.button({
            glass: true, type: 'neutral'
        });

        const cancel = Dom.make('button', {
            class: cancelCls.join(' '),
        });

        cancel.on('mousedown', () => {
            this.signal(false);
        });

        cancel.html(...[
            `<span>${this.options.cancelText}</span>`
        ]);

        cancel.appendTo(action);

        const confirmCls = Styler.button({
            //
        });

        const confirm = Dom.make('button', {
            class: confirmCls.join(' '),
        });

        confirm.on('mousedown', () => {
            this.signal(true);
        });

        confirm.html(...[
            `<span>${this.options.confirmText}</span>`
        ]);

        confirm.appendTo(action);

        return root;
    }

}