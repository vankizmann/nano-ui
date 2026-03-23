import { onMounted, provide, SetupContext } from "vue";
import { Arr, Mix, Num, Obj, Run } from "@kizmann/pico-js";
import { ProtoController, Pointer } from "../../../root/index.ts";
import { NDragHandler } from "../drag/NDragHandler.ts";
import { NDragReciever } from "../drag/NDragReciever.ts";
import { NDraglistView } from "./NDraglistView.ts";
import { NDraglistData } from "./NDraglistData.ts";
import { NDragHelper } from "../helper/NDragHelper.ts";
import { NVirtualHelper } from "../helper/NVirtualHelper.ts";

export class NDraglistController extends ProtoController
{
    /**
     * @type {NDraglistController}
     */
    declare scope : NDraglistController;

    /**
     * @type {NDraglistData}
     */
    declare data : NDraglistData;

    /**
     * @type {NDraglistView}
     */
    declare view : NDraglistView;

    /**
     * @type {NDragReciever}
     */
    drag : NDragReciever;

    /**
     * @type {string}
     */
    selectbuffer : string;

    constructor(props : any, context : SetupContext)
    {
        super(props, context);

        [this.view, this.data] = [
            new NDraglistView(this),
            // @ts-ignore
            new NDraglistData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this.makeUID();

        this
            .cloneProp('current')
            .cloneProp('selected')
            .cloneProp('expanded')
            .cloneProp('cascade')
            .cloneProp('group');

        this.makeRef('virtualbar');

        // Make virtuals available (all items on one layer)
        this.makeData('virtuals', ...[
            NVirtualHelper.virtuals(this)
        ]);

        this.watchProp('items', () => {
            this.set('virtuals', NVirtualHelper.virtuals(this));
            this.update('selected', []);
        });

        // Make visibles available (all items except unexpanded)
        this.makeData('visibles', ...[
            NVirtualHelper.visibles(this)
        ]);

        this.watchData('virtuals', () => {
            this.set('visibles', NVirtualHelper.visibles(this));
        });

        this.watchData('expanded', () => {
            this.set('visibles', NVirtualHelper.visibles(this));
        });

        // Make relation available (first selected item)
        this.makeData('relation', ...[
            this.buildRelation()
        ]);

        this.watchData('selected', () => {
            this.set('relation', this.buildRelation());
        });

        this.makeData('index', ...[
            this.buildIndex()
        ]);

        this.watchData('visibles', () => {
            this.set('index', this.buildIndex());
        });

        this.watchData('current', () => {
            this.set('index', this.buildIndex());
        });

        if ( this.data.cascade.length ) {
            this.buildCurrent();
        }

        if ( this.data.group == null ) {
            this.set('group', [this.uid]);
        }

        if ( this.data.allowGroups == null ) {
            this.set('allowGroups', this.data.group);
        }

        provide('NDraglist', this.instance);

        return this;
    }

    onMounted()
    {
        const { uid } = this;

        Pointer.bind(uid, 'keydown', (e : any, v : any) => {

            const self = v.target?.closest(...[
                `[dropzone="${uid}"]`
            ]);

            if ( self && e.which === 38 || self && e.which === 37 ) {
                this.setPrevCurrent();
            }

            if ( self && e.which === 40 || self && e.which === 39 ) {
                this.setNextCurrent();
            }

        });

        let config : any = {
            grid: this.data.grid,
        };

        config.dragmove = (...args : any[]) => {
            // @ts-ignore
            return this.onDragmove(...args);
        };

        config.dragdrop = (...args : any[]) => {
            // @ts-ignore
            return this.onDragdrop(...args);
        };

        config.dragend = (...args : any[]) => {
            // @ts-ignore
            return this.onDragend(...args);
        };

        this.drag = NDragHandler.append(uid, config);
    }

    onUnmounted()
    {
        NDragHandler.remove(this.uid);
        Pointer.unbind(this.uid);
    }

    getValue(item : any, fallback : any = null)
    {
        const { data } = this;

        if ( item == null ) {
            return fallback;
        }

        const uid = Obj.get(...[
            item, data.uniqueProp
        ]);

        if ( uid == null ) {
            return fallback;
        }

        return Arr.find(data.virtuals, { uid }, fallback);

    }

    getItem(value : any, fallback : any = null)
    {
        const { data } = this;

        if ( value == null ) {
            return fallback;
        }

        return Obj.get(...[
            data, value.route, fallback
        ]);
    }

    buildIndex()
    {
        const { data } = this;

        if ( data.current == null ) {
            return -1;
        }

        const uid = Obj.get(...[
            data.current, data.uniqueProp
        ]);

        if ( uid == null ) {
            return -1;
        }

        return Arr.findIndex(data.visibles, {
            uid
        });
    }

    buildRelation()
    {
        let relation = Arr.find(this.data.virtuals, (val : any) => {
            return Arr.has(this.data.selected, val.uid);
        },);

        return Object.freeze({ depth: -1, ...relation });
    }

    buildCurrent()
    {
        const { data } = this;

        const items = Arr.cascadeFind(data.items, data.childProp, (item : any) => {
            return Arr.last(data.cascade) === item[data.uniqueProp];
        });

        if ( ! Mix.isEmpty(items) ) {
            this.update('current', items[0]);
        }
    }

    onCurrentclick(e : any, item : any)
    {
        let depth = this.data.relation?.depth;

        if ( depth === -1 ) {
            depth = item.depth;
        }

        const fn = () => {
            Run.frame(() => Pointer.stop());
        };

        if ( e && e.metaKey && depth === item.depth ) {
            fn(), this.onSelectclick(e, item);
        }

        this.update('cascade', [
            ...item.cascade
        ]);

        this.update('current', ...[
            this.getItem(item)
        ]);
    }

    onSelectclick(e : any, item : any)
    {
        const { data } = this;

        let selected = Arr.toggle(...[
            Arr.clone(data.selected), item.uid
        ]);

        let first = Arr.find(data.visibles, (node : any) => {
            return Arr.has(data.selected, node.uid);
        });

        if ( ! e.shiftKey || ! first || item.depth ) {
            return this.update('selected', selected);
        }

        const items = Arr.filter(data.visibles, (node : any) => {
            return ! node.depth;
        });

        let last = item;

        if ( first.index > last.index ) {
            [last, first] = [first, item];
        }

        const target = Arr.slice(...[
            items, first.index, last.index + 1
        ]);

        selected = Arr.extract(target, 'uid');

        return this.update('selected', selected);
    }

    onExpandclick(e : any, item : any)
    {
        this.update('expanded', ...[
            Arr.toggle(this.data.expanded, item.uid)
        ]);
    }

    onDragmove(e : any, result : any, config : any, els : any)
    {
        const { data } = this;

        if ( !Arr.has(config.group, data.allowGroups) ) {
            return result;
        }

        if ( result.uids.item ) {
            result = this.nodeDragmove(e, result, config, els);
        }

        if ( result.mode || this.data.rootSkip ) {
            return result;
        }

        result = {
            ...result, target: els.zone, mode: 'append'
        };

        if ( !this.nodeAllowDrop(null, result, config) ) {
            result.mode = 'deny';
        }

        return result;
    }

    onDragdrop(e : any, result : any, config : any)
    {
        let clone = {
            items: Arr.clone(this.data.items),
        };

        let transformDrop = this.data.transformDrop;

        if ( typeof transformDrop !== 'function' ) {
            transformDrop = (value : any) => value;
        }

        Arr.each(config.items, ({ item }, i) => {
            config.items[i]['item'] = transformDrop(item);
        });

        const args : [...any] = [
            this, clone, result, config
        ];

        if ( result.mode === 'append' ) {
            // @ts-ignore
            clone = NDragHelper.appendNodes(...args);
        }

        if ( result.mode === 'inside' ) {
            // @ts-ignore
            clone = NDragHelper.insideNodes(...args);
        }

        if ( result.mode === 'before' ) {
            // @ts-ignore
            clone = NDragHelper.beforeNodes(...args);
        }

        if ( result.mode === 'after' ) {
            // @ts-ignore
            clone = NDragHelper.afterNodes(...args);
        }

        this.emit('update:items', clone.items);
        this.update('current', null);
        this.update('selected', []);

        return result;
    }

    onDragend(e : any, result : any, config : any)
    {
        if ( this.uid === result.uids.zone ) {
            return result;
        }

        let clone = {
            items: Arr.clone(this.data.items),
        };

        const args : [...any] = [
            this, clone, result, config
        ];

        // @ts-ignore
        NDragHelper.unlinkNodes(...args);

        // @ts-ignore
        NDragHelper.removeNodes(...args);

        this.emit('update:items', clone.items);
        this.update('current', null);
        this.update('selected', []);

        return result;
    }

    nodeDragstart(e : any, item : any)
    {
        const { data } = this;

        let selected = Arr.clone(data.selected);

        if ( !Arr.has(selected, [item.uid]) ) {
            selected = [item.uid];
        }

        const virtuals = Arr.each(selected, (uid : any) => {
            return Arr.find(data.virtuals, { uid });
        });

        const items = Arr.each(virtuals, (value : any) => {
            return { value, item: Obj.get(data, value.route) };
        });

        this.drag.dragstart(e, {
            uid: this.uid, items, group: Obj.clone(data.group)
        });

        Run.frame(() => {
            this.update('selected', selected);
        });
    }

    nodeDragmove(e : any, result : any, config : any, els : any)
    {
        const { data } = this;

        if ( data.itemSkip ) {
            return result;
        }

        const item = Arr.find(data.virtuals, {
            uid: result.uids.item
        });

        if ( !item ) {
            return result;
        }

        result = Obj.assign(result, {
            target: els.item, offset: data.itemOffset * item.depth
        });

        const node = {
            item, value: Obj.get(data, item.route)
        };

        let rainbow = Arr.each(config.items ?? [], (el : any) => {
            return Arr.has(item.cascade, el.value.uid);
        });

        if ( Arr.has(rainbow, true) ) {
            return { ...result, mode: 'self' };
        }

        if ( !this.nodeAllowDrop(node, result, config) ) {
            result.mode = 'deny';
        }

        if ( !result.mode ) {
            result.mode = this.drag.getMode(e, els.item, data.safezone);
        }

        return result;
    }

    nodeAllowDrop(target : any, result : any, config : any)
    {
        let allowDrop = this.data.allowDrop;

        if ( typeof allowDrop !== 'function' ) {
            allowDrop = () => allowDrop;
        }

        let rainbow = Arr.each(config.items, (node : any) => {
            return !!allowDrop(node, target, result.mode);
        });

        return !Arr.has(rainbow, false);
    }

    nodeAllowSelect(value : any)
    {
        const { data } = this;

        if ( data.relation.depth === -1 ) {
            return true;
        }

        if ( data.relation.depth !== value.depth ) {
            return false;
        }

        let allowSelect = data.allowSelect;

        if ( typeof allowSelect !== 'function' ) {
            allowSelect = () => allowSelect;
        }

        return allowSelect({
            value, item: Obj.get(data, value.route)
        });
    }

    setTotalCurrent(total: number)
    {
        const { data } = this;

        const index = Arr.findIndex(data.visibles, (node : any) => {
            return node.total === total;
        });

        this.ncx('virtualbar')?.scrollTo(index);

        this.update('cascade', [
            ...data.visibles[index]['cascade']
        ]);

        this.update('current', ...[
            this.getItem(data.visibles[index])
        ]);
    }

    setPrevCurrent()
    {
        const { data } = this;

        const index = Arr.prev(...[
            data.visibles, data.index,
        ]);

        this.ncx('virtualbar')?.scrollTo(index);

        this.update('cascade', [
            ...data.visibles[index]['cascade']
        ]);

        this.update('current', ...[
            this.getItem(data.visibles[index])
        ]);
    }

    setNextCurrent()
    {
        const { data } = this;

        const index = Arr.next(...[
            data.visibles, data.index,
        ]);

        this.ncx('virtualbar')?.scrollTo(index);

        this.update('cascade', [
            ...data.visibles[index]['cascade']
        ]);

        this.update('current', ...[
            this.getItem(data.visibles[index])
        ]);
    }

    selectAll()
    {
        const { items, selected } = this.data;

        let ids = Arr.extract(...[
            items, this.data.uniqueProp
        ]);

        if ( selected.length === items.length ) {
            ids = [];
        }

        this.update('selected', ids);
    }

    selectState(): number
    {
        const { items, selected } = this.data;

        if ( selected.length === 0 ) {
            return 0;
        }

        if ( selected.length === items.length ) {
            return 2;
        }

        return 1;
    }

    scrollToIndex(index : number)
    {
        this.ncx('virtualbar')?.scrollTo(index);
    }

}

export default NDraglistController;