import { ProtoData } from "../../../root/index.js";
import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { NSelectProps } from "./NSelect.js";

/**
 * @class NSelectData
 * @extends {BaseData<NSelectController>}
 */
export class NSelectData extends ProtoData
{

    get classList()
    {
        let classList = [];

        if ( this.focus ) {
            classList.push('n-focus');
        }

        return this.classRoot(classList);
    }

    get model()
    {
        let model = this.scope.get('modelValue');

        if ( this.multiple ) {
            model = Arr.all(model);
        }

        if ( Mix.isEmpty(model) ) {
            model = this.clearValue;
        }

        if ( Mix.isArr(model) ) {
            model = Arr.filter(model);
        }

        return model;
    }

    set model(value)
    {
        let model = Arr.all(this.model);

        if ( Mix.isArr(model) ) {
            model = Arr.filter(model);
        }

        if ( ! Mix.isEmpty(value) ) {
            Arr.toggle(model, value);
        }

        if ( ! this.multiple ) {
            model = Arr.last(model);
        }

        if ( Mix.isEmpty(value) ) {
            model = Obj.clone(this.clearValue);
        }

        this.scope.update('modelValue', model);
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

    get search()
    {
        return this.scope.get('search');
    }

    set search(value)
    {
        this.scope.set('search', value);
    }

}