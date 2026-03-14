import { ProtoController } from "../../../root/index.ts";
import { NMapMarkerView } from "./NMapMarkerView.ts";
import { NMapMarkerData } from "./NMapMarkerData.ts";
import { SetupContext } from "vue";
import { Mix, Num, Obj, Run, Map, Locale } from "@kizmann/pico-js";

export class NMapMarkerController extends ProtoController
{
    /**
     * @type {NMapMarkerController}
     */
    declare scope : NMapMarkerController;

    /**
     * @type {NMapMarkerData}
     */
    declare data : NMapMarkerData;

    /**
     * @type {NMapMarkerView}
     */
    declare view : NMapMarkerView;

    /**
     * @type {any}
     */
    marker : any;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NMapMarkerView(this),
            new NMapMarkerData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();
        this.makeRef('el');
        this.injectRef(['map', 'NMap']);

        this.ncx('map').append((map : Map) => {
            this.initMarker(map);
        });

        this.watchProp('lat', () => {
            this.importPosition();
        });

        this.watchProp('lng', () => {
            this.importPosition();
        });

        return this;
    }

    initMarker(map : Map)
    {
        const { data, context } = this;

        let options : any = {
            lat: Num.float(data.lat), lng: Num.float(data.lng),
        };

        options = {
            ...data.options, ...options, draggable: data.drag
        };

        if ( context.slots.default ) {
            options.html = this.el.innerHTML;
        }

        this.marker = map.createMarker(this.uid, options);

        this.marker.marker.addListener('position_changed', Run.debounce(() => {
            this.updatePosition();
        }, 500));
    }

    updatePosition() : void
    {
        this.update('lat', this.marker.marker.getPosition().lat());
        this.update('lng', this.marker.marker.getPosition().lng());
    }

    importPosition() : void
    {
        this.marker.marker.setPosition({
            lat: this.data.lat, lng: this.data.lng
        });
    }

    superAddress(address : string) : void
    {
        this.ncx('map').map.setMarkerByAddress(this.uid, address)
            .then(() => {
                this.ncx('map').map.superFocus();
            });
    }

}

export default NMapMarkerController;