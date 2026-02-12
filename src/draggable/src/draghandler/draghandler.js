import { Run, Num, Arr, Obj, Mix, Dom, Event, Locale, Hash } from "@kizmann/pico-js";

window.dragMods = [];

class NDragCounter
{

    $el = null;

    constructor()
    {
        this.$el = Dom.make('div', {
            classList: ['n-draggable__counter']
        });

        Dom.ready(() => {
            this.$el.appendTo(document.body);
        });
    }

    get(event, count)
    {
        // Update dragover color/type
        this.update();

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

    update()
    {
        window.dragMods = window.keyMods;

        let classList = [
            'n-draggable__counter'
        ];

        if ( Arr.has(window.dragMods, 18) ) {
            classList.push('n-modify--alt');
        }

        if ( Arr.has(window.dragMods, 17) ) {
            classList.push('n-modify--ctrl');
        }

        if ( Arr.has(window.dragMods, 91) ) {
            classList.push('n-modify--meta');
        }

        this.$el.attr('class', classList.join(' '));
    }

}

window.DragCounter = new NDragCounter;

class NDragIndicator
{

    $el = null;

    parent = null;

    constructor(parent)
    {
        this.$el = Dom.make('div', {
            classList: ['n-draggable__indicator']
        });

        this.$el.appendTo(this.parent = parent);
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
            this.show(el, strategy) : this.hide();


        return strategy;
    }

    show(el, strategy)
    {
        let offsetTop = Dom.find(el).offsetTop(this.parent);

        let style = {
            top: offsetTop || 1
        };

        if ( strategy === 'after' ) {
            style.top = offsetTop + Dom.find(el).height();
        }

        this.$el.style(Obj.map(style, (item) => item + 'px'));
    }

    hide()
    {
        this.$el.style(null);
    }

    destroy()
    {
        this.$el.get(0).remove();
    }

}

class NDraghandler
{

    uid = null;

    rootNode = null;
    childNodes = {};

    dropNodes = [];
    cacheNodes = [];

    strategy = 'nodrop';
    frames = 0;
    timeout = 0;
    dragcount = {};

    constructor(rootNode)
    {
        this.rootNode = rootNode;
    }

    bindRoot(frame = null)
    {
        this.DragIndicator = new NDragIndicator(frame || this.rootNode.$el);

        if ( window.DragCache ) {
            this.bindDragstart.call(this, ...window.DragCache);
        }

        let key = this.rootNode._.uid + '-droot-';

        Dom.find(this.rootNode.$el).on('dragenter', Run.framebuffer((event) => {
            this.onDragenterRoot(event);
        }, key + 'dragenter', 140));

        Dom.find(this.rootNode.$el).on('dragover', Run.framebuffer((event) => {
            this.onDragoverRoot(event);
        }, key + 'dragover', 240));

        Dom.find(this.rootNode.$el).on('dragleave', Run.framebuffer((event) => {
            this.onDragleaveRoot(event);
        }, key + 'dragleave', 340));

        Dom.find(this.rootNode.$el).on('dragend', Run.framebuffer((event) => {
            this.onDragendRoot(event);
        }, key + 'dragend', 440));

        Dom.find(this.rootNode.$el).on('drop', Run.framebuffer((event) => {
            this.onDragdropRoot(event);
        }, key + 'drop', 540));

        Dom.find(this.rootNode.$el).on('dragdrop', Run.framebuffer((event) => {
            this.onDragdropRoot(event);
        }, key + 'dragdrop', 640));

        Event.bind('NDrag:start', this.bindDragstart.bind(this),
            this.rootNode.uid);

        Event.bind('NDrag:end', this.bindDragend.bind(this),
            this.rootNode.uid);

        Event.bind('NDrag:drop', this.bindDragdrop.bind(this),
            this.rootNode.uid);
    }

    unbindRoot()
    {
        let events = [
            'dragstart',
            'dragenter',
            'dragover',
            'dragleave',
            'dragend',
            'drop',
            'dragdrop',
        ];

        Dom.find(this.rootNode.$el).off(events);

        Event.unbind('NDrag:start', this.rootNode.uid);
        Event.unbind('NDrag:end', this.rootNode.uid);
        Event.unbind('NDrag:drop', this.rootNode.uid);
    }

    onDragenterRoot(event)
    {
        event.preventDefault();

        Dom.find(this.rootNode.$el).find('.n-dragover')
            .remClass('n-dragover');
    }

