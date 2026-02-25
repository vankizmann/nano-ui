import { GroupController } from "../../../root/index.js";
import { NCheckboxGroupProps } from "./NCheckboxGroup.js";
import { NCheckboxGroupView } from "./NCheckboxGroupView.jsx";
import { NCheckboxGroupData } from "./NCheckboxGroupData.js";
import { computed, provide } from "vue";
import { Arr, Mix } from "@kizmann/pico-js";

/**
 * @class NCheckboxGroupController
 * @extends {GroupController<NCheckboxGroupController, NCheckboxGroupProps, NCheckboxGroupView, NCheckboxGroupData>}
 */
export class NCheckboxGroupController extends GroupController
{

    constructor(props, context)
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
            .cloneProp('modelValue')
            .linkProp('type')
            .linkProp('size')
            .linkProp('align');

        this.compData('allchecked', () => {
            return this.allchecked();
        });

        this.compData('intermediate', () => {
            return this.intermediate();
        });

        this
            .exposeData('allchecked')
            .exposeData('intermediate');

        provide('NCheckboxGroup', this.instance);

        return this;
    }

    global()
    {
        const { allchecked, intermediate } = this.data;

        let keys = [];

        if ( ! allchecked ?? intermediate ) {
            keys = Arr.extract(this.childs, 'data.value');
        }

        Arr.each(this.childs, (child) => {
            child.data.model = Arr.has(keys, child.value)
        });

        this.data.model = keys;
    }

    toggle(child)
    {
        this.data.model = Arr.toggle(...[
            this.data.model, child.data.value
        ]);
    }

    allchecked()
    {
        return this.data.model.length === this.childs.length;
    }

    intermediate()
    {
        return this.data.model.length !== 0;
    }

}

export default NCheckboxGroupController;