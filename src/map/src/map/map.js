import { Arr, Map } from "@kizmann/pico-js";

export default {

    name: 'NMap',

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
        return { init: false, callbacks: [], tempMap: null };
    },

    watch: {

        lat()
        {
            this.tempMap.focusMarkers();
        },

        lng()
        {
            this.tempMap.focusMarkers();
        }

    },

    mounted()
    {
        this.tempMap = new Map(this.$el, {
            lat: this.lat, lng: this.lng, zoom: this.zoom
        });

        this.init = true;

        Arr.each(this.callbacks, (callback) => callback())
    },

    methods: {

        getMap()
        {
            return this.tempMap;
        },

        onMount(callback)
        {
            this.init ? callback() : this.callbacks.push(callback);
        }

    },

    render()
    {
        let classList = [
            'n-map'
        ];

        return (
            <div class={classList}>
                { this.$slots.default && this.$slots.default() }
            </div>
        );
    }
}
