import { Dom, Hash, Locale, Obj, Run } from "@kizmann/pico-js";
import { Styler } from "../../../root/index.ts";
import NModalHandler from "../../../modal/js/handler/NModalHandler.ts";
import NModalElement from "../../../modal/js/handler/NModalElement.ts";

export class NAlertElement
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
     * @var {any}
     */
    options : any = {
        uid: null,
        icon: null,
        text: null,
        theme: 'dark',
        size: null,
        type: null,
        closable: true,
        okayText: null,
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
            okayText: Locale.trans('Okay'),
        };

        this.options = Obj.assign(...[
            this.options, texts, options
        ]);

        this.el = this.render();
    }

    open()
    {
        let modalProps : any = {
            uid: this.options.uid, listen: false, closable: this.options.closable,
        };

        this.modal = NModalHandler.append(...[
            this.el.get(0), modalProps
        ]);

        this.modal.on('close', () => {
            this.close();
        });

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
            class: Styler.bem('n-alert', this.options),
        });

        root.appendTo(document.body);

        const frame = Dom.make('div', {
            class: 'n-alert__frame',
        });

        frame.appendTo(root);

        const body = Dom.make('div', {
            class: 'n-alert__body',
        });

        body.appendTo(frame);

        const iconCls = this.options.icon || Styler.icon(...[
            this.options.type, 'alert'
        ]);

        const icon = Dom.make('div', {
            class: 'n-alert__icon',
            html: `<i class="${iconCls}"></i>`,
        });

        icon.appendTo(body);

        const text = Dom.make('div', {
            class: 'n-alert__text',
            html: `<p>${this.options.text}</p>`,
        });

        text.appendTo(body);

        const action = Dom.make('div', {
            class: 'n-alert__action',
        });

        action.appendTo(frame);

        const okayCls = Styler.button({
            //
        });

        const okay = Dom.make('button', {
            class: okayCls.join(' '),
        });

        okay.on('mousedown', () => {
            this.close();
        });

        okay.html(...[
            `<span>${this.options.okayText}</span>`
        ]);

        okay.appendTo(action);

        return root;
    }

}