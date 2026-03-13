import { ProtoData } from "../../../root/index.ts";
import NFormController from "./NFormController.ts";
import { Obj } from "@kizmann/pico-js";

export class NFormData extends ProtoData
{
    /**
     * @type {NFormController}
     */
    declare scope : NFormController;

    get classList() : string[]
    {
        let classList = [];

        const { bem } = this.scope.view;

        if ( this.align ) {
            classList.push(`${bem}--${this.align}`);
        }

        if ( this.kind ) {
            classList.push(`${bem}--${this.kind}`);
        }

        return this.classRoot(classList);
    }

    get form() : any
    {
        return this.scope.get('form');
    }

    get errors() : any
    {
        return this.scope.get('errors');
    }

    get checks() : any
    {
        return this.scope.get('checks');
    }

    get messages() : any
    {
        return this.scope.getMessages();
    }

    get dirty() : boolean
    {
        return this.scope.get('dirty');
    }

    get native() : string
    {
        return this.scope.get('nativeType');
    }

    get kind() : string
    {
        return this.scope.get('kind');
    }

    get align() : string
    {
        return this.scope.get('align');
    }

}

export default NFormData;