import { Num, Arr, Locale } from "@kizmann/pico-js";

export default {

    name: 'NRating',

    props: {

        modelValue: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        steps: {
            default()
            {
                return 0.5;
            },
            type: [Number]
        },

        fixed: {
            default()
            {
                return 1;
            },
            type: [Number]
        },

        max: {
            default()
            {
                return 5;
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

        choice: {
            default()
            {
                return ':count';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'default';
            },
            type: [String]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        }

    },

    computed: {

        virtualValue()
        {
            return Num.fixed(1 / this.max * this.modelValue * 5, this.fixed);
        },

    },

    renderStars()
    {
        let stars = [
            1, 2, 3, 4, 5
        ];

        return Arr.each (stars, (rate) => {

            let className = 'is-null';

            if ( this.virtualValue >= rate - 0.5 ) {
                className = 'is-half';
            }

            if ( this.virtualValue >= rate ) {
                className = 'is-full';
            }

            return (
                <span class={className}></span>
            );
        });
    },

    renderValue()
    {
        let vars = {
            value: Num.format(this.modelValue, '.', '', this.fixed)
        };

        if ( this.$slots.default ) {
            return this.$slots.default(vars);
        }

        return Locale.choice(this.choice, this.modelValue, vars);
    },

    render()
    {
        let classList = [
            'n-rating',
            'n-rating--' + this.size,
            'n-rating--' + this.type
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                <div class="n-rating__stars">
                    {this.ctor('renderStars')()}
                </div>
                <div class="n-rating__value">
                    {this.ctor('renderValue')()}
                </div>
            </div>
        );
    }

}
