import { SetupContext, onUnmounted, onMounted, provide } from "vue";
import { Dom } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NPopoverView } from "./NPopoverView.ts";
import { NPopoverData } from "./NPopoverData.ts";
import { NPopoverHandler } from "../handler/NPopoverHandler.ts";
import { NPopoverElement } from "../handler/NPopoverElement.ts";

export class NPopoverController extends ProtoController
{
    /**
     * @type {NPopoverController}
     */
    declare scope : NPopoverController;

    /**
     * @type {NPopoverData}
     */
    declare data : NPopoverData;

    /**
     * @type {NPopoverView}
     */
    declare view : NPopoverView;

    /**
     * @type {NPopoverElement}
     */
    popel : NPopoverElement;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NPopoverView(this),
            new NPopoverData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.cloneProp('modelValue');
        this.makeRef('el');

        provide('NPopover', this.instance);

        onUnmounted(() => {
            this.el?.remove();
        });

        return this;
    }

    onMounted()
    {
        const { el, data } = this;

        this.makeUID();

        this.popel = NPopoverHandler.append(el, {
            uid: this.uid,
            width: data.width,
            target: data.target,
            trigger: data.trigger,
            toggle: data.toggle,
            position: data.position,
            escapeClose: data.escapeClose,
            scrollClose: data.scrollClose,
            multiClose: data.multiClose,
        });

        this.popel.on('open', () => {
            this.onOpen();
        });

        this.popel.on('close', () => {
            this.onClose();
        });

        Dom.find(el).appendTo(document.body);
    }

    onUnmounted()
    {
        if ( this.popel.visible ) {
            this.popel.close(true, true);
        }

        NPopoverHandler.remove(this);
    }

    onOpen()
    {
        this.update('modelValue', true);
        this.emit('open');
    }

    onClose()
    {
        this.update('modelValue', false);
        this.emit('close');
    }

    superOpen(silent : boolean = false)
    {
        this.popel.open(silent);
    }

    superClose(force : boolean = false, silent : boolean = false)
    {
        this.popel.close(force, silent);
    }

}

export default NPopoverController;