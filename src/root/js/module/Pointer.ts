import { Arr, Dom, For, Mix, Obj, Run } from "@kizmann/pico-js";
import * as fs from "node:fs";

export class Pointer
{
    /**
     * @type {number}
     */
    static index : number = 10000;

    /**
     * @type {any[]}
     */
    static signals : any[] = [];

    /**
     * @type {any[]}
     */
    static chains : any[] = [];

    /**
     * @type {any[]}
     */
    static groups : any[] = [];

    /**
     * @type {any}
     */
    static cursor : any = {
        clientX: 0, clientY: 0
    };

    /**
     * @type {any[]}
     */
    static waiter : any[] = [];

    static init() : Pointer
    {
        const el = Dom.find(window);

        el.on('keydown', ...[
            (e : any) => this.on(e),
        ]);

        el.on('keyup', ...[
            (e : any) => this.on(e),
        ]);

        el.on('pointerdown', ...[
            (e : any) => this.on(e),
        ]);

        el.on('pointerup', ...[
            (e : any) => this.on(e),
        ]);

        el.on('contextmenu', ...[
            (e : any) => this.on(e)
        ]);

        el.on('pointermove', ...[
            Run.framebuffer((e : any) => this.on(e), 'NPointer'),
        ], { passive: true });

        el.on('scroll', ...[
            Run.framebuffer((e : any) => this.on(e), 'NPointer'),
        ], { passive: true });

        el.on('virtualscroll', ...[
            Run.framebuffer((e : any) => this.on(e), 'NPointer'),
        ], { passive: true });

        return this;
    }

    static zindex() : number
    {
        return 10000 + this.chains.length;
    }

    static on(e : any) : void
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
            v = { ...v, type: 'keyescape' };
        }

        if ( e.type === 'keydown' && e.which === 13 ) {
            v = { ...v, type: 'keyenter' };
        }

        let [prevent, pl] = [
            false, Dom.find(v.target).upnode('[prevent]')
        ];

        if ( !e.metaKey && !pl.empty() ) {
            prevent = this.preventCodes(e, pl);
        }

        if ( prevent ) {
            e && e.preventDefault();
        }

        for ( const { type, cb } of this.signals ) {
            if ( type === v.type ) cb(e, v);
        }
    }

    static preventCodes(e : any, el : Dom) : boolean
    {
        const keycode = For.parseOptions(...[
            el.attr('prevent') || ''
        ]);

        const prevent = Obj.get(keycode, e.type);

        if ( Mix.isArr(prevent) ) {
            return Arr.has(prevent, e.which);
        }

        return !! prevent;
    }

    static findGesture(e : any)
    {
        // distinguish which gesture is executed
    }

    static bind(id : string, type : string, cb : Function) : void
    {
        Arr.append(this.signals, { id, type, cb });
    }

    static unbind(id : string) : void
    {
        Arr.remove(this.signals, { id });
    }

    static deblock(uid : string, type : string = 'none', group : string, cb : Function = null)
    {
        if ( group == null ) {
            group = uid;
        }

        let items = [];

        const sames = Arr.find(this.groups, (val : any) => {
            return Arr.has(val, group);
        }, []);

        const fn = (val : any) => {
            return val[1] === type && !Arr.has(sames, val[0]);
        };

        for ( let item of Arr.clone(this.chains).reverse() ) {
            if ( !fn(item) ) break; else items.push(item);
        }

        let loop : any = cb, next = (cb : any, nx : any) => {
            Run.frame(() => ((cb && cb()), (nx && nx())));
        };

        Arr.each(items.reverse(), (val : any) => {
            loop = ((p) => () => next(val[2], p))(loop);
        });

        loop && loop();
    }

    static prevent(uid : string, type : string = 'none', group : string, cb : Function = null)
    {
        if ( group == null ) {
            group = uid;
        }

        const index = Arr.findIndex(this.groups, (val : any) => {
            return Arr.has(val, group);
        });

        if ( index === -1 ) {
            Arr.append(this.groups, [group]);
        }

        if ( index !== -1 ) {
            Arr.add(this.groups[index], uid);
        }

        this.chains.push([uid, type, cb]);
    }

    static release(uid : string, cb : Function = null)
    {
        const index = Arr.findIndex(this.groups, (val : any) => {
            return Arr.has(val, uid);
        });

        if ( index !== -1 ) {
            Arr.remove(this.groups[index], uid);
        }

        this.groups = Arr.filter(this.groups);

        Run.frame(() => {
            (Arr.remove(this.chains, [uid]), cb && cb());
        });
    }

    static blocked(uid : string)
    {
        const index = Arr.findIndex(this.chains, (val : any) => {
            return val[0] === uid;
        });

        return index !== -1 && index !== this.chains.length - 1;
    }

    static wait(cb : Function)
    {
        Arr.append(this.waiter, Run.delay(cb, 250));
    }

    static stop()
    {
        this.waiter = Arr.filter(this.waiter, (clear : Function) => {
            return clear(), false;
        });
    }

}

if ( !globalThis.NPointer ) {
    globalThis.NPointer = Pointer.init();
}

export default Pointer;