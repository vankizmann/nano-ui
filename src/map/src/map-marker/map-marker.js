import { UUID, Obj, Num, Any } from "@kizmann/pico-js";

export default {

    name: 'NMapMarker',

    inject: {

        NMap: {
            default: undefined
        }

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

        drag: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        options: {
            default()
            {
                return { style: 'default' };
            },
            type: [Object]
        },

    },

    data()
    {
        return {
            id: UUID(), tempMarker: null
        };
    },

    methods: {

        importMarkerPosition()
        {
            this.tempMarker.marker.setPosition({
                lat: this.lat, lng: this.lng
            });
        },

        updateMarkerPosition()
        {
            this.$emit('update:lat', this.tempMarker.marker.getPosition().lat());
            this.$emit('update:lng', this.tempMarker.marker.getPosition().lng());
        },

        initializeMarker()
        {
            let options = Obj.assign({
                lat: Num.float(this.lat), lng: Num.float(this.lng), draggable: this.drag
            }, this.options);

            if ( ! Any.isEmpty(this.$slots.default) ) {
                options.html = this.$el.innerHTML;
            }

            this.tempMarker = this.NMap.getMap().createMarker(this.id, options);

            this.tempMarker.marker.addListener('position_changed',
                Any.debounce(this.updateMarkerPosition));

            this.tempMarker.marker.addListener('dragstart',
                () => this.$emit('dragstart', this.tempMarker));

            this.tempMarker.marker.addListener('dragend',
                () => this.$emit('dragend', this.tempMarker));

            this.tempMarker.marker.addListener('mouseover',
                () => this.$emit('mouseenter', this.tempMarker));

            this.tempMarker.marker.addListener('mouseout',
                () => this.$emit('mouseleave', this.tempMarker));
        },

        setMarkerByAddress(address)
        {
            let successClosure = () => {
                this.NMap.getMap().focusMarkers(null, this.NMap.zoom);
            };

            let errorClosure = () => {
                this.Notify(this.trans('Address not found.'), 'danger');
            };

            this.NMap.getMap().setMarkerByAddress(this.id, address)
                .then(successClosure, errorClosure);
        }

    },

    watch: {

        lat()
        {
            this.importMarkerPosition();
        },

        lng()
        {
            this.importMarkerPosition();
        }

    },

    beforeMount()
    {
        this.NMap.onMount(this.initializeMarker);
    },

    render()
    {
        return (
            <div style="display: none;">
                { this.$slots.default }
            </div>
        );
    }

}
