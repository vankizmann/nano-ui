import { Arr, Dom } from "@kizmann/pico-js";

export default class NScrollbarHelper
{
    /**
     * @type {boolean}
     */
    static native : boolean;

    static init()
    {
        if ( this.native == null ) {
            this.detectNative();
        }

        return this;
    }

    static detectNative()
    {
        const el = Dom.make('div', {
            classList: 'n-scrollbar-test', html: '<div></div>'
        });

        el.appendTo(document.body);

        const vrect = {
            client: el.el.clientHeight,
            offset: el.el.offsetHeight,
        };

        const hrect = {
            client: el.el.clientWidth,
            offset: el.el.offsetWidth,
        };

        const rainbow = [
            vrect.client === vrect.offset,
            hrect.client === hrect.offset,
        ];

        this.native = !Arr.has(rainbow, false);

        el.el.remove();
    }

}

if ( !globalThis.NScrollbarHelper ) {
    globalThis.NScrollbarHelper = NScrollbarHelper.init();
}