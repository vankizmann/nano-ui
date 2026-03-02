import { ProtoData } from "../../../root/index.ts";
import NEmptyIconController from "./NEmptyIconController.ts";

export class NEmptyIconData extends ProtoData
{
    /**
     * @type {NEmptyIconController}
     */
    declare scope : NEmptyIconController;

    get classList() : string[]
    {
        let classList = [
            `:bem--${this.image}`
        ];

        if ( this.scope.get('inline') ) {
            classList.push(':bem--inline');
        }

        return this.classRoot(classList);
    }

    get image() : string
    {
        return this.scope.get('image');
    }

    get inline() : boolean
    {
        return this.scope.get('inline');
    }

}