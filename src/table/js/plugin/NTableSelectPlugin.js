import { Arr, Mix, Num, Obj, Run } from "@kizmann/pico-js";

export default class NTableSelectPlugin
{
    /**
     * @type {NTableController}
     */
    table;

    /**
     * @type {NTableColumnController}
     */
    column;

    /**
     * @type {object}
     */
    config = {
        allowUncheck: true,
    };

    constructor(table, column)
    {
        [this.table, this.column] = [
            table, column
        ];

        this.config = {
            ...this.config, ...(column.data.data ?? {})
        };
    }

    equal(item)
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

    disabled(item)
    {
        const { column } = this;

        if ( !Mix.isEmpty(column.data.model) ) {
            return true;
        }

        let disabled = column.data.disabled;

        if ( typeof disabled !== 'function' ) {
            disabled = (v) => false;
        }

        return disabled(item);
    }

    uncheck(item)
    {
        if ( this.equal(item) ) {
            return this.config.allowUncheck;
        }

        return false;
    }

    toggle(item)
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