import { Num, Arr, Obj, Any } from "nano-js";

export default {

    name: 'NChart',

    props: {

        points: {
            default()
            {
                return Arr.make(200).map(() => Num.random(20, 50));
            },
            type: [Array]
        },

        pointOffset: {
            default()
            {
                return 40;
            },
            type: [Number]
        },

        padding: {
            default()
            {
                return 20;
            },
            type: [Number]
        },

        height: {
            default()
            {
                return 180;
            },
            type: [Number]
        },

    },

    computed: {

        width()
        {
            return (this.vePoints.length - 1) * this.pointOffset;
        }

    },

    data()
    {
        return {
            vePoints: this.points
        };
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-chart__wrapper'
        ];

        let points = Arr.each(this.vePoints, (point, index) => {
            return (index * this.pointOffset) + ',' + (this.height / 100 * point);
        });

        let fillPoints = '0,' + this.height + ' ' + points.join(' ') +
            ' ' + this.width + ',' + this.height;

        return (
            <div class={classList} style={{ height: this.height + 'px' }}>
                <NScrollbar>
                    <svg viewBox={`0 0 ${this.width} ${this.height}`} style={{ height: this.height + 'px' }}>
                        <defs>
                            <linearGradient id="n-gradient" x2="0" y2="1">
                                <stop offset="0%" stop-color="var(--color-start)" />
                                <stop offset="100%" stop-color="var(--color-stop)" />
                            </linearGradient>
                        </defs>
                        <g>

                            <polyline fill="none" stroke="none" stroke-width="2" points={points.join(' ')}/>
                            <polygon fill="none" stroke="none" points={fillPoints} />
                        </g>
                    </svg>
                </NScrollbar>
            </div>
        );
    }

}
