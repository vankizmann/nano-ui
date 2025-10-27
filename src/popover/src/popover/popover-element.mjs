import { Any, Dom, Event, Obj, UUID } from "@kizmann/pico-js";
import { PopoverHelper } from "./popover-helper.mjs";


export class PopoverElement
{
    static alias = 'Popover';

    visible = false;

    options = {
        el: null, target: null, listen: false, trigger: 'hover', position: 'bottom-center', scrollClose: true, autoClose: true,
    };

    events = {};

    constructor(el, options = {})
    {
        this.options = Obj.assign(this.options, options, {
            el
        });

        if ( ! options.uid ) {
            options.uid = UUID()
        }

        this.bind();
    }

    bind()
    {
        let { uid, trigger } = this.options;

        if ( trigger === 'hover' ) {
            Dom.find(document.body).on(PopoverHelper.getHoverEvent(),
                Any.framerate((e) => this.onHover(e), 30), { uid });
        }

        if ( trigger === 'click' ) {
            Dom.find(document.body).on(PopoverHelper.getClickEvent(),
                Any.framerate((e) => this.onClick(e), 30), { uid });
        }

        if ( trigger === 'context' ) {
            Dom.find(document.body).on(PopoverHelper.getContextEvent(),
                Any.framerate((e) => this.onContext(e), 30), { uid });
        }

        Dom.find(document.body).on(PopoverHelper.getMouseDownEvent(),
            Any.framerate((e) => this.onExit(e), 30), { uid });

        Event.bind('NPopover:close', this.onClose, { uid });
    }

    unbind()
    {
        let { uid, trigger } = this.options;

        if ( trigger === 'hover' ) {
            Dom.find(document).off(PopoverHelper.getHoverEvent(),
                null, { uid });
        }

        if ( trigger === 'click' ) {
            Dom.find(document).off(PopoverHelper.getClickEvent(),
                null, { uid });
        }

        if ( trigger === 'context' ) {
            Dom.find(document).off(PopoverHelper.getContextEvent(),
                null, { uid });
        }

        Dom.find(document).off(PopoverHelper.getMouseDownEvent(),
            null, { uid });

        Event.unbind('NPopover:close', { uid });
    }

    on(event, cb)
    {
        this.events[event] = cb;
    }

    off(event)
    {
        delete this.events[event];
    }

    show()
    {
        let { el } = this.options;

        Dom.find(el).attr('data-ready', 'true');

        Dom.find(el).css({
            'z-index': window.zIndex++, 'top': 0, 'left': 0, 'width': '200px'
        })

        if ( Any.isFunction(this.events['open']) ) {
            this.events['open'].apply({}, this);
        }

        console.log('open', el);

        this.visible = true;
    }

    hide()
    {
        let { el } = this.options;

        Dom.find(el).attr('data-ready', null);

        if ( Any.isFunction(this.events['close']) ) {
            this.events['close'].apply({}, this);
        }

        console.log('close', el);

        this.visible = false;
    }

    onHover(event)
    {
        let { el, target } = this.options;

        let tgt = Dom.find(event.target).closest(target),
            src = Dom.find(event.target).closest(el);

        let result = (!! tgt || !! src);

        if ( this.visible === result ) {
            return;
        }

        if ( ! result ) {
            return this.hide();
        }

        this.show();
    }

    onClick(event)
    {
        let { el, target } = this.options;

        let keyCode = event.which === 1 || event.which === 0;

        if ( this.visible || ! keyCode ) {
            return;
        }

        let tgt = Dom.find(event.target).closest(target),
            src = Dom.find(event.target).closest(el);

        let result = (!! tgt || !! src);

        if ( this.visible === result ) {
            return;
        }

        this.show();
    }

    onContext(event)
    {

    }

    onExit(event)
    {
        let { el, target, trigger } = this.options;

        if ( ! this.visible ) {
            return;
        }

        let tgt = Dom.find(event.target).closest(target),
            src = Dom.find(event.target).closest(el);

        let result = (!! tgt || !! src);

        if ( this.visible === result ) {
            return;
        }

        if ( trigger !== 'context' && !! tgt ) {
            return;
        }

        this.hide();
    }

    onClose(event)
    {

    }

}

if ( ! window[PopoverElement.alias] ) {
    window[PopoverElement.alias] = PopoverElement;
}

export default PopoverElement;