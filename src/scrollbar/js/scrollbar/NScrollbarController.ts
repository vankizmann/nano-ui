import { ProtoController } from "../../../root/index.ts";
import { NScrollbarView } from "./NScrollbarView.ts";
import { NScrollbarData } from "./NScrollbarData.ts";
import { onBeforeUnmount, onMounted } from "vue";
import { NScrollbarElement } from "../handler/NScrollbarElement.ts";
import { SetupContext } from "vue";
import { Run } from "@kizmann/pico-js";

export class NScrollbarController extends ProtoController
{
    /**
     * @type {NScrollbarController}
     */
    declare scope : NScrollbarController;

    /**
     * @type {NScrollbarData}
     */
    declare data : NScrollbarData;

    /**
     * @type {NScrollbarView}
     */
    declare view : NScrollbarView;

    /**
     * @type {NScrollbarElement}
     */
    scrollbar : NScrollbarElement;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NScrollbarView(this),
            new NScrollbarData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .makeRef('el')
            .makeRef('viewport');

        onBeforeUnmount(() => {
            this.scrollbar.destroy();
        });

        return this;
    }

    onMounted()
    {
        const { el, view, data } = this;

        let options : any = {
            bem: view.bem,
            overflowX: data.overflowX,
            overflowY: data.overflowY,
        };

        options.onReady = () => {
            this.emit('ready', this);
        };

        this.scrollbar = new NScrollbarElement(el, options);
    }

    scrollTo(selector : any, options : any = {})
    {
        options = {
            padding: 0, ...options
        };

        const item = this.dom('el').find(selector);

        if ( !item ) {
            return console.warn('Scroll element not found!');
        }

        const viewport = this.ref('viewport')?.value;

        if ( !viewport ) {
            return console.warn('Viewport is not ready yet!');
        }

        let target = item.offset('top', viewport);

        let [scroll, client] = [
            viewport.scrollTop, viewport.clientHeight
        ];

        client -= item.height() + options.padding;

        if ( target > scroll && target < scroll + client ) {
            return;
        }

        if ( target > scroll + client ) {
            target -= client;
        }

        Run.frame(() => {
            viewport.scrollTo({ top: target, ...options });
        });
    }

    scrollCenter(selector : any, options : any = {})
    {
        const item = this.dom('el').find(selector);

        if ( !item ) {
            return console.warn('Scroll element not found!');
        }

        const viewport = this.ref('viewport')?.value;

        if ( !viewport ) {
            console.warn('Viewport is not ready yet!');
        }

        let target = item.offset('top', viewport);

        let [scroll, client] = [
            viewport.scrollTop, viewport.clientHeight
        ];

        target += (client / 2) + (item.height() / 2);

        if ( target > scroll && target < scroll + client ) {
            return;
        }

        if ( target > scroll + client ) {
            target -= client;
        }

        Run.frame(() => {
            viewport.scrollTo({ top: target, ...options });
        });
    }

}

export default NScrollbarController;