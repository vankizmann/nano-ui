import { h } from "vue";
import { Arr } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NFormFrameController } from "./NFormFrameController.ts";

export class NFormFrameView extends ProtoView
{
    /**
     * @type {NFormFrameController}
     */
    declare scope : NFormFrameController;

    /**
     * @type {string}
     */
    bem : string = 'n-form-frame';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
        };

        return h('div', props, [
            this.side(), this.body()
        ]);
    }

    side() : any
    {
        const { data } = this.scope;

        let props : any = {
            class: data.classPart('side')
        };

        return this.comp('n-scrollbar', props, () => [
            this.search(), this.links()
        ]);
    }

    search() : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            modelValue: data.search,
            clearable: true,
            icon: Styler.icon('search'),
            placeholder: data.placeholder,
        };

        props.onInput = (e : any) => {
            scope.set('search', e.target.value);
        };

        return this.div('search', [
            this.comp('n-input', props)
        ]);
    }

    links() : any
    {
        const { childs } = this.scope;

        let items = Arr.each(childs, (child : any) => {
            return this.link(child);
        });

        return this.div('links', items);
    }

    link(group : any) : any
    {
        const { scope, data } = this.scope;

        let props : any = {
            class: data.classPart('link'),
        };

        props.onPointerdown = () => {
            scope.superView(group);
        };

        const { icon } = group.data;

        const label = h('span', null, [
            group.data.label
        ]);

        return h('div', props, [
            icon && this.icon(icon), label
        ]);
    }

    body() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            ref: scope.ref('body'),
            class: data.classPart('body'),
        };

        return this.comp('n-scrollbar', props, () => [
            this.slot('default')
        ]);
    }

}

export default NFormFrameView;