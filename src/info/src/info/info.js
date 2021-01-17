import { Arr, Any, Dom, Event, UUID } from "nano-js";

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

        syncEvent: {
            default()
            {
                return null;
            }
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        relative: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        showEmptyIcon: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

    },

    data()
    {
        return {
            uid: UUID(),
            elements: [],
            options: [],
            tempValue: this.item, 
        };
    },

    mounted()
    {
        this.bindSyncEvent();
    },

    beforeUnmount()
    {
        this.unbindSyncEvent();
    },

    methods: {

        bindSyncEvent()
        {
            if ( ! this.syncEvent ) {
                return;
            }

            this.options = this.syncEvent;

            if ( Any.isFunction(this.options) ) {
                this.options = this.options(this);
            }

            let syncFunction = (value, uid = null) => {
                if ( uid === this.options[1] ) {
                    this.setValue(value);
                }
            };

            Event.bind(this.options[0], syncFunction, 
                this.uid);
        },

        unbindSyncEvent()
        {
            Event.unbind(this.options[0], this.uid);
        },

        setValue(value)
        {
            this.$emit('update:modelValue', 
                this.tempValue = value);
        },

        addColumn(column)
        {
            Arr.add(this.elements, 
                column, { uid: column.uid });
        },

        removeColumn(column)
        {
            Arr.remove(this.elements, 
                { uid: column.uid });
        },

    },

    provide()
    {
        return {
            NInfo: this
        };
    },

    renderEmpty()
    {
        return (
            <NEmptyIcon disabled={! this.showEmptyIcon} class="n-info__empty">
                 { this.$slots.empty && this.$slots.empty() || this.trans('No entry') }
            </NEmptyIcon>
        );
    },

    renderBody()
    {
        if ( Any.isEmpty(this.tempValue) ) {
            return this.ctor('renderEmpty')();
        }
        return (
                <div class="n-info__body">
                    {
                        Arr.each(this.elements, (column) => {
                            return (
                                <div class="n-info__column">
                                    { column.ctor('renderLabel')({ item: this.tempValue }) }
                                    { column.ctor('renderBody')({ item: this.tempValue }) }
                                </div>
                            )
                        })
                    }
                </div>
        );
    },

    render()
    {
        let classList = [
            'n-info',
            'n-info--' + this.type,
            'n-info--' + this.size,
        ];

        return (
            <div class={classList}>
                <NScrollbar relative={this.relative}>
                    { this.ctor('renderBody')() }
                </NScrollbar>
                { this.$slots.default() }
            </div>
        );
    }
}
