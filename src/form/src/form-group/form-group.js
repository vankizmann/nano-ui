export default {

    name: 'NFormGroup',

    inject: {

        NForm: {
            default: undefined
        }

    },

    props: {

        value: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        legend: {
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

        align: {
            default()
            {
                return 'vertical';
            },
            type: [String]
        },

        checkable: {
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
                return 'right-center';
            },
            type: [String]
        }

    },

    data()
    {
        return {
            nativeValue: this.value
        };
    },

    watch: {

        value()
        {
            if ( this.value !== this.nativeValue ) {
                this.nativeValue = this.value;
            }
        }

    },

    methods: {

        toggleValue()
        {
            if ( this.checkable === false ) {
                return;
            }

            this.$emit('input', this.nativeValue = ! this.nativeValue);
        }

    },

    render()
    {
        let classList = [
            'n-form-group', 'n-form--' + this.align
        ];

        if ( this.checkable === true ) {
            classList.push('n-form-group--checkable');
        }

        return <fieldset class={classList}>
            { this.legend &&
                <div class="n-form-group__legend">
                    <legend class="n-form-group__label">
                        { this.checkable &&
                            <NSwitch size="small" value={this.nativeValue} vOn:input={this.toggleValue} />
                        }
                        <div class="n-form-group__label-text" vOn:click={this.toggleValue}>
                            { this.icon && <i class={['n-icon', this.icon]}></i>} <span>{this.legend}</span>
                        </div>
                        { this.tooltip &&
                            <NPopover type="tooltip" position={this.tooltipPosition}>{this.tooltip}</NPopover>
                        }
                        { this.$slots.actions &&
                            <div class="n-form-group__actions">
                                { this.$slots.actions() }
                            </div>
                        }
                    </legend>
                </div>
            }
            { this.nativeValue &&
                <div class="n-form-group__body">
                    {this.$slots.default && this.$slots.default()}
                </div>
            }
        </fieldset>;
    }
}
