import { Arr, Mix, Obj } from "@kizmann/pico-js";

export class NCascaderHelper
{

    static buildSplitFromModel(scope : any) : NCascaderHelper
    {
        const { model } = scope.data;

        if ( Mix.isEmpty(model) ) {
            return this;
        }

        scope.set('splitValue', ...[
            Arr.last(model)
        ]);

        return this;
    }

    static buildModelFromSplit(scope : any) : NCascaderHelper
    {
        const { options, split, valueProp, childProp } = scope.data;

        if ( Mix.isEmpty(split) ) {
            return this;
        }

        let result = Arr.cascadeFind(options, childProp, (val : any) => {
            return val[valueProp] === split;
        });

        if ( Mix.isEmpty(result) ) {
            result = [{ [valueProp]: split }];
        }

        scope.set('modelValue', ...[
            Arr.extract(result, valueProp)
        ]);

        return this;
    }

    static getCascade(scope : any, value : string[] = null) : any[]
    {
        const { options, model, visible, valueProp, childProp } = scope.data;

        if ( visible == null ) {
            value = Arr.last(model || []);
        }

        if ( visible != null ) {
            value = Arr.last(visible || []);
        }

        const result = Arr.cascadeFind(options, childProp, (val : any) => {
            return val[valueProp] === value;
        });

        return result ?? [];
    }

    static getPath(scope : any, item : any)
    {
        const { options, valueProp, childProp } = scope.data;

        const result = Arr.cascadeFind(options, childProp, (val : any) => {
            return val[valueProp] === item[valueProp];
        });

        return Arr.extract(result, valueProp);
    }

}

export default NCascaderHelper;