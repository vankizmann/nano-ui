import { h } from "vue";
import { ProtoView } from "../../../root/index.ts";
import { NTableController } from "./NTableController.ts";
import { Arr, Locale, Mix, Obj, Str } from "@kizmann/pico-js";

export class NTableView extends ProtoView
{
    /**
     * @type {NTableController}
     */
        // @ts-ignore
    declare scope : NTableController;

    /**
     * @type {string}
     */
    bem : string = 'n-table';

    resolve(type : string, scope : string = 'NTableCells')
    {
        if ( globalThis[scope][type] ) {
            return globalThis[scope][type];
        }

        return globalThis[scope]['string'];
    }

    default()
    {
        let { scope, data } = this.scope;

        let props = {
            ref: scope.ref('el'),
            class: data.classList,
            overflowY: false,
        };

        return this.comp('n-scrollbar', props, () => [
            this.header(), this.context(), this.body(), this.slot()
        ]);
    }

    header()
    {
        let props = {
            name: 'header',
            prevent: 'contextmenu:1'
        };

        const items = Arr.each(this.scope.childs, (column : any, index : number) => {
            return this.column(column, index);
        });

        const slots = [
            this.draghead(),
        ];

        return this.div(props, [
            ...slots, ...items
        ]);
    }

    draghead()
    {
        const draglist = this.scope.ref('draglist');

        if ( !draglist.value ) {
            return null;
        }
        return draglist.value._.ncx.view.header();
    }

    context()
    {
        const { scope, data } = this.scope;

        let contextProps = {
            size: 'sm',
            trigger: 'context',
            toggle: true,
            width: 160,
        };

        const group = this.comp('n-popover-group', null, () => {
            return Locale.trans('Toggle column visiblity');
        });

        const groupProps = {
            modelValue: data.visible,
            align: 'vertical',
        };

        groupProps['onUpdate:modelValue'] = (value : any) => {
            scope.update('visible', value);
        };

        const values = Arr.each(scope.childs, (column : any) => {
            return this.comp('n-checkbox', { value: column.uid }, () => {
                return column.data.label;
            });
        });

        const checkbox = this.comp('n-checkbox-group', groupProps, () => {
            return values;
        })

        return this.comp('n-popover', contextProps, () => [
            group, checkbox
        ]);
    }

    column(column : any, index : number)
    {
        const { scope, data } = this.scope;

        if ( !Arr.has(data.visible, column.uid) ) {
            return null;
        }

        let props : any = {
            class: [`${this.bem}-column`],
        };

        const sorted = [
            'n-sorted', `n-${data.sortDir}`
        ];

        if ( column.data.sortProp === data.sortProp ) {
            props.class = Arr.merge(props.class, sorted);
        }

        const filter = Arr.find(data.filter, {
            property: column.data.filterProp
        });

        if ( filter ) {
            Arr.append(props.class, ['n-filtered']);
        }

        props.style = {
            'z-index': scope.childs.length - index
        };

        if ( column.data.fixedWidth ) {
            props.disabled = true;
        }

        props = {
            ...props, ...scope.getStyle(column),
        };

        if ( !Mix.isEmpty(data.fixedWidth) ) {
            props.modelValue = scope.getWidth(column.uid);
        }

        props['onUpdate:width'] = (width : number) => {
            data.looseWidth[column.uid] = width;
        };

        props['onUpdate:modelValue'] = (width : number) => {
            data.fixedWidth[column.uid] = width;
        };

        props.onClick = () => {
            if ( column.data.sort ) {
                scope.applySortColumn(column);
            }
        };

        return this.comp('n-resizer', props, () => [
            this.sort(column),
            this.label(column),
            this.filter(column),
        ]);
    }

    sort(column : any)
    {
        if ( !column.data.sort ) {
            return null;
        }

        const props = {
            class: [`${this.bem}-column__sort`],
        };

        return h('div', props, [
            h('i')
        ]);
    }

