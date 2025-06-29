import { UUID } from "@kizmann/pico-js";

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
                return 'classic';
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

    mounted()
    {
        if ( this.NForm ) {
            this.NForm.registerGroup(this);
        }
    },

    unmounted()
    {
        if ( this.NForm ) {
            this.NForm.unregisterGroup(this);
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
            <div class="n-form-group__legend" onClick={this.collapseGroup}>
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
        let size = this.size ;

        if ( this.NForm ) {
            size = size || this.NForm.size;
        }

        let classList = [
            'n-form-group', 
            'n-form-group--' + size,
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
