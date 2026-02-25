import { ProtoData } from "../../../root/index.js";
import { Arr, Locale, Mix, Obj } from "@kizmann/pico-js";

/**
 * @class NCascaderData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NCascaderData extends ProtoData
{

    get classList()
    {
        let classList = [];

        if ( this.focus ) {
            classList.push('n-focus');
        }

        return this.classRoot(classList);
    }


    get label()
    {
        const model = Arr.first(this.model);

        const item = Arr.find(this.virtuals, {
            value: model
        });

        return item?.label;
    }

    get virtuals()
    {
        return this.scope.get('virtuals');
    }

    get searched()
    {
        return this.scope.get('searched');
    }

    get index()
    {
        return this.scope.get('index');
    }

    set index(value)
    {
        this.scope.set('index', value);
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

    get multiple()
    {
        return this.scope.get('multiple');
    }

    get allowCreate()
    {
        return this.scope.get('allowCreate');
    }

    get clearable()
    {
        return this.scope.get('clearable');
    }

    get clearValue()
    {
        return this.scope.get('clearValue');
    }

    get search()
    {
        return this.scope.get('search');
    }

    set search(value)
    {
        this.scope.set('search', value);
    }

    get placeholder()
    {
        return this.scope.get('placeholder');
    }

    get collapse()
    {
        return this.scope.get('collapse');
    }

    get collapseText()
    {
        return this.scope.get('collapseText');
    }

    get emptyText()
    {
        return this.scope.get('emptyText');
    }

    get undefinedText()
    {
        return this.scope.get('undefinedText');
    }

    get options()
    {
        return this.scope.get('options');
    }

    get optionsValue()
    {
        return this.scope.get('optionsValue');
    }

    get optionsLabel()
    {
        return this.scope.get('optionsLabel');
    }

}