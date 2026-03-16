import { onBeforeUnmount, onMounted, watch } from "vue";
import { Run } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NVirtualbarView } from "./NVirtualbarView.ts";
import { NVirtualbarData } from "./NVirtualbarData.ts";
import { NScrollbarElement } from "../handler/NScrollbarElement.ts";
import { SetupContext } from "vue";


export class NVirtualbarController extends ProtoController
{
    /**
     * @type {NVirtualbarController}
     */
    declare scope : NVirtualbarController;

    /**
     * @type {NVirtualbarData}
     */
    declare data : NVirtualbarData;

    /**
     * @type {NVirtualbarView}
     */
    declare view : NVirtualbarView;

    /**
     * @type {NScrollbarElement}
     */
    scrollbar : NScrollbarElement;

    /**
     * @type {any}
     */
    timer : any;

    constructor(props : any, context : SetupContext)
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

        this.makeUID();

        this
            .makeRef('el')
            .makeRef('viewport');

        this.makeData('state', {
            start: 0, end: 0, grid: 1
        });

        watch(() => this.props.items, () => {
            this.buildState();
        });

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
            scrollPortal: data.scrollPortal,
        };

        options.onReady = () => {
            this.buildState();
            this.fireReady();
        };

        options.onUpdate = () => {
            this.buildState();
        };

        this.scrollbar = new NScrollbarElement(el, options);
    }

    fireReady()
    {
        this.emit('ready', this);
    }

    buildState()
    {
        const { el, data } = this;

        let [grid, width] : [number, number] = [
            1, el.clientWidth
        ];

        if ( data.grid ) {
            grid = Math.floor(width / data.itemWidth);
        }

        const total = Math.ceil(data.items.length / grid);

        if ( data.threshold && total * grid < data.threshold ) {
            return this.set('state', { start: 0, end: total, grid, total });
        }

        const item = {
            x: data.itemWidth, y: data.itemHeight
        };

        const viewport = this.ref('viewport')?.value;

        if ( !viewport ) {
            return console.warn('Viewport is not ready yet!');
        }

        const [scroll, client] = [
            viewport.scrollTop - 400, el.clientHeight + 800
        ];

        const [start, end] = [
            Math.floor(scroll / item.y),
            Math.ceil((scroll + client) / item.y),
        ];

        const state = {
            start: Math.max(0, start),
            end: Math.min(end, total),
            grid: Math.max(1, grid),
            total: Math.max(0, total),
        };

        const rainbow = [
            data.state.start === state.start,
            data.state.end === state.end,
            data.state.grid === state.grid,
            data.state.total === state.total,
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

    scrollTo(index : number)
    {
        const viewport = this.ref('viewport')?.value;

        if ( !viewport ) {
            console.warn('Viewport is not ready yet!');
        }

        const { items, state, itemHeight } = this.data;

        if ( index < 0 ) {
            index += items.length;
        }

        let target = Math.floor(index / state.grid) * itemHeight;

        let [scroll, client] = [
            viewport.scrollTop, viewport.clientHeight
        ];

        client -= itemHeight;

        if ( target > scroll && target <= scroll + client ) {
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