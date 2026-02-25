import { ProtoController } from "../../../root/index.js";
import { NScrollbarProps } from "./NScrollbar.js";
import { NScrollbarView } from "./NScrollbarView.jsx";
import { NScrollbarData } from "./NScrollbarData.js";
import { onBeforeUnmount, onMounted, onUnmounted } from "vue";
import { NScrollbarElement } from "../handler/NScrollbarElement.js";

/**
 * @class NScrollbarController
 * @extends {BaseController<NScrollbarController, NScrollbarProps, NScrollbarView, NScrollbarData>}
 */
export class NScrollbarController extends ProtoController
{
    /**
     * @type {NScrollbarElement}
     */
    scrollbar;

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NScrollbarView(this),
            new NScrollbarData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .linkProp('overflowX')
            .linkProp('overflowY')
            .linkProp('wrapClass');

        this
            .makeRef('el');

        onMounted(() => {
            this.mounted();
        });

        onBeforeUnmount(() => {
            this.scrollbar.destroy();
        });

        return this;
    }

    mounted()
    {
        const { el, view, data } = this.unpack();

        let options = {
            bem: view.bem,
            overflowX: data.overflowX,
            overflowY: data.overflowY,
        };

        options.onReady = () => {
            this.emit('ready');
        };

        this.scrollbar = new NScrollbarElement(el, options);
    }

    onScroll(e) {
        console.log(e)
    }

}

export default NScrollbarController;