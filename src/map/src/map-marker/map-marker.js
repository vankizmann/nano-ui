import { UUID, Obj, Num, Any } from "nano-js";

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

        draggable: {
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
        return { veID: UUID(), veMarker: null };
    },

    methods: {

        updateMarkerPosition()
        {
            this.$emit('update:lat', this.veMarker.marker.getPosition().lat());
            this.$emit('update:lng', this.veMarker.marker.getPosition().lng());
        },

        initializeMarker()
        {
            let options = Obj.assign({
                lat: Num.float(this.lat), lng: Num.float(this.lng), draggable: this.draggable
            }, this.options);

            if ( ! Any.isEmpty(this.$slots.default) ) {
                options.html = this.$el.innerHTML;
            }

            this.veMarker = this.NMap.getMap().createMarker(this.veID, options);

            this.veMarker.marker.addListener('position_changed',
                Any.debounce(this.updateMarkerPosition));

            this.veMarker.marker.addListener('dragstart',
                () => this.$emit('dragstart', this.veMarker));

            this.veMarker.marker.addListener('dragend',
                () => this.$emit('dragend', this.veMarker));

            this.veMarker.marker.addListener('mouseover',
                () => this.$emit('mouseenter', this.veMarker));

            this.veMarker.marker.addListener('mouseout',
                () => this.$emit('mouseleave', this.veMarker));
        },

        setMarkerByAddress(address)
        {
            let successClosure = () => {
                this.NMap.getMap().focusMarkers(null, this.NMap.zoom);
            };

            let errorClosure = () => {
                this.Notify(this.trans('Address not found.'), 'danger');
            };

            this.NMap.getMap().setMarkerByAddress(this.veID, address)
                .then(successClosure, errorClosure);
        }

    },

    mounted()
    {
        this.NMap.$once('hook:mounted', this.initializeMarker);
    },

    render(h)
    {
        return (
            <div style="display: none;">
                { this.$slots.default }
            </div>
        );
    }

}
