import { onMounted, provide, SetupContext } from "vue";
import { Arr, Mix, Obj } from "@kizmann/pico-js";
import { GroupController } from "../../../root/index.ts";
import { NTableView } from "./NTableView.ts";
import { NTableData } from "./NTableData.ts";

export class NTableController extends GroupController
{
    /**
     * @type {NTableController}
     */
    declare scope : NTableController;

    /**
     * @type {NTableData}
     */
    declare data : NTableData;

    /**
     * @type {NTableView}
     */
    declare view : NTableView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NTableView(this),
            // @ts-ignore
            new NTableData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('visible')
            .cloneProp('filter')
            .cloneProp('sortProp')
            .cloneProp('sortDir');

        this
            .makeRef('el')
            .makeRef('draglist');

        this.makeData('looseWidth', {});
        this.makeData('fixedWidth', {});

        this.makeData('filterMap', ...[
            this.buildFilters()
        ]);

        this.watchProp('filter', () => {
            this.set('filterMap', this.buildFilters());
        });

        this.watchChilds(() => {
            this.set('filterMap', this.buildFilters());
        });

        provide('NTable', this.instance);

        onMounted(() => {
            this.onMounted()
        });

        return this;
    }

    onMounted()
    {
        if ( this.data.visible == null ) {
            this.buildVisible();
        }
    }

    buildVisible()
    {
        const width = this.dom('el').width();

        const columns = Arr.filter(this.childs, (column : any) => {
            return column.getVisibility(width);
        });

        const visible = Arr.each(columns, (column : any) => {
            return column.data.prop;
        });

        this.update('visible', visible);
    }

    buildFilters()
    {
        let filters = {};

        Arr.each(this.childs, (child : any) => {
            filters[child.uid] = this.buildFilter(child);
        });

        return filters;
    }

    buildFilter(column : any, merge : boolean = true)
    {
        const { data } = column;

        let value = {
            value: null, type: data.type, property: data.filterProp,
        };

        const active = Arr.find(this.data.filter, {
            // @ts-ignore
            property: value.property
        });

        if ( merge && active ) {
            value = Obj.assign(value, Obj.clone(active));
        }

        return value;
    }

    getWidth(uid : string)
    {
        if ( this.data.fixedWidth[uid] != null ) {
            return this.data.fixedWidth[uid];
        }

        return this.data.looseWidth[uid];
    }

    getStyle(column : any)
    {
        const { data } = column.unpack();

        let style : any = {
            flex: '1 1 auto'
        };

        if ( Mix.isStr(data.width) ) {
            style.flex = `1 1 ${data.width}`;
        }

        if ( Mix.isNum(data.width) ) {
            style.flex = `1 1 ${data.width}px`;
        }

        if ( data.fixedWidth ) {
            style.flex = `0 0 ${data.fixedWidth}px`;
        }

        if ( !data.fixedWidth && data.minWidth ) {
            style.minWidth = data.minWidth;
        }

        if ( !data.fixedWidth && data.maxWidth ) {
            style.maxWidth = data.maxWidth;
        }

        return style;
    }

    toggleSelect()
    {
        return this.ncx('draglist').selectAll();
    }

    getTotalSelect()
    {
        return this.ncx('draglist').selectState();
    }

    applyColumnFilter()
    {
        const { data } = this;

        const filters = Arr.filter(data.filterMap, (filter : any) => {
            return !Mix.isEmpty(filter.value);
        });

        this.update('filter', filters);
    }

    resetColumnFilter(column : any)
    {
        const { data } = this;

        data.filterMap[column.uid] = this.buildFilter(...[
            column, false
        ]);

        this.applyColumnFilter();
    }

    applySortColumn(column : any)
    {
        const { data } = this;

        const value = {
            prop: data.sortProp, dir: data.sortDir,
        };

        const changed = !Arr.has(...[
            [column.data.sortProp], value.prop
        ]);

        let result = {
            prop: column.data.sortProp, dir: 'asc',
        }

        if ( !changed && value.dir === 'asc' ) {
            result.dir = 'desc';
        }

        if ( !changed && value.dir === 'desc' ) {
            result.dir = 'asc';
        }

        if ( result.dir !== value.dir ) {
            this.update('sortDir', result.dir);
        }

        if ( result.prop !== value.prop ) {
            this.update('sortProp', result.prop);
        }

        this.emit('sort', ...Mix.vals(result));
    }

}

export default NTableController;