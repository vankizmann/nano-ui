import { Arr, Obj, Num, Any, Dom, Event, Locale, UUID } from "nano-js";
import { openBlock } from "vue";

class NDragCounter {

    $el = null;

    constructor()
    {
        this.$el = Dom.make('div', {
            classList: ['n-draggable__counter']
        });

        this.$el.appendTo(document.body);
    }

    get(event, count)
    {
        this.$el.html(
            `<span>${Locale.choice(':count Item|:count Items', count)}</span>`
        );

        // Fix data transfer
        event.dataTransfer.setData('text/plain', '');

        if ( typeof event.dataTransfer.setDragImage !== 'function' ) {
            return;
        }

        // Set finally the drop image
        event.dataTransfer.setDragImage(this.$el.get(0), 0, 0);
    }

}

global.DragCounter = new NDragCounter;

class NDragIndicator {

    $el = null;

    parent = null;

    constructor()
    {
        this.$el = Dom.make('div', {
            classList: ['n-draggable__indicator']
        });

        this.$el.appendTo(document.body);
    }

    resolve(event, safezone, el, strategy = 'inner')
    {
        let rect = el.getBoundingClientRect();

        if ( event.clientY < rect.y + safezone ) {
            strategy = 'before';
        }

        if ( event.clientY > rect.y + rect.height - safezone ) {
            strategy = 'after';
        }

        if ( Dom.find(el).hasClass('n-expanded') ) {
            strategy = strategy === 'after' ? 'inner' : strategy;
        }

        Arr.has(['before', 'after'], strategy) ? 
            this.show(rect, strategy) : this.hide();
    

        return strategy;
    }

    show(rect, strategy)
    {
        let style = {
            top: rect.y, left: rect.x, width: rect.width
        };

        if ( strategy === 'after' ) {
            style.top = rect.y + rect.height;
        }

        this.$el.css(Obj.map(style, (item) => item + 'px'));
    }

    hide()
    {
        this.$el.css(null);
    }

    destroy()
    {
        this.$el.get(0).remove();
    }

}

global.DragIndicator = new NDragIndicator();

class NDraghandler {

    uniqueProp = 'id';
    indexProp = 'index';
    routeProp = 'route';
    depthProp = 'depth';
    orderProp = 'order';
    parentProp = 'parent';
    childProp = 'children';
    cascadeProp = 'cascade';

    rootNode = null;
    childNodes = {};

    dropNodes = [];
    cacheNodes = [];

    strategy = 'nodrop';
    frames = 0;

    constructor (rootNode)
    {
        this.rootNode = rootNode;

        Event.bind('NDrag:start', this.bindDragstart.bind(this));
        Event.bind('NDrag:end', this.bindDragend.bind(this));
        Event.bind('NDrag:drop', this.bindDragdrop.bind(this));
    }

    bindDragstart(group, cache)
    {
        if ( Arr.has(this.rootNode.allowGroups, group) ) {
            this.cacheNodes = cache;
        }
    }

    bindDragend()
    {
        this.cacheNodes = this.dropNodes = [];
    }

    bindDragdrop(...args)
    {
        if ( this.dropNodes.length ) {
            this.rootNode.tempSelected = [];
        }
    }

    onDragstart(event, node)
    {
        if ( ! this.rootNode.isSelected(node.value) ) {
            this.rootNode.tempSelected = [node.value.id];
        }

        let cache = Arr.each(this.rootNode.tempSelected, (id) => {
            return Arr.find(this.rootNode.virtuals, { id });
        });

        global.DragCounter.get(event, cache.length);

        Arr.map(cache, (value) => {
            return {
                value, item: Obj.get(this.rootNode, value.route)
            };
        });

        Event.fire('NDrag:start', this.rootNode.group, 
            this.dropNodes = cache);
    }

    onDragenter(event, node)
    {
        event.preventDefault();
    }

    onDragover(event, node)
    {
        if ( ! this.cacheNodes.length ) {
            return;
        }

        event.preventDefault();

        if ( this.frames && new Date - this.frames < 35 ) {
            return;
        }

        let safezone = this.rootNode
            .safezone(node.$el.clientHeight);

        this.strategy = global.DragIndicator
            .resolve(event, safezone, node.$el);

        let targetNode = {
            value: node.value, item: node.item
        };

        let allowDrop = this.rootNode.allowDrop;

        if ( ! Any.isFunction(allowDrop) ) {
            allowDrop = () => this.rootNode.allowDrop;
        }

        let rainbow = Arr.each(this.cacheNodes, (node) => {
            return !! allowDrop(node, targetNode, this.strategy);
        });

        let isInSelf = Arr.has(node.value.cascade, 
            this.rootNode.tempSelected);

        rainbow.push(! isInSelf);

        if ( Arr.has(rainbow, false) ) {
            this.strategy = 'nodrop';
        }

        if ( this.strategy === 'nodrop' ) {
            global.DragIndicator.hide();
        }

        if ( this.strategy !== 'nodrop' ) {
            Dom.find(node.$el).addClass('n-dragover');
        } else {
            Dom.find(node.$el).removeClass('n-dragover');
        }

        if ( this.strategy === 'nodrop' ) {
            Dom.find(node.$el).addClass('n-nodrop');
        } else {
            Dom.find(node.$el).removeClass('n-nodrop');
        }

        this.frames = new Date;
    }

    onDragleave(event, node)
    {
        Dom.find(node.$el).removeClass('n-dragover n-nodrop');

        global.DragIndicator.hide();
    }

    onDragend(event, node)
    {
        Dom.find(node.$el).removeClass('n-dragover n-nodrop');

        global.DragIndicator.hide();

        Event.fire('NDrag:end');
    }

