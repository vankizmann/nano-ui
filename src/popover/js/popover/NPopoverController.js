import { ProtoController } from "../../../root/index.js";
import { NPopoverProps } from "./NPopover.js";
import { NPopoverView } from "./NPopoverView.jsx";
import { NPopoverData } from "./NPopoverData.js";
import { NPopoverHandler } from "../handler/NPopoverHandler.js";
import { onMounted, onUnmounted, provide } from "vue";
import { Dom } from "@kizmann/pico-js";
import PopoverHandler from "#src/popover/src/popover/popover-handler.mjs";

/**
 * @class NPopoverController
 * @extends {BaseController<NPopoverController, NPopoverProps, NPopoverView, NPopoverData>}
 */
export class NPopoverController extends ProtoController
{

    constructor(props, context)
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

        this
            .cloneProp('modelValue')
            .linkProp('load')
            .linkProp('type')
            .linkProp('size')
            .linkProp('theme')
            .linkProp('width')
            .linkProp('trigger')
            .linkProp('toggle')
            .linkProp('target')
            .linkProp('position');

        this
            .makeRef('el');

        onMounted(() => {
            this.mounted();
        });

        onUnmounted(() => {
            this.unmounted();
        });

        provide('NPopover', this.instance);

        return this;
    }

    mounted()
    {
        const { el, data } = this.unpack();

        let options = {
            width: data.width,
            target: data.target,
            trigger: data.trigger,
            toggle: data.toggle,
            position: data.position,
        };

        this.popel = NPopoverHandler.append(el, options);

        this.popel.on('open', () => {
            this.onOpen();
        });

        this.popel.on('close', () => {
            this.onClose();
        });

        Dom.find(el).appendTo(document.body);
    }

    unmounted()
    {
        PopoverHandler.remove(this.popel);
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

}

export default NPopoverController;