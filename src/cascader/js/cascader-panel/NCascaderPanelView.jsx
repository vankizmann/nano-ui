import { h } from "vue";
import { Arr, Dom, Locale, Mix, Obj, Run } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.js";
import { NCascaderPanelController } from "./NCascaderPanelController.js";

/**
 * @class NCascaderPanelView
 * @extends {BaseView<NCascaderPanelController>}
 */
export class NCascaderPanelView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-cascader-panel';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            class: data.classList
        };

        let items = scope.getVisibleChilds();

        const slots = Arr.each(items, (val) => {
            return this.items(val);
        });

        return h('div', props, [
            this.items(data.options), ...slots
        ]);
    }

    items(items)
    {
        const { data } = this.scope.unpack();

        let props = {
            class: data.classPart('items'),
            items: items,
        };

        return this.comp('n-virtualbar', props, ({ value }) => {
            return this.item(value);
        });
    }

    item(item)
    {
        const { scope, data } = this.scope.unpack();

        let props = {
            disabled: item[data.disabledProp],
        };

        if ( ! Mix.isEmpty(item[data.childProp]) ) {
            props.icon = 'fa fa-angle-right';
        }

        const active = Arr.has(...[
            data.model, item[data.valueProp]
        ]);

        if ( active ) {
            props.active = true;
        }

        const last = Arr.last(data.model ?? []);

        if ( last === item[data.valueProp] ) {
            props.icon = 'fa fa-check';
        }

        const visible = Arr.has(...[
            data.visible, item[data.valueProp]
        ]);

        if ( visible ) {
            props.focus = true;
        }

        props.onPointermove = Run.throttle(() => {
            scope.emitMove(item);
        }, 20);

        props.onClick = (e) => {
            e.preventDefault();
            scope.emitClick(item);
        };

        props.onDblclick = (e) => {
            e.preventDefault();
            scope.emitDblclick(item);
        };

        return this.comp('n-popover-option', props, () => [
            Obj.get(item, data.labelProp)
        ]);
    }

}

export default NCascaderPanelView;