    onDragdrop(event, node)
    {
        Dom.find(node.$el).removeClass('n-dragover n-nodrop');

        global.DragIndicator.hide();

        if ( this.strategy === 'nodrop' ) {
            return Event.fire('NDrag:end');
        }

        event.preventDefault();

        this.moveNodes(node, this.strategy);

        Event.fire('NDrag:drop');
        Event.fire('NDrag:end');
    }

    bindNode(node)
    {
        let $el = Dom.find(node.$el);

        if ( this.rootNode.handle ) {
            $el = handle.find('[draggable]');
        }

        $el.on('dragstart', (event) => {
            this.onDragstart(event, node);
        });

        $el.on('dragenter', (event) => {
            this.onDragenter(event, node);
        });

        $el.on('dragover', (event) => {
            this.onDragover(event, node);
        });

        $el.on('dragleave', (event) => {
            this.onDragleave(event, node);
        });

        $el.on('dragend', (event) => {
            this.onDragend(event, node);
        });

        $el.on('drop', (event) => {
            this.onDragdrop(event, node);
        });

        $el.on('dragdrop', (event) => {
            this.onDragdrop(event, node);
        });

        this.childNodes[node.value.id] = node;
    }

    unbindNode(node)
    {
        let $el = Dom.find(node.$el);

        if ( this.rootNode.handle ) {
            $el = handle.find('[draggable]');
        }

        $el.off([
            'dragstart', 
            'dragenter', 
            'dragover', 
            'dragleave', 
            'dragend', 
            'dragdrop', 
            'drop'
        ]);

        Dom.find(node.$el).removeClass('n-dragover n-nodrop');

        global.DragIndicator.hide();

        delete this.childNodes[node.value.id];
    }

    moveNodes(target, strategy)
    {
        let clone = {
            items: Obj.clone(this.rootNode.items)
        };

        if ( this.rootNode.removeNode ) {
            this.unlinkNodes(clone);
        }

        if ( this.rootNode.insertNode && strategy === 'inner' ) {
            clone = this.moveNodesInto(clone, target);
        }

        if ( this.rootNode.insertNode && strategy === 'before' ) {
            clone = this.moveNodesBefore(clone, target);
        }

        if ( this.rootNode.insertNode && strategy === 'after' ) {
            clone = this.moveNodesAfter(clone, target);
        }

        if ( this.rootNode.removeNode ) {
            clone = this.removeNodes(clone);
        }

        let sources = Arr.each(this.cacheNodes, (node) => {
            return node.value.id;
        });

        this.rootNode.$emit('move', sources, 
            target.value.id, strategy);

        this.rootNode.$emit('moveraw', this.cacheNodes, 
            target, strategy);

        this.rootNode.$emit('update:items', clone.items);
    }

    unlinkNodes(clone)
    {
        Arr.each(this.dropNodes, (node) => {
            Obj.set(clone, node.value.route, null);
        });
    }

    removeNodes(clone, prop = 'items')
    {
        clone[prop] = Arr.filter(clone[prop], (node) => {
            return !! node;
        });

        Arr.map(clone[prop], (node) => {

            if ( ! node[this.childProp] ) {
                return node;
            }

            return this.removeNodes(node, 
                this.childProp);
        });

        return clone;
    }

    moveNodesInto(clone, target)
    {
        let targetRoute = [target.value.route, 
            this.childProp].join('.');

        let children = Obj.get(clone, 
            targetRoute, []);

        Arr.each(this.cacheNodes, (node) => {
            children.push(node.item);
        });

        Obj.set(clone, targetRoute, children);

        return clone;
    }

    moveNodesBefore(clone, target)
    {
        let targetRoute = target.value.route
            .replace(/\.[0-9]+$/, '');

        let items = Obj.get(clone, targetRoute);

        Arr.each(this.cacheNodes, (node, index) => {
            items.splice(target.value.index + index, 0, node.item);
        });

        Obj.set(clone, targetRoute, items);

        return clone;
    }

    moveNodesAfter(clone, target)
    {
        let targetRoute = target.value.route
            .replace(/\.[0-9]+$/, '');

        let items = Obj.get(clone, targetRoute);

        Arr.each(this.cacheNodes, (node, index) => {
            items.splice(target.value.index + index + 1, 0, node.item);
        });

        Obj.set(clone, targetRoute, items);

        return clone;
    }







    reduce(items, ...props) {
        return Arr.reduce(items, (merge, item, index) => 
            this.reduceItem(merge, item, Num.int(index), ...props), []);
    }

    reduceItem(merge, item, index, depth = 0, route = 'items', orders = [], cascades = [])
    {
        // Get a unique id
        let unqiue = Obj.get(item, 
            this.uniqueProp, UUID());

        // Add unique to cascader
        let tempCascade = Arr.merge(cascades, 
            [unqiue]);

        // Push index to item
        let tempOrders = Arr.merge(orders, [index + 1]);

        let virtual = {
            [this.uniqueProp]: unqiue,
            [this.indexProp]: index,
            [this.depthProp]: depth,
            [this.routeProp]: [route, index].join('.'),
            [this.parentProp]: Arr.last(cascades),
            [this.orderProp]: tempOrders,
            [this.cascadeProp]: tempCascade,
        };

        let children = Obj.get(item, this.childProp, []);

        if ( Any.isEmpty(children) ) {
            return Arr.merge(merge, [virtual]);
        }

        let childRoute = [route, index, 
            this.childProp].join('.');

        let props = [
            depth + 1, childRoute, tempOrders, tempCascade
        ]

        return Arr.merge(merge, [virtual], 
            this.reduce(children, ...props));
    }

}

export default NDraghandler;