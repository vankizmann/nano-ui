import { ProtoExtend, ProtoData, OptionData, TextData } from "../../../root/index.ts";
import NTableColumnController from "./NTableColumnController.ts";

export class NTableColumnData extends ProtoExtend([ProtoData, OptionData, TextData])
{
    /**
     * @type {NTableColumnController}
     */
    declare scope : NTableColumnController;

    get classList():string[]
    {
        return this.classRoot();
    }

    get model():any
    {
        return this.scope.get('modelValue');
    }

    set model(value:any)
    {
        this.scope.set('modelValue', value);
    }

    get data():any
    {
        return this.scope.get('data');
    }

    get disabled():any
    {
        return this.scope.get('disabled');
    }

    get type():string
    {
        return this.scope.get('type');
    }

    get label():string
    {
        return this.scope.get('label');
    }

    get prop():string
    {
        return this.scope.get('prop');
    }

    get sort():boolean
    {
        return this.scope.get('sort');
    }

    get sortProp():string
    {
        return this.scope.get('sortProp', this.prop);
    }

    get filter():boolean
    {
        return this.scope.get('filter');
    }

    get filterProp():string
    {
        return this.scope.get('filterProp', this.prop);
    }

    get visible():boolean
    {
        return this.scope.get('visible');
    }

    get breakpoint():number
    {
        return this.scope.get('breakpoint');
    }

    get width():number|string
    {
        return this.scope.get('width');
    }

    get fixedWidth():number
    {
        return this.scope.get('fixedWidth');
    }

    get minWidth():number
    {
        return this.scope.get('minWidth');
    }

    get maxWidth():number
    {
        return this.scope.get('maxWidth');
    }

    get align():string
    {
        return this.scope.get('align');
    }

    get optionsMap():any
    {
        return this.scope.get('optionsMap');
    }

    get datetimeFormat()
    {
        return this.scope.get('datetimeFormat');
    }

}

export interface NTableColumnData extends ProtoData, OptionData, TextData {}

export default NTableColumnData;