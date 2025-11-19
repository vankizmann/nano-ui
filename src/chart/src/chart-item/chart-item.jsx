import { Arr, Any, UUID, Locale } from "@kizmann/pico-js";

export default {

    name: 'NChartItem',

    inject: {
        NChart: {
            default: undefined
        }
    },

    props: {

        value: {
            default()
            {
                return 1;
            },
            type: [String, Number]
        },

        axis: {
            default()
            {
                return '';
            },
            type: [String]
        },

        label: {
            default()
            {
                return Locale.trans('Item count');
            },
            type: [String]
        },

        type: {
            default()
            {
                return null;
            },
            type: [String]
        },

        color: {
            default()
            {
                return null;
            }
        }

    },

    data()
    {
        return {
            uid: UUID()
        };
    },

    beforeMount()
    {
        if ( this.NChart ) {
            this.NChart.appendElement(this);
        }
    },

    beforeUnmount()
    {
        if ( this.NChart ) {
            this.NChart.removeElement(this);
        }
    },

    methods: {

        getClass(index)
        {
            if ( ! Any.isEmpty(this.type) ) {
                return 'n-chart-item--' + this.type;
            }

            return 'n-chart-item--color-' + this.getColor(index);
        },

        getColor(index)
        {
            if ( this.color !== 'auto' ) {
                return this.color;
            }

            let color = this.NChart.color + index;

            let subdivide = Math.floor(color /
                this.NChart.colorLimit);

            return color - (subdivide * this.NChart.colorLimit);
        }

    },

    render()
    {
        return null;
    }

}
