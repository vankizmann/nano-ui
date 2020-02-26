import { Arr, Map } from "nano-js";

export default {

    name: 'NMap',

    model: {
        prop: 'visible'
    },

    props: {

        lat: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        lng: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        zoom: {
            default()
            {
                return 15;
            },
            type: [Number]
        }

    },

    provide()
    {
        return {
            NMap: this
        };
    },

    data()
    {
        return { veMap: null };
    },

    mounted()
    {
        this.veMap = new Map(this.$el, {
            lat: this.lat, lng: this.lng, zoom: this.zoom
        });
    },

    methods: {

        getMap()
        {
            return this.veMap;
        },

    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-map'
        ];

        return (
            <div class={classList}>
                { this.$slots.default }
            </div>
        );
    }
}
