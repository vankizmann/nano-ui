import { h } from "vue";
import { Arr, Mix } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NFormGroupController } from "./NFormGroupController.ts";

export class NFormGroupView extends ProtoView
{
    /**
     * @type {NFormGroupController}
     */
    declare scope : NFormGroupController;

    /**
     * @type {string}
     */
    bem : string = 'n-form-group';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('el'),
            class: data.classList,
        };

        if ( ! data.model ) {
            props.class.push('n-hidden');
        }

        props['data-ncx'] = scope.uid;

        return h(data.native, props, [
            this.header(), this.body()
        ]);
    }

    header() : any
    {
        const props : any = {
            name: 'legend',
        };

        props.onPointerdown = () => {
            this.scope.superToggle();
        };

        return this.div('header', [
            this.div(props, [
                this.collapse(), this.label(),  this.action()
            ])
        ]);
    }

    collapse() : any
    {
        const { data } = this.scope;

        if ( ! data.collapse ) {
            return null;
        }

        return this.div('collapse', [
            this.icon(Styler.icon('angle-down'))
        ]);
    }

    action() : any
    {
        const { slots } = this.scope.context;

        if ( !slots.action ) {
            return null;
        }

        return this.div('action', [
            this.slot('action')
        ]);
    }

    label() : any
    {
        return this.div('label', [
            this.label_icon(), this.label_text()
        ]);
    }

    label_icon() : any
    {
        const { data } = this.scope;

        if ( Mix.isEmpty(data.icon) ) {
            return null;
        }

        return this.div('icon', [
            this.icon(data.icon)
        ]);
    }

    label_text() : any
    {
        const { data } = this.scope;

        return this.div('text', [
            h('span', null, data.label)
        ]);
    }

    body() : any
    {
        const { data } = this.scope;

        const props : any = {
            class: data.classPart('body')
        };

        if( data.grid ) {
            props.class.push(`n-grid gap-${data.grid}`);
        }

        return this.div(props, [
            this.slot('default')
        ]);
    }

}

export default NFormGroupView;