import { Arr, Obj, Now, Mix } from "@kizmann/pico-js";

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
            return this.tempValue.getHoursGrid(this.hoursInterval);
        },

        minutesGrid()
        {
            return this.tempValue.getMinutesGrid(this.minutesInterval);
        },

        secondsGrid()
        {
            return this.tempValue.getSecondsGrid(this.secondsInterval);
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
        let modelValue = Now.make(this.modelValue);

        if ( Mix.isEmpty(this.modelValue) ) {
            modelValue = modelValue.reset({ time: true });
        }

        return {
            tempValue: modelValue,
        }
    },

    mounted()
    {
        this.scrollTo();
    },

    methods: {

        eventSelect(now)
        {
            this.$emit('update:modelValue',
                (this.tempValue = now.clone()).format(this.format));
        },

        scrollTo()
        {
            let scrollbars = Obj.only(this.$refs, [
                'hour', 'minute', 'second'
            ]);

            Arr.each(scrollbars, (ref, key) => {
                ref.scrollIntoView(`[data-index="${this.tempValue[key]()}"]`);
            });
        }

    },

    renderToolbar()
    {
        return (
            <div class="n-timepicker-panel__toolbar">
                <div class="n-timepicker-panel__display">
                    <span class="n-timepicker-panel__time">
                        {this.tempValue.format(this.displayFormat) || this.placeholder}
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
            <div class={classList} {...props} data-index={now.hour()}>
                <span>{now.format('HH')}</span>
            </div>
        );
    },

    renderHourPanel()
    {
        if ( !this.displayFormat.match('HH') ) {
            return null;
        }

        let scrollbarProps = {
            offsetY: 0, wrapClass: 'n-timepicker-panel__wrap'
        };

        return (
            <NScrollbar ref="hour" class="n-timepicker-panel__panel" {...scrollbarProps}>
                {Arr.each(this.hoursGrid, this.ctor('renderHourItem'))}
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
            <div class={classList} {...props} data-index={now.minute()}>
                <span>{now.format('mm')}</span>
            </div>
        );
    },

    renderMinutePanel()
    {
        if ( !this.displayFormat.match('mm') ) {
            return null;
        }

        let scrollbarProps = {
            offsetY: 0, wrapClass: 'n-timepicker-panel__wrap'
        };

        return (
            <NScrollbar ref="minute" class="n-timepicker-panel__panel" {...scrollbarProps}>
                {Arr.each(this.minutesGrid, this.ctor('renderMinuteItem'))}
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
            <div class={classList} {...props} data-index={now.second()}>
                <span>{now.format('ss')}</span>
            </div>
        );
    },

    renderSecondPanel()
    {
        if ( !this.displayFormat.match('ss') ) {
            return null;
        }

        let scrollbarProps = {
            offsetY: 0, wrapClass: 'n-timepicker-panel__wrap'
        };

        return (
            <NScrollbar ref="second" class="n-timepicker-panel__panel" {...scrollbarProps}>
                {Arr.each(this.secondsGrid, this.ctor('renderSecondItem'))}
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

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                <div class="n-timepicker-panel__header">
                    {this.ctor('renderToolbar')()}
                </div>
                <div class="n-timepicker-panel__body">
                    {this.ctor('renderHourPanel')()}
                    {this.ctor('renderMinutePanel')()}
                    {this.ctor('renderSecondPanel')()}
                </div>
            </div>
        );
    }

}