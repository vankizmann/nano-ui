import { h } from "vue";
import { Arr } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import NPopoverPanelController from "./NPopoverPanelController.ts";

export class NPopoverPanelView extends ProtoView
{
    /**
     * @type {NPopoverPanelController}
     */
    declare scope : NPopoverPanelController;

    /**
     * @type {string}
     */
    bem : string = 'n-popover-panel';

    /**
     * @type {any}
     */
    popoverConfig : any = {
        width: 1
    };

    default() : any
    {
        let { scope, data } = this.scope;

        let props = {
            ref: scope.ref('el'),
            class: data.classList
        };

        return h('div', props, [
            this.display(),
            this.popover(),
        ]);
    }

    display() : any
    {
        return this.div('display', [
            this.handle(),
            this.clear(),
            this.angle(),
        ]);
    }

    handle() : any
    {
        const { data } = this.scope;

        if ( !data.icon ) {
            return null;
        }

        let props = {
            class: data.classPart('icon')
        };

        Arr.append(...[
            props.class, 'n-form-icon'
        ]);

        return h('div', props, [
            this.icon(data.icon)
        ]);
    }

    popover() : any
    {
        const { data, scope } = this.scope;

        let props : any = {
            ...this.popoverConfig, type: data.type
        };

        props.ref = scope.ref('popover');

        props = scope.passProps(props, [
            'position',
        ]);

        props.onOpen = () => {
            scope.set('focus', 1);
            scope.onOpen();
        };

        props.onClose = () => {
            scope.set('focus', 0);
            scope.onClose();
        };

        return this.comp('n-popover', props, {
            raw: () => this.panel()
        });
    }

    panel() : any
    {
        return this.slot('panel')
    }

}

export default NPopoverPanelView;