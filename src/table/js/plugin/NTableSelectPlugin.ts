import { Mix, Obj, Run } from "@kizmann/pico-js";
import NTableController from "../table/NTableController.ts";
import NTableColumnController from "../table-column/NTableColumnController.ts";

export default class NTableSelectPlugin
{
    /**
     * @type {NTableController}
     */
    table : NTableController;

    /**
     * @type {NTableColumnController}
     */
    column : NTableColumnController;

    /**
     * @type {object}
     */
    config : any = {
        allowUncheck: true,
    };

    constructor(table : NTableController, column : NTableColumnController)
    {
        [this.table, this.column] = [
            table, column
        ];

        this.config = {
            ...this.config, ...(column.data.data ?? {})
        };
    }

    equal(item : any)
    {
        const { column, table } = this;

        if ( Mix.isEmpty(column.data.model) ) {
            return false;
        }

        const [suid, muid] = [
            Obj.get(item, table.data.uniqueProp),
            Obj.get(column.data.model, table.data.uniqueProp),
        ];

        return suid === muid;
    }

    disabled(item : any)
    {
        const { column } = this;

        if ( !Mix.isEmpty(column.data.model) ) {
            return true;
        }

        let disabled = column.data.disabled;

        if ( typeof disabled !== 'function' ) {
            disabled = (v : any) => false;
        }

        return disabled(item);
    }

    uncheck(item : any)
    {
        if ( this.equal(item) ) {
            return this.config.allowUncheck;
        }

        return false;
    }

    toggle(item : any)
    {
        const { column, table } = this;

        if ( this.equal(item) ) {
            item = null;
        }

        Run.frame(() => {
            table.instance.proxy.$forceUpdate();
        });

        column.emit('update:modelValue', item);
    }

}