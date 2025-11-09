import { UUID, Str, Obj, Dom, Any, Arr } from "@kizmann/pico-js";
import PopoverElement from "./popover-element.mjs";
import PopoverHelper from "./popover-helper.mjs";

window.PopoverBag = {};

export class PopoverHandler
{
    static alias = 'Popover';

    static current = [];

    static mount()
    {
        Dom.find(window).on(PopoverHelper.getMouseDownEvent(), Any.throttle((e) => {
            this.detectFadeOnCurrent(e);
        }, 30));

        Dom.find(window).on(PopoverHelper.getScrollEvent(), Any.throttle((e) => {
            this.detectScrollOnCurrent(e);
        }, 30));

        return this;
    }

    static append(el, item)
    {
        if ( ! window.PopoverBag[item.uid] ) {
            window.PopoverBag[item.uid] = new PopoverElement(el, item);
        }

        return window.PopoverBag[item.uid];
    }

    static remove(item)
    {
        if ( window.PopoverBag[item.uid] ) {
            window.PopoverBag[item.uid].unbind();
        }

        delete window.PopoverBag[item.uid];
    }

    static setCurrent(el)
    {
        if ( Arr.has(this.current, el) ) {
            return;
        }

        let cascade = el.parents();

        Arr.each(this.current, (current) => {
            current.currentChange(cascade);
        });

        Arr.add(this.current, el);
    }

    static getCurrent()
    {
        return Arr.last(this.current);
    }

    static unsetCurrent(el)
    {
        return Arr.remove(this.current, el);
    }

    static detectFadeOnCurrent(event)
    {
        let current = Arr.last(this.current);

        if ( Any.isEmpty(current) ) {
            return;
        }

        let { el, target, trigger } = current.options;

        let tgt = Dom.find(event.target).closest(target),
            src = Dom.find(event.target).closest(el);

        let result = (!! tgt || !! src);

        if ( current.visible === result ) {
            return;
        }

        if ( trigger !== 'context' && !! tgt ) {
            return;
        }

        current.hide('exit');
    }

    static detectScrollOnCurrent(event)
    {
        let currents = Arr.filter(this.current, {
            scrollClose: true
        });

        Arr.each(currents, (current) => {
            current.hide('scroll');
        });
    }

}

if ( ! window[PopoverHandler.alias] ) {
    window[PopoverHandler.alias] = PopoverHandler;
}

Dom.ready(() => {
   PopoverHandler.mount();
});

export default PopoverHandler;
