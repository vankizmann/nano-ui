import { Obj, Arr, Any, Num, Dom, Event } from "@kizmann/pico-js";

export default {

    name: 'NSlider',

    props: {

        modelValue: {
            default()
            {
                return 10;
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
                return 5;
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
            width: null, tempValue: this.modelValue
        };
    },

    computed: {

        pseudo()
        {
            if ( Any.isArray(this.tempValue) ) {
                return this.tempValue;
            }

            return [this.min, this.tempValue];
        },

        minmax()
        {
            return this.max - this.min;
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
            if ( this.modelValue !== this.tempValue ) {
                this.tempValue = this.modelValue;
            }
        }

    },

    mounted()
    {
        Dom.find(window).on('resize',
            Any.debounce(this.onResize, 500), this._.uid);

        this.onResize();
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

        getValPos(value)
        {
            return Num.fixed(this.width / this.minmax * value, 2) + 'px';
        },

        getValStyle(value)
        {
            return 'transform: translateX(' + this.getValPos(value) + ');';
        },

        getBarPos()
        {
            return Num.fixed(this.width / this.minmax * this.pseudo[0], 2) + 'px';
        },

        getBarWidth()
        {
            return Num.fixed(this.width / this.minmax * this.pseudo[1], 2) + 'px';
        },

        getBarStyle()
        {
            return 'max-width: ' + this.getBarWidth() + '; ' +
                'transform: translateX(' + this.getBarPos() + ');';
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

            Dom.find(this.$el).find('[data-index="' + this.index + '"]').addClass('n-move');
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

            this.closestValue = Num.round(relativeWidth / this.steps) * this.steps;

            if ( this.closestValue < this.min ) {
                this.closestValue = this.min;
            }

            if ( this.closestValue > this.max ) {
                this.closestValue = this.max;
            }

            this.tempValue = this.closestValue;

            console.log(this.index, this.tempValue[this.index]);
        },

        onMouseup(event)
        {
            event.preventDefault();
            event.stopPropagation();

            Dom.find(document).off(this.mouseup, null, this._.uid);
            Dom.find(document).off(this.mousemove, null, this._.uid);


            Dom.find(this.$el).find('[data-index="' + this.index + '"]').removeClass('n-move');
            Dom.find(document.body).removeClass('n-move');
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

        return (
            <div class="n-slider__handle" {...handleProps}>
                <span>{ value }</span>
            </div>
        );
    },

    renderHandles()
    {
        let values = this.tempValue;

        if ( ! Any.isArray(values) ) {
            values = [values];
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
