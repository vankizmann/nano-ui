import { ProtoData } from "../../../root/index.js";

/**
 * @class NTableColumnData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NTableColumnData extends ProtoData
{

    get classList()
    {
        return this.classRoot();
    }

    get model()
    {
        return this.scope.get('modelValue');
    }

    set model(value)
    {
        this.scope.update('modelValue', value);
    }

    get data()
    {
        return this.scope.get('data');
    }

    get disabled()
    {
        return this.scope.get('disabled');
    }

    get type()
    {
        return this.scope.get('type');
    }

    get label()
    {
        return this.scope.get('label');
    }

    get prop()
    {
        return this.scope.get('prop');
    }

    get sort()
    {
        return this.scope.get('sort');
    }

    get sortProp()
    {
        return this.scope.get('sortProp', this.prop);
    }

    get filter()
    {
        return this.scope.get('filter');
    }

    get filterProp()
    {
        return this.scope.get('filterProp', this.prop);
    }

    get visible()
    {
        return this.scope.get('visible');
    }

    get breakpoint()
    {
        return this.scope.get('breakpoint');
    }

    get width()
    {
        return this.scope.get('width');
    }

    get fixedWidth()
    {
        return this.scope.get('fixedWidth');
    }

    get minWidth()
    {
        return this.scope.get('minWidth');
    }

    get maxWidth()
    {
        return this.scope.get('maxWidth');
    }

    get align()
    {
        return this.scope.get('align');
    }

    get options()
    {
        return this.scope.get('options');
    }

    get optionsMap()
    {
        return this.scope.get('optionsMap');
    }

    get optionsLabel()
    {
        return this.scope.get('optionsLabel');
    }

    get optionsValue()
    {
        return this.scope.get('optionsValue');
    }

    get datetimeFormat()
    {
        return this.scope.get('datetimeFormat');
    }

    get trueText()
    {
        return this.scope.get('trueText');
    }

    get falseText()
    {
        return this.scope.get('falseText');
    }

    get emptyText()
    {
        return this.scope.get('emptyText');
    }

    get undefinedText()
    {
        return this.scope.get('undefinedText');
    }

}