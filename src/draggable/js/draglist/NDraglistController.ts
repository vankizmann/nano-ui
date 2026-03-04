import { onMounted, SetupContext } from "vue";
import { Arr, Mix, Num, Obj, Run } from "@kizmann/pico-js";
import { ProtoController, Pointer } from "../../../root/index.ts";
import { NDragHandler } from "../drag/NDragHandler.ts";
import { NDragReciever } from "../drag/NDragReciever.ts";
import { NDraglistView } from "./NDraglistView.ts";
import { NDraglistData } from "./NDraglistData.ts";

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
            .cloneProp('group');

        this.makeRef('virtualbar');

        // Make virtuals available (all items on one layer)
        this.makeData('virtuals', ...[
            this.buildVirtuals()
        ]);

        this.watchProp('items', () => {
            this.set('virtuals', this.buildVirtuals());
            this.update('selected', []);
        });

        // Make visibles available (all items except unexpanded)
        this.makeData('visibles', ...[
            this.buildVisibles()
        ]);

        this.watchData('virtuals', () => {
            this.set('visibles', this.buildVisibles());
        });

        this.watchData('expanded', () => {
            this.set('visibles', this.buildVisibles());
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

        if ( this.data.group == null ) {
            this.set('group', [this.uid]);
        }

        return this;
    }

    onMounted()
    {
        const { uid } = this;

        Pointer.bind(uid, 'keydown', (e : any, v : any) => {

            const self = v.target.closest(...[
                `[dropzone="${uid}"]`
            ]);

            if ( self && e.which === 38 ) {
                this.setPrevCurrent();
            }

            if ( self && e.which === 40 ) {
                this.setNextCurrent();
            }

        });

        let config : any = {};

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
        console.log('unmounted', this.uid);
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

    buildVisibles()
    {
        let visibles = Arr.clone(this.data.virtuals);

        visibles = Arr.filter(visibles, (node : any) => {
            return Arr.contains(this.data.expanded, node.cascade.slice(0, -1));
        });

        return visibles;
    }

    buildRelation()
    {
        let relation = Arr.find(this.data.virtuals, (val : any) => {
            return Arr.has(this.data.selected, val.uid);
        },);

        return Object.freeze({ depth: -1, ...relation });
    }

    buildVirtuals(items : any = null, ...args : any[])
    {
        if ( items == null ) {
            items = Arr.clone(this.data.items);
        }

        items = Arr.reduce(items, (merge : any, item : any, index : any) => {
            return this.extractValues(merge, item, index, ...args);
        }, []);

        return items;
    }

    extractValues(merge : any, item : any, index : any, depth : number = 0, path : string[] = ['items'], prev : any[] = [])
    {
        const { data } = this;

        const uid = Obj.get(item, ...[
            data.uniqueProp,
        ]);

        const parent = Arr.last(prev);

        const cascade = [
            ...prev, uid
        ];

        const route = [
            ...path, index
        ];

        let virtual : any = {
            uid, index, depth, route, cascade, parent,
        };

        let childs = Obj.get(item, ...[
            data.childProp, []
        ]);

        // Add child length
        virtual.childs = childs.length;

        if ( Mix.isEmpty(childs) ) {
            return [...merge, virtual];
        }

        const croute = [
            ...path, Num.int(index), data.childProp
        ];

        const props = [
            depth + 1, croute, cascade
        ];

        childs = this.buildVirtuals(childs, ...props);

        return Arr.merge(...[
            merge, [virtual], childs
        ]);
    }

    onDragmove(e : any, result : any, config : any, els : any)
    {
        const { data } = this;

        if ( !Arr.has(config.group, data.group) ) {
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
            transformDrop = (value) => value;
        }

        Arr.each(config.items, ({ item }, i) => {
            config.items[i]['item'] = transformDrop(item);
        });

        if ( result.mode === 'append' ) {
            clone = this.appendNodes(clone, result, config);
        }

        if ( result.mode === 'inside' ) {
            clone = this.insideNodes(clone, result, config);
        }

        if ( result.mode === 'before' ) {
            clone = this.beforeNodes(clone, result, config);
        }

        if ( result.mode === 'after' ) {
            clone = this.afterNodes(clone, result, config);
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

        this.unlinkNodes(clone, result, config);
        this.removeNodes(clone, result, config);

        this.emit('update:items', clone.items);
        this.update('current', null);
        this.update('selected', []);

        return result;
    }

    unlinkNodes(clone : any, result : any, config : any)
    {
        if ( !this.data.removeNode ) {
            return clone;
        }

        Arr.each(config.items, ({ value }) => {
            Obj.set(clone, value.route, null);
        });

        return clone;
    }

    removeNodes(clone : any, result : any, config : any)
    {
        if ( !this.data.removeNode ) {
            return clone;
        }

        const { childProp } = this.data;

        const fn = (value : any, prop : string = 'items') => {
            return Arr.filter(value?.[prop]);
        };

        clone.items = Arr.recursive(fn(clone), childProp, (node : any) => {
            return Obj.set(node, childProp, fn(node, childProp));
        });

        return clone;
    }

    appendNodes(clone : any, result : any, config : any)
    {
        if ( !this.data.insertNode ) {
            return clone;
        }

        if ( config.uid === this.uid ) {
            this.unlinkNodes(clone, result, config);
        }

        Arr.each(config.items, ({ item }) => {
            Arr.append(clone.items, item);
        });

        if ( config.uid === this.uid ) {
            clone = this.removeNodes(clone, result, config);
        }

        return clone;
    }

    insideNodes(clone : any, result : any, config : any)
    {
        const { data } = this;

        if ( !this.data.insertNode ) {
            return clone;
        }

        let value = Arr.find(data.virtuals, {
            uid: result.uids.item
        });

        if ( value == null ) {
            return clone;
        }

        if ( config.uid === this.uid ) {
            this.unlinkNodes(clone, result, config);
        }

        const path = [
            ...value.route, data.childProp
        ];

        const childs = Obj.get(clone, path, []);

        Arr.each(config.items, ({ item }) => {
            Arr.append(childs, item);
        });

        Obj.set(clone, path, childs);

        if ( config.uid === this.uid ) {
            this.removeNodes(clone, result, config);
        }

        return clone;
    }

    beforeNodes(clone : any, result : any, config : any)
    {
        const { data } = this;

        if ( !this.data.insertNode ) {
            return clone;
        }

        let value = Arr.find(data.virtuals, {
            uid: result.uids.item
        });

        if ( value == null ) {
            return clone;
        }

        if ( config.uid === this.uid ) {
            this.unlinkNodes(clone, result, config);
        }

        const path = [
            ...Arr.slice(value.route, 0, -1)
        ];

        const childs = Obj.get(clone, path, []);

        Arr.each(config.items.reverse(), ({ item }) => {
            Arr.insert(childs, value.index, item);
        });

        if ( config.uid === this.uid ) {
            this.removeNodes(clone, result, config);
        }

        return clone;
    }

    afterNodes(clone : any, result : any, config : any)
    {
        const { data } = this;

        if ( !this.data.insertNode ) {
            return clone;
        }

        let value = Arr.find(data.virtuals, {
            uid: result.uids.item
        });

        if ( value == null ) {
            return clone;
        }

        if ( config.uid === this.uid ) {
            this.unlinkNodes(clone, result, config);
        }

        const path = [
            ...Arr.slice(value.route, 0, -1)
        ];

        const childs = Obj.get(clone, path, []);

        Arr.each(config.items.reverse(), ({ item }) => {
            Arr.insert(childs, value.index + 1, item);
        });

        if ( config.uid === this.uid ) {
            this.removeNodes(clone, result, config);
        }

        return clone;
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
            data.selected = selected;
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

    setPrevCurrent()
    {
        const { data } = this;

        const index = Arr.prev(...[
            data.visibles, data.index,
        ]);

        this.ncx('virtualbar')?.scrollTo(index);

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

    selectState()
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
}

export default NDraglistController;