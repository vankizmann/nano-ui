import { SetupContext, onMounted, onUnmounted } from "vue";
import { Arr, Dom, Mix } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NResizerView } from "./NResizerView.ts";
import { NResizerData } from "./NResizerData.ts";

export class NResizerController extends ProtoController
{
    /**
     * @type {NResizerController}
     */
    declare scope : NResizerController;

    /**
     * @type {NResizerData}
     */
    declare data : NResizerData;

    /**
     * @type {NResizerView}
     */
    declare view : NResizerView;

    /**
     * @type {ResizeObserver}
     */
    observer : ResizeObserver;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NResizerView(this),
            new NResizerData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this
            .cloneProp('modelValue')
            .cloneProp('width')
            .cloneProp('group');

        this
            .makeRef('el')
            .makeRef('handle');


        if ( this.data.group == null ) {
            this.set('group', [this.uid]);
        }

        return this;
    }

    onMounted()
    {
        this.onSignal('NResizer', (group : any) => {
            this.onGroupSignal(group);
        });

        this.observer = new ResizeObserver(() => {
            this.observeOffset();
        });

        this.observer.observe(this.ref('el').value);
    }

    onUnmounted()
    {
        this.observer.disconnect();
        this.observer = null;
    }

    observeOffset()
    {
        this.detectOffset();
        this.update('width', this.data.width);
    }

    detectOffset(e : any = {})
    {
        const { data } = this;

        let [cursor, client] = [
            e.clientX, this.el.clientWidth,
        ];

        const offset = this.dom('el').rect();

        if ( data.direction === 'right' ) {
            cursor = (cursor ?? offset.x + client);
        }

        if ( data.direction === 'left' ) {
            cursor = cursor ?? offset.x;
        }

        let target = 0;

        if ( data.direction === 'right' ) {
            target = cursor - offset.x;
        }

        if ( data.direction === 'left' ) {
            target = offset.x - cursor + client;
        }

        if ( Mix.isNum(data.minWidth) ) {
            target = Math.max(target, data.minWidth);
        }

        if ( Mix.isNum(data.maxWidth) ) {
            target = Math.min(target, data.maxWidth);
        }

        target = Math.round(target);

        if ( target > 0 ) {
            this.set('width', target);
        }

        if ( data.direction === 'right' ) {
            return target;
        }

        return target * -1;
    }

    onPointerdown(e : any)
    {
        const uid = this.uid;

        e.preventDefault();
        e.stopPropagation();

        const [el, db] = [
            Dom.find(this.el),
            Dom.find(document.body)
        ];

        db.on('pointermove', (e : any) => {
            this.onPointermove(e);
        }, { passive: true, uid });

        db.once('pointerup', (e : any) => {
            this.onPointerup(e);
            db.off('pointermove', { uid });
            el.remClass('n-move');
        });

        el.addClass('n-move');
    }

    onPointermove(e : any)
    {
        const offset = this.detectOffset(e);

        let style = {
            transform: `translateX(${offset}px)`
        };

        this.dom('handle').style(style);
    }

    onPointerup(e : any)
    {
        this.fireSignal('NResizer', this.data.group);
    }

    onGroupSignal(group : any)
    {
        const { data } = this;

        if ( !Arr.has(data.group, group) ) {
            return;
        }

        this.update('width', data.width);
        this.update('modelValue', data.width);
    }

}

export default NResizerController;