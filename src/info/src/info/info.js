import { Arr, Any, Dom } from "nano-js";

export default {

    name: 'NInfo',

    model: {
        prop: 'item'
    },

    props: {

        item: {
            default()
            {
                return null;
            }
        },

    },

    data()
    {
        return {
            veValue: this.item, veColumns: []
        };
    },

    methods: {

        setValue(value)
        {
            this.$emit('input', this.veValue = value);
        },

        addColumn(column)
        {
            Arr.add(this.veColumns, column, {
                _uid: column._uid
            });
        },

        removeColumn(column)
        {
            Arr.remove(this.veColumns, {
                _uid: column._uid
            });
        },

    },

    provide()
    {
        return {
            NInfo: this
        };
    },


    renderBody()
    {
        return (
            <NScrollbar>
                <div class="n-info__body">
                    {
                        Arr.each(this.veColumns, (column, key) => {
                            return (
                                <div class="n-info__column">
                                    { column.$scopedSlots.label({ column, key, item: this.veValue }) }
                                    { column.$scopedSlots.default({ column, key, item: this.veValue }) }
                                </div>
                            )
                        })
                    }
                </div>
            </NScrollbar>
        );
    },

    renderEmpty()
    {
        return (
            <div class="n-info__empty">
                { this.trans('No entry') }
            </div>
        )
    },

    render($render)
    {
        this.$render = $render;

        return (
            <div class="n-info">
                { Any.isEmpty(this.veValue) ? this.ctor('renderEmpty')() : this.ctor('renderBody')() }
                { this.$slots.default }
            </div>
        );
    }
}
