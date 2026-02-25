import { h } from "vue";
import { Arr, Dom, Locale, Mix } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.js";
import { NCascaderController } from "./NCascaderController.js";
import { NCascaderPanelProps } from "../cascader-panel/NCascaderPanel.js";

/**
 * @class NCascaderView
 * @extends {BaseView<NCascaderController>}
 */
export class NCascaderView extends ProtoView
{
    /**
     * @type {string}
     */
    bem = 'n-cascader';

    default()
    {
        let { scope, data } = this.scope.unpack();

        let props = {
            class: data.classList
        };

        return h('div', props, [
            this.display(),
            this.popover(),
        ]);
    }

    display()
    {
        return this.div('display', [
            this.clear(),
            this.angle(),
        ]);
    }

    popover()
    {
        const { data, scope } = this.scope.unpack();

        let props = {
            width: 0, type: scope.props.type
        };

        props = scope.passProps(props, [
            'position',
        ]);

        props.onOpen = () => {
            data.focus = 1;
        }

        props.onClose = () => {
            data.focus = 0;
        };

        return this.comp('n-popover', props, {
            raw: () => this.panel()
        });
    }

    panel()
    {
        const { scope, data } = this.scope.unpack();

        if ( !data.options.length ) {
            return this.empty();
        }

        let props = {
            ref: scope.ref('panel'),
        };

        props = scope.passProps(props, [
            ...Mix.keys(NCascaderPanelProps)
        ]);

        console.log(Mix.keys(NCascaderPanelProps));

        props['onUpdate:modelValue'] = (value) => {
            scope.update('modelValue', value);
        };

        props['onUpdate:splitValue'] = (value) => {
            scope.update('splitValue', value);
        };

        return this.comp('n-cascader-panel', props);
    }

}

export default NCascaderView;