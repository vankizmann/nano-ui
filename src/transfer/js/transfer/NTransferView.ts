import { h } from "vue";
import { Arr, Obj } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NTransferController } from "./NTransferController.ts";

export class NTransferView extends ProtoView
{
    /**
     * @type {NTransferController}
     */
    declare scope : NTransferController;

    /**
     * @type {string}
     */
    bem : string = 'n-transfer';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
        };

        return h('div', props, [
            this.source(), this.controls(), this.target()
        ]);
    }

    controls() : any
    {
        const { scope } = this.scope;

        let moveRightProps : any = {
            square: true,
            icon: Styler.icon('angle-right'),
        };

        moveRightProps.disabled = scope.ncx('source')
            ?.data.selected.length === 0;

        moveRightProps['onClick'] = () => {
            scope.moveSelectedToTarget();
        };

        let moveLeftProps : any = {
            square: true,
            icon: Styler.icon('angle-left'),
        };

        moveLeftProps.disabled = scope.ncx('target')
            ?.data.selected.length === 0;

        moveLeftProps['onClick'] = () => {
            scope.moveSelectedToSource();
        };

        return this.div('controls', [
            this.comp('n-button', moveRightProps),
            this.comp('n-button', moveLeftProps),
        ]);
    }

    source_header()
    {
        const { scope, data } = this.scope;

        let inputProps : any = {
            modelValue: data.sourceSearch,
            placeholder: data.$sourcePlaceholder,
            clearable: true,
            clearValue: '',
            icon: Styler.icon('search'),
        };

        inputProps['onUpdate:modelValue'] = (value : any) => {
            scope.set('sourceSearch', value);
        };

        const select = this.div('select', [
            scope.ncx('source')?.view.header_select()
        ]);

        const input = this.div('search', [
            this.comp('n-input', inputProps)
        ]);

        const title = this.div('title', [
            h('span', data.$sourceLabel), h('span', data.source.length)
        ]);

        return this.div('header', [
            select, title, input
        ]);
    }

    source() : any
    {
        const { scope, uid, data } = this.scope;

        let props : any = {
            ref: scope.ref('source'),
            class: `${this.bem}__body`,
            group: [uid],
            items: data.source,
            appendNode: false,
            itemSkip: true,
            renderSelect: true,
        };

        props.onRowDblclick = (item : any) => {
            scope.moveToTarget(item);
        };

        let slots : any = {};

        slots.default = ({ item }) => {
            return Obj.get(item, 'label');
        };

        const header = this.source_header();

        return this.div('panel', [
            header, this.comp('n-draglist', props, slots)
        ]);
    }

    target_header()
    {
        const { scope, data } = this.scope;

        let inputProps : any = {
            modelValue: data.targetSearch,
            placeholder: data.$targetPlaceholder,
            clearable: true,
            clearValue: '',
            icon: Styler.icon('search'),
        };

        inputProps['onUpdate:modelValue'] = (value : any) => {
            scope.set('targetSearch', value);
        };

        const select = this.div('select', [
            scope.ncx('target')?.view.header_select()
        ]);

        const input = this.div('search', [
            this.comp('n-input', inputProps)
        ]);

        const title = this.div('title', [
            h('span', data.$targetLabel), h('span', data.target.length)
        ]);

        return this.div('header', [
            select, title, input
        ]);
    }

    target() : any
    {
        const { scope, uid, data } = this.scope;

        let props : any = {
            ref: scope.ref('target'),
            class: `${this.bem}__body`,
            group: [uid],
            items: data.target,
            appendNode: false,
            removeNode: true,
            itemSkip: true,
            renderSelect: true,
        };

        props['onUpdate:items'] = (items : any[]) => {
            scope.update('modelValue', items);
        };

        props.onRowDblclick = (item : any) => {
            scope.moveToSource(item);
        };

        let slots : any = {};

        slots.default = ({ item }) => {
            return Obj.get(item, 'label', 'foobar');
        };

        const header = this.target_header();

        return this.div('panel', [
            header, this.comp('n-draglist', props, slots)
        ]);
    }


}

export default NTransferView;