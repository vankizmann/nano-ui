import { Arr, Dom, Mix } from "@kizmann/pico-js";

export default {

    name: 'NCollapse',

    provide()
    {
        return {
            NCollapse: this
        };
    },

    props: {

        modelValue: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        relative: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        }

    },

    data()
    {
        return {
            init: false, elements: [], tempValue: this.modelValue
        };
    },

    methods: {

        getIndex(tab)
        {
            if ( tab.sort !== -1 ) {
                return 1000 + tab.sort;
            }

            return Arr.findIndex(this.elements, {
                name: tab.name
            });
        },

        getSorted()
        {
            // Fix for vue constructor prop warning
            let indexies = Arr.each(Mix.keys(this.elements), (key) => {
                return { name: this.elements[key]['name'], index: this.getIndex(this.elements[key]) };
            });

            return Arr.sort(indexies, 'index');
        },

        addTab(tab)
        {
            Arr.add(this.elements, tab, {
                name: tab.name
            });

            if ( this.init) {
                this.$nextTick(this.$forceUpdate);
            }
        },

        removeTab(tab)
        {
            Arr.remove(this.elements, {
                name: tab.name
            });

            if ( this.init) {
                this.$nextTick(this.$forceUpdate);
            }
        },

        showTab(value)
        {
            if ( Arr.has(this.tempValue, value) ) {
                return;
            }

            Arr.add(this.tempValue, value);

            this.$emit('update:modelValue', this.tempValue);
        },

        hideTab(value)
        {
            if ( ! Arr.has(this.tempValue, value) ) {
                return;
            }

            Arr.remove(this.tempValue, value);

            this.$emit('update:modelValue', this.tempValue);
        },

        toggleTab(value)
        {
            Arr.toggle(this.tempValue, value);

            this.$emit('update:modelValue', this.tempValue);
        }

    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        }

    },

    mounted()
    {
        this.init = true;
    },

    render()
    {
        let classList = [
            'n-collapse',
            'n-collapse--' + this.size,
            'n-collapse--' + this.type
        ];

        return (
            <div class={classList}>
                { this.$slots.default && this.$slots.default() }
            </div>
        );
    }
}
