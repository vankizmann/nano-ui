import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NInfoColumnController } from "./NInfoColumnController.ts";
import { Obj } from "@kizmann/pico-js";

/**
 * @class NInfoColumnView
 * @extends {ProtoView<NInfoColumnController>}
 */
export class NInfoColumnView extends ProtoView
{
    /**
     * @type {NInfoColumnController}
     */
    declare scope : NInfoColumnController;

    /**
     * @type {string}
     */
    bem : string = 'n-info-column';

    resolve(type : string, scope : string = 'NInfoCells') : any
    {
        if ( globalThis[scope][type] ) {
            return globalThis[scope][type];
        }

        return globalThis[scope]['string'];
    }

    default() : any
    {
        const { scope, data } = this.scope;

        const props : any = {
            class: [this.bem, `${this.bem}--${data.type}`],
        };

        return h('div', props, [
            this.label(), this.field()
        ]);
    }

    label() : any
    {
        const { data } = this.scope;

        return this.div('label', [
            data.label
        ]);
    }

    field() : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            class: ['n-info-cell']
        };

        const input = Obj.get(...[
            scope.ncx('info').data.item, data.prop
        ]);

        const cell = {
            bem: 'n-info-cell',
            props: props,
            input: input,
            item: { item: data.item },
            column: scope,
            info: scope.ncx('info'),
            comp: this.comp,
        };

        return this.resolve(data.type)({
            ...cell
        });
    }


}

export default NInfoColumnView;