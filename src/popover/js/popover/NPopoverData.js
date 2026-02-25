import { ProtoData } from "../../../root/index.js";

/**
 * @class NPopoverData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NPopoverData extends ProtoData
{

    get classList()
    {
        let classList = [];

        if ( this.position != null ) {
            classList.push(`:bem--${this.position}`);
        }

        return this.classRoot(classList);
    }

    get model()
    {
        return this.scope.get('modelValue');
    }

    set model(value)
    {
        this.scope.update('modelValue', value);
    }

    get width()
    {
        return this.scope.get('width');
    }

    get target()
    {
        return this.scope.get('target');
    }

    get trigger()
    {
        return this.scope.get('trigger');
    }

    get toggle()
    {
        return this.scope.get('toggle');
    }

    get position()
    {
        return this.scope.get('position');
    }

}