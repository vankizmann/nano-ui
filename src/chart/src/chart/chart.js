import { Num, Arr, Obj, Any } from "@kizmann/pico-js";

export default {

    name: 'NChart',

    props: {

        points: {
            default()
            {
                return Arr.make(100).map(() => Num.random(0, 100));
            },
            type: [Array]
        },

        lines: {
            default()
            {
                return Arr.make(11).map((index) => (index - 1) * 10);
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
                return 15;
            },
            type: [Number]
        },

        height: {
            default()
            {
                return 240;
            },
            type: [Number]
        },

    },

    computed: {

        width()
        {
            return (this.vePoints.length - 1) * this.pointOffset;
        },

        veHeight()
        {
            return this.height - (this.padding * 2);
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
            return (index * this.pointOffset) + ',' + (this.height - this.padding - (this.veHeight / 100 * point));
        });

        let fillPoints = '0,' + this.height + ' ' + points.join(' ') +
            ' ' + this.width + ',' + this.height;

        console.log(this.lines);

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
                        <g class="n-grid-x">
                            {
                                Arr.each(this.lines, (line) => {
                                    return (
                                        <polyline fill="none" stroke="none" stroke-width="1" points={'0,' + (this.height - this.padding - (this.veHeight / 100 * line)) + ' ' + this.width  + ',' + (this.height - this.padding - (this.veHeight / 100 * line))}/>
                                    );
                                })
                            }
                        </g>
                        <g class="n-grid-y">
                            {
                                Arr.each(Arr.slice(this.points, 0, this.points.length - 1), (point, index) => {
                                    return (
                                        <polyline fill="none" stroke="none" stroke-width="1" points={(index * this.pointOffset) + ',0 ' + (index  * this.pointOffset) + ',' + this.height} />
                                    );
                                })
                            }
                        </g>
                        <g class="n-grid-chart">
                            <polyline fill="none" stroke="none" stroke-width="2" points={points.join(' ')}/>
                            <polygon fill="none" stroke="none" points={fillPoints} />
                        </g>
                        <g class="n-grid-dots">
                            {
                                Arr.each(this.points, (point, index) => {
                                    return (<circle fill="none" cy={(this.height - this.padding - (this.veHeight / 100 * point))} cx={index * this.pointOffset} r="3" />)
                                })
                            }
                        </g>
                    </svg>
                </NScrollbar>
            </div>
        );
    }

}
