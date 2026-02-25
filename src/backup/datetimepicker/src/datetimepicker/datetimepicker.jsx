import { Obj, Now, Mix, Locale } from "@kizmann/pico-js";

export default {

    name: 'NDatetimepicker',

    inject: {

        NFormItem: {
            default: undefined
        }

    },

    props: {

        modelValue: {
            default()
            {
                return null;
            }
        },

        clearValue: {
            default()
            {
                return null;
            }
        },

        minDate: {
            default()
            {
                return null;
            }
        },

        maxDate: {
            default()
            {
                return null;
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

        placeholder: {
            default()
            {
                return Locale.trans('Select datetime');
            },
            type: [String]
        },

        monthPanels: {
            default()
            {
                return 1;
            },
            type: [Number]
        },

        boundary: {
            default()
            {
                return null;
            }
        },

        position: {
            default()
            {
                return 'bottom-start';
            },
            type: [String]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        clearable: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        format: {
            default()
            {
                return 'YYYY-MM-DD HH:mm:ss';
            },
            type: [String]
        },

        displayFormat: {
            default()
            {
                return Locale.trans('YYYY-MM-DD HH:mm:ss');
            },
            type: [String]
        },

        weekdays: {
            default()
            {
                return [
                    Locale.trans('Mo'),
                    Locale.trans('Tu'),
                    Locale.trans('We'),
                    Locale.trans('Th'),
                    Locale.trans('Fr'),
                    Locale.trans('Sa'),
                    Locale.trans('Su'),
                ];
            },
            type: [Array]
        },

        months: {
            default()
            {
                return [
                    Locale.trans('Jan'),
                    Locale.trans('Feb'),
                    Locale.trans('Mar'),
                    Locale.trans('Apr'),
                    Locale.trans('May'),
                    Locale.trans('Jun'),
                    Locale.trans('Jul'),
                    Locale.trans('Aug'),
                    Locale.trans('Sep'),
                    Locale.trans('Oct'),
                    Locale.trans('Nov'),
                    Locale.trans('Dec'),
                ];
            },
            type: [Array]
        }

    },

    computed: {

        deepDisabled() {
            return this.NFormItem ? this.NFormItem.disabled(this.disabled) :
                this.disabled;
        }

    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue.format(this.format) ) {
                this.tempValue = Now.make(value);
            }
        },

    },

    data()
    {
        return {
            focus: false, tempValue: Now.make(this.modelValue, this.format),
        };
    },

    methods: {

        clearDatetimepicker()
        {
            this.tempValue = Now.make(this.clearValue, 
                this.format);

            this.$emit('update:modelValue', this.clearValue);
        },

        onPopoverInput(value)
        {
            this.focus = value;
        },

        onValueInput(event)
        {
            let isNotSameLength = this.displayFormat.length !==
                event.target.value.length;

            if ( isNotSameLength ) {
                return;
            }

            let value = Now.make(event.target.value, 
                this.displayFormat);

            if ( ! value.moment.isValid() ) {
                return;
            }

            let moment = this.tempValue.moment.set({
                year: value.moment.year(),
                month: value.moment.month(),
                date: value.moment.date(),
                hour: value.moment.hour(),
                minute: value.moment.minute(),
                second: value.moment.second(),
            });

            this.tempValue = Now.make(moment);

            this.$emit('update:modelValue', 
                this.tempValue.format(this.format));
        },

        onDatepickerInput(value)
        {
            this.tempValue = Now.make(value, 
                this.format);

            this.$emit('update:modelValue', value);
        },

        onTimepickerInput(value)
        {
            this.tempValue = Now.make(value,
                this.format);

            this.$emit('update:modelValue', value);
        },

    },


    renderLabelClear()
    {
        let isEmpty = ! this.tempValue.initialDate;

        if ( ! this.clearable || isEmpty ) {
            return null;
        }

        let props = {};

        if ( ! this.deepDisabled ) {
            props.onMousedown = this.clearDatetimepicker;
        }

        return (
            <div class="n-datetimepicker__clear n-form-clear" {...props}>
                <i class={ nano.Icons.times }></i>
            </div>
        );
    },

    renderLabelAngle()
    {
        return (
            <div class="n-datetimepicker__angle n-form-angle">
                <i class={ nano.Icons.angleDown }></i>
            </div>
        );
    },

    renderSingle()
    {
        let props = {
            value: '',
            disabled: this.deepDisabled,
            placeholder: this.placeholder,
            onInput: this.onValueInput,
        };

        if ( this.tempValue.valid() ) {
            props.value = this.tempValue.format(
                this.displayFormat, true);
        }

        return (
            <div class="n-datetimepicker__input">
                <input {...props}/>
            </div>
        );
    },

    renderDisplay()
    {
        let classList = [
            'n-datetimepicker__display'
        ];

        return (
            <div class={classList}>
                { this.ctor('renderLabelClear')() }
                { this.ctor('renderSingle')() }
                { this.ctor('renderLabelAngle')() }
            </div>
        );
    },

    renderPanels()
    {
        return (
            <div class="n-popover-shadow n-datetimepicker-panel">
                {[this.ctor('renderDatePanel')(), this.ctor('renderTimePanel')()]}
            </div>
        );
    },

    renderDatePanel()
    {
        let props = Obj.only(this.$props, [
            'minDate', 'maxDate', 'size', 'type', 'format', 'monthPanels', 'disabled', 'weekdays', 'months'
        ]);

        props = Obj.assign(props, {
            modelValue: this.tempValue.format(this.format) || null,
        });

        props['onUpdate:modelValue'] = this.onDatepickerInput;

        return (
            <NDatepickerPanel class="n-datetimepicker__date-panel" {...props}></NDatepickerPanel>
        );
    },

    renderTimePanel()
    {
        let props = Obj.only(this.$props, [
            'size', 'type', 'format', 'disabled', 'hoursInterval', 'minutesInterval', 'secondsInterval'
        ]);

        props = Obj.assign(props, {
            modelValue: this.tempValue.format(this.format) || null,
        });

        props['onUpdate:modelValue'] = this.onTimepickerInput;

        return (
            <NTimepickerPanel class="n-datetimepicker__time-panel" {...props}></NTimepickerPanel>
        );
    },

    renderPopover()
    {
        let props = {
            trigger: 'click',
            width: 0,
            size: this.size,
            position: this.position,
            scrollClose: true,
            disabled: this.deepDisabled
        };

        let slots = {
            raw: this.ctor('renderPanels')
        };

        return (
            <NPopover ref="popover" vModel={this.focus} {...props} v-slots={slots} />
        );
    },

    render()
    {
        let classList = [
            'n-datetimepicker',
            'n-datetimepicker--' + this.type,
            'n-datetimepicker--' + this.size,
        ];

        let isEmpty = ! this.tempValue.initialDate;

        if ( isEmpty ) {
            classList.push('n-empty');
        }

        if ( this.clearable ) {
            classList.push('n-clearable');
        }

        if ( this.focus ) {
            classList.push('n-focus');
        }

        if ( this.deepDisabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderDisplay')() }
                { this.ctor('renderPopover')() }
            </div>
        );
    }

}