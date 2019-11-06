import CtorMixin from "../../../mixins/src/ctor";
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
                return 'default';
            },
            type: [String]
        },

        position: {
            default()
            {
                return 'bottom-center';
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
                return 'YYYY-MM-DD hh:ii:ss';
            },
            type: [String]
        },

        displayFormat: {
            default()
            {
                return this.trans('hh:ii:ss');
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
                return 10;
            },
            type: [Number]
        },

        secondsInterval: {
            default()
            {
                return 10;
            },
            type: [Number]
        }

    },

    computed: {

        hoursGrid()
        {
            return this.nativeValue.getHours(this.hoursInterval);
        },

        minutesGrid()
        {
            return this.nativeValue.getMinutes(this.minutesInterval);
        },

        secondsGrid()
        {
            return this.nativeValue.getSeconds(this.secondsInterval);
        }

    },

    watch: {

        value()
        {
            if ( this.value !== this.nativeValue.format(this.format) ) {
                this.nativeValue = Now.make(this.value);
            }
        }

    },

    data()
    {
        return {
            visible: false,
            nativeValue: Now.make(this.value),
        }
    },

    methods: {

        ...CtorMixin,

    },

    renderToolbar()
    {
        return (
            <div class="n-timepicker__toolbar">
                <div class="n-timepicker__display">
                    <span class="n-timepicker__time">
                        { this.nativeValue.format(this.displayFormat) || Now.make('now').format(this.displayFormat) }
                    </span>
                </div>
            </div>
        )
    },

    renderHourItem(now)
    {
        let classList = [
            'n-timepicker__item'
        ];

        if ( now.hours() === this.nativeValue.hours() ) {
            classList.push('n-timepicker__item--selected');
        }

        let events = {
            'click': () => this.$emit('input', now.format(this.format))
        };

        return (
            <div on={events} class={classList}>
                <span>{ now.format('hh') }</span>
            </div>
        );
    },

    renderMinuteItem(now)
    {
        let classList = [
            'n-timepicker__item'
        ];

        if ( now.minutes() === this.nativeValue.minutes() ) {
            classList.push('n-timepicker__item--selected');
        }

        let events = {
            'click': () => this.$emit('input', now.format(this.format))
        };

        return (
            <div on={events} class={classList}>
                <span>{ now.format('ii') }</span>
            </div>
        );
    },

    renderSecondItem(now)
    {
        let classList = [
            'n-timepicker__item'
        ];

        if ( now.seconds() === this.nativeValue.seconds() ) {
            classList.push('n-timepicker__item--selected');
        }

        let events = {
            'click': () => this.$emit('input', now.format(this.format))
        };

        return (
            <div on={events} class={classList}>
                <span>{ now.format('ss') }</span>
            </div>
        );
    },

    renderInput()
    {
        let classList = [
            'n-timepicker', 'n-timepicker--' + this.size
        ];

        if ( this.clearable === true ){
            classList.push('n-timepicker--clearable');
        }

        if ( this.disabled === true ){
            classList.push('n-timepicker--disabled');
        }

        let inputEvent = (event) => {

            if ( event.target.value.length !== this.displayFormat.length ) {
                return;
            }

            let value = Now.make(event.target.value);

            if ( value.valid() === false ) {
                return;
            }

            this.$emit('input', value.format(this.format));
        };

        let clearEvent = () => {

            this.$emit('input', this.clearValue);

            this.visible = false;
        };

        return (
            <div class={classList}>
                <div class="n-timepicker__icon">
                    <span class="fa fa-clock"></span>
                </div>
                <div class="n-timepicker__input">
                    <input type="text" disabled={this.disabled} value={this.nativeValue.format(this.displayFormat)} placeholder={this.placeholder} vOn:input={inputEvent} />
                </div>
                { this.clearable &&
                    <NButton type="input" icon="fa fa-times" disabled={this.disabled || Any.isEmpty(this.value)} vOn:mousedown_stop={clearEvent} />
                }
            </div>
        );
    },

    render()
    {
        return (
            <div class="n-timepicker__wrapper">
                { this.ctor('renderInput')() }
                <NPopover ref="modal" vModel={this.visible} trigger="click" type="timepicker" width={200} position={this.position} disabled={this.disabled} closeInside={false}>
                    <div class="n-timepicker__time">
                        <div class="n-timepicker__header">
                            {this.ctor('renderToolbar')()}
                        </div>
                        <div class="n-timepicker__body">
                            { this.displayFormat.match('hh') &&
                                <div class="n-timepicker__panel">
                                    { Arr.each(this.hoursGrid, this.ctor('renderHourItem')) }
                                </div>
                            }
                            { this.displayFormat.match('ii') &&
                                <div class="n-timepicker__panel">
                                    { Arr.each(this.minutesGrid, this.ctor('renderMinuteItem')) }
                                </div>
                            }
                            { this.displayFormat.match('ss') &&
                                <div class="n-timepicker__panel">
                                    { Arr.each(this.secondsGrid, this.ctor('renderSecondItem')) }
                                </div>
                            }
                        </div>
                    </div>
                </NPopover>
            </div>
        );
    }

}