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

        minHeight: {
            default()
            {
                return 0;
            },
            type: [Number]
        }

    },

    computed: {

        total()
        {
            let count = Arr.each(this.elements, (item) => {
                return Num.float(item.value);
            });

            return Num.combine(count);
        },

        min()
        {
            let min = Number.MAX_VALUE;

            Arr.each(this.elements, (item) => {
                min = Math.min(min, Num.float(item.value));
            });

            return Num.float(min);
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

        let height = Math.max((100 / this.max) * Num.float(item.value),
            this.minHeight);

        let style = {
            '--n-chart-height': Num.int(height) + '%'
        };

        let html = [];

        html.push(
            <div class="n-chart-bar__bar">
                {/* Chart bar */}
            </div>
        );

        html.push(
            <div class="n-chart-bar__dot">
                {/* Chart dor */}
            </div>
        );

        html.push(
            <div class="n-chart-bar__value">
                <span>{item.axis}</span>
                <span>{item.value}</span>
            </div>
        );

        return (
            <div class={classList} style={style}>
                {html}
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

    renderAxis()
    {
        return (
            <div class="n-chart-bar__axis">
                <span>{this.max}</span>
                <span>{this.min}</span>
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
