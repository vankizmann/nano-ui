import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NConfigView } from "./NConfigView.ts";
import { NConfigData } from "./NConfigData.ts";
import { Arr, Locale, Mix, Obj, Str } from "@kizmann/pico-js";


export class NConfigController extends ProtoController
{
    /**
     * @type {NConfigController}
     */
    declare scope : NConfigController;

    /**
     * @type {NConfigData}
     */
    declare data: NConfigData;

    /**
     * @type {NConfigView}
     */
    declare view: NConfigView;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NConfigView(this),
            new NConfigData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        return this;
    }

    getString(value : string) : string
    {
        let final = Mix.str(value)
            .replace(/^@/, '')
            .replace(/^\\@/, '@');

        if ( /^@/.test(value) ) {
            return Locale.trans(final);
        }

        return final;
    }

    propAwait(value : any) : boolean
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( ! Mix.isArr(value) ) {
            value = [value];
        }

        let result = Arr.each(value, (state : any) => {
            return this.getState(state, true);
        });

        return ! Arr.has(result, false);
    }

    propExists(value : any) : boolean
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( ! Mix.isArr(value) ) {
            value = [value];
        }

        let result = Arr.each(value, (state : any) => {
            return this.getState(state, false);
        });

        return ! Arr.has(result, false);
    }

    getState(value : any, exists : boolean = true) : boolean
    {
        if ( Mix.isFunc(value) ) {
            return !! this.solveInput(value);
        }

        if ( ! Mix.isStr(value) ) {
            return !! value;
        }

        if ( ! value.match(/(\$scope|\$model|\$global)/) ) {
            return !! value;
        }

        let sources = {
            $scope: this.data.self,
            $model: this.data.model,
            $extra: this.data.extra,
            $global: globalThis
        };

        if ( exists ) {
            return Obj.has(sources, value);
        }

        return !! Obj.get(sources, value);
    }

    toPropKey(value : string) : string
    {
        let splits = value.replace(/^!/, '').split('-');

        const result = Arr.each(splits, (split : string) => {
            return Str.ucfirst(split);
        });

        return Str.lcfirst(result.join(''));
    }

    toEventKey(value : string) : string
    {
        if ( ! value.match(/^on/) ) {
            value = 'on-' + value;
        }

        let splits = value.split('-');

        const result = Arr.each(splits, (split : string) => {
            return Str.ucfirst(split);
        });

        return Str.lcfirst(result.join(''));
    }

    solveInput(cb : Function, fallback : any = undefined) : any
    {
        return cb.call(...[
            this.data.self, this.data.model, fallback
        ]);
    }

    solveContext(cb : Function) : Function
    {
        if ( ! Mix.isFunc(cb) ) {
            return () => console.error('NConfig: Raw suffix (!) only allowed on functions');
        }

        return (...args: [...any]) => {
            return cb.call(this.data.self, ...args);
        };
    }

    getProp(key : string, value : any) : any
    {
        if ( key.match(/^!/) ) {
            return this.solveContext(value);
        }

        if ( Mix.isFunc(value) ) {
            return this.solveInput(value);
        }

        if ( ! Mix.isStr(value) ) {
            return value;
        }

        if ( ! value.match(/(\$scope|\$model|\$global)/) ) {
            return this.getString(value);
        }

        let sources = {
            $scope: this.data.self,
            $model: this.data.model,
            $extra: this.data.extra,
            $global: globalThis
        };

        let result = Obj.get(...[
            sources, value.replace(/^!+/, '')
        ]);

        if ( value.match(/^!!\$/) ) {
            result = Mix.isTrue(result);
        }

        if ( value.match(/^!\$/) ) {
            result = ! Mix.isTrue(result);
        }

        return result;
    }

    getInput(prop : any, fallback : any) : any
    {
        if ( Mix.isFunc(prop) ) {
            return this.solveInput(prop, fallback);
        }

        let sources = {
            $scope: this.data.self,
            $model: this.data.model,
            $extra: this.data.extra,
            $global: globalThis
        };

        if ( ! Mix.isNull(fallback) && ! Obj.has(sources, prop) ) {
            Obj.set(sources, prop, fallback);
        }

        return Obj.get(sources, prop);
    }

    setInput(prop : any, value : any) : void
    {
        if ( Mix.isFunc(prop) ) {
            return console.error('NConfig: Bind with function is not allowed!');
        }

        let sources = {
            $scope: this.data.self,
            $model: this.data.model,
            $extra: this.data.extra,
            $global: globalThis
        };

        Obj.set(sources, prop, value);
    }

}

export default NConfigController;