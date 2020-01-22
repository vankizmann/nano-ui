import { Arr, Obj, Str, Now, Any } from "nano-js";
import CtorMixin from "../../../mixins/src/ctor";

export default {

    name: 'NDatepicker',

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

        arrive: {
            default()
            {
                return 'now';
            }
        },

        depart: {
            default()
            {
                return 'now+1day';
            }
        },

        placeholder: {
            default()
            {
                return this.trans('Select date');
            },
            type: [String]
        },

        placeholderArrive: {
            default()
            {
                return this.trans('Start date');
            },
            type: [String]
        },

        placeholderDepart: {
            default()
            {
                return this.trans('Start end');
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

        rangeSeperator: {
            default()
            {
                return '-';
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
                return 'YYYY-MM-DD hh:mm:ss';
            },
            type: [String]
        },

        displayFormat: {
            default()
            {
                return this.trans('YYYY-MM-DD');
            },
            type: [String]
        },

        weekdays: {
            default()
            {
                return [
                    this.trans('Mo'),
                    this.trans('Tu'),
                    this.trans('We'),
                    this.trans('Th'),
                    this.trans('Fr'),
                    this.trans('Sa'),
                    this.trans('So'),
                ]
            },
            type: [Array]
        },

        months: {
            default()
            {
                return [
                    this.trans('Jan'),
                    this.trans('Feb'),
                    this.trans('Mar'),
                    this.trans('Apr'),
                    this.trans('May'),
                    this.trans('Jun'),
                    this.trans('Jul'),
                    this.trans('Aug'),
                    this.trans('Sep'),
                    this.trans('Oct'),
                    this.trans('Nov'),
                    this.trans('Dec'),
                ]
            },
            type: [Array]
        }

    },

    computed: {

        yearsGrid()
        {
            return this.tempValue.getYears();
        },

        monthsGrid()
        {
            return this.tempValue.getMonths();
        },

        datesGrid()
        {
            return this.tempValue.getDatesGrid();
        }

    },

    watch: {

        value()
        {
            let value = Now.make(this.value);

            if ( value.valid() === false ) {
                return;
            }

            if ( this.value !== this.nativeValue.format(this.format) ) {
                this.nativeValue = this.tempValue = Now.make(this.value);
            }
        },

        tempValue()
        {
            this.$nextTick(() => this.$refs.modal.refresh());
        },

        arrive()
        {
            if ( this.arrive !== this.nativeArrive.format(this.format) ) {
                this.nativeArrive = this.tempArrive = Now.make(this.arrive);
            }
        },

        depart()
        {
            if ( this.depart !== this.nativeDepart.format(this.format) ) {
                this.nativeDepart = this.tempDepart = Now.make(this.depart);
            }
        },

        visible()
        {
            this.nativeRange = [];
        },

        nativeRange()
        {
            if ( this.nativeRange[0] !== undefined ) {
                this.tempArrive = this.nativeRange[0];
            }

            if ( this.nativeRange.length !== 2 ) {
                return;
            }

            if ( this.nativeRange[0] !== undefined ) {
                this.nativeArrive = this.nativeRange[0];
            }

            if ( this.nativeRange[1] !== undefined ) {
                this.nativeDepart = this.nativeRange[1];
            }

            this.$emit('update:arrive',
                this.nativeArrive.format(this.format));

            this.$emit('update:depart',
                this.nativeDepart.format(this.format));

            this.visible = false;
        }

    },

    data()
    {
        return {
            nativeView: 'date',
            visible: false,
            nativeRange: [],
            tempArrive: Now.make(this.arrive),
            nativeArrive: Now.make(this.arrive),
            tempDepart: Now.make(this.depart),
            nativeDepart: Now.make(this.depart),
            tempValue: Now.make(this.value),
            nativeValue: Now.make(this.value),
        }
    },

    methods: {

        ...CtorMixin,

    },

    renderToolbar({ prev, next })
    {
        prev = Obj.assign({
            props: { type: 'link', icon: this.icons.angleLeft, square: true, round: true }
        }, prev);

        next = Obj.assign({
            props: { type: 'link', icon: this.icons.angleRight, square: true, round: true }
        }, next);

        return (
            <div class="n-datepicker__toolbar">
                <div class="n-datepicker__display">
                    <span class="n-datepicker__month" vOn:click={() => this.nativeView = 'month'}>
                        {this.months[this.tempValue.month()]}
                    </span>
                    <span class="n-datepicker__year" vOn:click={() => this.nativeView = 'year'}>
                        {this.tempValue.year()}
                    </span>
                </div>
                <div class="n-datepicker__prev">
                    <NButton {...prev} />
                </div>
                <div class="n-datepicker__next">
                    <NButton {...next} />
                </div>
            </div>
        )
    },

    renderDateItem(now)
    {
        let classList = [
            'n-datepicker__day'
        ];

        if ( now.equalDate('now') ) {
            classList.push('n-datepicker__day--today');
        }

        if ( now.equalDate(this.nativeValue) ) {
            classList.push('n-datepicker__day--selected');
        }

        if ( now.month() === this.tempValue.month() ) {
            classList.push('n-datepicker__day--current');
        }

        let events = {
            'click': () => {
                this.$emit('input', now.format(this.format));
                this.visible = false;
            }
        };

        return (
            <div on={events} class={classList}>
                <span>{ now.format('DD') }</span>
            </div>
        );
    },

    renderDateRangeItem(now)
    {
        let classList = [
            'n-datepicker__day'
        ];

        if ( now.equalDate('now') ) {
            classList.push('n-datepicker__day--today');
        }

        if ( now.month() === this.tempValue.month() ) {
            classList.push('n-datepicker__day--current');
        }

        if ( this.nativeRange.length === 0 && now.equalDate(this.nativeArrive) ) {

            if ( ! this.nativeArrive.equalDate(this.nativeDepart) ) {
                classList.push(this.nativeArrive.before(this.nativeDepart) ?
                    'n-datepicker__day--arrive' : 'n-datepicker__day--depart');
            }

            classList.push('n-datepicker__day--selected');
        }

        if ( this.nativeRange.length === 0 && now.equalDate(this.nativeDepart) ) {

            if ( ! this.nativeDepart.equalDate(this.nativeArrive) ) {
                classList.push(this.nativeDepart.before(this.nativeArrive) ?
                    'n-datepicker__day--arrive' : 'n-datepicker__day--depart');
            }

            classList.push('n-datepicker__day--selected');
        }

        if ( this.nativeRange.length === 1 && now.equalDate(this.tempArrive) && ! now.equalDate(this.tempDepart) ) {
            classList.push(this.tempArrive.before(this.tempDepart) ?
                'n-datepicker__day--arrive' : 'n-datepicker__day--depart');
        }

        if ( this.nativeRange.length === 1 && now.equalDate(this.tempDepart) && ! now.equalDate(this.tempArrive) ) {
            classList.push(this.tempDepart.before(this.tempArrive) ?
                'n-datepicker__day--arrive' : 'n-datepicker__day--depart');
        }

        if ( this.nativeRange.length === 1 && now.between(this.tempArrive, this.tempDepart) ) {
            classList.push('n-datepicker__day--between');
        }

        if ( this.nativeRange.length === 0 && now.between(this.nativeArrive, this.nativeDepart) ) {
            classList.push('n-datepicker__day--between');
        }

        if ( this.nativeRange.length === 0 && now.between(this.nativeArrive, this.nativeDepart) ) {
            classList.push('n-datepicker__day--selected');
        }

        let events = {
            'click': () => {
                this.nativeRange.push(now);
            },
            'mouseenter': () => {
                this.tempDepart = now;
            }
        };

        return (
            <div on={events} class={classList}>
                <span>{ now.format('DD') }</span>
            </div>
        );
    },

    renderDate()
    {
        let prev = {
            on: {
                click: () => this.tempValue = this.tempValue.prevMonth()
            }
        };

        let next = {
            on: {
                click: () => this.tempValue = this.tempValue.nextMonth()
            }
        };

        return (
            <div class="n-datepicker__dateview">
                <div class="n-datepicker__header">
                    { this.ctor('renderToolbar')({ prev, next }) }
                </div>
                <div class="n-datepicker__legend">
                    {
                        Arr.each(this.weekdays, (day) => {
                            return (
                                <div class="n-datepicker__day">
                                    <span>{day}</span>
                                </div>
                            );
                        })
                    }
                </div>
                <div class="n-datepicker__body">
                    {
                        Arr.each(Arr.chunk(this.datesGrid, 7), (chunks) => {
                            return (
                                <div class="n-datepicker__week">
                                    { Arr.each(chunks, this.ctor(this.range ? 'renderDateRangeItem' : 'renderDateItem')) }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    },

    renderMonthItem(now)
    {
        let classList = [
            'n-datepicker__month'
        ];

        if ( now.equalDate(this.nativeValue) ) {
            classList.push('n-datepicker__month--selected');
        }

        if ( now.month() === Now.make().month() ) {
            classList.push('n-datepicker__month--current');
        }

        let events = {
            'click': () => {
                this.tempValue = now; this.nativeView = 'date';
            }
        };

        return (
            <div on={events} class={classList}>
                <span>{ this.months[now.month()] }</span>
            </div>
        )
    },

    renderMonth()
    {
        let prev = {
            on: {
                click: () => this.tempValue = this.tempValue.prevYear()
            }
        };

        let next = {
            on: {
                click: () => this.tempValue = this.tempValue.nextYear()
            }
        };

        return (
            <div class="n-datepicker__monthview">
                <div class="n-datepicker__header">
                    { this.ctor('renderToolbar')({ prev, next }) }
                </div>
                <div class="n-datepicker__body">
                    <div class="n-datepicker__year">
                        { Arr.each(this.monthsGrid, this.ctor('renderMonthItem')) }
                    </div>
                </div>
                <div class="n-datepicker__footer">
                    <NButton type="link" vOn:click={() => this.nativeView = 'date'}>
                        { this.trans('Go back') }
                    </NButton>
                </div>
            </div>
        );
    },

    renderYearItem(now)
    {
        let classList = [
            'n-datepicker__year'
        ];

        if ( now.equal(this.nativeValue, 'YYYY') ) {
            classList.push('n-datepicker__year--selected');
        }

        if ( now.year() === Now.make().year() ) {
            classList.push('n-datepicker__year--current');
        }


        let events = {
            'click': () => {
                this.tempValue = now; this.nativeView = 'month';
            }
        };

        return (
            <div on={events} class={classList}>
                <span>{ now.year() }</span>
            </div>
        )
    },

    renderYear()
    {
        let prev = {
            on: {
                click: () => this.tempValue = this.tempValue.prevDecade()
            }
        };

        let next = {
            on: {
                click: () => this.tempValue = this.tempValue.nextDecade()
            }
        };

        return (
            <div class="n-datepicker__yearview">
                <div class="n-datepicker__header">
                    { this.ctor('renderToolbar')({ prev, next }) }
                </div>
                <div class="n-datepicker__body">
                    <div class="n-datepicker__decade">
                        { Arr.each(this.yearsGrid, this.ctor('renderYearItem')) }
                    </div>
                </div>
                <div class="n-datepicker__footer">
                    <NButton type="link" vOn:click={() => this.nativeView = 'date'}>
                        { this.trans('Go back') }
                    </NButton>
                </div>
            </div>
        );
    },

    renderInput()
    {
        let classList = [
            'n-datepicker', 'n-datepicker--' + this.size
        ];

        if ( this.clearable === true ){
            classList.push('n-datepicker--clearable');
        }

        if ( this.disabled === true ){
            classList.push('n-datepicker--disabled');
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
                <div class="n-datepicker__icon">
                    <span class={this.icons.calendar}></span>
                </div>
                <div class="n-datepicker__input">
                    <input type="text" disabled={this.disabled} value={this.value ? this.nativeValue.format(this.displayFormat) : ''} placeholder={this.placeholder} vOn:input={inputEvent} />
                </div>
                { this.clearable &&
                    <NButton type="input" icon={this.icons.times} disabled={this.disabled || Any.isEmpty(this.value)} vOn:mousedown_stop={clearEvent} />
                }
            </div>
        );
    },

    renderRangeInput()
    {

        let classList = [
            'n-datepicker', 'n-datepicker--' + this.size
        ];

        if ( this.clearable === true ){
            classList.push('n-datepicker--clearable');
        }

        if ( this.disabled === true ){
            classList.push('n-datepicker--disabled');
        }

        let arriveEvent = (event) => {

            if ( event.target.value.length !== this.displayFormat.length ) {
                return;
            }

            let arrive = Now.make(event.target.value);

            if ( arrive.valid() === false ) {
                return;
            }

            this.$emit('update:arrive', arrive.format(this.format));
            this.$emit('update:depart', this.nativeDepart.format(this.format));
        };

        let departEvent = (event) => {

            if ( event.target.value.length !== this.displayFormat.length ) {
                return;
            }

            let depart = Now.make(event.target.value);

            if ( depart.valid() === false ) {
                return;
            }

            this.$emit('update:depart', depart.format(this.format));
            this.$emit('update:arrive', this.nativeArrive.format(this.format));
        };

        let clearEvent = () => {

            this.$emit('update:arrive', this.clearValue);
            this.$emit('update:depart', this.clearValue);

            this.visible = false;
        };

        return (
            <div class={classList}>
                <div class="n-datepicker__icon">
                    <span class={this.icons.calendar}></span>
                </div>
                <div class="n-datepicker__input n-datepicker__input--range">
                    <input type="text" disabled={this.disabled} value={this.nativeArrive.format(this.displayFormat)} placeholder={this.placeholderArrive} vOn:input={arriveEvent} />
                </div>
                <span class="n-datepicker__seperator">
                    <span>{ this.rangeSeperator }</span>
                </span>
                <div class="n-datepicker__input n-datepicker__input--range">
                    <input type="text" disabled={this.disabled} value={this.nativeDepart.format(this.displayFormat)} placeholder={this.placeholderDepart} vOn:input={departEvent} />
                </div>
                { this.clearable &&
                    <NButton type="input" icon={this.icons.times} disabled={this.disabled || Any.isEmpty(this.arrive) && Any.isEmpty(this.depart)} vOn:mtimesusedown_stop={clearEvent} />
                }
            </div>
        );
    },

    render()
    {
        return (
            <div class="n-datepicker__wrapper">
                { this.ctor(this.range ? 'renderRangeInput' : 'renderInput')() }
                <NPopover ref="modal" vModel={this.visible} trigger="click" type="datepicker" width={300} position={this.position} disabled={this.disabled} closeInside={false}>
                    { this.ctor('render' + Str.ucfirst(this.nativeView))() }
                </NPopover>
            </div>
        );
    }

}