import { h } from "vue";
import { Arr, Mix, Now, Obj, Run } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NDatepickerPanelController } from "./NDatepickerPanelController.ts";

export class NDatepickerPanelView extends ProtoView
{
    /**
     * @type {NDatepickerPanelController}
     */
    declare scope : NDatepickerPanelController;

    /**
     * @type {string}
     */
    bem : string = 'n-datepicker-panel';

    default() : any
    {
        let { data } = this.scope;

        let props = {
            class: data.classList
        };

        return h('div', props, [
            this.header(), this.body()
        ]);
    }

    header() : any
    {
        return this.div('header', [
            this.display(), this.navigation()
        ]);
    }

    display() : any
    {
        const { scope, data } = this.scope;

        let months = Arr.each(data.displays, (date : Now) => {
            return date.format('MMM');
        });

        months = [
            Arr.first(months), Arr.last(months)
        ];

        if ( data.displays.length < 12 ) {
            months = Arr.unique(months);
        }

        let monthProps : any = {
            name: 'month'
        };

        monthProps.onPointerdown = () => {
            scope.set('view', 'months');
        };

        const month = this.div(monthProps, [
            months.join(' - ')
        ]);

        let years = Arr.each(data.displays, (date : Now) => {
            return date.format('YYYY');
        });

        years = Arr.unique([
            Arr.first(years), Arr.last(years)
        ]);

        let yearProps : any = {
            name: 'year'
        };

        yearProps.onPointerdown = () => {
            scope.set('view', 'years');
        };

        const year = this.div(yearProps, [
            years.join(' - ')
        ]);

        return this.div('display', [
            month, year
        ]);
    }

    navigation() : any
    {
        const { scope, data } = this.scope;

        let locateProps : any = {
            glass: true,
            square: true,
            icon: Styler.icon('locate')
        };

        locateProps.onPointerdown = () => {
            scope.onRevert();
        };

        const locate = this.div('locate', [
            this.comp('n-button', locateProps)
        ]);

        let prevProps : any = {
            glass: true,
            square: true,
            icon: Styler.icon('prev')
        };

        prevProps.onPointerdown = () => {
            scope.onPrev();
        };

        const prev = this.div('prev', [
            this.comp('n-button', prevProps)
        ]);

        let nextProps : any = {
            glass: true,
            square: true,
            icon: Styler.icon('next')
        };

        nextProps.onPointerdown = () => {
            scope.onNext();
        };

        const next = this.div('next', [
            this.comp('n-button', nextProps)
        ]);

        let slots = [prev, next];

        let inview = Arr.each(data.displays, (date : Now) => {
            return date.equal(data.dates[0], 'YYYYMM');
        });

        if ( ! Arr.has(inview, true) ) {
            slots = [locate, ...slots];
        }

        return slots;
    }

    body() : any
    {
        const { data } = this.scope;

        let slots = [];

        if ( data.view === 'dates' ) {
            slots = [this.dates()];
        }

        if ( data.view === 'months' ) {
            slots = [this.months()];
        }

        if ( data.view === 'years' ) {
            slots = [this.years()];
        }

        return this.div('body', [
            ...slots
        ]);
    }

    years()
    {
        const { data } = this.scope;

        let panels = Arr.each(data.yearsGrid, (year : Now) => {
            return this.year(year);
        });

        return this.div('years', panels);
    }

    year(year: Now)
    {
        const { scope, data } = this.scope;

        let props : any = {
            class: data.classPart('month'),
        };

        if ( year.equal(data.displays[0], 'YYYY') ) {
            props.class.push('n-selected');
        }

        if ( year.equal('now', 'YYYY') ) {
            props.class.push('n-current');
        }

        props.onPointerdown = () => {
            scope.setPanelDate(year);
        };

        return h('div', props, [
            year.format('YYYY')
        ]);
    }

    months()
    {
        const { data } = this.scope;

        let panels = Arr.each(data.monthsGrid, (month : Now) => {
            return this.month(month);
        });

        return this.div('months', panels);
    }

    month(month: Now)
    {
        const { scope, data } = this.scope;

        let props : any = {
            class: data.classPart('year'),
        };

        if ( month.equal(data.displays[0], 'YYYYMM') ) {
            props.class.push('n-selected');
        }

        if ( month.equal('now', 'YYYYMM') ) {
            props.class.push('n-current');
        }

        props.onPointerdown = () => {
            scope.setPanelDate(month);
        };

        return this.div(props, [
            month.format('MMM')
        ]);
    }

    dates() : any
    {
        const { data } = this.scope;

        let panels = Arr.make(data.panels, (i : number) => {
            return this.div('panel', [this.panel(i)]);
        });

        return this.div('panels', panels);
    }

    panel(offset : number) : any
    {
        let { data } = this.scope;

        let base = Arr.first(data.displays).clone().add(...[
            offset, 'months'
        ]);

        let weeks = Arr.chunk(...[
            base.grid('days'), 7
        ]);

        const items = Arr.each(weeks, (dates : Now[]) => {
            return this.week(dates, base);
        })

        return [this.legend(), ...items];
    }

    legend()
    {
        const days = Arr.make(7, (i : number) => {
            return Now.make('now').day(i).format('dd');
        });

        const fn = (day : string) => {
            return h('span', null, [day]);
        };

        const legends = Arr.each(days, (day : string) => {
            return this.div('day', [fn(day)]);
        });

        return this.div('legend', legends);
    }

    week(days : Now[], base : Now)
    {
        const dates = Arr.each(days, (date : Now) => {
            return this.date(date, base);
        });

        return this.div('week', dates);
    }

    date(date : Now, base : Now)
    {
        const { scope, data } = this.scope;

        let props : any = {
            class: data.classPart('day'),
        };

        props.class = Arr.merge(props.class, ...[
            data.classDate(date)
        ]);

        if ( date.equal('now', 'YYYYMMDD') ) {
            props.class.push('n-today');
        }

        if ( date.equal(base, 'YYYYMM') ) {
            props.class.push('n-current');
        }

        props.onPointerdown = () => {
            scope.setRangeDate(date);
        };

        props.onPointerenter = () => {
            scope.setHoverDate(date);
        };

        let disabled = [
            data.minDate && date.beforeDate(data.minDate),
            data.maxDate && date.afterDate(data.maxDate),
        ];

        if ( Arr.has(disabled, true) ) {
            props.class.push('n-disabled');
        }

        return h('div', props, [date.format('DD')]);
    }

}

export default NDatepickerPanelView;