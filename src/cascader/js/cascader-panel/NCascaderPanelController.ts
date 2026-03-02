import { SetupContext } from "vue";
import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { GroupController } from "../../../root/index.ts";
import { NCascaderPanelView } from "./NCascaderPanelView.ts";
import { NCascaderPanelData } from "./NCascaderPanelData.ts";
import { NCascaderHelper } from "../helper/NCascaderHelper.ts";


export class NCascaderPanelController extends GroupController
{
    /**
     * @type {NCascaderPanelController}
     */
    declare scope : NCascaderPanelController;

    /**
     * @type {NCascaderPanelData}
     */
    declare data : NCascaderPanelData;

    /**
     * @type {NCascaderPanelView}
     */
    declare view : NCascaderPanelView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NCascaderPanelView(this),
            new NCascaderPanelData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue')
            .cloneProp('splitValue');

        this
            .makeRef('el');

        const { model, split } = this.data;

        if ( Mix.isEmpty(model) && !Mix.isEmpty(split) ) {
            NCascaderHelper.buildModelFromSplit(this);
        }

        if ( Mix.isEmpty(split) && !Mix.isEmpty(model) ) {
            NCascaderHelper.buildSplitFromModel(this);
        }

        this.compData('virtuals', () => {
            return NCascaderHelper.getCascade(this);
        });

        this.makeData('visible', ...[
            Obj.clone(this.data.model)
        ]);

        return this;
    }

    onMouseenter(item : any)
    {
        const { data } = this;

        if ( data.trigger === 'hover' ) {
            this.updateVisible(item);
        }
    }

    onClick(item : any)
    {
        const { data } = this;

        if ( data.trigger === 'click' ) {
            this.updateVisible(item);
        }

        if ( data.trigger === 'hover' ) {
            this.updateCascade(item);
        }
    }

    onDblclick(item : any)
    {
        const { data } = this;

        if ( data.trigger === 'click' ) {
            this.updateCascade(item);
        }
    }

    updateVisible(item : any)
    {
        const cascade = NCascaderHelper.getPath(...[
            this, item
        ]);

        this.set('visible', cascade);
    }

    updateCascade(item : any)
    {
        const cascade = NCascaderHelper.getPath(...[
            this, item
        ]);

        const [total, split] = [
            cascade, Arr.last(cascade)
        ];

        this.update('splitValue', split);
        this.update('modelValue', total);
    }

}

export default NCascaderPanelController;