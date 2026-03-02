import { h } from "vue";
import { Arr, Mix, Now, Obj, Run } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NTimepickerPanelController } from "./NTimepickerPanelController.ts";

export class NTimepickerPanelView extends ProtoView
{
    /**
     * @type {NTimepickerPanelController}
     */
    declare scope : NTimepickerPanelController;

    /**
     * @type {string}
     */
    bem : string = 'n-timepicker-panel';

    default() : any
    {
        let { data } = this.scope;

        let props = {
            class: data.classList
        };

        return h('div', props, [
            this.header(), this.body()
        ]);
    }

    header()
    {
        const { data } = this.scope;

        let timeProps = {
            class: data.classPart('time')
        };

        let time = data.date.format(...[
            data.displayFormat
        ]);

        if ( !data.date.input ) {
            time = data.placeholder;
        }

        const display = this.div('display', [
            h('span', timeProps, [time])
        ]);

        return this.div('header', [display]);
    }

    body() : any
    {
        return this.div('body', [
            this.hours(), this.minutes(), this.seconds()
        ]);
    }

    hours() : any
    {
        const { data } = this.scope;

        if ( !/HH/.test(data.displayFormat) ) {
            return null;
        }

        const items = Arr.each(data.hoursGrid, (hour : any) => {
            return this.item(hour, 'HH');
        });

        let props : any = {
            class: data.classPart('panel'),
        };

        let selector = [
            `[data-index="${data.date.format('HH')}"]`
        ];

        props.onReady = (ncx : any) => {
            data.date.input && ncx.scrollCenter(...selector);
        };

        return this.comp('n-scrollbar', props, () => items);
    }

    minutes()
    {
        const { data } = this.scope;

        if ( !/mm/.test(data.displayFormat) ) {
            return null;
        }

        const items = Arr.each(data.minutesGrid, (minute : any) => {
            return this.item(minute, 'mm');
        });

        let props : any = {
            class: data.classPart('panel'),
        };

        let selector = [
            `[data-index="${data.date.format('mm')}"]`
        ];

        props.onReady = (ncx : any) => {
            data.date.input && ncx.scrollCenter(...selector);
        };

        return this.comp('n-scrollbar', props, () => items);
    }

    seconds()
    {
        const { data } = this.scope;

        if ( !/ss/.test(data.displayFormat) ) {
            return null;
        }

        const items = Arr.each(data.secondsGrid, (second : any) => {
            return this.item(second, 'ss');
        });

        let props : any = {
            class: data.classPart('panel'),
        };

        let selector = [
            `[data-index="${data.date.format('ss')}"]`
        ];

        props.onReady = (ncx : any) => {
            data.date.input && ncx.scrollCenter(...selector);
        };

        return this.comp('n-scrollbar', props, () => items);
    }

    item(item : Now, format : string) : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            class: data.classPart('item'),
        };

        props['data-index'] = item.format(format);

        if ( data.date.input && data.date.equal(item, format) ) {
            props.class.push('n-selected');
        }

        props.onPointerdown = () => {
            scope.onMousedown(item);
        };

        return this.div(props, [
            h('span', null, [item.format(format)])
        ]);
    }

}

export default NTimepickerPanelView;