import { h } from "vue";
import { Arr, Mix } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NCollapseItemController } from "./NCollapseItemController.ts";
import { NCollapseController } from "../collapse/NCollapseController.ts";

export class NCollapseItemView extends ProtoView
{
    /**
     * @type {NCollapseItemController}
     */
    declare scope : NCollapseItemController;

    /**
     * @type {string}
     */
    bem : string = 'n-collapse-item';

    default() : any
    {
        return this.display();
    }

    display() : any
    {
        const collapse = this.scope.ncx('collapse');

        return [
            this.header(collapse),
            this.content(collapse),
        ];
    }

    header(collapse : NCollapseController) : any
    {
        const { data } = this.scope

        const props : any = {
            class: data.classPart('header')
        };

        if ( Arr.has(collapse.data.model, data.name) ) {
            props.class.push('n-active');
        }

        props.onPointerdown = () => {
            collapse.superToggle(data.name);
        };

        props.onDragenter = () => {
            if ( collapse.data.dragOpen ) {
                collapse.superFixed(data.name);
            }
        };

        return this.div(props, [
            this.header_icon(collapse),
            this.header_label(collapse),
            this.header_action(collapse),
            this.header_angle(collapse),
        ]);
    }

    header_icon(collapse : NCollapseController) : any
    {
        const { data } = this.scope;

        if ( Mix.isEmpty(data.icon) ) {
            return null;
        }

        return this.div('icon', [
            this.icon(data.icon)
        ]);
    }

    header_label(collapse : NCollapseController) : any
    {
        const { data } = this.scope;

        return this.div('label', [
            data.label
        ]);
    }

    header_action(collapse : NCollapseController) : any
    {
        const { context } = this.scope;

        if ( ! context.slots.action ) {
            return null;
        }

        return this.div('action', [
            this.slot('action')
        ]);
    }

    header_angle(collapse : NCollapseController) : any
    {
        const { data } = this.scope;

        return this.div('angle', [
            this.icon(Styler.icon('angle-right'))
        ]);
    }

    content(collapse : NCollapseController) : any
    {
        let { scope, data } = this.scope;

        if ( !scope.isActive() ) {
            return null;
        }

        if ( !data.init ) {
            scope.set('init', true);
        }

        let props : any = {
            class: data.classPart('content'),
        };

        if ( data.scrollbar ) {
            props.wrapClass = `${this.bem}__wrap`;
        }

        if ( !scope.isVisible() ) {
            props.style = 'display: none;';
        }

        const slot = () => {
            return this.slot('default');
        };

        if ( !data.scrollbar ) {
            return h('div', props, slot());
        }

        return this.comp('n-scrollbar', ...[
            props, slot
        ]);
    }
}

export default NCollapseItemView;