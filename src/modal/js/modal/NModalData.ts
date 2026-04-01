import { ProtoData } from "../../../root/index.ts";
import { NModalController } from "./NModalController.ts";
import { Mix } from "@kizmann/pico-js";

export class NModalData extends ProtoData
{
    /**
     * @type {NModalController}
     */
    declare scope : NModalController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.position != null ) {
            classList.push(`:bem--${this.position}`);
        }

        return this.classRoot(classList);
    }

    get model() : boolean
    {
        return this.scope.get('modelValue');
    }

    get keep() : boolean
    {
        return this.scope.get('keep');
    }

    get listen() : boolean
    {
        return this.scope.get('listen');
    }

    get closable() : boolean
    {
        return this.scope.get('closable');
    }

    get scrollbar() : boolean
    {
        return this.scope.get('scrollbar');
    }

    get width() : number | string
    {
        return this.scope.get('width');
    }

    get safeWidth() : string
    {
        return Mix.isNum(this.width) ? this.width + 'px' : Mix.str(this.width);
    }

    get height() : number | string
    {
        return this.scope.get('height');
    }

    get safeHeight() : string
    {
        return Mix.isNum(this.height) ? this.height + 'px' : Mix.str(this.height);
    }

    get target() : any
    {
        return this.scope.get('target');
    }

    get position() : string
    {
        return this.scope.get('position');
    }

    get beforeOpen() : Function
    {
        return this.scope.get('beforeOpen');
    }

    get beforeClose() : Function
    {
        return this.scope.get('beforeClose');
    }

}

export default NModalData;