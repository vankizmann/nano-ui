import { Arr, Obj, Now, Any } from "nano-js";

export default {

    name: 'NTimepicker',

    props: {

        value: {
            default()
            {
                return 'now';
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
                return this.trans('Select time');
            },
            type: [String]
        },

        size: {
            default()
            {
                return null;
            }
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
                return this.trans('HH:mm:ss');
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
            return this.veValue.getHours(this.hoursInterval);
        },

        minutesGrid()
        {
            return this.veValue.getMinutes(this.minutesInterval);
        },

        secondsGrid()
        {
            return this.veValue.getSeconds(this.secondsInterval);
        }

    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue.format(this.format) ) {
                this.veValue = Now.make(this.value);
            }
        }

    },

    data()
    {
        return {
            veOpen: false,
            veValue: Now.make(this.value),
        }
    },

    methods: {

        eventInput(event)
        {
            if ( event.target.value.length !== this.displayFormat.length ) {
                return;
            }

            let value = Now.make(event.target.value, this.displayFormat);

            if ( ! value.moment.isValid() ) {
                return;
            }

            let moment = this.veValue.moment.set({
                hour: value.moment.hour(),
                minute: value.moment.minute(),
                second: value.moment.second(),
            });

            this.veValue = Now.make(moment);

            this.$emit('input', this.veValue.format(this.format));
        },

        eventClear()
        {
            this.veValue = Now.make('now');

            this.$emit('input', this.clearValue);
        },

        eventSelect(now)
        {
            this.veValue = now.clone();

            this.$emit('input', this.veValue.format(this.format));
        },

        eventPopoverInput(value)
        {
            this.veOpen = value;
        },

        eventStop(event)
        {
            event.stopPropagation();
        }

    },

    renderToolbar()
    {
        return (
            <div class="n-timepicker__toolbar">
                <div class="n-timepicker-display">
                    <span class="n-timepicker__time">
                        { this.veValue.format(this.displayFormat) || this.placeholder }
                    </span>
                </div>
            </div>
        )
    },

    renderIcon()
    {
        return (
            <div class="n-timepicker__icon">
                <span class={this.icons.clock}></span>
            </div>
        );
    },

    renderClear()
    {
        if ( ! this.clearable ) {
            return null;
        }

        let props = {
            type: 'input',
            icon: this.icons.times
        };

        if ( this.disabled || ! this.value ) {
            props.disabled = true;
        }

        let events = {
            click: this.eventClear
        };

        return (
            <NButton props={props} on={events} />
        );
    },

    renderInput()
    {
        let attrs = {
            type: 'text',
            placeholder: this.placeholder,
            disabled: this.disabled
        };

        let events = {
            input: this.eventInput
        };

        let value = '';

        if ( ! Any.isEmpty(this.value) ) {
            value = this.veValue.format(this.displayFormat, true);
        }

        return (
            <div class="n-timepicker__input">
                <input value={value} attrs={attrs} on={events} />
            </div>
        );
    },


    renderTimepicker()
    {
        let classList = [
            'n-timepicker'
        ];

        if ( this.size ) {
            classList.push('n-timepicker--' + this.size);
        }

        return (
            <div class={classList}>
                { this.ctor('renderIcon')() }
                { this.ctor('renderInput')() }
                { this.ctor('renderClear')() }
            </div>
        );
    },

    renderHourItem(now)
    {
        let classList = [
            'n-timepicker__item'
        ];

        if ( now.hour() === this.veValue.hour() ) {
            classList.push('n-active');
        }

        let events = {
            click: () => this.eventSelect(now)
        };

        return (
            <div on={events} class={classList}>
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
            <div class="n-timepicker__panel">
                <NScrollbar>
                    { Arr.each(this.hoursGrid, this.ctor('renderHourItem')) }
                </NScrollbar>
            </div>
        );
    },

    renderMinuteItem(now)
    {
        let classList = [
            'n-timepicker__item'
        ];

        if ( now.minute() === this.veValue.minute() ) {
            classList.push('n-active');
        }

        let events = {
            click: () => this.eventSelect(now)
        };

        return (
            <div on={events} class={classList}>
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
            <div class="n-timepicker__panel">
                <NScrollbar>
                    { Arr.each(this.minutesGrid, this.ctor('renderMinuteItem')) }
                </NScrollbar>
            </div>
        );
    },

    renderSecondItem(now)
    {
        let classList = [
            'n-timepicker__item'
        ];

        if ( now.second() === this.veValue.second() ) {
            classList.push('n-active');
        }

        let events = {
            click: () => this.eventSelect(now)
        };

        return (
            <div on={events} class={classList}>
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
            <div class="n-timepicker__panel">
                <NScrollbar>
                    { Arr.each(this.secondsGrid, this.ctor('renderSecondItem')) }
                </NScrollbar>
            </div>
        );
    },

    renderPopover()
    {
        let props = {
            visible: this.veOpen,
            type: 'timepicker',
            trigger: 'click',
            width: '100%',
            size: this.size,
            disabled: this.disabled,
            position: this.position,
            boundary: this.boundary,
            window: ! this.boundary,
        };

        let events = {
            input: this.eventPopoverInput
        };

        return (
            <NPopover ref="popover" props={props} on={events}>
                <div class="n-timepicker__time" vOn:click={this.eventStop}>
                    <div class="n-timepicker__header">
                        {this.ctor('renderToolbar')()}
                    </div>
                    <div class="n-timepicker__body">
                        { this.ctor('renderHourPanel')() }
                        { this.ctor('renderMinutePanel')() }
                        { this.ctor('renderSecondPanel')() }
                    </div>
                </div>
            </NPopover>
        );
    },

    render()
    {
        let classList = [
            'n-timepicker__wrapper'
        ];

        if ( this.disabled ){
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderTimepicker')() }
                { this.ctor('renderPopover')() }
            </div>
        );
    }

}