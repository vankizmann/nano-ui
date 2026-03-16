import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NSliderView } from "./NSliderView.ts";
import { NSliderData } from "./NSliderData.ts";
import { Arr, Dom, Mix, Num } from "@kizmann/pico-js";


export class NSliderController extends ProtoController
{
    /**
     * @type {NSliderController}
     */
    declare scope : NSliderController;

    /**
     * @type {NSliderData}
     */
    declare data : NSliderData;

    /**
     * @type {NSliderView}
     */
    declare view : NSliderView;

    /**
     * @type {ResizeObserver}
     */
    observer : ResizeObserver;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NSliderView(this),
            new NSliderData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeRef('el');

        this.cloneProp('modelValue');

        this.makeData('width', null);
        this.makeData('index', 0);
        this.makeData('values', []);

        this.updateValues();

        return this;
    }

    onMounted()
    {
        this.observer = new ResizeObserver(() => {
            this.onResize();
        });

        this.observer.observe(this.rel('el'));
    }

    onUnmounted()
    {
        this.observer.disconnect();
    }

    onResize()
    {
        this.set('width', this.dom('el').width());
    }

    onPointerdown(e : any, index : number)
    {
        const uid = this.uid;

        e.preventDefault();
        e.stopPropagation();

        const [el, db] = [
            Dom.find(e.target).upnode('[data-handle]'),
            Dom.find(document.body)
        ];

        db.on('pointermove', (e : any) => {
            this.onPointermove(e, index);
        }, { passive: true, uid });

        db.once('pointerup', (e : any) => {
            this.onPointerup(e);
            db.off('pointermove', { uid });
            el.remClass('n-move');
        });

        el.addClass('n-move');
    }

    onPointermove(e : any, index : number)
    {
        const { data } = this;

        let [cursor, offset] = [
            e.clientX, this.dom('el').offset('left')
        ];

        let width = (cursor - offset) /
            data.width * 100;

        let closest = this.getClosestStep(...[
            width, index
        ]);

        if ( closest < data.minfix ) {
            closest = data.minfix;
        }

        if ( closest > data.maxfix ) {
            closest = data.maxfix;
        }

        const min = data.values[0];

        if ( index === 1 && closest < min ) {
            closest = min;
        }

        const max = data.values[1];

        if ( index === 0 && closest > max ) {
            closest = max;
        }

        const values = Arr.clone(data.values);

        Arr.splice(values, ...[
            index, 1, closest
        ]);

        this.set('values', values);
    }

    onPointerup(e : any)
    {
        const { data } = this;

        this.update('modelValue', ...[
            data.range ? data.values : Arr.last(data.values)
        ]);
    }

    updateValues()
    {
        const { data } = this;

        let values : [number, number] = [
            data.minfix, null
        ];

        if ( Mix.isArr(data.model) ) {
            values = data.model;
        }

        let value = Arr.last(...[
            Arr.all(data.model)
        ]);

        if ( Mix.isNull(value) ) {
            value = data.maxfix;
        }

        this.set('values', [values[0], value]);
    }

    getClosestStep(width : number, index : number)
    {
        const { data } = this;

        if ( Mix.isNum(data.steps) ) {
            return Math.round(width / data.steps) * data.steps;
        }

        const ranges = [
            Arr.last(data.steps), Arr.first(data.steps),
        ];

        const step = (Num.subtract(ranges) / 100 * width);

        let diff = Arr.each(data.steps, (val : number) => {
            return Math.abs(step - val + data.minfix);
        });

        let target = Arr.findIndex(diff, Math.min(...diff));

        return data.steps[target];
    }

}

export default NSliderController;