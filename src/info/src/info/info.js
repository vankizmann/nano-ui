import { Arr, Any, Obj, Event, UUID } from "@kizmann/pico-js";

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

    watch: {

        item(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        }

    },

    mounted()
    {
        this.bindSyncEvent();
    },

    beforeUnmount()
    {
        this.unbindSyncEvent();
    },

    updated()
    {
        Any.delay(() => this.$refs.scrollbar.adaptHeight(), 500);
    },

    methods: {

        bindSyncEvent()
        {
            if ( !this.syncEvent ) {
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
            <NEmptyIcon disabled={!this.showEmptyIcon} class="n-info__empty">
                {this.$slots.empty && this.$slots.empty() || this.trans('No entry')}
            </NEmptyIcon>
        );
    },

    renderBody()
    {
        if ( Any.isEmpty(this.tempValue) ) {
            return this.ctor('renderEmpty')();
        }

        let elements = Obj.each(this.elements, (column) => {
            return (
                <div class="n-info__column">
                    {column.ctor('renderLabel')({ item: this.tempValue })}
                    {column.ctor('renderBody')({ item: this.tempValue })}
                </div>
            );
        });

        return (
            <div class="n-info__body">
                {Any.vals(elements)}
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

        let infoHtml = (
            <NScrollbar ref="scrollbar" relative={this.relative}>
                {this.ctor('renderBody')()}
            </NScrollbar>
        );

        return (
            <div class={classList}>
                {[infoHtml, this.$slots.default()]}
            </div>
        );
    }
}
