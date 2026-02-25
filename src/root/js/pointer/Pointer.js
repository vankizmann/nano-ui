import { Arr, Dom, Obj, Run } from "@kizmann/pico-js";

export class Pointer
{
    static index = 10000;

    static instance;

    static signals = [];

    static cursor = {
        clientX: 0, clientY: 0
    };

    static init()
    {
        const el = Dom.find(window);

        el.on('keydown', ...[
            (e) => this.on(e),
        ]);

        el.on('keyup', ...[
            (e) => this.on(e),
        ]);

        el.on('pointerdown', ...[
            (e) => this.on(e),
        ]);

        el.on('pointerup', ...[
            (e) => this.on(e),
        ]);

        el.on('contextmenu', ...[
            (e) => this.on(e)
        ]);

        el.on('pointermove', ...[
            Run.framebuffer((e) => this.on(e)),
        ], { passive: true });

        el.on('scroll', ...[
            Run.framebuffer((e) => this.on(e)),
        ], { passive: true });

        el.on('virtualscroll', ...[
            Run.framebuffer((e) => this.on(e)),
        ], { passive: true });

        return this;
    }

    static zindex()
    {
        return this.index++;
    }

    static on(e)
    {
        const cursor = {
            clientX: e.clientX, clientY: e.clientY
        };

        if ( e.clientX || e.clientY ) {
            this.cursor = cursor;
        }

        let targets = Dom.getNodePoint(this.cursor);

        let v = {
            type: e.type, targets, target: Arr.first(targets)
        };

        if ( e.type === 'pointerdown' ) {
            v.type = 'mousedown';
        }

        if ( e.type === 'pointerup' ) {
            v.type = 'mouseup';
        }

        if ( e.type === 'pointermove' ) {
            v.type = 'mousemove';
        }

        if ( e.type === 'keydown' && e.which === 27 ) {
            e = { type: 'keyescape', ...v };
        }

        if ( e.type === 'keydown' && e.which === 13 ) {
            e = { type: 'keyenter', ...v };
        }

        let [types, prevent] = [
            [], Dom.find(v.target).upnode('[prevent]')
        ];

        if ( ! e.metaKey && ! prevent.empty() ) {
            types = prevent.attr('prevent').split(',');
        }

        if ( Arr.has(types, e.type) ) {
            e && e.preventDefault();
        }

        for ( const { type, cb } of this.signals ) {
            if ( type === v.type ) cb(e, v);
        }
    }

    static bind(id, type, cb)
    {
        Arr.append(this.signals, { id, type, cb });
    }

    static unbind(id)
    {
        Arr.remove(this.signals, { id });
    }


}

export default Pointer;