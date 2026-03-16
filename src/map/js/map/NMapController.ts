import { provide, SetupContext } from "vue";
import { Arr, Map } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NMapView } from "./NMapView.ts";
import { NMapData } from "./NMapData.ts";


export class NMapController extends ProtoController
{
    /**
     * @type {NMapController}
     */
    declare scope : NMapController;

    /**
     * @type {NMapData}
     */
    declare data: NMapData;

    /**
     * @type {NMapView}
     */
    declare view: NMapView;

    /**
     * @type {Map}
     */
    map : Map;

    /**
     * @type {Function[]}
     */
    cbs : Function[] = [];

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NMapView(this),
            new NMapData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeRef('el');

        provide('NMap', this.instance);

        return this;
    }

    onMounted()
    {
        this.map = new Map(this.rel('el'), {
            lat: this.data.lat,
            lng: this.data.lng,
            zoom: this.data.zoom,
        });

        Arr.each(this.cbs, (cb : Function) => {
            cb(this.map);
        });
    }

    append(cb : Function) : void
    {
        Arr.append(this.cbs, cb);
    }

}

export default NMapController;