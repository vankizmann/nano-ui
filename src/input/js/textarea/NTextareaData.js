import { ProtoData } from "../../../root/index.js";

/**
 * @class NTextareaData
 * @extends {BaseData<NTextareaController>}
 */
export class NTextareaData extends ProtoData
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

    get disabled()
    {
        return this.scope.get('disabled');
    }

    get placeholder()
    {
        return this.scope.get('placeholder');
    }

    get autoRows()
    {
        return this.scope.get('autoRows');
    }

    get maxRows()
    {
        return this.scope.get('maxRows');
    }

    get minRows()
    {
        return this.scope.get('minRows');
    }

    get maxLength()
    {
        return this.scope.get('maxLength');
    }

}

export default NTextareaData;