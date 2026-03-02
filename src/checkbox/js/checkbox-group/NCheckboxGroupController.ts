import { SetupContext, provide } from "vue";
import { Arr, Mix } from "@kizmann/pico-js";
import { GroupController } from "../../../root/index.ts";
import { NCheckboxGroupView } from "./NCheckboxGroupView.ts";
import { NCheckboxGroupData } from "./NCheckboxGroupData.ts";

export class NCheckboxGroupController extends GroupController
{
    /**
     * @type {NCheckboxGroupController}
     */
    declare scope : NCheckboxGroupController;

    /**
     * @type {NCheckboxGroupData}
     */
    declare data : NCheckboxGroupData;

    /**
     * @type {NCheckboxGroupView}
     */
    declare view : NCheckboxGroupView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NCheckboxGroupView(this),
            new NCheckboxGroupData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue');

        this.compData('checked', () => {
            return this.getChecked();
        });

        this.compData('intermediate', () => {
            return this.getIntermediate();
        });

        this
            .exposeData('checked')
            .exposeData('intermediate');

        provide('NCheckboxGroup', this.instance);

        return this;
    }

    superGlobal()
    {
        const { checked, intermediate } = this.data;

        let keys = [];

        // @ts-ignore
        if ( !checked ?? intermediate ) {
            keys = Arr.extract(this.childs, 'data.value');
        }

        Arr.each(this.childs, (child : any) => {
            child.set('modelValue', Arr.has(keys, child.value));
        });

        this.update('modelValue', keys);
    }

    superToggle(child : any)
    {
        const result = Arr.toggle(...[
            this.data.model, child.data.value
        ]);

        this.update('modelValue', result);
    }

    getChecked()
    {
        return Arr.lengths(...[
            this.data.model, this.scope.childs
        ]);
    }

    getIntermediate()
    {
        return ! Mix.isEmpty(this.data.model);
    }

}

export default NCheckboxGroupController;