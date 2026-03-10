import { SetupContext } from "vue";
import { ProtoController } from "../../../root/index.ts";
import { NPaginatorView } from "./NPaginatorView.ts";
import { NPaginatorData } from "./NPaginatorData.ts";
import { Arr, Num } from "@kizmann/pico-js";


export class NPaginatorController extends ProtoController
{
    /**
     * @type {NPaginatorController}
     */
    declare scope : NPaginatorController;

    /**
     * @type {NPaginatorData}
     */
    declare data : NPaginatorData;

    /**
     * @type {NPaginatorView}
     */
    declare view : NPaginatorView;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NPaginatorView(this),
            new NPaginatorData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('page')
            .cloneProp('limit');

        this.makeData('pageOptions', []);

        this.watchData('page', () => {
            this.updatePageOptions();
        });

        this.watchData('limit', () => {
            this.updatePageOptions();
        });

        this.updatePageOptions();

        return this;
    }

    updatePageOptions()
    {
        const { data } = this;

        const pages = Num.ceil(...[
            data.total / data.limit
        ]);

        const options = Arr.make(pages || 1, (i : number) => {
            return i + 1;
        });

        this.set('pageOptions', options);
    }

}

export default NPaginatorController;