    label(column : any)
    {
        const props = {
            class: [`${this.bem}-column__label`],
        };

        return h('div', props, [
            column.data.label
        ]);
    }

    filter(column : any)
    {
        if ( !column.data.filter ) {
            return null;
        }

        const angleProps : any = {
            class: [`${this.bem}-column__filter`],
        };

        angleProps.onClick = (e) => {
            e.stopPropagation();
        };

        const angle = h('div', angleProps, [
            h('i', { class: 'fa fa-angle-down' }),
        ]);

        return [angle, this.popover(column)];
    }

    popover(column : any)
    {
        const { scope, data } = this.scope;

        const model = Obj.get(...[
            data.filterMap, column.uid
        ]);

        let resetProps : any = {
            type: 'neutral',
            size: 'xs',
            glass: true,
        };

        const filter = Arr.find(data.filter, {
            property: column.data.filterProp
        });

        if ( !filter ) {
            resetProps.disabled = true;
        }

        resetProps.onClick = () => {
            scope.resetColumnFilter(column);
        };

        const reset = this.comp('n-button', resetProps, () => [
            Locale.trans('Reset')
        ]);

        let applyProps : any = {
            size: 'xs',
            glass: true,
        };

        applyProps.onClick = () => {
            scope.applyColumnFilter();
        };

        const apply = this.comp('n-button', applyProps, () => [
            Locale.trans('Apply')
        ]);

        const props = {
            size: 'sm',
            toggle: true,
            width: 220,
        };

        const component = this.resolve(...[
            column.data.type, 'NTableFilters'
        ]);

        const compProps = {
            column, model, comp: this.comp,
        };

        let slots = {
            default: () => h(component, compProps),
            footer: () => [reset, apply]
        };

        return this.comp('n-popover', props, slots);
    }

    body()
    {
        let { scope, data } = this.scope;

        let props = {
            ref: scope.ref('draglist'),
            items: data.items,
            overflowX: false,
            scrollPortal: true,
        };

        const passed = [
            'itemHeight',
            'itemOffset',
            'renderHandle',
            'renderExpand',
            'renderSelect',
        ];

        Arr.each(passed, (key : any) => {
            props[key] = scope.props[key];
        });

        props['onUpdate:items'] = (value : any) => {
            scope.emit('update:items', value);
        };

        props['onUpdate:current'] = (value : any) => {
            scope.emit('update:current', value);
        };

        props['onUpdate:selected'] = (value : any) => {
            scope.emit('update:selected', value);
        };

        props['onUpdate:expanded'] = (value : any) => {
            scope.emit('update:expanded', value);
        };

        return this.comp('n-draglist', props, (node : any) => {
            return this.rows(node)
        });
    }

    rows(node : any)
    {
        const { scope, data } = this.scope;

        const columns = Arr.filter(scope.childs, (column : any) => {
            return Arr.has(data.visible, column.uid);
        });

        return Arr.each(columns, (column : any, index : number) => {
            return this.cell(node, column, index);
        });
    }

    cell(node : any, column : any, index : number)
    {
        const [{ scope }, { data }] = [
            this.scope, column.unpack()
        ];

        if ( !scope.data.looseWidth[column.uid] ) {
            return null;
        }

        let classList = [
            `${this.bem}-cell`,
            `${this.bem}-cell--${data.type}`,
            `${this.bem}-cell--${data.align}`,
        ];

        let props : any = {
            class: classList
        };

        let width = this.scope.getWidth(column.uid);

        if ( index === 0 ) {
            width -= node.value.depth * scope.data.itemOffset;
        }

        props.style = {
            width: width + 'px'
        };

        const input = Obj.get(node.item, data.prop);

        const cell = {
            props, input, node, column, table: scope,
        };

        return this.resolve(data.type)({
            bem: `${this.bem}-cell`, ...cell
        });
    }

}

export default NTableView;