import { Arr, Dom, Any } from "@kizmann/pico-js";

export default {

    name: 'NTabs',

    provide()
    {
        return {
            NTabs: this
        };
    },

    props: {

        modelValue: {
            default()
            {
                return 'default';
            },
            type: [String]
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
            elements: [], 
            width: 0, 
            offset: 0, 
            tempValue: this.modelValue
        };
    },

    methods: {

        addTab(tab)
        {
            Arr.add(this.elements, tab, 
                { name: tab.name });
        },

        removeTab(tab)
        {
            Arr.remove(this.elements, 
                { name: tab.name });
        },

        getTab(updateEvent = true)
        {
            let currentTab = Arr.find(this.elements, {
                name: this.value
            });

            let sorted = Arr.sort(this.elements, 'sort');

            if ( ! currentTab ) {
                currentTab = Arr.first(sorted);
            }

            let repeatNext = () => this.getTab(updateEvent);

            if ( ! currentTab ) {
                return Any.delay(repeatNext, 250);
            }

            if ( currentTab.name === this.tempValue || ! updateEvent  ) {
                return;
            }

            this.$emit('update:modelValue', 
                this.tempValue = currentTab.name);
        },

        changeTab(value)
        {
            if ( this.tempValue === value ) {
                return;
            }

            this.$emit('update:modelValue', 
                this.tempValue = value);
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
        this.getTab(false);
    },

    updated()
    {
        let width = Dom.find(this.$el).find('.n-active')
            .width();

        this.width = width < 0 ? 0 : width;

        let offset = Dom.find(this.$el).find('.n-active')
            .offset('left', this.$el);

        this.offset = offset < 0 ? 0 : offset;
    },

    renderHeaderIndicator()
    {
        let transform = `scaleX(${this.width / 100}) ` + 
            `translateX(${this.offset / (this.width / 100)}px)`;

        return (
            <div class="n-tabs__indicator" style={{ transform }}>
                { /* Indicator bar */ }
            </div>
        );
    },

    renderHeader()
    {
        if ( this.elements.length <= 1 ) {
            return null;
        }

        // FIXME: As soon vue doesnt bug
        let sorted = Arr.sort(this.elements, 'sort');
        
        let tabs = Arr.each(Arr.make(sorted.length), (tab, index) => {
            return sorted[index].ctor('renderHeader')();
        });

        return (
            <div class="n-tabs__header">
                {[tabs, this.ctor('renderHeaderIndicator')()]}
            </div>
        );
    },

    renderBody()
    {
        return (
            <div class="n-tabs__body">
                { this.$slots.default && this.$slots.default() }
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-tabs', 
            'n-tabs--' + this.size, 
            'n-tabs--' + this.type
        ];

        return (
            <div class={classList}>
                { this.ctor('renderHeader')() }
                { this.ctor('renderBody')() }
            </div>
        );
    }
}
