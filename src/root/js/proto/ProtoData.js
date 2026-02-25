import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { AlignData } from "../props/AlignData.js";
import BaseData from "../props/BaseData.js";
import IconData from "../props/IconData.js";
import OptionData from "../props/OptionData.js";
import TextData from "../props/TextData.js";
import PositionData from "../props/PositionData.js";
import DragData from "../props/DragData.js";

/**
 * @class ProtoData
 *
 * @typedef {import('./ProtoController.js')} ProtoController
 * @typedef {import('../props/BaseData.js')} BaseData
 * @typedef {import('../props/AlignData.js')} AlignData
 * @typedef {import('../props/IconData.js')} IconData
 * @typedef {import('../props/OptionData.js')} OptionData
 * @typedef {import('../props/PositionData.js')} PositionData
 * @typedef {import('../props/DragData.js')} DragData
 *
 * @extends BaseData
 * @extends AlignData
 * @extends IconData
 * @extends OptionData
 * @extends PositionData
 * @extends DragData
 *
 * @template {ProtoController} NCX
 */
export class ProtoData
{

    /**
     * @type {NCX}
     */
    scope;

    constructor(scope)
    {
        [this.scope] = [scope];
    }

    classRoot(merge = [])
    {
        this.align;
        const { scope, view } = this.scope.unpack();

        const classList = [
            view.bem
        ];

        if ( this.size ) {
            classList.push(`n-size-${this.size}`);
        }

        if ( this.type ) {
            classList.push(`n-type-${this.type}`);
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

        Arr.each(merge, (cls) => {
            classList.push(cls.replace(':bem', view.bem));
        });

        return classList;
    }

    classPart(part, merge = [])
    {
        const { view } = this.scope;

        const classList = [
            //
        ];

        if ( ! Mix.isEmpty(part) ) {
            classList.push(`${view.bem}__${part}`);
        }

        if ( typeof merge !== 'object' ) {
            merge = [merge];
        }

        Arr.each(merge, (cls) => {
            classList.push(cls.replace(':bem', view.bem));
        });

        return classList;
    }

}


/**
 * @returns {typeof ProtoData}
 */
export const ProtoDataBuilder = () => {

    let self = ProtoData;

    const plugins = [
        AlignData,
        BaseData,
        IconData,
        OptionData,
        TextData,
        PositionData,
        DragData,
    ];

    Arr.each(plugins, (plugin) => {
        Mix.extend(self.prototype, plugin.prototype);
    });

    return self;
};