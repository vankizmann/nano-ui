import { Arr, Any } from "@kizmann/pico-js";

export default {

    name: 'NChartBar',

    provide()
    {
        return {
            NChart: this
        };
    },

    props: {

        stroke: {
            default()
            {
                return 20;
            },
            type: [String]
        }

    },

    data()
    {
        return {
            elements: []
        };
    },

    methods: {

        appendElement(element)
        {
            this.index = -1;

            Arr.add(this.elements, element, {
                uid: element.uid
            });
        },

        removeElement(checkbox)
        {
            this.index = -1;

            Arr.remove(this.elements, {
                uid: checkbox.uid
            });
        },

    },

    render()
    {
        let classList = [
            'n-chart-bar',
        ];

        return (
            <div class={classList}>
                {this.$slots.default()}
            </div>
        );
    }

}
