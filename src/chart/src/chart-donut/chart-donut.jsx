import { Arr, Num, Any, Dom, UUID, Locale } from "@kizmann/pico-js";

export default {

    name: 'NChartDonut',

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
                return 6;
            },
            type: [Number]
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
                return Locale.trans('Total count');
            },
            type: [String]
        },

        otherLabel: {
            default()
            {
                return Locale.trans('Other count');
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

        overlap: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        limit: {
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
        }

    },

    data()
    {
        let attrs = {
            'cx': '75', 'cy': '75', 'r': '57.2958'
        };

        return {
            attrs, elements: []
        };
    },

    methods: {

        appendElement(element)
        {
            this.index = - 1;

            Arr.add(this.elements, element, {
                uid: element.uid
            });
        },

        removeElement(checkbox)
        {
            this.index = - 1;

            Arr.remove(this.elements, {
                uid: checkbox.uid
            });
        },

        onMouseenter(item)
        {
            Dom.find(this.$refs.text).css({
                '--n-chart-label': `'${item.label}'`,
                '--n-chart-value': Num.int(item.value)
            });
        },

        onMouseleave(item)
        {
            Dom.find(this.$refs.text).css(null);
        }

    },

    renderCircle(item, index)
    {
        let classList = [
            'n-chart-item', item.getClass(index),
        ];

        let [distance] = [
            360 / this.total * Num.float(item.value),
        ];

        let offset = this.last * - 1;

        if ( !this.overlap ) {
            offset = Math.min(offset + (this.width * - 0.5), 0);
        }

        let dashar = distance;

        if ( !this.overlap ) {
            dashar = Math.max(dashar - (this.width * 1.2), 0);
        }

        let props = {
            'stroke-dashoffset': Num.fixed(offset, 4),
            'stroke-dasharray': Num.fixed(dashar, 4) + ' 360'
        };

        props['onmouseenter'] = () => {
            this.onMouseenter(item);
        };

        props['onmouseleave'] = () => {
            this.onMouseleave(item);
        };

        this.last = Num.float(distance + this.last);

        return (
            <circle class={classList} {...props} {...this.attrs}></circle>
        );
    },

    renderOtherCircle(others)
    {
        if ( Any.isEmpty(others) ) {
            return null;
        }

        let count = Arr.each(others, (item) => {
            return Num.float(item.value);
        });

        let item = {
            label: this.otherLabel, value: Num.combine(count)
        };

        item['getClass'] = () => {
            return 'n-chart-item--other';
        };

        return this.ctor('renderCircle')(item, 100);
    },

    renderSvg()
    {
        this.last = 0;

        let elements = Arr.sort(this.elements, 'value')
            .reverse();

        let visibles = Arr.splice(elements, 0, this.limit || elements.length);

        let items = Arr.each(visibles, (item, index) => {
            return this.ctor('renderCircle')(item, index);
        });

        let baseHtml = (
            <circle class="n-chart-donut__base" {...this.attrs}></circle>
        );

        return (
            <svg width="600" height="600" viewBox="0 0 150 150">
                {[baseHtml, ...items, this.ctor('renderOtherCircle')(elements)]}
            </svg>
        );
    },

    renderText()
    {
        return (
            <div ref="text" class="n-chart-donut__text">
                <span></span><span></span>
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-chart-donut',
            'n-chart-donut--' + this.size,
        ];

        if ( this.overlap ) {
            classList.push('n-chart-donut--overlap');
        }

        let style = {
            '--n-chart-label': `'${this.label}'`,
            '--n-chart-value': Num.int(this.total),
            '--n-stroke-width': Num.int(this.width),
            '--n-stroke-hover-width': Num.int(this.width * 1.2)
        };

        return (
            <div class={classList} style={style}>
                {[this.ctor('renderText')(), this.ctor('renderSvg')(), this.$slots.default && this.$slots.default()]}
            </div>
        );
    }

}
