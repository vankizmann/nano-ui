import { Arr, Any, Num } from "@kizmann/pico-js";

export default {

    name: 'NChartBar',

    provide()
    {
        return {
            NChart: this
        };
    },

    props: {

        width: {
            default()
            {
                return 20;
            },
            type: [String]
        },

        color: {
            default()
            {
                return 10;
            },
            type: [Number]
        },

        colorLimit: {
            default()
            {
                return 19;
            },
            type: [Number]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

    },

    computed: {

        total()
        {
            let count = Arr.each(this.elements, (item) => {
                return Num.float(item.value);
            });

            return Num.combine(count);
        },

        max()
        {
            let max = Number.MIN_VALUE;

            Arr.each(this.elements, (item) => {
                max = Math.max(max, Num.float(item.value));
            });

            return Num.float(max);
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

    renderBar(item, index)
    {
        let classList = [
            'n-chart-item', item.getClass(index),
        ];

        let height = (100 / this.max) * Num.float(item.value);

        let style = {
            '--n-chart-height': Num.int(height) + '%'
        };

        return (
            <div class={classList} style={style}>
            </div>
        );
    },

    renderBars()
    {
        let items = Arr.each(this.elements, (item, index) => {
            return this.ctor('renderBar')(item, index);
        });

        return (
            <div class="n-chart-bar__bars">
                {items}
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-chart-bar',
            'n-chart-bar--' + this.size,
        ];

        return (
            <div class={classList}>
                {[this.ctor('renderBars')(), this.$slots.default && this.$slots.default()]}
            </div>
        );
    }

}
