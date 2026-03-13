import { ProtoData } from "../../../root/index.ts";
import NButtonController from "./NButtonController.ts";

export class NButtonData extends ProtoData
{
    /**
     * @type {NButtonController}
     */
    declare scope : NButtonController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.scope.get('link') ) {
            classList.push(':bem--link');
        }

        if ( this.scope.get('square') ) {
            classList.push(':bem--square');
        }

        if ( this.scope.get('round') ) {
            classList.push(':bem--round');
        }

        if ( this.scope.get('glass') ) {
            classList.push(':bem--glass');
        }

        return this.classRoot(classList);
    }

    get native() : string
    {
        return this.scope.get('nativeType');
    }

    get link() : boolean
    {
        return this.scope.get('link');
    }

    get square() : boolean
    {
        return this.scope.get('square');
    }

    get round() : boolean
    {
        return this.scope.get('round');
    }

    get glass() : boolean
    {
        return this.scope.get('glass');
    }

}

export default NButtonData;