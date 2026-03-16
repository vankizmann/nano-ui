import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NLoaderView } from "./NLoaderView.ts";
import { NLoaderData } from "./NLoaderData.ts";
import { Run } from "@kizmann/pico-js";

export class NLoaderController extends ProtoController
{
    /**
     * @type {NLoaderController}
     */
    declare scope : NLoaderController;

    /**
     * @type {NLoaderData}
     */
    declare data : NLoaderData;

    /**
     * @type {NLoaderView}
     */
    declare view : NLoaderView;

    /**
     * @type {number}
     */
    timing : number = 0;

    /**
     * @type {any}
     */
    timeout : any = null;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NLoaderView(this),
            new NLoaderData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeData('active');

        this.watchProp('visible', () => {
            this.applyTimer();
        });

        const { visible } = this.data;

        if ( visible ) {
            this.applyTimer();
        }

        return this;
    }

    applyTimer()
    {
        this.timing = Date.now();

        if ( this.timeout ) {
            this.timeout();
        }

        if ( this.data.visible ) {
            return this.set('active', this.data.visible);
        }

        this.startTimer();
    }

    startTimer()
    {
        let timing = Date.now() - this.timing;

        if ( timing < this.data.minimum ) {
            return this.restartTimer(timing);
        }

        const { debounce: db } = this.data;

        this.timeout = Run.delay(() => {
            this.set('active', false);
        }, db);
    }

    restartTimer(timing = 0)
    {
        const { minimum: min } = this.data;

        if ( this.timeout ) {
            this.timeout();
        }

        this.timeout = Run.delay(...[
            () => this.startTimer(), min - timing + 10
        ]);
    }

}

export default NLoaderController;