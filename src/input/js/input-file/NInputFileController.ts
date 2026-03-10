import { ProtoController } from "../../../root/index.ts";
import { SetupContext } from "vue";
import NInputFileData from "./NInputFileData.ts";
import NInputFileView from "./NInputFileView.ts";
import { Arr, Mix } from "@kizmann/pico-js";

export class NInputFileController extends ProtoController
{
    /**
     * @type {NInputFileController}
     */
    declare scope : NInputFileController;

    /**
     * @type {NInputFileData}
     */
    declare data: NInputFileData;

    /**
     * @type {NInputFileView}
     */
    declare view: NInputFileView;

    constructor(props: any, context: SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NInputFileView(this),
            new NInputFileData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeRef('input');
        this.cloneProp('modelValue');

        return this;
    }

    updateModel()
    {
        const { data } = this;

        let files = [
            ...this.rel('input')?.files
        ];

        if ( Mix.isEmpty(files) ) {
            return;
        }

        if ( !data.multiple ) {
            files = Arr.first(files);
        }

        this.update('modelValue', files);
    }

}

export default NInputFileController;