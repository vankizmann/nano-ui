import { Arr, UUID } from "@kizmann/pico-js";

export default {

    name: 'NFormGroup',

    inject: {

        NForm: {
            default: undefined
        },

        NFormFrame: {
            default: undefined
        }

    },

    props: {

        modelValue: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        key: {
            default()
            {
                return UUID();
            },
            type: [String]
        },

        label: {
            default()
            {
                return '';
            },
            type: [String]
        },

        icon: {
            default()
            {
                return '';
            }
        },

        size: {
            default()
            {
                return '';
            },
            type: [String]
        },

        kind: {
            default()
            {
                return '';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        align: {
            default()
            {
                return 'vertical';
            },
            type: [String]
        },

        collapse: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        tooltip: {
            default()
            {
                return '';
            },
            type: [String]
        },

        tooltipPosition: {
            default()
            {
                return 'bottom-start';
            },
            type: [String]
        }

    },

    data()
    {
        return {
            uid: UUID(), tempValue: this.modelValue, items: []
        };
    },

    provide()
    {
        return { NFormGroup: this };
    },

    mounted()
    {
        if ( this.NForm ) {
            this.NForm.appendGroup(this);
        }
    },

    unmounted()
    {
        if ( this.NForm ) {
            this.NForm.removeGroup(this);
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

    methods: {

        getItems()
        {
            return this.items;
        },

        appendItem(item)
        {
            this.items[item.uid] = item;
        },

        removeItem(item)
        {
            delete this.items[item.uid];
        },

        toggleGroup()
        {
            this.$emit('update:modelValue', this.tempValue = ! this.tempValue);
        },

        openGroup()
        {
            this.$emit('update:modelValue', this.tempValue = true);
        },

        closeGroup()
        {
            this.$emit('update:modelValue', this.tempValue = true);
        },

    },

    renderCollapse()
    {
        if ( ! this.collapse ) {
            return null;
        }

        return (
            <div class="n-form-group__collapse">
                <i class={nano.Icons.angleDown}></i>
            </div>
        );
    },

    renderIcon()
    {
        if ( ! this.icon ) {
            return null;
        }

        return (
            <div class="n-form-group__icon">
                <i class={['n-icon', this.icon]}></i>
            </div>
        );
    },

    renderText()
    {
        let textHtml = (
            <div class="n-form-group__text">
                <span>{ this.label }</span>
            </div>
        );

        return (
            <div class="n-form-group__label">
                { [this.ctor('renderIcon')(), textHtml] } 
            </div>
        );
    },

    renderAction()
    {
        if ( ! this.$slots.action ) {
            return null;
        }

        return (
            <div class="n-form-group__action">
                { this.$slots.action() }
            </div>
        );
    },

    renderLabel()
    {
        return (
            <div class="n-form-group__legend" onClick={this.toggleGroup}>
                { this.ctor('renderCollapse')() }
                { this.ctor('renderText')() }
                { this.ctor('renderAction')() }
            </div>
        );
    },

    renderTooltip()
    {
        if ( ! this.tooltip ) {
            return null;
        }

        return (
            <NPopover type="tooltip" size="sm" position={this.tooltipPosition}>
                {this.tooltip}
            </NPopover>
        );
    },

    renderBody()
    {
        return (
            <div class="n-form-group__body">
                { this.$slots.default && this.$slots.default() }
            </div>
        );
    },

    render()
    {
        let size = this.size;

        if ( this.NForm ) {
            size = size || this.NForm.size;
        }

        let kind = this.kind;

        if ( this.NFormFrame ) {
            kind = kind || this.NFormFrame.kind;
        }

        if ( this.NForm ) {
            kind = kind || this.NForm.kind;
        }

        let classList = [
            'n-form-group', 
            'n-form-group--' + size,
            'n-form-group--' + kind,
            'n-form-group--' + this.type,
            'n-form-group--' + this.align,
        ];

        if ( this.collapse ) {
            classList.push('n-form-group--collapse');
        }

        if ( ! this.tempValue ) {
            classList.push('n-hidden');
        }

        if ( this.$slots.action ) {
            classList.push('n-action');
        }

        return (
            <fieldset id={this.key} class={classList} data-group-key={this.key}>
                { this.ctor('renderLabel')() }
                { this.ctor('renderTooltip')() }
                { this.ctor('renderBody')() }
            </fieldset>
        );
    }
}
