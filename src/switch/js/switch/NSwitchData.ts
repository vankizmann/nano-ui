import { ProtoData } from "../../../root/index.ts";
import NSwitchController from "./NSwitchController.ts";

export class NSwitchData extends ProtoData
{
    /**
     * @type {NSwitchController}
     */
    declare scope : NSwitchController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.model === this.onValue ) {
            classList.push('n-on');
        }

        if ( this.model === this.offValue ) {
            classList.push('n-off');
        }

        if ( this.onType && this.onValue === this.model ) {
            classList.push(`n-type-${this.onType}`);
        }

        if ( this.offType && this.offValue === this.model ) {
            classList.push(`n-type-${this.offType}`);
        }

        return this.classRoot(classList);
    }

    get model() : any
    {
        return this.scope.get('modelValue');
    }

    set model(value : any)
    {
        this.scope.set('modelValue', value);
    }

    get onValue() : any
    {
        return this.scope.get('onValue');
    }

    set onValue(value : any)
    {
        this.scope.set('onValue', value);
    }

    get offValue() : any
    {
        return this.scope.get('offValue');
    }

    set offValue(value : any)
    {
        this.scope.set('offValue', value);
    }

    get onType() : string
    {
        return this.scope.get('onType');
    }

    set onType(value : string)
    {
        this.scope.set('onType', value);
    }

    get offType() : string
    {
        return this.scope.get('offType');
    }

    set offType(value : string)
    {
        this.scope.set('offType', value);
    }

}