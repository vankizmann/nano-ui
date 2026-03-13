import { Arr, Dom, Locale, Mix, Obj, Run } from "@kizmann/pico-js";
import NDragIndicator from "./NDragIndicator.ts";
import NDragCounter from "./NDragCounter.ts";
import NDragReciever from "./NDragReciever.ts";

export class NDragHandler
{
    /**
     * @type {string}
     */
    static type : string = 'none';

    /**
     * @type {number}
     */
    static active : number = 0;

    /**
     * @type {any}
     */
    static config : any = {};

    /**
     * @type {any}
     */
    static zones : any = {};

    /**
     * @type {any}
     */
    static event : any = {
        altKey: false,
        metaKey: false,
        clientX: 0,
        clientY: 0,
        target: null,
    }

    static init()
    {
        const win = Dom.find(document);

        const onPassiveDragover = Run.framerate((e : any) => {
            this.dragover(e);
        }, 16, false);

        const onDelayedDragdrop = (e : any) => Run.delay(() => {
            this.dragdrop(e);
        });

        win.on('dragenter', (e : any) => {
            if ( this.active ) {
                e.preventDefault();
            }
        });

        win.on('dragover', (e : any) => {
            if ( this.active ) {
                e.preventDefault();
                onPassiveDragover(e);
            }
        });

        win.on('drop', (e : any) => {
            if ( this.active ) {
                e.preventDefault();
                onDelayedDragdrop(e);
            }
        });

        win.on('dragend', (e : any) => {
            e.preventDefault();
            this.active = 0;
            Dom.find(document.body).remClass('n-drag');
        });

        return this;
    }

    destroy()
    {
        const win = Dom.find(document);

        win.off('dragenter');
        win.off('dragover');
        win.off('drop');
        win.off('dragend');
    }

    static dragover(e : any)
    {
        this.type = 'none';

        if ( e.altKey ) {
            this.type = 'alt';
        }

        let [options, targets] : [any, any] = [
            {}, Dom.getNodePoint(e)
        ];

        // Get deepest target
        const target = Arr.first(targets);

        // Extract dropzone
        const zone = target.closest('[dropzone]');

        if ( zone != null ) {
            options = this.runDragover(e, target, zone);
        }

        const position = {
            x: e.clientX, y: e.clientY
        };

        if ( !options.type ) {
            options.type = 'none';
        }

        NDragIndicator.show(options);
        NDragCounter.show(position, options);
    }

    static dragdrop(e : any)
    {
        let [options, targets] = [
            { mode: 'abort' }, Dom.getNodePoint(e)
        ];

        // Get deepest target
        const target = Arr.first(targets);

        // Extract dropzone
        const zone = target.closest('[dropzone]');

        if ( zone != null ) {
            options = this.runDragdrop(e, target, zone);
        }

        if ( zone != null ) {
            this.runDragend(e, options);
        }

        this.active = 0;
        this.type = 'none';

        Run.frame(() => {
            NDragCounter.show({});
            NDragIndicator.show({});
        });
    }

    static runDragover(e : any, target : HTMLElement, frame : HTMLElement)
    {
        const zone = Dom.find(frame).attr('dropzone');

        if ( this.zones[zone] == null ) {
            return {};
        }

        const config = {
            ...this.config, type: this.type,
        };

        return this.zones[zone].dragmove(e, target, config);
    }

    static runDragdrop(e : any, target : HTMLElement, frame : HTMLElement)
    {
        const zone = Dom.find(frame).attr('dropzone');

        if ( this.zones[zone] == null ) {
            return {};
        }

        const config = {
            ...this.config, type: this.type,
        };

        return this.zones[zone].dragdrop(e, target, config);
    }

    static runDragend(e : any, options : any)
    {
        const { uid } = this.config;

        if ( this.zones[uid] == null ) {
            return {};
        }

        const config = {
            ...this.config, type: this.type,
        };

        return this.zones[uid].dragend(e, options, config);
    }

    static append(uid : string, config : any = {})
    {
        this.zones[uid] = new NDragReciever(uid, config);

        return this.zones[uid];
    }

    static remove(uid : string)
    {
        delete this.zones[uid];

        return this;
    }

    static dragstart(e : any, config : any = {}, options : any = {})
    {
        this.active = 1;
        Dom.find(document.body).addClass('n-drag');

        config = {
            items: [], ...config
        };

        this.config = Obj.clone(config);

        options = {
            text: ':count item|:count items', ...options
        };

        options.text = Locale.choice(...[
            options.text, this.config.items.length
        ]);

        NDragCounter.create(e, options);
    }

}

if ( !globalThis.NDragHandler ) {
    globalThis.NDragHandler = NDragHandler.init();
}

export default NDragHandler;