import { Arr, Obj, Str, Now, Any, UUID } from "nano-js";

export default {

    name: 'NDatepicker',

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

        arrive: {
            default()
            {
                return null;
            }
        },

        clearArrive: {
            default()
            {
                return null;
            }
        },

        depart: {
            default()
            {
                return null;
            }
        },

        clearDepart: {
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
                return 'Select date';
            },
            type: [String]
        },

        placeholderArrive: {
            default()
            {
                return 'Start date';
            },
            type: [String]
        },

        placeholderDepart: {
            default()
            {
                return 'End date';
            },
            type: [String]
        },

        range: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        rangeSeparator: {
            default()
            {
                return '-';
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
                return 'YYYY-MM-DD';
            },
            type: [String]
        },

        weekdays: {
            default()
            {
                return [
                    'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su',
                ];
            },
            type: [Array]
        },

        months: {
            default()
            {
                return [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                ];
            },
            type: [Array]
        }

    },


    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue.format(this.format) ) {
                this.tempValue = Now.make(value);
            }
        },

        arrive(value)
        {
            if ( value !== this.tempArrive.format(this.format) ) {
                this.tempArrive = Now.make(value);
            }
        },

        depart(value)
        {
            if ( value !== this.tempDepart.format(this.format) ) {
                this.tempDepart = Now.make(value);
            }
        },

    },

    data()
    {
        return {
            focus: false,
            tempValue: Now.make(this.modelValue, this.format),
            tempArrive: Now.make(this.arrive, this.format),
            tempDepart: Now.make(this.depart, this.format),
        };
    },

    methods: {

        clearDatepicker()
        {
            this.range ? this.clearRangeDatepicker() :
                this.clearSingleDatepicker();
        },

        clearSingleDatepicker()
        {
            this.tempValue = Now.make(this.clearValue, 
                this.format);

            this.$emit('update:modelValue', this.clearValue);
        },


        clearRangeDatepicker()
        {
            this.tempArrive = Now.make(this.clearArrive, 
                this.format);

            this.$emit('update:arrive', this.clearValue);

            this.tempDepart = Now.make(this.clearDepart, 
                this.format);

            this.$emit('update:depart', this.clearDepart);
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

            let moment = this.veValue.moment.set({
                year: value.moment.year(),
                month: value.moment.month(),
                date: value.moment.date(),
            });

            this.tempValue = Now.make(moment);

            this.$emit('update:modelValue', 
                this.tempValue.format(this.format));
        },

        onArriveInput(event)
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

            let moment = this.veValue.moment.set({
                year: value.moment.year(),
                month: value.moment.month(),
                date: value.moment.date(),
            });

            this.tempArrive = Now.make(moment);

            this.$emit('update:arrive', 
                this.tempArrive.format(this.format));
        },

        onDepartInput(event)
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

            let moment = this.veValue.moment.set({
                year: value.moment.year(),
                month: value.moment.month(),
                date: value.moment.date(),
            });

            this.tempDepart = Now.make(moment);

            this.$emit('update:depart', 
                this.tempDepart.format(this.format));
        },

        onDatepickerInput(value)
        {
            this.focus = false;

            this.tempValue = Now.make(value, 
                this.format);

            this.$emit('update:modelValue', value);
        },

        onDatepickerDepart(value)
        {
            this.focus = false;

            this.tempDepart = Now.make(value, 
                this.format);

            this.$emit('update:depart', value);
        },

        onDatepickerArrive(value)
        {
            this.focus = false;

            this.tempArrive = Now.make(value, 
                this.format);

            this.$emit('update:arrive', value);
        },

    },


    renderLabelClear()
    {
        let isEmpty = ! this.tempArrive.initialDate &&
            ! this.tempDepart.initialDate;

        if ( ! this.range ) {
            isEmpty = ! this.tempValue.initialDate;
        }

        if ( ! this.clearable || isEmpty ) {
            return null;
        }

        let props = {};

        if ( ! this.disabled ) {
            props.onMousedown = this.clearDatepicker;
        }

        return (
            <div class="n-datepicker__clear" {...props}>
                <i class={ this.icons.times }></i>
            </div>
        );
    },

    renderLabelAngle()
    {
        return (
            <div class="n-datepicker__angle">
                <i class={ this.icons.angleDown }></i>
            </div>
        );
    },

    renderRange()
    {
        let arriveProps = {
            value: '',
            disabled: this.disabled,
            placeholder: this.trans(this.placeholderArrive),
            onInput: this.onArriveInput,
        };

        if ( this.tempArrive.valid() ) {
            arriveProps.value = this.tempArrive.format(
                this.displayFormat, true);
        }

        let departProps = {
            value: '',
            disabled: this.disabled,
            placeholder: this.trans(this.placeholderDepart),
            onInput: this.onDepartInput,
        };

        if ( this.tempDepart.valid() ) {
            departProps.value = this.tempDepart.format(
                this.displayFormat, true);
        }

        return [
            (
                <div class="n-datepicker__input">
                    <input {...arriveProps}/>
                </div>
            ),
            (
                <div class="n-datepicker__seperator">
                    <span>{ this.rangeSeparator }</span>
                </div>
            ),
            (
                <div class="n-datepicker__input">
                    <input {...departProps}/>
                </div>
            )
        ];
    },

    renderSingle()
    {
        let props = {
            value: '',
            disabled: this.disabled,
            placeholder: this.trans(this.placeholder),
            onInput: this.onValueInput,
        };

        if ( this.tempValue.valid() ) {
            props.value = this.tempValue.format(
                this.displayFormat, true);
        }

        return (
            <div class="n-datepicker__input">
                <input {...props}/>
            </div>
        );
    },

    renderDisplay()
    {
        let classList = [
            'n-datepicker__display'
        ];

        if ( this.range ) {
            classList.push('n-range');
        }

        let displayHtml = this.ctor('renderSingle');

        if ( this.range ) {
            displayHtml = this.ctor('renderRange');
        }

        return (
            <div class={classList}>
                { this.ctor('renderLabelClear')() }
                { displayHtml() }
                { this.ctor('renderLabelAngle')() }
            </div>
        );
    },

    renderItems()
    {
        
        let props = Obj.except(this.$props, ['modelValue'], {
            arrive: this.tempArrive.format(this.format) || null,
            depart: this.tempDepart.format(this.format) || null,
            modelValue: this.tempValue.format(this.format) || null,
        });

        props['onUpdate:arrive'] = this.onDatepickerArrive;
        props['onUpdate:depart'] = this.onDatepickerDepart;
        props['onUpdate:modelValue'] = this.onDatepickerInput;

        return (
            <NDatepickerPanel class="n-datepicker__body" {...props}></NDatepickerPanel>
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
            disabled: this.disabled
        };

        return (
            <NPopover ref="popover" vModel={this.focus} {...props}>
                { { raw: this.ctor('renderItems') } }
            </NPopover>
        );
    },

    render()
    {
        let classList = [
            'n-datepicker',
            'n-datepicker--' + this.type,
            'n-datepicker--' + this.size,
        ];

        let isEmpty = ! this.tempArrive.initialDate &&
            ! this.tempDepart.initialDate;

        if ( ! this.range ) {
            isEmpty = ! this.tempValue.initialDate;
        }

        if ( isEmpty ) {
            classList.push('n-empty');
        }

        if ( this.clearable ) {
            classList.push('n-clearable');
        }

        if ( this.focus ) {
            classList.push('n-focus');
        }

        if ( this.disabled ) {
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