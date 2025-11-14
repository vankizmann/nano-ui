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

    render()
    {
        return null;
    }

}
