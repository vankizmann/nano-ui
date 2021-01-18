export default {

    name: 'NFormGroup',

    inject: {

        NForm: {
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
            tempValue: this.modelValue
        };
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

        collapseGroup()
        {
            this.$emit('update:modelValue', this.tempValue = ! this.tempValue);
        }

    },

    renderCollapse()
    {
        if ( ! this.collapse ) {
            return null;
        }

        return (
            <NSwitch size="sm" modelValue={this.tempValue} />
        );
    },

    renderIcon()
    {
        if ( ! this.icon ) {
            return null;
        }

        return (
            <i class={['n-icon', this.icon]}></i>
        );
    },

    renderText()
    {
        return (
            <div class="n-form-group__label">
                { this.ctor('renderIcon')() } <span>{ this.label }</span>
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
            <legend class="n-form-group__legend" onClick={this.collapseGroup}>
                { this.ctor('renderCollapse')() }
                { this.ctor('renderText')() }
                { this.ctor('renderAction')() }
            </legend>
        );
    },

    renderTooltip()
    {
        if ( ! this.tooltip ) {
            return null;
        }

        return (
            <NPopover type="tooltip" position={this.tooltipPosition}>
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
        let classList = [
            'n-form-group', 
            'n-form-group--' + this.align
        ];

        if ( this.collapse ) {
            classList.push('n-collapse');
        }

        if ( ! this.tempValue ) {
            classList.push('n-hidden');
        }

        return (
            <fieldset class={classList}>
                { this.ctor('renderLabel')() }
                { this.ctor('renderTooltip')() }
                { this.ctor('renderBody')() }
            </fieldset>
        );
    }
}
