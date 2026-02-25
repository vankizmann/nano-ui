import { ProtoData } from "../../../root/index.js";

/**
 * @class NResizerData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NResizerData extends ProtoData
{

    get classList()
    {
        let classList = [];

        if ( this.direction ) {
            classList.push(`:bem--${this.direction}`);
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

    set width(value)
    {
        this.scope.set('width', value);
    }

    get minWidth()
    {
        return this.scope.get('minWidth');
    }

    get maxWidth()
    {
        return this.scope.get('maxWidth');
    }

    get group()
    {
        return this.scope.get('group');
    }

    get flex()
    {
        return this.scope.get('flex');
    }

    get direction()
    {
        return this.scope.get('direction');
    }

    get type()
    {
        return this.scope.get('type');
    }

}