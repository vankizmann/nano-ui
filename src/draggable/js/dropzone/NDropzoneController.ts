import { SetupContext } from "vue";
import { Pointer, ProtoController } from "../../../root/index.ts";
import { NDropzoneView } from "./NDropzoneView.ts";
import { NDropzoneData } from "./NDropzoneData.ts";
import { NDragReciever } from "../drag/NDragReciever.ts";
import { NDragHandler } from "../drag/NDragHandler.ts";
import { Arr } from "@kizmann/pico-js";


export class NDropzoneController extends ProtoController
{
    /**
     * @type {NDropzoneController}
     */
    declare scope : NDropzoneController;

    /**
     * @type {NDropzoneData}
     */
    declare data: NDropzoneData;

    /**
     * @type {NDropzoneView}
     */
    declare view: NDropzoneView;

    /**
     * @type {NDragReciever}
     */
    drag : NDragReciever;

    constructor(props:any, context:SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NDropzoneView(this),
            new NDropzoneData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        if ( this.data.allowGroups == null ) {
            this.set('allowGroups', [this.uid]);
        }

        return this;
    }

    onMounted()
    {
        const { uid } = this;

        let config : any = {};

        config.dragmove = (...args : any[]) => {
            // @ts-ignore
            return this.onDragmove(...args);
        };

        config.dragdrop = (...args : any[]) => {
            // @ts-ignore
            return this.onDragdrop(...args);
        };

        config.dragend = (...args : any[]) => {
            // @ts-ignore
            return this.onDragend(...args);
        };

        this.drag = NDragHandler.append(uid, config);
    }

    onUnmounted()
    {
        NDragHandler.remove(this.uid);
    }

    onDragmove(e : any, result : any, config : any, els : any)
    {
        const { data } = this;

        if ( !Arr.has(config.group, data.allowGroups) ) {
            return result;
        }

        result = {
            ...result, target: els.zone, mode: 'inside'
        };

        return result;
    }

    onDragdrop(e : any, result : any, config : any)
    {
        const node = Arr.first(config.items);

        this.update('item', node.item);

        return result;
    }

    onDragend(e : any, result : any, config : any)
    {

        return result;
    }

}

export default NDropzoneController;