import { ProtoController } from "../../../root/index.js";
import { NVirtualbarProps } from "./NVirtualbar.js";
import { NVirtualbarView } from "./NVirtualbarView.jsx";
import { NVirtualbarData } from "./NVirtualbarData.js";
import { onBeforeUnmount, onMounted } from "vue";
import { NScrollbarElement } from "../handler/NScrollbarElement.js";
import { Arr, Obj, Run } from "@kizmann/pico-js";

/**
 * @class NVirtualbarController
 * @extends {BaseController<NVirtualbarController, NVirtualbarProps, NVirtualbarView, NVirtualbarData>}
 */
export class NVirtualbarController extends ProtoController
{
    /**
     * @type {NScrollbarElement}
     */
    scrollbar;

    timer;
    idler;

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NVirtualbarView(this),
            new NVirtualbarData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .linkProp('items')
            .linkProp('threshold')
            .linkProp('grid')
            .linkProp('itemHeight')
            .linkProp('itemWidth')
            .linkProp('rawMode')
            .linkProp('overflowX')
            .linkProp('overflowY')
            .linkProp('wrapClass')
            .linkProp('scrollPortal');

        this
            .makeRef('el')
            .makeRef('viewport');

        this.makeData('state', {
            start: 0, end: 0, grid: 1
        });

        onMounted(() => {
            this.mounted();
        });

        onBeforeUnmount(() => {
            this.scrollbar.destroy();
        });

        return this;
    }

    mounted()
    {
        const { el, view, data } = this.unpack();

        let options = {
            bem: view.bem,
            overflowX: data.overflowX,
            overflowY: data.overflowY,
            scrollPortal: data.scrollPortal,
        };

        options.onReady = (e) => {
            this.buildState(e);
            this.ready();
        };

        options.onUpdate = (e) => {
            this.buildState(e);
        };

        this.scrollbar = new NScrollbarElement(el, options);
    }

    ready()
    {
        this.emit('ready');
    }

    buildState()
    {
        const { el, data } = this.unpack();

        let grid = 1;

        const total = Math.ceil(data.items.length / grid);

        if ( data.threshold && total < data.threshold ) {
            return this.set('state', { start: 0, end: total, grid: 1 });
        }

        const item = {
            x: data.itemWidth, y: data.itemHeight
        };

        const target = this.ref('viewport')?.value;

        const [scroll, client] = [
            target.scrollTop - 400, el.clientHeight + 800
        ];

        const [start, end] = [
            Math.floor(scroll / item.y),
            Math.ceil((scroll + client) / item.y),
        ];

        const state = {
            start: Math.max(0, start),
            end: Math.min(end, total),
            grid: Math.max(1, grid),
        };

        const rainbow = [
            data.state.start === state.start,
            data.state.end === state.end,
            data.state.grid === state.grid,
        ];

        if ( rainbow.indexOf(false) !== -1 ) {
            this.set('state', state);
        }
    }

    startWatch()
    {
        if ( this.timer ) {
            return;
        }

        this.timer = Date.now();

        const idler = Run.interval(() => {
            this.buildState();
        }, 15);

        Run.delay(() => {
            this.timer = (idler(), 0);
        }, 2000);
    }

    scrollTo(index)
    {
        const viewport = this.ref('viewport')?.value;

        if ( ! viewport ) {
            console.warn('Viewport is not ready yet!');
        }

        let target = index * this.data.itemHeight;

        let [scroll, client] = [
            viewport.scrollTop, viewport.clientHeight
        ];

        client -= this.data.itemHeight;

        if ( target > scroll && target < scroll + client ) {
            return;
        }

        if ( target > scroll + client ) {
            target -= client;
        }

        Run.frame(() => {
            viewport.scrollTop = target;
        });
    }

}

export default NVirtualbarController;