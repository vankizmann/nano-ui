import { Dom, Hash, Locale, Obj, Run } from "@kizmann/pico-js";
import { Styler } from "../../../root/index.ts";
import NNotifyHandler from "./NNotifyHandler.ts";

export class NNotifyElement
{
    /**
     * @var {Dom}
     */
    el : Dom;

    /**
     * @var {any}
     */
    options : any = {
        text: null,
        theme: null,
        size: null,
        type: null,
        position: null,
        duration: 4500,
    };

    constructor(options : any)
    {
        this.options = Obj.assign(...[
            this.options, options
        ]);
    }

    open()
    {
        const {duration} = this.options;

        const frame = NNotifyHandler.frame(...[
            this.options.position
        ]);

        this.el = this.render();

        this.el.on('pointerdown', (e:any) => {
            e.stopPropagation();
            this.close();
        });

        Run.delay(...[
            () => this.close(), duration
        ]);

        Run.frame(() => {
            this.el.addClass('n-active');
        });

        this.el.appendTo(frame);
    }

    close()
    {
        if ( this.el == null ) {
            return;
        }

        // Remove element from dom
        this.el.get(0).remove();

        // Clear for memory
        this.el = null;

        // Remove frame if necessary
        Run.frame(() => NNotifyHandler.clear());
    }

    render()
    {
        const root = Dom.make('div', {
            class: Styler.bem('n-notify', this.options),
        });

        const icon = Dom.make('div', {
            class: 'n-notify__icon',
        });

        const iconCls = Styler.icon(...[
            this.options.type, 'notify'
        ]);

        icon.html(...[
            `<i class="${iconCls}"></i>`
        ]);

        icon.appendTo(root);

        const text = Dom.make('div', {
            class: 'n-notify__text',
        });

        text.html(...[
            `<p>${this.options.text}</p>`
        ]);

        text.appendTo(root);

        return root;
    }

}