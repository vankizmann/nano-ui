import { provide, ref, SetupContext, watch } from "vue";
import { GroupController } from "../../../root/index.ts";
import { NFormView } from "./NFormView.ts";
import { NFormData } from "./NFormData.ts";
import { Arr, Hash, Obj } from "@kizmann/pico-js";
import NFormRuleHandler from "../form-rules/NFormRuleHandler.ts";


export class NFormController extends GroupController
{
    /**
     * @type {NFormController}
     */
    declare scope : NFormController;

    /**
     * @type {NFormData}
     */
    declare data: NFormData;

    /**
     * @type {NFormView}
     */
    declare view: NFormView;

    /**
     * @type {string}
     */
    hash : string;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NFormView(this),
            new NFormData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        provide('NForm', this.instance);

        this.watchChilds(() => {
            this.onFieldChange();
        });

        this.cloneProp('dirty');
        this.makeData('checks', {});

        this.watchProp('form', () => {
            this.onFormChange();
        });

        this.compareChange();

        return this;
    }

    onFormChange()
    {
        this.compareChange();
        this.extractChecks();
    }

    onFieldChange()
    {
        // console.log('onFieldChange');
    }

    compareChange()
    {
        const { data } = this;

        if ( data.dirty || ! data.form ) {
            return;
        }

        const hash = Hash.object(data.form);

        if ( this.hash != hash ) {
            this.update('dirty', !! this.hash);
        }

        this.hash = hash;
    }

    extractChecks()
    {
        let checks : any = {}

        Arr.each(this.childs, (child : any) => {
            checks[child.data.prop] = NFormRuleHandler.test(this, child);
        });

        checks = Obj.filter(checks, (value : any) => {
            return value.length > 0;
        });

        this.set('checks', checks);
    }

    getMessages()
    {
        const { data } = this;

        let messages = Obj.clone(...[
            data.checks
        ]);

        Arr.each(data.errors, (val : any, key: string) => {
            messages[key] = Arr.merge(messages[key] ?? [], Arr.all(val));
        });

        return messages;
    }

}

export default NFormController;