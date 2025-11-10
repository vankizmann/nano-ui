import { Arr, Str, Now, Any } from "@kizmann/pico-js";

export default {

    name: 'NDatepickerPanel',

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

        range: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        monthPanels: {
            default()
            {
                return 1;
            },
            type: [Number]
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
                ]
            },
            type: [Array]
        }

    },

    computed: {

        yearsGrid()
        {
            return this.tempCache.getYears();
        },

        monthsGrid()
        {
            return this.tempCache.getMonths();
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
            tempView: 'date',
            tempRanger: null,
            cacheArrive: null,
            cacheDepart: null,
            tempValue: Now.make(this.modelValue, this.format),
            tempCache: Now.make(this.modelValue, this.format),
            tempArrive: Now.make(this.arrive),
            tempDepart: Now.make(this.depart),
        }
    },

    methods: {

        gotoDate()
        {
            this.tempView = 'date';
        },

        gotoMonth()
        {
            this.tempView = 'month';
        },

        gotoYear()
        {
            this.tempView = 'year';
        },

        patchDate(now)
        {
            if ( Any.isString(now) ) {
                now = Now.make(now);
            }

            if ( Any.isEmpty(this.modelValue) ) {
                now.resetTime();
            } else {
                now.applyTime(this.tempValue);
            }

            // Copy now to cache
            this.tempCache = now.clone();

            // Copy now to value
            this.tempValue = now.clone();

            this.$emit('update:modelValue', 
                this.tempValue.format(this.format));
        },

        patchMonth(now)
        {
            if ( Any.isString(now) ) {
                now = Now.make(now);
            }

            this.tempCache = now.clone();

            this.gotoDate();
        },

        printRange(now)
        {
            this.tempRanger = now.clone();
        },

        patchYear(now)
        {
            if ( Any.isString(now) ) {
                now = Now.make(now);
            }

            this.tempCache = now.clone();

            this.gotoMonth();
        },

        patchRange(now)
        {
            if ( this.cacheArrive && ! this.cacheDepart ) {
                this.cacheDepart = now.clone();
            }

            if ( ! this.cacheArrive && ! this.cacheDepart ) {
                this.cacheArrive = now.clone();
            }

            if ( ! this.cacheArrive || ! this.cacheDepart ) {
                return;
            }

            this.tempArrive = this.cacheArrive.clone();
            this.tempDepart = this.cacheDepart.clone();

            this.$emit('update:arrive', 
                this.tempArrive.format(this.format));

            this.$emit('update:depart', 
                this.tempDepart.format(this.format));

            this.cacheArrive = null;
            this.cacheDepart = null;

            this.$emit('rangeSelected', [
                this.tempArrive.format(this.format),
                this.tempDepart.format(this.format)
            ]);
        },

    },

    renderToolbarPrev(closure)
    {
        let props = {
            type: this.type,
            glass: true,
            square: true,
            icon: nano.Icons.angleLeft,
            onClick: closure
        };

        return (<NButton {...props}></NButton>);
    },

    renderToolbarNext(closure)
    {
        let props = {
            type: this.type,
            glass: true,
            square: true,
            icon: nano.Icons.angleRight,
            onClick: closure
        };

        return (<NButton {...props}></NButton>);
    },

    renderToolbarMonth()
    {
        let props = {
            onClick: this.gotoMonth
        };

        let monthsHtml = [
            this.months[this.tempCache.month()]
        ];

        let month = this.tempCache.clone()
            .addMonths(this.monthPanels - 1);

        if ( month.month() !== this.tempCache.month() ) {
            monthsHtml.push(this.months[month.month()]);
        }

        return (
            <span class="n-datepicker-panel__month" {...props}>
                { monthsHtml.join(' - ') }
            </span>
        );
    },

    renderToolbarYear()
    {
        let props = {
            onClick: this.gotoYear
        };

        let yearsHtml = [
            this.tempCache.year()
        ];

        let month = this.tempCache.clone()
            .addMonths(this.monthPanels - 1);

        if ( month.year() !== this.tempCache.year() ) {
            yearsHtml.push(month.year());
        }

        return (
            <span class="n-datepicker-panel__year" {...props}>
                { yearsHtml.join(' - ') }
            </span>
        );
    },

    renderToolbar({ prev, next })
    {
        return (
            <div class="n-datepicker-panel__toolbar">
                <div class="n-datepicker-panel__display">
                    { this.ctor('renderToolbarMonth')() }
                    { this.ctor('renderToolbarYear')() }
                </div>
                <div class="n-datepicker-panel__prev">
                    { this.ctor('renderToolbarPrev')(prev) }
                </div>
                <div class="n-datepicker-panel__next">
                    { this.ctor('renderToolbarNext')(next) }
                </div>
            </div>
        );
    },

    renderDateItem(now, month)
    {
        let classList = [
            'n-datepicker-panel__day'
        ];

        if ( now.equalDate() ) {
            classList.push('n-today');
        }

        let isSelected = this.tempValue.valid() && 
            now.equalDate(this.tempValue);

        if ( isSelected ) {
            classList.push('n-selected');
        }

        if ( now.month() === month.month() ) {
            classList.push('n-current');
        }

        let isNotBeforeMin = ! this.minDate || 
            now.after(this.minDate) || now.equalDate(this.minDate);

        let isNotAfterMax = ! this.maxDate || 
            now.before(this.maxDate) || now.equalDate(this.maxDate);

        if ( ! isNotBeforeMin || ! isNotAfterMax ) {
            classList.push('n-disabled');
        }

        let props = {};

        if ( isNotBeforeMin && isNotAfterMax ) {
            props.onClick = () => this.patchDate(now);
        }

        return (
            <div class={classList} {...props}>
                <span>{ now.format('DD') }</span>
            </div>
        );
    },

    renderRangeDateItem(now, month)
    {
        let classList = [
            'n-datepicker-panel__day'
        ];

        if ( now.equalDate('now') ) {
            classList.push('n-today');
        }

        if ( now.month() === month.month() ) {
            classList.push('n-current');
        }

        let viewMode = 0;

        if ( !! this.cacheArrive ) {
            viewMode++;
        }

        if ( !! this.cacheDepart ) {
            viewMode++;
        }

        let isTempValid = this.tempArrive.valid() && 
            this.tempDepart.valid();

        if ( viewMode === 0 && isTempValid ) {

            if ( now.between(this.tempArrive, this.tempDepart) ) {
                classList.push('n-between');
                classList.push('n-selected');
            }

            let arriveFirst = this.tempArrive.before(this.tempDepart);

            if ( now.equalDate(this.tempArrive) ) {
                classList.push(arriveFirst ? 'n-arrive' : 'n-depart');
                classList.push('n-selected');
            }

            if ( now.equalDate(this.tempDepart) ) {
                classList.push(arriveFirst ? 'n-depart' : 'n-arrive');
                classList.push('n-selected');
            }

        }

        if ( viewMode === 1 && this.cacheArrive ) {

            if ( now.between(this.cacheArrive, this.tempRanger) ) {
                classList.push('n-between');
            }

            let arriveFirst = this.cacheArrive.before(this.tempRanger);

            if ( now.equalDate(this.cacheArrive) ) {
                classList.push(arriveFirst ? 'n-arrive' : 'n-depart');
            }

            if ( now.equalDate(this.tempRanger) ) {
                classList.push(arriveFirst ? 'n-depart' : 'n-arrive');
            }

        }

        let isNotBeforeMin = ! this.minDate || 
            now.after(this.minDate) || now.equalDate(this.minDate);

        let isNotAfterMax = ! this.maxDate || 
            now.before(this.maxDate) || now.equalDate(this.maxDate);

        if ( ! isNotBeforeMin || ! isNotAfterMax ) {
            classList.push('n-disabled');
        }

        let props = {
            onMouseenter: () => this.printRange(now)
        };

        if ( isNotBeforeMin && isNotAfterMax ) {
            props.onClick = () => this.patchRange(now);
        }

        return (
            <div class={classList} {...props}>
                <span>{ now.format('DD') }</span>
            </div>
        );
    },

    renderDate()
    {
        let prev = () => {
            this.tempCache = this.tempCache.prevMonth();
        };
        let next = () => {
            this.tempCache = this.tempCache.nextMonth();
        };

        let legendHtml = (
            Arr.each(this.weekdays, (day) => {
                return (
                    <div class="n-datepicker-panel__day">
                        <span>{ this.trans(day) }</span>
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
                    <div class="n-datepicker-panel__week">
                        { Arr.each(chunks, (chunk) => renderItem(chunk, month)) }
                    </div>
                );
            })
        );

        let panelHtml = (
            Arr.each(Arr.make(this.monthPanels), (offset) => {

                let month = this.tempCache.clone()
                    .addMonths(offset - 1);

                return (
                    <div class="n-datepicker-panel__panel">
                        <div class="n-datepicker-panel__legend">
                            { legendHtml }
                        </div>
                        <div class="n-datepicker-panel__body">
                            { bodyHtml(month) }
                        </div>
                    </div>
                );
            })
        );

        return (
            <div class="n-datepicker-panel__dateview">
                <div class="n-datepicker-panel__header">
                    { this.ctor('renderToolbar')({ prev, next }) }
                </div>
                <div class="n-datepicker-panel__panels">
                    { panelHtml }
                </div>
            </div>
        );
    },

    renderMonthItem(now)
    {
        let classList = [
            'n-datepicker-panel__month'
        ];

        if ( now.equal(this.tempCache, 'YYYYMM') ) {
            classList.push('n-selected');
        }

        if ( now.month() === Now.make('now').month() ) {
            classList.push('n-current');
        }

        let props = {
            onClick: () => this.patchMonth(now)
        };

        return (
            <div class={classList} {...props}>
                <span>{ this.trans(this.months[now.month()]) }</span>
            </div>
        )
    },

    renderMonth()
    {
        let prev = () => {
            this.tempCache = this.tempCache.prevYear();
        };

        let next = () => {
            this.tempCache = this.tempCache.nextYear();
        };

        return (
            <div class="n-datepicker-panel__monthview">
                <div class="n-datepicker-panel__header">
                    { this.ctor('renderToolbar')({ prev, next }) }
                </div>
                <div class="n-datepicker-panel__body">
                    <div class="n-datepicker-panel__year">
                        { Arr.each(this.monthsGrid, this.ctor('renderMonthItem')) }
                    </div>
                </div>
                <div class="n-datepicker-panel__footer">
                    <NButton size={this.type}  size={this.size} link={true} onClick={this.gotoDate}>
                        { this.trans('Go back') }
                    </NButton>
                </div>
            </div>
        );
    },

    renderYearItem(now)
    {
        let classList = [
            'n-datepicker-panel__year'
        ];

        if ( now.equal(this.tempCache, 'YYYY') ) {
            classList.push('n-selected');
        }

        if ( now.year() === Now.make('now').year() ) {
            classList.push('n-current');
        }

        let props = {
            onClick: () => this.patchYear(now)
        };

        return (
            <div class={classList} {...props}>
                <span>{ now.year() }</span>
            </div>
        )
    },

    renderYear()
    {
        let prev = () => {
            this.tempCache = this.tempCache.prevDecade();
        };

        let next = () => {
            this.tempCache = this.tempCache.nextDecade();
        };

        return (
            <div class="n-datepicker-panel__yearview">
                <div class="n-datepicker-panel__header">
                    { this.ctor('renderToolbar')({ prev, next }) }
                </div>
                <div class="n-datepicker-panel__body">
                    <div class="n-datepicker-panel__decade">
                        { Arr.each(this.yearsGrid, this.ctor('renderYearItem')) }
                    </div>
                </div>
                <div class="n-datepicker-panel__footer">
                    <NButton size={this.type}  size={this.size} link={true} onClick={this.gotoDate}>
                        { this.trans('Go back') }
                    </NButton>
                </div>
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-datepicker-panel',
            'n-datepicker-panel--' + this.size,
            'n-datepicker-panel--' + this.type
        ]

        return (
            <div class={classList}>
                { this.ctor('render' + Str.ucfirst(this.tempView))() }
            </div>
        );
    }

}