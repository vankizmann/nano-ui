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

        this.injectRef([
            'popover', 'NPopover'
        ]);

        const { model, split } = this.data;

        if ( Mix.isEmpty(model) && !Mix.isEmpty(split) ) {
            NCascaderHelper.buildModelFromSplit(this);
        }

        if ( Mix.isEmpty(split) && !Mix.isEmpty(model) ) {
            NCascaderHelper.buildSplitFromModel(this);
        }

        this.makeData('virtuals', ...[
            NCascaderHelper.getCascade(this)
        ]);

        this.makeData('visible', ...[
            Obj.clone(this.data.model)
        ]);

        return this;
    }

    onMouseenter(item : any, depth : number)
    {
        const { data } = this;

        if ( data.trigger === 'hover' ) {
            this.updateVisible(item, depth);
        }
    }

    onClick(item : any, depth : number)
    {
        const { data } = this;

        if ( data.trigger === 'click' ) {
            this.updateVisible(item, depth);
        }

        if ( data.trigger === 'hover' ) {
            this.updateCascade(item, depth);
        }
    }

    onDblclick(item : any, depth : number)
    {
        const { data } = this;

        if ( data.trigger === 'click' ) {
            this.updateCascade(item, depth);
        }
    }

    updateVisible(item : any, depth : number)
    {
        const { data } = this;

        const visible = Arr.slice(...[
            data.visible || [], 0, depth
        ]);

        this.set('visible', [
            ...visible, item[data.valueProp]
        ]);

        const virtuals = Arr.slice(...[
            data.virtuals || [], 0, depth
        ]);

        this.set('virtuals', [
            ...virtuals, item
        ]);
    }

    updateCascade(item : any, depth : number = 0)
    {
        const { data } = this;

        const cascade = Arr.slice(...[
            data.visible || [], 0, depth
        ]);

        const total = [
            ...cascade, item[data.valueProp]
        ];

        this.update('splitValue', ...[
            Arr.last(total)
        ]);

        this.update('modelValue', total);
        this.ncx('popover')?.superClose();
    }

}

export default NCascaderPanelController;