    onDragoverRoot(event)
    {
        let isNode = Dom.find(event.target)
            .closest('.n-draglist-item');

        if ( isNode || !this.cacheNodes.length ) {
            return;
        }

        event.preventDefault();

        // if ( this.frames && Date.now() - this.frames < 35 ) {
        //     return;
        // }

        let allowDrop = this.rootNode.allowDrop;

        if ( !Mix.isFunction(allowDrop) ) {
            allowDrop = () => this.rootNode.allowDrop;
        }

        let rainbow = Arr.each(this.cacheNodes, (node) => {
            return !!allowDrop(node, null, this.strategy);
        });

        this.strategy = 'root';

        if ( Arr.has(rainbow, false) ) {
            this.strategy = 'nodrop';
        }

        this.DragIndicator.hide();

        if ( this.strategy !== 'nodrop' ) {
            Dom.find(this.rootNode.$el).addClass('n-dragover');
        } else {
            Dom.find(this.rootNode.$el).remClass('n-dragover');
        }

        if ( this.strategy === 'nodrop' ) {
            Dom.find(this.rootNode.$el).addClass('n-nodrop');
        } else {
            Dom.find(this.rootNode.$el).remClass('n-nodrop');
        }

        this.frames = Date.now();
    }

    onDragleaveRoot(event)
    {
        Dom.find(this.rootNode.$el)
            .remClass(['n-dragover', 'n-nodrop']);

        Dom.find(this.rootNode.$el).find('.n-dragover')
            .remClass('n-dragover');
    }

    onDragendRoot(event)
    {
        if ( !this.cacheNodes.length ) {
            return;
        }

        Dom.find(this.rootNode.$el)
            .remClass(['n-dragover', 'n-nodrop']);

        if ( this.strategy !== 'root' ) {
            return;
        }

        Event.fire('NDrag:end');
    }

    onDragdropRoot(event)
    {
        if ( !this.cacheNodes.length ) {
            return;
        }

        Dom.find(this.rootNode.$el)
            .remClass(['n-dragover', 'n-nodrop']);

        if ( this.strategy !== 'root' ) {
            return;
        }

        event.preventDefault();

        this.moveNodes(null, this.strategy);

        Event.fire('NDrag:drop');
    }

    bindDragstart(group, cache)
    {
        if ( Arr.has(this.rootNode.allowGroups, group) ) {
            this.cacheNodes = JSON.parse(JSON.stringify(cache));
        }
    }

    bindDragend()
    {
        this.dragcount = {};

        this.cacheNodes = this.dropNodes = [];
    }

    bindDragdrop(...args)
    {
        if ( !this.dropNodes.length ) {
            return;
        }

        this.rootNode.tempSelected = [];

        this.rootNode.$emit('update:selected',
            this.rootNode.tempSelected);

        if ( !this.rootNode.removeNode ) {
            return;
        }

        let clone = {
            items: Obj.clone(this.rootNode.items)
        };

        this.unlinkNodes(clone);
        this.removeNodes(clone);

        this.rootNode.$emit('update:items', clone.items);
    }

    onDragstartNode(event, node)
    {
        if ( !this.rootNode.isSelected(node) ) {
            this.rootNode.$emit('update:selected',
                this.rootNode.tempSelected = [node.uid]);
        }

        let cache = Arr.each(this.rootNode.tempSelected, (id) => {
            return Arr.find(this.rootNode.virtuals, { [this.rootNode.uniqueProp]: id });
        });

        window.DragCounter.get(event, cache.length);

        Arr.map(cache, (value) => {
            return { value, item: Obj.get(this.rootNode, value.route) };
        });

        Event.fire('NDrag:start', this.rootNode.group,
            this.dropNodes = cache);

        window.DragCache = [
            this.rootNode.group, this.dropNodes
        ];

        this.dragcount[node.uid] = 0;
    }

    onDragenterNode(event, node)
    {
        event.preventDefault();

        if ( !this.dragcount[node.uid] ) {
            this.dragcount[node.uid] = 0;
        }

        this.dragcount[node.uid] ++;
    }

