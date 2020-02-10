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
        return { uid: UUID(), marker: null };
    },

    methods: {

        updateMarkerPosition()
        {
            this.$emit('update:lat', this.marker.marker.getPosition().lat());
            this.$emit('update:lng', this.marker.marker.getPosition().lng());
        },

        initializeMarker()
        {
            let options = Obj.assign({
                lat: Num.float(this.lat), lng: Num.float(this.lng), draggable: this.draggable
            }, this.options);

            if ( ! Any.isEmpty(this.$slots.default) ) {
                options.html = this.$el.innerHTML;
            }

            this.marker = this.NMap.getMap().createMarker(this.uid, options);

            this.marker.marker.addListener('position_changed',
                Any.debounce(this.updateMarkerPosition));

            this.marker.marker.addListener('dragstart',
                () => this.$emit('dragstart', this.marker));

            this.marker.marker.addListener('dragend',
                () => this.$emit('dragend', this.marker));

            this.marker.marker.addListener('mouseover',
                () => this.$emit('mouseenter', this.marker));

            this.marker.marker.addListener('mouseout',
                () => this.$emit('mouseleave', this.marker));
        },

        setMarkerByAddress(address)
        {
            let successClosure = () => {
                this.NMap.getMap().focusMarkers(null, this.NMap.zoom);
            };

            let errorClosure = () => {
                this.Notify(this.trans('Address not found.'), 'danger');
            };

            this.NMap.getMap().setMarkerByAddress(this.uid, address)
                .then(successClosure, errorClosure);
        }

    },

    mounted()
    {
        this.NMap.$once('hook:mounted', this.initializeMarker);
    },

    render(h)
    {
        return (<div style="display: none;">{this.$slots.default}</div>);
    }

}
