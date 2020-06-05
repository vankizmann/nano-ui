import { Arr, Obj, Str, Now, Any, UUID } from "nano-js";

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

        clearArrive: {
            default()
            {
                return null;
            }
        },

        depart: {
            default()
            {
                return 'now+1day';
            }
        },

        clearDepart: {
            default()
            {
                return null;
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
                return this.range ? 2 : 1;
            },
            type: [Number]
        },

        size: {
            default()
            {
                return null;
            }
        },

        round: {
            default()
            {
                return true;
            },
            type: [Boolean]
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
                return 'YYYY-MM-DD HH:mm:ss';
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
                    this.trans('Su'),
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
            return this.veCached.getYears();
        },

        monthsGrid()
        {
            return this.veCached.getMonths();
        }

    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue.format(this.format) ) {
                this.veValue = Now.make(this.value);
            }
        },

    },

    data()
    {
        return {
            veView: 'date',
            veOpen: false,
            veRanger: null,
            veTempArrive: null,
            veTempDepart: null,
            veValue: Now.make(this.value),
            veCached: Now.make(this.value),
            veArrive: Now.make(this.arrive),
            veDepart: Now.make(this.depart),
        }
    },

    methods: {

        gotoDate()
        {
            this.veView = 'date';

            this.$nextTick(this.$refs.popover.refresh);
        },

        gotoMonth()
        {
            this.veView = 'month';

            this.$nextTick(this.$refs.popover.refresh);
        },

        gotoYear()
        {
            this.veView = 'year';

            this.$nextTick(this.$refs.popover.refresh);
        },

        patchDate(now)
        {
            if ( Any.isString(now) ) {
                now = Now.make(now);
            }

            // Copy now to cache
            this.veCached = now.clone();

            // Copy now to value
            this.veValue = now.clone();

            this.$emit('input', this.veValue.format(this.format));

            this.veOpen = false;
        },

        patchMonth(now)
        {
            if ( Any.isString(now) ) {
                now = Now.make(now);
            }

            this.veCached = now.clone();

            this.gotoDate();
        },

        patchYear(now)
        {
            if ( Any.isString(now) ) {
                now = Now.make(now);
            }

            this.veCached = now.clone();

            this.gotoMonth();
        },

        patchRange(now)
        {
            if ( this.veTempArrive && ! this.veTempDepart ) {
                this.veTempDepart = now.clone();
            }

            if ( ! this.veTempArrive && ! this.veTempDepart ) {
                this.veTempArrive = now.clone();
            }

            if ( ! this.veTempArrive || ! this.veTempDepart ) {
                return;
            }

            this.veArrive = this.veTempArrive.clone();
            this.veDepart = this.veTempDepart.clone();

            this.$emit('update:arrive', this.veArrive.format(this.format));
            this.$emit('update:depart', this.veDepart.format(this.format));

            this.veTempArrive = null;
            this.veTempDepart = null;

            this.$emit('range', [
                this.veArrive.format(this.format),
                this.veDepart.format(this.format)
            ]);

            this.veOpen = false;
        },

        printRange(now)
        {
            this.veRanger = now.clone();
        },

        eventClear()
        {
            this.$emit('input', this.clearValue);
        },

        eventRangeClear()
        {
            this.$emit('update:arrive', this.clearArrive);
            this.$emit('update:depart', this.clearDepart);
        },

        eventInput(event)
        {
            let input = event.target.value;

            if ( input.length !== this.displayFormat.length ) {
                return;
            }

            let value = Now.make(input, this.displayFormat);

            if ( ! value.moment.isValid() ) {
                return;
            }

            let moment = this.veValue.moment.set({
                year: value.moment.year(),
                month: value.moment.month(),
                date: value.moment.date(),
            });

            this.veCached = Now.make(moment);

            this.veValue = Now.make(moment);

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

    renderToolbarPrev(closure)
    {
        let props = {
            link: true,
            icon: this.icons.angleLeft,
        };

        let events = {
            click: closure
        };

        return (
            <NButton props={props} on={events} />
        );
    },

    renderToolbarNext(closure)
    {
        let props = {
            link: true,
            icon: this.icons.angleRight,
        };

        let events = {
            click: closure
        };

        return (
            <NButton props={props} on={events} />
        );
    },

    renderToolbarMonth()
    {
        let events = {
            click: this.gotoMonth
        };

        let monthsHtml = [
            this.months[this.veCached.month()]
        ];

        let month = this.veCached.clone()
            .addMonths(this.monthPanels - 1);

        if ( month.month() !== this.veCached.month() ) {
            monthsHtml.push(this.months[month.month()]);
        }

        return (
            <span class="n-datepicker__month" on={events}>
                { monthsHtml.join(' - ') }
            </span>
        );
    },

    renderToolbarYear()
    {
        let events = {
            click: this.gotoYear
        };

        let yearsHtml = [
            this.veCached.year()
        ];

        let month = this.veCached.clone()
            .addMonths(this.monthPanels - 1);

        if ( month.year() !== this.veCached.year() ) {
            yearsHtml.push(month.year());
        }

        return (
            <span class="n-datepicker__year" on={events}>
                { yearsHtml.join(' - ') }
            </span>
        );
    },

    renderToolbar({ prev, next })
    {
        return (
            <div class="n-datepicker__toolbar">
                <div class="n-datepicker__display">
                    { this.ctor('renderToolbarMonth')() }
                    { this.ctor('renderToolbarYear')() }
                </div>
                <div class="n-datepicker__prev">
                    { this.ctor('renderToolbarPrev')(prev) }
                </div>
                <div class="n-datepicker__next">
                    { this.ctor('renderToolbarNext')(next) }
                </div>
            </div>
        );
    },

    renderDateItem(now, month)
    {
        let classList = [
            'n-datepicker__day'
        ];

        if ( now.equalDate() ) {
            classList.push('n-today');
        }

        if ( now.equal(this.veCached, 'YYYYMMDD') ) {
            classList.push('n-selected');
        }

        if ( now.month() === month.month() ) {
            classList.push('n-current');
        }

        let events = {
            click: () => this.patchDate(now)
        };

        return (
            <div class={classList} on={events}>
                <span>{ now.format('DD') }</span>
            </div>
        );
    },

    renderRangeDateItem(now, month)
    {
        let classList = [
            'n-datepicker__day'
        ];

        if ( now.equalDate('now') ) {
            classList.push('n-today');
        }

        if ( now.month() === month.month() ) {
            classList.push('n-current');
        }

        let viewMode = 0;

        if ( !! this.veTempArrive ) {
            viewMode++;
        }

        if ( !! this.veTempDepart ) {
            viewMode++;
        }

        if ( viewMode === 0 ) {

            if ( now.between(this.veArrive, this.veDepart) ) {
                classList.push('n-between');
                classList.push('n-selected');
            }

            let arriveFirst = this.veArrive.before(this.veDepart);

            if ( now.equalDate(this.veArrive) ) {
                classList.push(arriveFirst ? 'n-arrive' : 'n-depart');
                classList.push('n-selected');
            }

            if ( now.equalDate(this.veDepart) ) {
                classList.push(arriveFirst ? 'n-depart' : 'n-arrive');
                classList.push('n-selected');
            }

        }

        if ( viewMode === 1 ) {

            if ( now.between(this.veTempArrive, this.veRanger) ) {
                classList.push('n-between');
            }

            let arriveFirst = this.veTempArrive.before(this.veRanger);

            if ( now.equalDate(this.veTempArrive) ) {
                classList.push(arriveFirst ? 'n-arrive' : 'n-depart');
            }

            if ( now.equalDate(this.veRanger) ) {
                classList.push(arriveFirst ? 'n-depart' : 'n-arrive');
            }

        }

        let events = {
            click: () => this.patchRange(now),
            mouseenter: () => this.printRange(now)
        };

        return (
            <div class={classList} on={events}>
                <span>{ now.format('DD') }</span>
            </div>
        );
    },

    renderDate()
    {
        let prev = () => this.veCached = this.veCached.prevMonth();
        let next = () => this.veCached = this.veCached.nextMonth();

        let legendHtml = (
            Arr.each(this.weekdays, (day) => {
                return (
                    <div class="n-datepicker__day">
                        <span>{ day }</span>
                    </div>
                );
            })
        );

        let renderItem = this.ctor('renderDateItem');

        if ( this.range ) {
            renderItem = this.ctor('renderRangeDateItem');
        }

        let bodyHtml = (month) => (
            Arr.each(Arr.chunk(month.getDatesGrid(), 7), (chunks) => {
                return (
                    <div class="n-datepicker__week">
                        { Arr.each(chunks, (chunk) => renderItem(chunk, month)) }
                    </div>
                );
            })
        );

        let panelHtml = (
            Arr.each(Arr.make(this.monthPanels), (offset) => {

                let month = this.veCached.clone()
                    .addMonths(offset - 1);

                return (
                    <div class="n-datepicker__panel">
                        <div class="n-datepicker__legend">
                            { legendHtml }
                        </div>
                        <div class="n-datepicker__body">
                            { bodyHtml(month) }
                        </div>
                    </div>
                );
            })
        );

        return (
            <div class="n-datepicker__dateview" vOn:click={this.eventStop}>
                <div class="n-datepicker__header">
                    { this.ctor('renderToolbar')({ prev, next }) }
                </div>
                <div class="n-datepicker__panels">
                    { panelHtml }
                </div>
            </div>
        );
    },

    renderMonthItem(now)
    {
        let classList = [
            'n-datepicker__month'
        ];

        if ( now.equal(this.veCached, 'YYYYMM') ) {
            classList.push('n-selected');
        }

        if ( now.month() === Now.make('now').month() ) {
            classList.push('n-current');
        }

        let events = {
            click: () => this.patchMonth(now)
        };

        return (
            <div class={classList} on={events}>
                <span>{ this.months[now.month()] }</span>
            </div>
        )
    },

    renderMonth()
    {
        let prev = () => this.veCached = this.veCached.prevYear();
        let next = () => this.veCached = this.veCached.nextYear();

        return (
            <div class="n-datepicker__monthview" vOn:click={this.eventStop}>
                <div class="n-datepicker__header">
                    { this.ctor('renderToolbar')({ prev, next }) }
                </div>
                <div class="n-datepicker__body">
                    <div class="n-datepicker__year">
                        { Arr.each(this.monthsGrid, this.ctor('renderMonthItem')) }
                    </div>
                </div>
                <div class="n-datepicker__footer">
                    <NButton size="small" link={true} vOn:click={this.gotoDate}>
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

        if ( now.equal(this.veCached, 'YYYY') ) {
            classList.push('n-selected');
        }

        if ( now.year() === Now.make('now').year() ) {
            classList.push('n-current');
        }

        let events = {
            click: () => this.patchYear(now)
        };

        return (
            <div class={classList} on={events}>
                <span>{ now.year() }</span>
            </div>
        )
    },

    renderYear()
    {
        let prev = () => this.veCached = this.veCached.prevDecade();
        let next = () => this.veCached = this.veCached.nextDecade();

        return (
            <div class="n-datepicker__yearview" vOn:click={this.eventStop}>
                <div class="n-datepicker__header">
                    { this.ctor('renderToolbar')({ prev, next }) }
                </div>
                <div class="n-datepicker__body">
                    <div class="n-datepicker__decade">
                        { Arr.each(this.yearsGrid, this.ctor('renderYearItem')) }
                    </div>
                </div>
                <div class="n-datepicker__footer">
                    <NButton size="small" link={true} vOn:click={this.gotoDate}>
                        { this.trans('Go back') }
                    </NButton>
                </div>
            </div>
        );
    },

    renderInputIcon()
    {
        return (
            <div class="n-datepicker__icon">
                <span class={this.icons.calendar}></span>
            </div>
        );
    },

    renderInputClear()
    {
        if ( ! this.clearable ) {
            return null;
        }

        let props = {
            type: 'input',
            icon: this.icons.times,
            disabled: this.disabled
        };

        if ( Any.isEmpty(this.value) ) {
            props.disabled = true;
        }

        let events = {
            click: this.eventClear
        };

        return (
            <NButton props={props} on={events} />
        )
    },

    renderInput()
    {
        let classList = [
            'n-datepicker'
        ];

        if ( this.size ) {
            classList.push('n-datepicker--' + this.size);
        }

        if ( this.round ) {
            classList.push('n-datepicker--round');
        }

        if ( this.clearable ){
            classList.push('n-clearable');
        }

        if ( this.disabled ){
            classList.push('n-disabled');
        }

        let attrs = {
            type: 'text',
            value: '',
            disabled: this.disabled,
            placeholder: this.placeholder
        };

        let renderDisplay = ! Any.isEmpty(this.value);

        if ( Any.isString(this.value) ) {
            renderDisplay |= this.value.match(/^now/);
        }

        if ( renderDisplay ) {
            attrs.value = this.veValue.format(this.displayFormat, true);
        }

        let events = {
            input: this.eventInput
        };

        let inputHtml = (
            <div class="n-datepicker__input">
                <input value={attrs.value} attrs={attrs} on={events} />
            </div>
        );

        return (
            <div class={classList}>
                { this.ctor('renderInputIcon')() }
                { inputHtml }
                { this.ctor('renderInputClear')() }
            </div>
        );
    },

    renderRangeInputArrive()
    {
        let attrs = {
            type: 'text',
            value: '',
            disabled: this.disabled,
            placeholder: this.placeholderArrive,
        };

        if ( ! Any.isEmpty(this.arrive) ) {
            attrs.value = this.veArrive.format(this.displayFormat, true);
        }

        return (
            <input value={attrs.value} attrs={attrs} />
        );
    },

    renderRangeInputDepart()
    {
        let attrs = {
            type: 'text',
            value: '',
            disabled: this.disabled,
            placeholder: this.placeholderDepart,
        };

        if ( ! Any.isEmpty(this.depart) ) {
            attrs.value = this.veDepart.format(this.displayFormat, true);
        }

        return (
            <input value={attrs.value} attrs={attrs} />
        );
    },

    renderRangeInputClear()
    {
        if ( ! this.clearable ) {
            return null;
        }

        let props = {
            type: 'input',
            icon: this.icons.times,
            disabled: this.disabled
        };

        if ( Any.isEmpty(this.value) ) {
            props.disabled = true;
        }

        let events = {
            click: this.eventRangeClear
        };

        return (
            <NButton props={props} on={events} />
        )
    },

    renderRangeInput()
    {
        let classList = [
            'n-datepicker',
        ];

        if ( this.size ) {
            classList.push('n-datepicker--' + this.size);
        }

        if ( this.round ) {
            classList.push('n-datepicker--round');
        }

        if ( this.clearable ){
            classList.push('n-clearable');
        }

        if ( this.disabled ){
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderInputIcon')() }
                <div class="n-datepicker__input n-datepicker__input--range">
                    { this.ctor('renderRangeInputArrive')() }
                </div>
                <span class="n-datepicker__seperator">
                    <span>{ this.rangeSeparator }</span>
                </span>
                <div class="n-datepicker__input n-datepicker__input--range">
                    { this.ctor('renderRangeInputDepart')() }
                </div>
                { this.ctor('renderRangeInputClear')() }
            </div>
        );
    },

    renderPopover()
    {
        let props = {
            visible: this.veOpen,
            type: 'datepicker',
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
                { this.ctor('render' + Str.ucfirst(this.veView))() }
            </NPopover>
        )
    },

    render()
    {
        return (
            <div class="n-datepicker__wrapper">
                { this.ctor(this.range ? 'renderRangeInput' : 'renderInput')() }
                { this.ctor('renderPopover')() }
            </div>
        );
    }

}