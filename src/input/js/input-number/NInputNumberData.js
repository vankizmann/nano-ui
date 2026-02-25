import { ProtoData } from "../../../root/index.js";

/**
 * @class NInputNumberData
 * @extends {BaseData<NTextareaController>}
 */
export class NInputNumberData extends ProtoData
{

    get classList()
    {
        let classList = [];

        if ( this.scope.get('focus') ) {
            classList.push('n-focus');
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

    get focus()
    {
        return this.scope.get('focus');
    }

    set focus(value)
    {
        this.scope.set('focus', value);
    }

    get placeholder()
    {
        return this.scope.get('placeholder');
    }

    get disabled()
    {
        return this.scope.get('disabled');
    }

    get min()
    {
        return this.scope.get('min');
    }

    get max()
    {
        return this.scope.get('max');
    }

    get stepSize()
    {
        return this.scope.get('stepSize');
    }

    get precision()
    {
        return this.scope.get('precision');
    }

    get format()
    {
        return this.scope.get('format');
    }

}

export default NInputNumberData;