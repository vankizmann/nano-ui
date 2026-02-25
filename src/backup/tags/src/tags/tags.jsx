import { Arr, Dom, Mix } from "@kizmann/pico-js";

export default {

    name: 'NTags',

    provide()
    {
        return {
            NTags: this
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

        tags: {
            default()
            {
                return [];
            },
            type: [Array]
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

        addTag(tab)
        {
            Arr.add(this.elements, tab,
                { label: tab.label });

            if ( this.init) {
                this.$nextTick(this.$forceUpdate);
            }
        },

        removeTag(tab)
        {
            Arr.remove(this.elements,
                { label: tab.label });

            if ( this.init) {
                this.$nextTick(this.$forceUpdate);
            }
        },

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
            'n-tags',
            'n-tags--' + this.size,
        ];

        return (
            <div class={classList}>
                { this.$slots.default && this.$slots.default() }
            </div>
        );
    }
}