    onDragoverNode(event, node)
    {
        if ( !this.cacheNodes.length ) {
            return;
        }

        event.preventDefault();

        // if ( this.frames && Date.now() - this.frames < 45 ) {
        //     return;
        // }

        let safezone = this.rootNode
            .safezone(node.$el.clientHeight);

        this.strategy = this.DragIndicator
            .resolve(event, safezone, node.$el);

        let targetNode = {
            value: node.value, item: node.item
        };

        let allowDrop = this.rootNode.allowDrop;

        if ( !Mix.isFunction(allowDrop) ) {
            allowDrop = () => this.rootNode.allowDrop;
        }

        let rainbow = Arr.each(this.cacheNodes, (node) => {
            return !!allowDrop(node, targetNode, this.strategy);
        });

        let isInSelf = Arr.has(node.value.cascade,
            this.rootNode.tempSelected);

        if ( this.rootNode.tempSelected.length ) {
            rainbow.push(!isInSelf);
        }

        if ( Arr.has(rainbow, false) ) {
            this.strategy = 'nodrop';
        }

        if ( this.strategy === 'nodrop' ) {
            this.DragIndicator.hide();
        }

        if ( this.strategy !== 'nodrop' ) {
            Dom.find(node.$el).addClass('n-dragover');
            Dom.find(node.$el).remClass('n-nodrop');
        }

        if ( this.strategy === 'nodrop' ) {
            Dom.find(node.$el).remClass('n-dragover');
            Dom.find(node.$el).addClass('n-nodrop');
        }

        this.frames = Date.now();
    }

    onDragleaveNode(event, node)
    {
        this.dragcount[node.uid] --;

        if ( this.dragcount[node.uid] !== 0 ) {
            return;
        }

        Dom.find(node.$el).remClass(['n-dragover', 'n-nodrop']);

        this.DragIndicator.hide();
    }

    onDragendNode(event, node)
    {
        Dom.find(node.$el).remClass(['n-dragover', 'n-nodrop']);

        this.DragIndicator.hide();

        Event.fire('NDrag:end');

        window.DragCache = null;
    }

    onDragdropNode(event, node)
    {
        if ( !this.cacheNodes.length ) {
            return;
        }

        Dom.find(node.$el).remClass(['n-dragover', 'n-nodrop']);

        this.DragIndicator.hide();

        if ( this.strategy === 'nodrop' ) {
            return;
        }

        event.preventDefault();

        this.moveNodes(node, this.strategy);

        Event.fire('NDrag:drop');
    }

    bindNode(node)
    {
        if ( this.childNodes[node.uid] ) {
            this.unbindNode(node);
        }

        let $handle = Dom.find(node.$el);

        if ( this.rootNode.handle ) {
            $handle = $handle.find('[draggable]');
        }

        let $el = Dom.find(node.$el);

        $handle.on('dragstart', (event) => {
            this.onDragstartNode(event, node);
        });

        let key = this.rootNode._.uid + '-dnode-';

        $el.on('dragenter', Run.framebuffer((event) => {
            this.onDragenterNode(event, node);
        }, key + 'dragenter', 150));

        $el.on('dragover', Run.framebuffer((event) => {
            this.onDragoverNode(event, node);
        }, key + 'dragover', 250));

        $el.on('dragleave', Run.framebuffer((event) => {
            this.onDragleaveNode(event, node);
        }, key + 'dragleave', 350));

        $el.on('dragend', Run.framebuffer((event) => {
            this.onDragendNode(event, node);
        }, key + 'dragend', 450));

        $el.on('drop', Run.framebuffer((event) => {
            this.onDragdropNode(event, node);
        }, key + 'drop', 550));

        $el.on('dragdrop', Run.framebuffer((event) => {
            this.onDragdropNode(event, node);
        }, key + 'dragdrop', 650));

        this.childNodes[node.uid] = node;
    }

    unbindNode(node)
    {
        let $handle = Dom.find(node.$el);

        if ( this.rootNode.handle ) {
            $handle = $handle.find('[draggable]');
        }

        $handle.off('dragstart');

        let $el = Dom.find(node.$el);

        $el.off([
            'dragenter',
            'dragover',
            'dragleave',
            'dragend',
            'drop',
            'dragdrop',
        ]);

        $el.remClass(['n-dragover', 'n-nodrop']);

        this.DragIndicator.hide();

        delete this.childNodes[node.uid];
    }

    moveNodes(target, strategy) {

        if ( this.rootNode.items !== undefined ) {
            return this.moveNodesMany(target, strategy);
        }

        if ( this.rootNode.item !== undefined ) {
            return this.moveNodesOne(target, strategy);
        }

        return null;
    }

    moveNodesOne(target, strategy)
    {
        let clone = {
            items: [Obj.clone(this.rootNode.item)]
        };

        if ( this.rootNode.insertNode  ) {
            clone = this.moveNodesRoot(clone, target);
        }

        if ( this.rootNode.removeNode ) {
            clone = this.removeNodes(clone);
        }

        let sources = Arr.each(this.cacheNodes, (node) => {
            return node.item[this.rootNode.uniqueProp];
        });

        let source = Arr.first(this.cacheNodes);

        this.rootNode.$emit('move', Obj.get(source, 'value.id'),
            Obj.get(target, 'uid'), strategy);

        this.rootNode.$emit('moveRaw',
            source, target, strategy);

        this.rootNode.$emit('update:item',
            Obj.get(source, 'item'));
    }

