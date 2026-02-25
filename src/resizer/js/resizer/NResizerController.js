import { ProtoController } from "../../../root/index.js";
import { NResizerProps } from "./NResizer.js";
import { NResizerView } from "./NResizerView.jsx";
import { NResizerData } from "./NResizerData.js";
import { Arr, Dom, Mix, Run, Signal } from "@kizmann/pico-js";
import { onMounted, onUnmounted } from "vue";

/**
 * @class NResizerController
 * @extends {BaseController<NResizerController, NResizerProps, NResizerView, NResizerData>}
 */
export class NResizerController extends ProtoController
{
    observer;

    constructor(props, context)
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
            .cloneProp('group')
            .linkProp('disabled')
            .linkProp('type')
            .linkProp('minWidth')
            .linkProp('maxWidth')
            .linkProp('flex')
            .linkProp('group')
            .linkProp('direction');

        this
            .makeRef('el')
            .makeRef('handle');


        if ( this.data.group == null ) {
            this.set('group', [this.uid]);
        }

        onMounted(() => {
            this.onMounted();
        });

        onUnmounted(() => {
            this.onUnmounted()
        })

        return this;
    }

    onMounted()
    {
        this.onSignal('NResizer', (group) => {
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

    detectOffset(e = {})
    {
        const { data } = this.unpack();

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

        let [target, handle] = [
            null, this.dom('handle').width()
        ];

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

        target = data.width = Math.round(target);

        if ( data.direction === 'right' ) {
            return target;
        }

        return target * - 1;
    }

    onMousedown(e)
    {
        const uid = this.uid;

        e.preventDefault();
        e.stopPropagation();

        const [el, db] = [
            Dom.find(this.el),
            Dom.find(document.body)
        ];

        db.on('pointermove', (e) => {
            this.onMousemove(e, el);
        }, { passive: true, uid });

        db.once('pointerup', (e) => {
            this.onMouseup(e);
            db.off('pointermove', { uid });
            el.remClass('n-move');
        });

        el.addClass('n-move');
    }

    onMousemove(e)
    {
        const offset = this.detectOffset(e);

        let style = {
            transform: `translateX(${offset}px)`
        };

        this.dom('handle').style(style);
    }

    onMouseup(e)
    {
        this.fireSignal('NResizer', this.data.group);
    }

    onGroupSignal(group)
    {
        const { data } = this.unpack();

        if ( ! Arr.has(data.group, group) ) {
            return;
        }

        this.update('width', data.width);
        this.update('modelValue', data.width);
    }

}

export default NResizerController;