import { Arr, Obj, Now, Any } from "nano-js";

export default {

    name: 'NTimepickerPanel',

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
            }
        },

        type: {
            default()
            {
                return 'primary';
            }
        },

        disabled: {
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
            tempValue: Now.make(this.modelValue),
        }
    },

    methods: {

        eventSelect(now)
        {
            this.$emit('update:modelValue', 
                (this.tempValue = now.clone()).format(this.format));
        },

    },

    renderToolbar()
    {
        return (
            <div class="n-timepicker-panel__toolbar">
                <div class="n-timepicker-panel-display">
                    <span class="n-timepicker-panel__time">
                        { this.tempValue.format(this.displayFormat) || this.placeholder }
                    </span>
                </div>
            </div>
        )
    },

    renderHourItem(now)
    {
        let classList = [
            'n-timepicker-panel__item'
        ];

        if ( this.tempValue.valid() && now.hour() === this.tempValue.hour() ) {
            classList.push('n-selected');
        }

        let props = {
            onMousedown: () => this.eventSelect(now)
        };

        return (
            <div class={classList} {...props}>
                <span>{ now.format('HH') }</span>
            </div>
        );
    },

    renderHourPanel()
    {
        if ( ! this.displayFormat.match('HH') ) {
            return null;
        }

        return (
            <NScrollbar class="n-timepicker-panel__panel" wrapClass="n-timepicker-panel__wrap">
                { Arr.each(this.hoursGrid, this.ctor('renderHourItem')) }
            </NScrollbar>
        );
    },

    renderMinuteItem(now)
    {
        let classList = [
            'n-timepicker-panel__item'
        ];

        if ( this.tempValue.valid() && now.minute() === this.tempValue.minute() ) {
            classList.push('n-selected');
        }

        let props = {
            onMousedown: () => this.eventSelect(now)
        };

        return (
            <div class={classList} {...props}>
                <span>{ now.format('mm') }</span>
            </div>
        );
    },

    renderMinutePanel()
    {
        if ( ! this.displayFormat.match('mm') ) {
            return null;
        }

        return (
            <NScrollbar class="n-timepicker-panel__panel" wrapClass="n-timepicker-panel__wrap">
                { Arr.each(this.minutesGrid, this.ctor('renderMinuteItem')) }
            </NScrollbar>
        );
    },

    renderSecondItem(now)
    {
        let classList = [
            'n-timepicker-panel__item'
        ];

        if ( this.tempValue.valid() && now.second() === this.tempValue.second() ) {
            classList.push('n-selected');
        }

        let props = {
            onMousedown: () => this.eventSelect(now)
        };

        return (
            <div class={classList} {...props}>
                <span>{ now.format('ss') }</span>
            </div>
        );
    },

    renderSecondPanel()
    {
        if ( ! this.displayFormat.match('ss') ) {
            return null;
        }

        return (
            <NScrollbar class="n-timepicker-panel__panel">
                <div class="n-timepicker-panel__wrap">
                    { Arr.each(this.secondsGrid, this.ctor('renderSecondItem')) }
                </div>
            </NScrollbar>
        );
    },

    render()
    {
        let classList = [
            'n-timepicker-panel',
            'n-timepicker-panel--' + this.size,
            'n-timepicker-panel--' + this.type,
        ];

        if ( this.disabled ){
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                <div class="n-timepicker-panel__header">
                    {this.ctor('renderToolbar')()}
                </div>
                <div class="n-timepicker-panel__body">
                    { this.ctor('renderHourPanel')() }
                    { this.ctor('renderMinutePanel')() }
                    { this.ctor('renderSecondPanel')() }
                </div>
            </div>
        );
    }

}