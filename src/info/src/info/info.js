import { Nano } from "nano-js";
import CtorMixin from "../../../mixins/src/ctor";

let { Arr, Any, Dom, Locale } = Nano;

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

        adaptHeight: {
            default()
            {
                return null;
            }
        },

    },

    methods: {

        ...CtorMixin,

        addColumn(column)
        {
            this.columns.push(column);
        },

        removeColumn(column)
        {
            Arr.remove(this.columns, { _uid: column._uid });
        },

        bindObserver()
        {
            let element = this.$el.parentNode;

            if ( this.adaptHeight !== true ) {
                element = this.adaptHeight;
            }

            Dom.find(element).observerResize(() => {
                this.height = Dom.find(element).height();
            })(element);
        },

    },

    provide()
    {
        return {
            NInfo: this
        };
    },

    data()
    {
        return {
            columns: []
        };
    },

    mounted()
    {
        if ( this.adaptHeight !== null ) {
            this.$nextTick(this.bindObserver);
        }
    },

    render()
    {
        this.h = h;

        return (
            <div class="n-info">
                <div ref="wrapper" class="n-info-wrapper">
                    { Any.isEmpty(this.item) === false &&
                        <div class="n-info__body">
                            {
                                Arr.each(this.columns, (column, key) => {
                                    return (
                                        <div class="n-info__column">
                                            { column.$scopedSlots.label({ column, key, item: this.item } )}
                                            { column.$scopedSlots.default({ column, key, item: this.item } )}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    { Any.isEmpty(this.item) === true &&
                        <div class="n-info__empty">
                            { this.trans('No entry') }
                        </div>
                    }
                    { this.$slots.default }
                </div>
            </div>
        );
    }
}
