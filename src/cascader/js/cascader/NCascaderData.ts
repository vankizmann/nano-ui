import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { ProtoExtend, PositionData, TextData } from "../../../root/index.ts";
import { NPopoverPanelData } from "../../../popover/js/popover-panel/NPopoverPanelData.ts";
import { NCascaderController } from "./NCascaderController.ts";

export class NCascaderData extends ProtoExtend([NPopoverPanelData, PositionData, TextData])
{
    /**
     * @type {NCascaderController}
     */
    declare scope : NCascaderController;

    get model() : string[]
    {
        return this.scope.get('modelValue');
    }

    get split() : string
    {
        return this.scope.get('splitValue');
    }

    get virtuals() : any
    {
        return this.scope.get('virtuals');
    }

    get collapse() : number
    {
        return this.scope.get('collapse');
    }

    get collapseText() : string
    {
        return this.scope.get('collapseText');
    }

    get collapseFirst() : boolean
    {
        return this.scope.get('collapseFirst');
    }

    get placeholder() : string
    {
        return this.scope.get('placeholder');
    }

    get options() : any
    {
        return this.scope.get('options');
    }

    get labelProp() : string
    {
        return this.scope.get('labelProp');
    }

    get valueProp() : string
    {
        return this.scope.get('valueProp');
    }

    get childProp() : string
    {
        return this.scope.get('childProp');
    }


}

export interface NCascaderData extends NPopoverPanelData, PositionData, TextData {
}

export default NCascaderData;