import { SetupContext, provide, onUnmounted } from "vue";
import { Dom } from "@kizmann/pico-js";
import { ProtoController } from "../../../root/index.ts";
import { NDrawerView } from "./NDrawerView.ts";
import { NDrawerData } from "./NDrawerData.ts";
import { NModalHandler } from "../handler/NModalHandler.ts";
import { NModalElement } from "../handler/NModalElement.ts";

export class NDrawerController extends ProtoController
{
    /**
     * @type {NDrawerController}
     */
    declare scope : NDrawerController;

    /**
     * @type {NDrawerData}
     */
    declare data : NDrawerData;

    /**
     * @type {NDrawerView}
     */
    declare view : NDrawerView;

    /**
     * @type {NModalElement}
     */
    modal : NModalElement;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NDrawerView(this),
            new NDrawerData(this),
        ];

        if ( this.constructor.name === 'NDrawerController' ) {
            this.setup();
        }
    }

    setup()
    {
        super.setup();

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

        this.makeUID();

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

        NModalHandler.remove({ uid: this.uid });
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

    superOpen()
    {
        this.modal.open();
    }

    superClose(forceClose : boolean = false)
    {
        this.modal.close(forceClose);
    }

}

export default NDrawerController;