import { UUID, Str, Obj, Dom, Any, Arr } from "@kizmann/pico-js";
import PopoverElement from "./popover-element.mjs";

window.PopoverBag = {};

export class PopoverHandler
{
    static alias = 'Popover';

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

}

if ( ! window[PopoverHandler.alias] ) {
    window[PopoverHandler.alias] = PopoverHandler;
}

export default PopoverHandler;
