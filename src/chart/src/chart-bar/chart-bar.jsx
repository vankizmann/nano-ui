import { Arr, Any, Num, Locale } from "@kizmann/pico-js";

export default {

    name: 'NChartBar',

    provide()
    {
        return {
            NChart: this
        };
    },

    props: {

        sort: {
            default()
            {
                return false;
            },
            type: [Boolean]
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

        label: {
            default()
            {
                return Locale.trans('Total');
            },
            type: [String]
        },

        otherLabel: {
            default()
            {
                return Locale.trans('Other');
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

        limit: {
            default()
            {
                return 4;
            },
            type: [Number]
        },

        minHeight: {
            default()
            {
                return 5;
            },
            type: [Number]
        },

        renderLegend: {
            default()
            {
                return true;
            },
            type: [Boolean]
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

    renderBarItem(item, index)
    {
        let classList = [
            'n-chart-item', item.getClass(index),
        ];

        let height = ((100 - this.minHeight) / this.max * item.value) + this.minHeight;

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

    renderBarOther(hidden, visible)
    {
        if ( Any.isEmpty(hidden) ) {
            return null;
        }

        let count = Arr.each(hidden, (item) => {
            return Num.float(item.value);
        });

        let item = {
            axis: this.otherLabel, value: Num.combine(count)
        };

        item['getClass'] = () => {
            return 'n-chart-item--other';
        };

        return this.ctor('renderBarItem')(item, visible.length);
    },

    renderBars()
    {
        let [elements, sorted] = [
            Arr.clone(this.elements), Arr.sort(this.elements, 'value').reverse()
        ];

        if ( this.sort ) {
            elements = Arr.clone(sorted);
        }

        let temp = Arr.splice(sorted, 0, this.limit || elements.length);

        let visible = Arr.filter(elements, (el) => {
            return !! Arr.find(temp, { uid: el.uid});
        });

        let hidden = Arr.filter(elements, (el) => {
            return ! Arr.find(temp, { uid: el.uid});
        });

        [this.vis, this.hid] = [
            visible, hidden
        ];

        let items = Arr.each(visible, (item, index) => {
            return this.ctor('renderBarItem')(item, index);
        });

        let othersHtml = this.ctor('renderBarOther')(...[
            this.hid, this.vis
        ]);

        return (
            <div class="n-chart-bar__bars">
                {[...items, othersHtml]}
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

    renderLegendOther(hidden, visible)
    {
        if ( Any.isEmpty(hidden) ) {
            return null;
        }

        let count = Arr.each(hidden, (item) => {
            return Num.float(item.value);
        });

        let item = {
            axis: this.otherLabel, value: Num.combine(count)
        };

        item['getClass'] = () => {
            return 'n-chart-legend--other';
        };

        return this.ctor('renderLegendItem')(item, visible.length);
    },

    renderLegendItem(item, index)
    {
        let classList = [
            'n-chart-legend',
            item.getClass(index, 'n-chart-legend')
        ];

        return (
            <div class={classList}>
                <span>{item.axis}</span>
                <span>{item.value}</span>
            </div>
        );
    },

    renderLegend()
    {
        let items = Arr.each(this.vis, (item, index) => {
            return this.ctor('renderLegendItem')(item, index);
        });

        let othersHtml = this.ctor('renderLegendOther')(...[
            this.hid, this.vis
        ]);

        return (
            <div class="n-chart-bar__legend">
                {[...items, othersHtml]}
            </div>
        )
    },

    render()
    {
        let classList = [
            'n-chart-bar',
            'n-chart-bar--' + this.size,
        ];

        let bodyHtml = [
            this.ctor('renderBars')(),
        ];

        if ( this.$slots.default ) {
            bodyHtml.push(this.$slots.default());
        }

        if ( this.renderLegend ) {
            bodyHtml.push(this.ctor('renderLegend')());
        }

        return (
            <div class={classList}>
                {bodyHtml}
            </div>
        );
    }

}
