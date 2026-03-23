import { SetupContext, provide, onUnmounted } from "vue";
import { Dom } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NModalView } from "./NModalView.ts";
import { NModalData } from "./NModalData.ts";
import { NModalHandler } from "../handler/NModalHandler.ts";
import { NModalElement } from "../handler/NModalElement.ts";

export class NModalController extends ProtoController
{
    /**
     * @type {NModalController}
     */
    declare scope : NModalController;

    /**
     * @type {NModalData}
     */
    declare data : NModalData;

    /**
     * @type {NModalView}
     */
    declare view : NModalView;

    /**
     * @type {NModalElement}
     */
    modal : NModalElement;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NModalView(this),
            new NModalData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this.cloneProp('modelValue');

        this
            .makeRef('el')
            .makeRef('frame');

        provide('NModal', this.instance);

        onUnmounted(() => {
            this.el?.remove();
        });

        return this;
    }

    onMounted()
    {
        const { el, data } = this;

        this.modal = NModalHandler.append(el, {
            uid: this.uid,
            target: data.target,
            listen: data.listen,
            closable: data.closable,
            beforeOpen: data.beforeOpen,
            beforeClose: data.beforeClose,
        });

        this.modal.on('open', () => {
            this.onOpen();
        });

        this.modal.on('close', () => {
            this.onClose();
        });

        if ( data.model ) {
            this.modal.open();
        }

        Dom.find(el).appendTo(document.body);
    }

    onUnmounted()
    {
        if ( this.modal.visible ) {
            this.modal.close(true, true);
        }

        NModalHandler.remove(this.modal);
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
        this.modal.open(silent);
    }

    superClose(force : boolean = false, silent : boolean = false)
    {
        this.modal.close(force, silent);
    }

}

export default NModalController;