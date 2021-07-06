import { Arr, Obj, Num, Now, Any, Dom, Locale } from "@kizmann/pico-js";
import { h } from "vue";

export default {

    name: 'NInputNumber',

    inheritAttrs: false,

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

        min: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        max: {
            default()
            {
                return Number.MAX_VALUE;
            },
            type: [Number]
        },

        placeholder: {
            default()
            {
                return '';
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

        stepSize: {
            default()
            {
                return 1;
            },
            type: [Number]
        },

        precision: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        format: {
            default()
            {
                return ':count';
            },
            type: [String]
        },

        decimals: {
            default()
            {
                return Locale.trans('.');
            },
            type: [String]
        },

    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = Num.float(value);
            }
        }

    },

    data()
    {
        return {
            focus: false, tempValue: Num.float(this.modelValue),
        }
    },

    methods: {

        clear()
        {
            this.$emit('update:modelValue', this.clearValue);
        },

        getDisplayValue()
        {
            if ( Any.isNull(this.modelValue) ) {
                return null;
            }

            let value = Num.format(this.tempValue,
                this.decimals, ' ', this.precision);

            return Locale.trans(this.format, { count: value });
        },

        nextStep()
        {
            if ( isNaN(this.tempValue) ) {
                this.tempValue = 0;
            }

            let value = this.tempValue + this.stepSize;

            if ( this.max < value ) {
                return;
            }

            value = Num.float(value).toFixed(this.precision);

            this.$emit('update:modelValue',
                this.tempValue = Num.float(value));
        },

        onNextDown()
        {
            this.nextStep();

            this.nextTimeout = setTimeout(() => {
                this.nextInterval = setInterval(this.nextStep, 100);
            }, 400);

            Dom.find(document).on('mouseup', this.onNextUp,
                this._.uid);
        },

        onNextUp()
        {
            clearTimeout(this.nextTimeout);
            clearInterval(this.nextInterval);

            Dom.find(document).off('mouseup', null,
                this._.uid);
        },

        prevStep()
        {
            if ( isNaN(this.tempValue) ) {
                this.tempValue = 0;
            }

            let value = this.tempValue - this.stepSize;

            if ( this.min > value ) {
                return;
            }

            value = Num.float(value).toFixed(this.precision);

            this.$emit('update:modelValue',
                this.tempValue = Num.float(value));
        },

        onPrevDown()
        {
            this.prevStep();

            this.prevTimeout = setTimeout(() => {
                this.prevInterval = setInterval(this.prevStep, 100);
            }, 400);

            Dom.find(document).on('mouseup', this.onPrevUp,
                this._.uid);
        },

        onPrevUp()
        {
            clearTimeout(this.prevTimeout);
            clearInterval(this.prevInterval);

            Dom.find(document).off('mouseup', null,
                this._.uid);
        },

        onKeydown(event)
        {
            if ( event.which === 13 ) {
                this.onInput(event);
            }
        },

        onFocus(event)
        {
            this.focus = true;
        },

        onBlur(event)
        {
            this.onInput(event);

            this.focus = false;
        },

        onInput(event)
        {
            let value = event.target.value;

            let format = this.format.replace(':count',
                `([0-9\,\.\\s]+)`);

            let regex = new RegExp(`^${format}$`);

            let match = value.match(regex);

            if ( ! match ) {
                return event.target.value = this.getDisplayValue();
            }

            value = match[1].replace(',', '.')
                .replace(/\s/, '');

            value = Num.float(value).toFixed(this.precision);

            this.$emit('update:modelValue',
                this.tempValue = Num.float(value));

            event.target.value = this.getDisplayValue();
        }

    },

    renderPrev()
    {
        let disabled = this.disabled ||
            this.tempValue <= this.min;

        let props = {
            type:       'input-number',
            size:       this.size,
            icon:       'fa fa-minus',
            square:     true,
            disabled:   disabled,
            onMousedown:    this.onPrevDown,
        };

        return (<NButton {...props} />);
    },

    renderNext()
    {
        let disabled = this.disabled ||
            this.tempValue >= this.max;

        let props = {
            type:       'input-number',
            size:       this.size,
            icon:       'fa fa-plus',
            square:     true,
            disabled:   disabled,
            onMousedown:    this.onNextDown,
        };

        return (<NButton {...props} />);
    },

    renderInput()
    {
        let props = Obj.except(this.$attrs,
            ['class', 'style']);

        Obj.assign(props, {
            disabled:       this.disabled,
            placeholder:    this.placeholder,
            onKeydown:      this.onKeydown,
            onFocus:         this.onFocus,
            onBlur:         this.onBlur,
        });

        if ( this.modelValue !== null ) {
            props.value = this.getDisplayValue();
        }

        return h('input', props);
    },

    renderClear()
    {
        if ( ! this.clearable || Any.isEmpty(this.tempValue) ) {
            return null;
        }

        let props = {};

        if ( ! this.disabled ) {
            props.onMousedown = this.clear;
        }

        return (
            <div class="n-input-number__clear" {...props}>
                <i class={nano.Icons.times}></i>
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-input-number',
            'n-input-number--' + this.type,
            'n-input-number--' + this.size,
        ];

        if ( Any.isEmpty(this.modelValue) ) {
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
                { this.ctor('renderPrev')() }
                { this.ctor('renderInput')() }
                { this.ctor('renderClear')() }
                { this.ctor('renderNext')() }
            </div>
        );
    }

}