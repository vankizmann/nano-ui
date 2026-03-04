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

    set native(value : string)
    {
        this.scope.set('nativeType', value);
    }

    get link() : boolean
    {
        return this.scope.get('link');
    }

    set link(value : boolean)
    {
        this.scope.set('link', value);
    }

    get square() : boolean
    {
        return this.scope.get('square');
    }

    set square(value : boolean)
    {
        this.scope.set('square', value);
    }

    get round() : boolean
    {
        return this.scope.get('round');
    }

    set round(value : boolean)
    {
        this.scope.set('round', value);
    }

    get glass() : boolean
    {
        return this.scope.get('glass');
    }

    set glass(value : boolean)
    {
        this.scope.set('glass', value);
    }

}

export default NButtonData;