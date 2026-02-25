import { Arr, Mix, Num, Obj, Run } from "@kizmann/pico-js";

export default class NTableMatrixPlugin
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
    matrix;

    /**
     * @type {object}
     */
    config = {
        allowUncheck: true, matrix: 0, prop: 'matrix',
    };

    constructor(table, column)
    {
        [this.table, this.column] = [
            table, column
        ];

        this.config = {
            ...this.config, ...(column.data.data ?? {})
        };

        column.watchProp('modelValue', () => {
            this.setup();
        });

        this.setup();
    }

    setup() {
        this.matrix = this.parse();
    }

    parse()
    {
        const { column, table } = this;

        let result = {};

        Arr.each(column.data.model ?? [], (item) => {

            const [uid, matrix] = [
                Obj.get(item, table.data.uniqueProp),
                Obj.get(item, this.config.prop),
            ];

            result[uid] = Num.matrix(matrix);
        });

        return result;
    }

    equal(item)
    {
        const { table } = this;

        const uid = Obj.get(...[
            item, table.data.uniqueProp
        ]);

        return Arr.has(...[
            this.matrix[uid], this.config.matrix
        ]);
    }

    disabled(item)
    {
        const { column } = this;

        let disabled = column.data.disabled;

        if ( typeof disabled !== 'function' ) {
            disabled = (v) => false;
        }

        return disabled(item);
    }

    uncheck(item)
    {
        const { column } = this;

        if ( this.equal(item) ) {
            return this.config.allowUncheck;
        }

        return false;
    }

    toggle(item)
    {
        const { column, table } = this;

        const fallback = Obj.assign({}, item, {
            [this.config.prop]: []
        });

        const uniqueProp = table.data.uniqueProp;

        let finder = Arr.find(column.data.model ?? [], {
            [uniqueProp]: Obj.get(item, uniqueProp)
        });

        if ( !finder ) {
            finder = fallback;
        }

        let matrix = finder[this.config.prop];

        if ( ! Mix.isArr(matrix) ) {
            matrix = Num.matrix(matrix);
        }

        finder[this.config.prop] = Num.combine(...[
            Arr.toggle(matrix, this.config.matrix)
        ]);

        const result = Arr.replace(column.data.model ?? [], finder, {
            [uniqueProp]: Obj.get(item, uniqueProp)
        });

        Run.frame(() => {
            table.instance.proxy.$forceUpdate();
        });

        column.emit('update:modelValue', result);
    }

}