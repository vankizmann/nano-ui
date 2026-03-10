import { SetupContext, provide } from "vue";
import { Dom, Run } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NPreviewView } from "./NPreviewView.ts";
import { NPreviewData } from "./NPreviewData.ts";
import NPreviewHandler from "../handler/NPreviewHandler.ts";
import { NPreviewElement } from "../handler/NPreviewElement.ts";
// import { NModalHandler } from "../handler/NModalHandler.ts";
// import { NModalElement } from "../handler/NModalElement.ts";

export class NPreviewController extends ProtoController
{
    /**
     * @type {NPreviewController}
     */
    declare scope : NPreviewController;

    /**
     * @type {NPreviewData}
     */
    declare data : NPreviewData;

    /**
     * @type {NPreviewView}
     */
    declare view : NPreviewView;

    preview : NPreviewElement;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NPreviewView(this),
            new NPreviewData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this
            .makeRef('preview')
            .makeRef('portal');

        this
            .makeData('visible', false);

        this.watchProp('index', () => {
            this.onChange();
        });

        return this;
    }

    onMounted()
    {
        const { data } = this;

        this.preview = NPreviewHandler.append({
            uid: this.uid,
            index: data.index,
            group: data.group,
        });

        this.preview.on('open', (el : Dom) => {
            this.openPortal(el);
        });

        this.preview.on('close', () => {
            this.closePortal();
        });

        this.preview.on('focus', () => {
            this.focusPortal();
        });
    }

    onUnmounted()
    {
        NPreviewHandler.remove(this.preview);
    }

    onChange()
    {
        this.onUnmounted(), this.onMounted();
    }

    openPreview()
    {
        NPreviewHandler.open(this.preview);
    }

    openPortal(el : Dom)
    {
        Run.frame(() => {
            el.append(this.ref('portal').value);
        });

        this.set('visible', true);
    }

    closePortal()
    {
        this.set('visible', false);
    }

    focusPortal()
    {
        this.get('onFocus')?.();
    }

}

export default NPreviewController;