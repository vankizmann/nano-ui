import ProtoExtend from "./ProtoExtend.ts";
import BaseData from "../data/BaseData.ts";
import IconData from "../data/IconData.ts";
import { ProtoController } from "../../index.ts";
import { Arr, Mix } from "@kizmann/pico-js";

export class ProtoData extends ProtoExtend([BaseData, IconData])
{
    /**
     * @type {ProtoController}
     */
    scope : ProtoController;

    constructor(scope : ProtoController)
    {
        super();

        this.scope = scope;
    }

    classRoot(merge : string[] = []) : string[]
    {
        const { view } = this.scope;

        const classList = [
            view.bem
        ];

        if ( this.size ) {
            classList.push(`n-size-${this.size}`);
        }

        if ( this.type ) {
            classList.push(`n-type-${this.type}`);
        }

        if ( this.color ) {
            classList.push(`n-color-${this.color}`);
        }

        if ( this.load ) {
            classList.push('n-load');
        }

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        if ( this.clearable ) {
            classList.push('n-clearable');
        }

        if ( this.theme ) {
            classList.push(`n-theme-${this.theme}`);
        }

        if ( this.icon && this.iconPosition ) {
            classList.push(`n-icon-${this.iconPosition}`);
        }

        if ( typeof merge !== 'object' ) {
            merge = [merge];
        }

        Arr.each(merge, (cls : string) => {
            classList.push(cls.replace(':bem', view.bem));
        });

        return classList;
    }

    classPart(part : any, merge : string[] = []) : string[]
    {
        const { view } = this.scope;

        const classList = [
            //
        ];

        if ( !Mix.isEmpty(part) ) {
            classList.push(`${view.bem}__${part}`);
        }

        if ( typeof merge !== 'object' ) {
            merge = [merge];
        }

        Arr.each(merge, (cls : string) => {
            classList.push(cls.replace(':bem', view.bem));
        });

        return classList;
    }

}

export interface ProtoData extends BaseData, IconData {
    //
}

export default ProtoData;