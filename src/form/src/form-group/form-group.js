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
                return this.$slots.legend;
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
                return this.$slots.tooltip;
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

    render(h)
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
                    <legend class="n-form-group__label" vOn:click={this.toggleValue}>
                        { this.checkable &&
                            <NCheckbox checked={this.nativeValue} />
                        }
                        <div class="n-form-group__label-text">
                            <span>{this.legend}</span>
                            { this.tooltip && <NPopover type="tooltip" position={this.tooltipPosition}>{this.tooltip}</NPopover> }
                        </div>
                        { this.$slots.actions &&
                            <div class="n-form-group__actions">
                                { this.$slots.actions }
                            </div>
                        }
                    </legend>
                </div>
            }
            { this.nativeValue &&
                <div class="n-form-group__body">
                    {this.$slots.default}
                </div>
            }
        </fieldset>;
    }
}
