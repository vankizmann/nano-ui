import { Dom, Mix } from "@kizmann/pico-js";
import { NNotifyElement } from "./NNotifyElement.ts";
import { Styler } from "../../../root/index.ts";

export class NNotifyHandler
{
    static make(options : any = {}, type : string = null)
    {
        if ( Mix.isString(options) ) {
            options = { text: options };
        }

        if ( type != null ) {
            options.type = type;
        }

        const notification = new NNotifyElement(...[
            options
        ]);

        return notification.open();
    }

    static create(position : string)
    {
        const el = Dom.make('div', {
            class: Styler.bem('n-notify-frame'),
        });

        el.data('notify', position);

        // Append to body
        el.appendTo(document.body);

        return el;
    }

    static frame(position : string)
    {
        if ( position == null ) {
            position = 'bottom-start';
        }

        let el = Dom.find(`[data-notify="${position}"]`);

        if ( el.el == null ) {
            el = this.create(position);
        }

        return el;
    }

    static clear()
    {
        Dom.find('[data-notify]').each((el : HTMLElement) => {
            if ( !Dom.find(el).childs().length ) {
                el.remove();
            }
        });
    }

}

export default NNotifyHandler;