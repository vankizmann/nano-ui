import { Arr, Obj, Now, Any } from "nano-js";

export default {

    name: 'NTimepicker',

    props: {

        value: {
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

        placeholder: {
            default()
            {
                return 'Select time';
            },
            type: [String]
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
                return 'HH:mm:ss';
            },
            type: [String]
        },

        hoursInterval: {
            default()
            {
                return 1;
            },
            type: [Number]
        },

        minutesInterval: {
            default()
            {
                return 1;
            },
            type: [Number]
        },

        secondsInterval: {
            default()
            {
                return 1;
            },
            type: [Number]
        }

    },

    computed: {

        hoursGrid()
        {
            return this.tempValue.getHours(this.hoursInterval);
        },

        minutesGrid()
        {
            return this.tempValue.getMinutes(this.minutesInterval);
        },

        secondsGrid()
        {
            return this.tempValue.getSeconds(this.secondsInterval);
        }

    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue.format(this.format) ) {
                this.tempValue = Now.make(value);
            }
        }

    },

    data()
    {
        return {
            focus: false,
            tempValue: Now.make(this.value),
        }
    },

    methods: {

        clearTimepicker()
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
                hour: value.moment.hour(), 
                minute: value.moment.minute(), 
                second: value.moment.second(),
            });

            this.tempValue = Now.make(moment);

            this.$emit('update:modelValue', 
                this.tempValue.format(this.format));
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
        if ( ! this.clearable || ! this.tempValue.valid() ) {
            return null;
        }

        let props = {};

        if ( ! this.disabled ) {
            props.onMousedown = this.clearTimepicker;
        }

        return (
            <div class="n-timepicker__clear" {...props}>
                <i class={ this.icons.times }></i>
            </div>
        );
    },

    renderLabelAngle()
    {
        return (
            <div class="n-timepicker__angle">
                <i class={ this.icons.angleDown }></i>
            </div>
        );
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
            <div class="n-timepicker__input">
                <input {...props}/>
            </div>
        );
    },

    renderDisplay()
    {
        let classList = [
            'n-timepicker__display'
        ];

        return (
            <div class={classList}>
                { this.ctor('renderLabelClear')() }
                { this.ctor('renderSingle')() }
                { this.ctor('renderLabelAngle')() }
            </div>
        );
    },

    renderPanel()
    {
        
        let props = Obj.except(this.$props, ['modelValue'], {
            modelValue: this.tempValue.format(this.format) || null,
        });

        props['onUpdate:modelValue'] = this.onTimepickerInput;

        return (
            <NTimepickerPanel class="n-timepicker__body" {...props}></NTimepickerPanel>
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
                { { raw: this.ctor('renderPanel') } }
            </NPopover>
        );
    },

    render()
    {
        let classList = [
            'n-timepicker',
            'n-timepicker--' + this.type,
            'n-timepicker--' + this.size,
        ];

        if ( ! this.tempValue.valid() ) {
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