import { GroupController } from "../../../root/index.js";
import { NCascaderPanelProps } from "./NCascaderPanel.js";
import { NCascaderPanelView } from "./NCascaderPanelView.jsx";
import { NCascaderPanelData } from "./NCascaderPanelData.js";
import { onMounted } from "vue";
import { Arr, Locale, Mix, Obj, Run, Str } from "@kizmann/pico-js";

/**
 * @class NCascaderPanelController
 * @extends {GroupController<NCascaderPanelController, NCascaderPanelProps, NCascaderPanelView, NCascaderPanelData>}
 */
export class NCascaderPanelController extends GroupController
{
    /**
     * @type {PopoverElement}
     */
    popel;

    constructor(props, context)
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

        this.makeData('virtuals', ...[
            this.buildVirtuals()
        ]);

        this.watchProp('options', () => {
            this.set('virtuals', this.buildVirtuals());
        });

        this.makeData('visible', ...[
            Obj.clone(this.data.model)
        ]);

        return this;
    }

    buildVirtuals()
    {
        const { data } = this.unpack();

        let virtual = Arr.cascade(...[
            data.options, data.childProp, data.valueProp
        ]);

        return Object.freeze(virtual);
    }

    getVisibleChilds()
    {
        const { data } = this.unpack();

        if ( Mix.isEmpty(data.visible) ) {
            return [];
        }

        let last = {
            [data.childProp]: data.options
        };

        let items = Arr.each(data.visible, (item) => {
            return last = Arr.find(last[data.childProp], {
                [data.valueProp]: item,
            });
        });

        items = Arr.each(items, (item) => {
            return Obj.get(item, data.childProp);
        });

        return Arr.filter(items);
    }

    emitMove(item)
    {
        const { data } = this.unpack();

        if ( data.trigger === 'hover' ) {
            this.updateVisible(item);
        }
    }

    emitClick(item)
    {
        const { data } = this.unpack();

        if ( data.trigger === 'click' ) {
            this.updateVisible(item);
        }

        if ( data.trigger === 'hover' ) {
            this.updateCascade(item);
        }
    }

    emitDblclick(item)
    {
        const { data } = this.unpack();

        if ( data.trigger === 'click' ) {
            this.updateCascade(item);
        }
    }

    updateVisible(item)
    {
        const { data } = this.unpack();

        const value = Obj.get(...[
            item, data.valueProp
        ]);

        this.set('visible', data.virtuals[value]);
    }

    updateCascade(item)
    {
        const { data } = this.unpack();

        const value = Obj.get(...[
            item, data.valueProp
        ]);

        const [total, split] = [
            data.virtuals[value], Arr.last(data.virtuals[value])
        ];

        this.update('splitValue', split);
        this.update('modelValue', total);
    }


}

export default NCascaderPanelController;