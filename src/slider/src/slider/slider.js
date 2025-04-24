import { Obj, Arr, Any, Num, Dom, Event } from "@kizmann/pico-js";

export default {

    name: 'NSlider',

    props: {

        modelValue: {
            default()
            {
                return null;
            }
        },

        range: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        steps: {
            default()
            {
                return 1;
            }
        },

        labels: {
            default()
            {
                return [];
            },
            type: [Array]
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
                return 100;
            },
            type: [Number]
        },

        type: {
            default()
            {
                return 'primary';
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

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

    },

    data()
    {
        return {
            index: 0, width: null, tempValue: [null, null]
        };
    },

    computed: {

        selector()
        {
            return `[data-index="${this.index}"]`;
        },

        fixmin()
        {
            return Any.isArray(this.steps) ? Arr.first(this.steps) : this.min;
        },

        fixmax()
        {
            return Any.isArray(this.steps) ? Arr.last(this.steps) : this.max;
        },

        minmax()
        {
            return this.fixmax - this.fixmin;
        },

        touch() {
            return !! ('ontouchstart' in window ||
                navigator.msMaxTouchPoints);
        },

        mousedown() {
            return this.touch ? 'touchstart' :
                'mousedown';
        },

        mousemove() {
            return this.touch ? 'touchmove' :
                'mousemove';
        },

        mouseup() {
            return this.touch ? 'touchend' :
                'mouseup';
        }
    },

    watch: {

        modelValue()
        {
            this.getPseudoValue();
        }

    },

    mounted()
    {
        Dom.find(window).on('resize',
            Any.debounce(this.onResize, 500), this._.uid);

        this.onResize();
        this.getPseudoValue();
    },

    unmounted()
    {
        Dom.find(window).off('resize',
            null, this._.uid);
    },

    methods: {

        onResize()
        {
            this.width = Dom.find(this.$el).width();
        },

        getPseudoValue()
        {
            let value = this.modelValue;

            if ( Any.isNull(value) ) {
                value = this.fixmax;
            }
            if ( ! Any.isArray(value) ) {
                value = [this.fixmin, value];
            }

            return this.tempValue = value;
        },

        setModelValue()
        {
            let value = this.tempValue;

            if ( ! this.range ) {
                value = this.tempValue[1];
            }

            this.$emit('update:modelValue', value);
        },

        getValPos(value)
        {
            return Num.fixed(this.width / this.minmax * (value - this.fixmin), 2) + 'px';
        },

        getValStyle(value)
        {
            return 'transform: translateX(' + this.getValPos(value) + ');';
        },

        getBarPos()
        {
            return Num.fixed(this.width / this.minmax * (this.tempValue[0] - this.fixmin), 2) + 'px';
        },

        getBarWidth()
        {
            return Num.fixed(this.width / this.minmax * (this.tempValue[1] - this.tempValue[0]), 2) + 'px';
        },

        getBarStyle()
        {
            return 'max-width: ' + this.getBarWidth() + '; ' +
                'transform: translateX(' + this.getBarPos() + ');';
        },

        getClosestValue(width)
        {
            if ( Any.isNumber(this.steps) ) {
                return Num.round(width / this.steps) * this.steps;
            }

            let range = Arr.last(this.steps) -
                Arr.first(this.steps);

            let diff = Arr.each(this.steps, (step) => {
                return Math.abs((range / 100 * width) - step + this.fixmin);
            });

            let index = Arr.findIndex(diff, Math.min(...diff));

            return this.steps[index];
        },

        getTouchEvent(event)
        {
            if ( ! this.touch ) {
                return event;
            }

            return event.touches[0] || event.changedTouches[0];
        },

        onMousedown(event)
        {
            if ( ! Arr.has([0, 1], event.which) ) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            Dom.find(this.$el).find(this.selector).addClass('n-move');
            Dom.find(document.body).addClass('n-move');

            Dom.find(document).on(this.mouseup,
                Any.framerate(this.onMouseup, 60), this._.uid);

            Dom.find(document).on(this.mousemove,
                Any.framerate(this.onMousemove, 60), this._.uid);
        },

        onMousemove(event)
        {
            this.clientX = this.getTouchEvent(event).clientX;

            let offsetX = Dom.find(this.$el)
                .offset('left');

            let relativeWidth = (this.clientX - offsetX) / this.width * 100;

            let closestValue = this.getClosestValue(relativeWidth);

            if ( closestValue < this.fixmin ) {
                closestValue = this.fixmin;
            }

            if ( closestValue > this.fixmax ) {
                closestValue = this.fixmax;
            }

            let stepMin = this.tempValue[0] + this.steps;

            if ( this.index === 1 && closestValue < stepMin ) {
                closestValue = stepMin;
            }

            let stepMax = this.tempValue[1] - this.steps;

            if ( this.index === 0 && closestValue > stepMax ) {
                closestValue = stepMax;
            }

            this.tempValue[this.index] = closestValue;
        },

        onMouseup(event)
        {
            event.preventDefault();
            event.stopPropagation();

            Dom.find(document).off(this.mouseup, null, this._.uid);
            Dom.find(document).off(this.mousemove, null, this._.uid);

            Dom.find(this.$el).find(this.selector).removeClass('n-move');
            Dom.find(document.body).removeClass('n-move');

            this.setModelValue();
        },

    },

    renderHandle(value, index)
    {
        let handleProps = {
            'data-value': value,
            'data-index': index,
            style: this.getValStyle(value)
        };

        handleProps['onMousedown'] = (event) => {
            this.onMousedown(event, this.index = index);
        };

        let key = Arr.findIndex(this.steps, value);

        return (
            <div class="n-slider__handle" {...handleProps}>
                <span>{ Obj.get(this.labels, key, value) }</span>
            </div>
        );
    },

    renderHandles()
    {
        let values = Arr.clone(this.tempValue);

        if ( ! this.range ) {
            delete values[0];
        }

        return Arr.each(values, (value, index) => {
            return this.ctor('renderHandle')(value, index);
        });
    },

    renderBar()
    {
        let barProps = {
            style: this.getBarStyle()
        };

        return (
            <div class="n-slider__bar">
                <div class="n-slider__range" {...barProps}></div>
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-slider',
            'n-slider--' + this.size
        ];

        if ( this.range ) {
            classList.push('n-range');
        }

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderBar')() }
                { this.ctor('renderHandles')() }
            </div>
        );
    }

}
