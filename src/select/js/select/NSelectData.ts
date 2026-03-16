import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { ProtoExtend, OptionData, PositionData } from "../../../root/index.ts";
import { NPopoverPanelData } from "../../../popover/js/popover-panel/NPopoverPanelData.ts";
import { NSelectController } from "./NSelectController.ts";

export class NSelectData extends ProtoExtend([NPopoverPanelData, OptionData, PositionData])
{
    /**
     * @type {NSelectController}
     */
    declare scope : NSelectController;

    get model() : any
    {
        let model = this.scope.get('modelValue');

        if ( ! this.multiple ) {
            return Arr.first(model);
        }

        return Arr.filter(Arr.all(model));
    }

    get label() : string
    {
        const item = Arr.find(this.virtuals, {
            value: this.model
        });

        return item?.label;
    }

    get prepared() : any[]
    {
        return this.scope.get('prepared');
    }

    get virtuals() : any[]
    {
        return this.scope.get('virtuals');
    }

    get searched() : any[]
    {
        return this.scope.get('searched');
    }

    get index() : number
    {
        return this.scope.get('index');
    }

    get search() : string
    {
        return this.scope.get('search');
    }

    get multiple() : boolean
    {
        return this.scope.get('multiple');
    }

    get allowCreate() : boolean
    {
        return this.scope.get('allowCreate');
    }

    get collapse() : boolean
    {
        return this.scope.get('collapse');
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

    get collapseText() : string
    {
        return this.scope.get('collapseText');
    }

}

export interface NSelectData extends NPopoverPanelData, OptionData, PositionData {}

export default NSelectData;