    moveNodesMany(target, strategy)
    {
        let clone = {
            items: Obj.clone(this.rootNode.items)
        };

        if ( this.rootNode.removeNode ) {
            this.unlinkNodes(clone);
        }

        if ( !this.dropNodes.length ) {
            Arr.each(this.cacheNodes, (value, key) => {
                this.cacheNodes[key]['item'] = this.rootNode.transformDrop(value.item);
            });
        }

        if ( this.rootNode.insertNode && strategy === 'root' ) {
            clone = this.moveNodesRoot(clone, target);
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
            return node.item[this.rootNode.uniqueProp];
        });

        this.dropNodes = this.rootNode.tempSelected = [];

        let eventName = 'move';

        if ( Arr.has(window.dragMods, 18) ) {
            eventName = 'moveAlt';
        }

        if ( Arr.has(window.dragMods, 17) ) {
            eventName = 'moveCtrl';
        }

        if ( Arr.has(window.dragMods, 91) ) {
            eventName = 'moveMeta';
        }

        this.rootNode.$emit(eventName, sources,
            Obj.get(target, 'uid'), strategy);

        this.rootNode.$emit(eventName + 'Raw',
            this.cacheNodes, target, strategy);

        this.rootNode.$emit('update:selected',
            this.rootNode.tempSelected);

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
            return !!node;
        });

        Arr.map(clone[prop], (node) => {

            if ( !node[this.rootNode.childProp] ) {
                return node;
            }

            return this.removeNodes(node,
                this.rootNode.childProp);
        });

        return clone;
    }

    moveNodesRoot(clone)
    {
        if ( this.rootNode.disableMove ) {
            return clone;
        }

        Arr.each(this.cacheNodes, (node) => {
            clone.items.push(node.item);
        });

        return clone;
    }

    moveNodesInto(clone, target)
    {
        if ( this.rootNode.disableMove ) {
            return clone;
        }

        let targetRoute = [
            target.value.route,
            this.rootNode.childProp
        ].join('.');

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
        if ( this.rootNode.disableMove ) {
            return clone;
        }

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
        if ( this.rootNode.disableMove ) {
            return clone;
        }

        let targetRoute = target.value.route
            .replace(/\.[0-9]+$/, '');

        let items = Obj.get(clone, targetRoute);

        Arr.each(this.cacheNodes, (node, index) => {
            items.splice(target.value.index + index + 1, 0, node.item);
        });

        Obj.set(clone, targetRoute, items);

        return clone;
    }

    copyNode(node)
    {
        let clone = {
            items: Obj.clone(this.rootNode.items)
        };

        let targetRoute = node.value.route
            .replace(/\.[0-9]+$/, '');

        let items = Obj.get(clone, targetRoute);

        let target = Obj.except(node.item, [], {
            [this.rootNode.uniqueProp]: Hash.uuid()
        });

        items.splice(node.value.index + 1,
            0, target);

        Obj.set(clone, targetRoute, items);

        this.rootNode.$emit('update:items', clone.items);
    }

    removeNode(node)
    {
        let clone = {
            items: Obj.clone(this.rootNode.items)
        };

        let targetRoute = node.value.route
            .replace(/\.[0-9]+$/, '');

        let items = Obj.get(clone, targetRoute);

        items.splice(node.value.index, 1);

        Obj.set(clone, targetRoute, items);

        this.rootNode.$emit('update:items', clone.items);
    }

    reduce(items, ...props)
    {
        return Arr.reduce(items, (merge, item, index) => {
            return this.reduceItem(merge, item, Num.int(index), ...props);
        }, []);
    }

    reduceItem(merge, item, index, depth = 0, route = 'items', cascades = [])
    {
        // Get a unique id
        let unique = Obj.get(item,
            this.rootNode.uniqueProp, Hash.uuid());

        // Add unique to cascader
        let tempCascade = Arr.merge(cascades,
            [unique]);

        let virtual = {
            index: index,
            depth: depth,
            route: [route, index].join('.'),
            parent: Arr.last(cascades),
            cascade: tempCascade,
        };

        virtual[this.rootNode.uniqueProp] = unique;

        let children = Obj.get(item,
            this.rootNode.childProp, []);

        if ( Mix.isEmpty(children) ) {
            return Arr.merge(merge, [virtual]);
        }

        let childRoute = [
            route, index,
            this.rootNode.childProp
        ].join('.');

        let props = [
            depth + 1, childRoute, tempCascade
        ]

        return Arr.merge(merge, [virtual],
            this.reduce(children, ...props));
    }

}

export default NDraghandler;