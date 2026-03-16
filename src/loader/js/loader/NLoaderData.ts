import { ProtoData } from "../../../root/index.ts";
import NLoaderController from "./NLoaderController.ts";

export class NLoaderData extends ProtoData
{
    /**
     * @type {NLoaderController}
     */
    declare scope : NLoaderController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.active ) {
            classList.push('n-load');
        }

        return this.classRoot(classList);
    }

    get active(): boolean
    {
        return this.scope.get('active');
    }

    get visible(): boolean
    {
        return this.scope.get('visible');
    }

    get minimum(): number
    {
        return this.scope.get('minimum');
    }

    get debounce(): number
    {
        return this.scope.get('debounce');
    }

}

export default NLoaderData;