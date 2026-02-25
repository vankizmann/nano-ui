import { Arr, Dom, Locale, Mix, Obj, Run } from "@kizmann/pico-js";
import { NDragIndicator, NDragCounter, NDragReciever } from "../../index.js";

export class NDragHandler
{
    static type = 'none';

    static active = 0;

    static config = {};

    static zones = {};

    static event = {
        altKey: false,
        metaKey: false,
        clientX: 0,
        clientY: 0,
        target: null,
    }


    static init()
    {
        const win = Dom.find(document);

        const onPassiveDragover = Run.framerate((e) => {
            this.dragover(e);
        }, 14, false);

        const onDelayedDragdrop = (e) => Run.delay(() => {
            this.dragdrop(e);
        });

        win.on('dragenter', (e) => {
            if ( this.active ) {
                e.preventDefault();
            }
        });

        win.on('dragover', (e) => {
            if ( this.active ) {
                e.preventDefault();
                onPassiveDragover(e);
            }
        });

        win.on('drop', (e) => {
            if ( this.active ) {
                e.preventDefault();
                onDelayedDragdrop(e);
            }
        });

        win.on('dragend', (e) => {
            e.preventDefault();
            this.active = 0;
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

    static dragover(e)
    {
        this.type = 'none';

        if ( e.altKey ) {
            this.type = 'alt';
        }

        let [options, targets] = [
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

    static dragdrop(e)
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

    static runDragover(e, target, frame)
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

    static runDragdrop(e, target, frame)
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

    static runDragend(e, options)
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

    static append(uid, config = {})
    {
        this.zones[uid] = new NDragReciever(uid, config);

        return this.zones[uid];
    }

    static remove(uid)
    {
        if ( this.zones[uid] != null ) {
            this.zones[uid].destroy();
        }

        delete this.zones[uid];

        return this;
    }

    static dragstart(e, config = {}, options = {})
    {
        this.active = 1;

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

if ( ! globalThis.NDragHandler ) {
    globalThis.NDragHandler = NDragHandler.init();
}

export default NDragHandler;