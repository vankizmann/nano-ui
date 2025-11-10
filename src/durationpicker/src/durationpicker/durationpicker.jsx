import { Any, Obj, Arr, Locale } from "@kizmann/pico-js";

export default {

    name: 'NDurationpicker',

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

        options: {
            default()
            {
                return [
                    60 * 5,
                    60 * 10,
                    60 * 15,
                    60 * 30,
                    60 * 45,
                    60 * 60,
                    60 * 90,
                    60 * 120,
                    60 * 150,
                    60 * 60 * 3,
                    60 * 60 * 4,
                    60 * 60 * 5,
                    60 * 60 * 6,
                    60 * 60 * 12,
                    60 * 60 * 24,
                    60 * 60 * 24 * 2,
                    60 * 60 * 24 * 3,
                    60 * 60 * 24 * 4,
                    60 * 60 * 24 * 5,
                    60 * 60 * 24 * 6,
                    60 * 60 * 24 * 7,
                ];
            },
            type: [Array]
        },

        minDuration: {
            default()
            {
                return null;
            }
        },

        maxDuration: {
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
                return Locale.trans('Select duration');
            },
            type: [String]
        },

        negativeText: {
            default()
            {
                return Locale.trans('Negative duration');
            },
            type: [String]
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

        days: {
            default()
            {
                return Locale.trans(':count Day|:count Days');
            },
            type: [String]
        },

        hours: {
            default()
            {
                return Locale.trans(':count Hour|:count Hours');
            },
            type: [String]
        },

        minutes: {
            default()
            {
                return Locale.trans(':count Minute|:count Minutes');
            },
            type: [String]
        },

        seconds: {
            default()
            {
                return Locale.trans(':count Second|:count Seconds');
            },
            type: [String]
        }

    },


    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        },

    },

    data()
    {
        return {
            focus: false, tempValue: this.modelValue, editValue: null
        };
    },

    methods: {

        findPattern(text, pattern)
        {
            pattern = pattern.replaceAll(':count', '([0-9\.\,]+)')
                .replaceAll(' ', '\\s*');

            return text.match(new RegExp(pattern, 'i'));
        },

        humanizeValue(value)
        {
            if ( Any.isEmpty(value) ) {
                return '';
            }

            if ( value < 0 ) {
                return this.negativeText;
            }

            let seconds = value;

            // Extract minutes
            let minutes = Math.floor(seconds/60);
            seconds -= minutes * 60;

            // Extract hours
            let hours = Math.floor(minutes/60);
            minutes -= hours * 60;


            // Extract days
            let days = Math.floor(hours/24);
            hours -= days * 24;

            let text = [];

            if ( days ) {
                text.push(Locale.choice(this.days, days));
            }

            if ( hours ) {
                text.push(Locale.choice(this.hours, hours));
            }

            if ( minutes ) {
                text.push(Locale.choice(this.minutes, minutes));
            }

            if ( seconds ) {
                text.push(Locale.choice(this.seconds, seconds));
            }

            return text.join(' ');
        },

        digitizeValue(text)
        {
            if ( Any.isEmpty(text) ) {
                return this.clearValue;
            }

            let value = 0;

            let dmatch = this.findPattern(text, this.days);

            if ( dmatch && dmatch.length === 3 ) {
                value += Any.float(dmatch[1].replace(',', '.')) * 24 * 60 * 60;
            }

            let hmatch = this.findPattern(text, this.hours);

            if ( hmatch && hmatch.length === 3 ) {
                value += Any.float(hmatch[1].replace(',', '.')) * 60 * 60;
            }

            let mmatch = this.findPattern(text, this.minutes);

            if ( mmatch && mmatch.length === 3 ) {
                value += Any.float(mmatch[1].replace(',', '.')) * 60;
            }

            let smatch = this.findPattern(text, this.seconds);

            if ( smatch && smatch.length === 3 ) {
                value += Any.float(smatch[1].replace(',', '.'));
            }

            return value;
        },

        clearDurationpicker()
        {
            this.$emit('update:modelValue', this.tempValue = this.clearValue);
        },

        onPopoverInput(value)
        {
            this.focus = value;
        },

        onValueInput(e)
        {
            let value = this.digitizeValue(e.target.value);

            if ( value === this.tempValue ) {
                return;
            }

            this.editValue = value;
        },

        onValueChange(e)
        {
            let value = this.editValue;

            // Clear edit value
            this.editValue = null;

            if ( ! value || value === this.tempValue ) {
                return;
            }

            this.$emit('update:modelValue', this.tempValue = value);
        },

        onDurationpickerInput(value)
        {
            this.focus = false;

            // Clear edit value
            this.editValue = null;

            this.$emit('update:modelValue', this.tempValue = value);
        },

    },

    renderLabelClear()
    {
        if ( ! this.clearable || ! this.tempValue ) {
            return null;
        }

        let props = {};

        if ( ! this.disabled ) {
            props.onMousedown = this.clearDurationpicker;
        }

        return (
            <div class="n-durationpicker__clear n-form-clear" {...props}>
                <i class={ nano.Icons.times }></i>
            </div>
        );
    },

    renderLabelAngle()
    {
        return (
            <div class="n-durationpicker__angle n-form-angle">
                <i class={ nano.Icons.angleDown }></i>
            </div>
        );
    },

    renderInput()
    {
        let props = {
            value: this.humanizeValue(this.tempValue),
            disabled: this.disabled,
            placeholder: this.placeholder,
            onInput: this.onValueInput,
            onBlur: this.onValueChange,
            onChange: this.onValueChange,
        };

        return (
            <div class="n-durationpicker__input">
                <input {...props}/>
            </div>
        );
    },

    renderDisplay()
    {
        let classList = [
            'n-durationpicker__display'
        ];

        return (
            <div class={classList}>
                { this.ctor('renderLabelClear')() }
                { this.ctor('renderInput')() }
                { this.ctor('renderLabelAngle')() }
            </div>
        );
    },

    renderItems()
    {
        return Arr.each(this.options, (value) => {

            let text = this.humanizeValue(value);

            let optionProps = {
                //
            };

            optionProps['onClick'] = () => {
                this.onDurationpickerInput(value);
            }

            return (<NPopoverOption {...optionProps}>{text}</NPopoverOption>)
        });
    },

    renderPopover()
    {
        let props = {
            trigger: 'click',
            width: -1,
            size: this.size,
            position: this.position,
            scrollClose: true,
            disabled: this.disabled
        };

        let slots = {};

        slots.raw = () => {

            let scrollProps = {
                relative: true, size: this.size
            }

            return (
                <NScrollbar ref="scrollbar" class="n-popover-shadow n-durationpicker-panel" {...scrollProps}>
                    {this.ctor('renderItems')()}
                </NScrollbar>
            )
        }

        return (
            <NPopover ref="popover" vModel={this.focus} {...props} v-slots={slots} />
        );
    },

    render()
    {
        let classList = [
            'n-durationpicker',
            'n-durationpicker--' + this.type,
            'n-durationpicker--' + this.size,
        ];

        if ( ! this.tempValue ) {
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