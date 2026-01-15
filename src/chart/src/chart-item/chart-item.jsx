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
                return Locale.trans('Items');
            },
            type: [String]
        },

        label: {
            default()
            {
                return Locale.trans('Items');
            },
            type: [String, Number]
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

        getClass(index, className = 'n-chart-item')
        {
            if ( ! Any.isEmpty(this.type) ) {
                return className + '--' + this.type;
            }

            return className + '--color-' + this.getColor(index);
        },

        getColor(index)
        {
            if ( this.color !== 'auto' ) {
                return this.color;
            }

            let color = this.NChart.color + index;

            let subdivide = Math.floor(color /
                this.NChart.colorLimit);

            return color - (this.NChart.colorLimit *
                subdivide);
        }

    },

    render()
    {
        return null;
    }

}
