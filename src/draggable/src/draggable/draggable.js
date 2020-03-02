import { UUID, Num, Arr, Obj, Dom, Any, Event, Locale } from "nano-js";

export default {

    name: 'NDraggable',

    model: {
        prop: 'items'
    },

    props: {

        items: {
            default()
            {
                return [];
            }
        },

        renderNode: {
            default()
            {
                return null;
            }
        },

        selected: {
            default()
            {
                return [];
            }
        },

        expanded: {
            default()
            {
                return [];
            }
        },

        group: {
            default()
            {
                return ['default'];
            },
            type: [Array]
        },

        safeZone: {
            default()
            {
                return (height) => height * 0.51;
            }
        },

        showEmpty: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        itemHeight: {
            default()
            {
                return 34;
            },
            type: [Number]
        },

        viewportHeight: {
            default()
            {
                return false;
            }
        },

        keyProp: {
            default()
            {
                return 'md5';
            },
            type: [String]
        },

        orderProp: {
            default()
            {
                return 'order';
            },
            type: [String]
        },

        uniqueProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        depthProp: {
            default()
            {
                return 'depth';
            },
            type: [String]
        },

        pathProp: {
            default()
            {
                return 'path';
            },
            type: [String]
        },

        indexProp: {
            default()
            {
                return 'index';
            },
            type: [String]
        },

        childProp: {
            default()
            {
                return 'children';
            },
            type: [String]
        },

        renderSelect: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        renderExpand: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        transformDrop: {
            default()
            {
                return (item) => item;
            }
        },

        disableMove: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        insertNode: {
            default()
            {
                return () => true;
            }
        },

        removeNode: {
            default()
            {
                return () => true;
            }
        },

        allowSelect: {
            default()
            {
                return () => true;
            }
        },

        allowDrag: {
            default()
            {
                return () => true;
            }
        },

        allowDrop: {
            default()
            {
                return () => true;
            }
        },

        wrapNode: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        updateDelay: {
            default()
            {
                return 100;
            },
            type: [Number]
        },

        preloadItems: {
            default()
            {
                return 20;
            },
            type: [Number]
        },

        bufferItems: {
            default()
            {
                return 20;
            },
            type: [Number]
        },

    },

    data()
    {
        return {
            veCopy: [],
            veItems: [],
            veCached: [],
            veSelfCached: [],
            veSelected: this.selected,
            veExpanded: this.expanded,
        };
    },

    provide()
    {
        return {
            NDraggable: this
        }
    },

    beforeMount()
    {
        this.$watch('veCopy', Any.debounce(this.exportItems,
            this.updateDelay), { deep: true });

        this.$watch('items', Any.debounce(this.importItems,
            this.updateDelay));

        this.importItems();
    },

    methods: {

        exportItems()
        {
            if ( Any.md5(this.items) === Any.md5(this.veCopy) ) {
                return;
            }

            this.$emit('input', this.veCopy);
        },

        importItems(items = null)
        {
            items = items || this.items;

            if ( Any.md5(items) === Any.md5(this.veCopy) ) {
                return;
            }

            this.veCopy = Obj.clone(items);

            this.refreshItems();
        },

        refreshItems()
        {
            this.veItems = this.itemReducer([], this.veCopy);
        },

        moveItems(event, target, strategy = 'inner')
        {
            target = this.getTarget(target);

            let ids = Arr.each(this.veCached, (item) => {
                return item[this.uniqueProp];
            });

            this.$emit('move', ids.join(','), target[this.uniqueProp], strategy);

            if ( this.disableMove ) {
                return;
            }

            let cacheBatches = this.getCachedBatches();

            let targetOrder = Num.int(target[this.orderProp].slice(0, -1).join('') ||
                target[this.indexProp] + 1);

            let batchedBefore = Obj.filter(Any.vals(cacheBatches).reverse(), (batch) => {
                return Num.int(batch['_key']) >= targetOrder;
            });

            let batchedAfter = Obj.filter(Any.vals(cacheBatches).reverse(), (batch) => {
                return Num.int(batch['_key']) < targetOrder;
            });

            if ( strategy === 'root' ) {

                Arr.each(this.veCached, (source) => {

                    let insertNode = Any.isFunction(this.insertNode) ?
                        this.insertNode(source, target) : this.insertNode;

                    if ( ! insertNode ) {
                        return;
                    }

                    Arr.push(this.veCopy, this.transformDrop(source.item));
                });

            }

            if ( strategy === 'inner' ) {

                let finalParent = Obj.get(this, target[this.pathProp]);

                let finalTarget = Arr.find(finalParent, {
                    [this.uniqueProp]: target[this.uniqueProp]
                });

                if ( finalTarget[this.childProp] === undefined ) {
                    finalTarget[this.childProp] = [];
                }

                Arr.each(cacheBatches, (batch) => {

                    delete batch['_key'];

                    Arr.each(batch, (source) => {

                        // Add item before last item added, also transform item
                        Arr.push(finalTarget[this.childProp], this.transformDrop(source.item));
                    });

                    Arr.each(batch, this.dropItem);
                });

                Arr.each(this.veCached, (source) => {

                    let insertNode = Any.isFunction(this.insertNode) ?
                        this.insertNode(source, target) : this.insertNode;

                    if ( ! insertNode ) {
                        return;
                    }

                    // Add item before last item added, also transform item
                    Arr.push(finalTarget[this.childProp], this.transformDrop(source.item));
                });
            }

            if ( strategy === 'after' ) {

                let delayedItems = [];

                Arr.each(Any.vals(batchedBefore), (batch) => {

                    delete batch['_key'];

                    Arr.each(batch, (source) => {
                        delayedItems.push(source)
                    });

                    Arr.each(batch, this.dropItem);
                });

                Arr.each(Any.vals(delayedItems), (source) => {

                    let finalTarget = Obj.get(this, target[this.pathProp]);

                    let finalIndex = Arr.findIndex(finalTarget, {
                        [this.uniqueProp]: target[this.uniqueProp]
                    });

                    // Add item before last item added, also transform item
                    Arr.insert(finalTarget, finalIndex + 1, this.transformDrop(source.item));
                });

                Arr.each(Any.vals(batchedAfter), (batch) => {

                    delete batch['_key'];

                    Arr.each(batch.reverse(), (source) => {

                        let finalTarget = Obj.get(this, target[this.pathProp]);

                        let finalIndex = Arr.findIndex(finalTarget, {
                            [this.uniqueProp]: target[this.uniqueProp]
                        });

                        // Add item before last item added, also transform item
                        Arr.insert(finalTarget, finalIndex + 1, this.transformDrop(source.item));
                    });

                    Arr.each(batch, this.dropItem);

                });

                Arr.each(this.veCached.reverse(), (source) => {

                    let insertNode = Any.isFunction(this.insertNode) ?
                        this.insertNode(source, target) : this.insertNode;

                    if ( ! insertNode ) {
                        return;
                    }

                    let finalTarget = Obj.get(this, target[this.pathProp]);

                    let finalIndex = Arr.findIndex(finalTarget, {
                        [this.uniqueProp]: target[this.uniqueProp]
                    });

                    // Add item before last item added, also transform item
                    Arr.insert(finalTarget, finalIndex + 1, this.transformDrop(source.item));
                });
            }

            if ( strategy === 'before' ) {

                let delayedItems = [];

                Arr.each(Any.vals(batchedBefore), (batch) => {

                    delete batch['_key'];

                    Arr.each(batch.reverse(), (source) => {
                        delayedItems.push(source)
                    });

                    Arr.each(batch, this.dropItem);
                });

                Arr.each(Any.vals(delayedItems).reverse(), (source) => {

                    let finalTarget = Obj.get(this, target[this.pathProp]);

                    let finalIndex = Arr.findIndex(finalTarget, {
                        [this.uniqueProp]: target[this.uniqueProp]
                    });

                    // Add item before last item added, also transform item
                    Arr.insert(finalTarget, finalIndex, this.transformDrop(source.item));
                });

                Arr.each(Any.vals(batchedAfter).reverse(), (batch) => {

                    delete batch['_key'];

                    let finalTarget = Obj.get(this, target[this.pathProp]);

                    let finalIndex = Arr.findIndex(finalTarget, {
                        [this.uniqueProp]: target[this.uniqueProp]
                    });

                    Arr.each(batch.reverse(), (source) => {

                        // Add item before last item added, also transform item
                        Arr.insert(finalTarget, finalIndex, this.transformDrop(source.item));
                    });

                    Arr.each(batch, this.dropItem);

                });

                Arr.each(this.veCached, (source) => {

                    let insertNode = Any.isFunction(this.insertNode) ?
                        this.insertNode(source, target) : this.insertNode;

                    if ( ! insertNode ) {
                        return;
                    }

                    let finalTarget = Obj.get(this, target[this.pathProp]);

                    let finalIndex = Arr.findIndex(finalTarget, {
                        [this.uniqueProp]: target[this.uniqueProp]
                    });

                    // Add item before last item added, also transform item
                    Arr.insert(finalTarget, finalIndex, this.transformDrop(source.item));
                });
            }

            Event.fire('draggable.done');
        },

        getCachedBatches()
        {
            let batches = Arr.reduce(this.veSelfCached, (merge, source) => {

                let batchKey = source[this.orderProp].slice(0, -1).join('') ||
                    source[this.indexProp] + 1;

                if ( ! Obj.has(merge, batchKey) ) {
                    merge[batchKey] = [];
                }

                let result = Obj.only(source, [
                    this.uniqueProp, this.pathProp, this.indexProp
                ]);

                result['item'] = Obj.clone(source.item);

                merge[batchKey].push(result);

                return merge;

            }, {});

            Arr.map(batches, (batch) => {

                let sorted = Arr.sort(batch, item => item[this.orderProp].join(''));

                return Arr.each(sorted, (item) => Obj.except(item, ['_key']));
            });

            return Obj.sort(batches, (batch) => {
                return Arr.first(batch)[this.orderProp].join('');
            });
        },

        dropItem(source)
        {
            Arr.remove(Obj.get(this, source[this.pathProp]), {
                [this.uniqueProp]: source[this.uniqueProp]
            });

            this.veCached = Arr.remove(this.veCached, {
                [this.uniqueProp]: source[this.uniqueProp]
            });

            this.veSelfCached = Arr.remove(this.veSelfCached, {
                [this.uniqueProp]: source[this.uniqueProp]
            });
        },

        dropItems()
        {
            Arr.each(this.veSelfCached, (source) => {

                let removeNode = Any.isFunction(this.removeNode) ?
                    this.removeNode(source) : this.removeNode;

                if ( ! removeNode ) {
                    return;
                }

                Arr.remove(Obj.get(this, source[this.pathProp]), {
                    [this.uniqueProp]: source[this.uniqueProp]
                });

            });

            this.clearItems();
            this.refreshItems();

            this.$emit('moved', this.veCopy);
        },

        clearItems()
        {
            this.veSelected = [];
            this.veCached = [];
            this.veSelfCached = [];

            this.removeDragCounter();
            this.removeDragIndicator();
        },

        cacheItems(items, group = [])
        {
            if ( Arr.intersect(group, this.group).length ) {
                this.veCached = Arr.each(items, (item) => Obj.clone(item));
            }
        },

        updateExpanded()
        {
            this.$emit('update:expanded', this.veExpanded);
        },

        expandItem(id)
        {
            if ( ! Any.isString(id) ) {
                id = id[this.uniqueProp];
            }

            Arr.toggle(this.veExpanded, id);

            this.refreshItems();
        },

        isExpanded(id)
        {
            if ( ! Any.isString(id) ) {
                id = id[this.uniqueProp];
            }

            return ! Arr.has(this.veExpanded, id);
        },

        updateSelected()
        {
            this.$emit('update:selected', this.veSelected);
        },

        dispatchSelected()
        {
            let selected = Arr.each(this.veSelected, (data) => {
                return this.getTarget(data);
            });

            Event.fire('draggable.start', this.veSelfCached = selected,
                this.group);
        },

        getTarget(unique)
        {
            if ( ! Any.isString(unique) ) {
                unique = unique[this.uniqueProp];
            }

            let target = Arr.find(this.veItems, {
                [this.uniqueProp]: unique
            });

            target['item'] = Obj.get(this, target[this.pathProp] + '.' +
                target[this.indexProp]);

            return target;
        },

        toggleItem(id, reset = false)
        {
            if ( ! Any.isString(id) ) {
                id = id[this.uniqueProp];
            }

            if ( reset ) {
                this.veSelected = [];
            }

            Arr.toggle(this.veSelected, id);

            this.updateSelected();
        },

        toggleAllItems(reset = true)
        {
            if ( reset ) {
                this.veSelected = [];
            }

            Arr.each(this.veCopy, (item) => {
                Arr.toggle(this.veSelected, item[this.uniqueProp]);
            });

            this.updateSelected();
        },

        selectItem(id, reset = false)
        {
            if ( ! Any.isString(id) ) {
                id = id[this.uniqueProp];
            }

            if ( reset ) {
                this.veSelected = [];
            }

            Arr.add(this.veSelected, id);

            this.updateSelected();
        },

        selectAllItems()
        {
            this.veSelected = Arr.each(this.veCopy,
                (item) => item[this.uniqueProp]);

            this.updateSelected();
        },

        unselectItem(id)
        {
            if ( ! Any.isString(id) ) {
                id = id[this.uniqueProp];
            }

            Arr.remove(this.veSelected, id);

            this.updateSelected();
        },

        unselectAllItems()
        {
            this.veSelected = [];

            this.updateSelected();
        },

        canSelect(element)
        {
            if ( Any.isString(element) ) {
                element = Arr.find(this.veItems, {
                    [this.uniqueProp]: element
                });
            }

            if ( ! this.veSelected.length ) {
                return true;
            }

            let first = Arr.find(this.veItems, {
                [this.uniqueProp]: Arr.first(this.veSelected)
            });

            if ( ! first || ! element ) {
                return false;
            }

            return element[this.depthProp] === first[this.depthProp];
        },

        isSelected(id)
        {
            if ( ! Any.isString(id) ) {
                id = id[this.uniqueProp];
            }

            return Arr.has(this.veSelected, id);
        },

        isAllSelected(onlyFirstDepth = false)
        {
            let items = onlyFirstDepth ?
                this.veCopy : this.veItems;

            let selected = Arr.reduce(items, (merge, item) => {
                return merge && Arr.has(this.veSelected, item[this.uniqueProp]);
            }, true);

            return selected && !! items.length;
        },

        isSelectable()
        {
            return !! this.veItems.length;
        },

        isIntermediate(onlyFirstDepth = false)
        {
            return ! this.isAllSelected(onlyFirstDepth)
                && !! this.veSelected.length;
        },

        canDrag(element)
        {
            return true;
        },

        canDrop(element)
        {
            let targetPath = element[this.pathProp] + '.' +
                element[this.indexProp];

            let selected = Arr.each(this.veSelected, (item) => {
                return Arr.find(this.veItems, { [this.uniqueProp]: item });
            });

            let result = Arr.filter(selected, (source) => {

                let sourcePath =  source[this.pathProp] + '.' +
                    source[this.indexProp];

                return targetPath.indexOf(`${sourcePath}.`) !== -1 ||
                    sourcePath === targetPath;
            });

            return ! result.length;
        },

        itemReducer(merge, items, depth = 0, path = 'veCopy', orders = [])
        {
            Arr.each(items, (item, index) => {

                let dragObject = {
                    [this.indexProp]: index,
                    [this.pathProp]: path,
                    [this.depthProp]: depth
                };

                dragObject[this.uniqueProp] = Obj.get(item, this.uniqueProp);

                if ( ! dragObject[this.uniqueProp] ) {
                    Obj.set(this, path + '.' + index + '.' + this.uniqueProp,
                        dragObject[this.uniqueProp] = UUID());
                }

                // Order prop to sort on drag
                dragObject[this.orderProp] = Arr.merge(orders, [index + 1]);

                // Md5 item to check for any changes
                dragObject[this.keyProp] = Any.md5(dragObject);


                Arr.push(merge, dragObject);

                if ( ! Arr.has(this.veExpanded, dragObject[this.uniqueProp]) ) {
                    return;
                }

                this.itemReducer(merge, Obj.get(item, this.childProp, []),
                    depth + 1, `${path}.${index}.${this.childProp}`, dragObject[this.orderProp]);

            });

            return merge;
        },

        createDragIndicator()
        {
            if ( this.dragIndicator ) {
                return;
            }

            this.dragIndicator = Dom.make('div', {
                classList: ['n-draggable__indicator']
            });

            this.dragIndicator.attr('data-ignore', true);

            this.dragIndicator.appendTo(this.$el);
        },

        updateDragIndicator(state = false, top = 0)
        {
            if ( ! this.dragIndicator ) {
                this.createDragIndicator();
            }

            if ( ! state ) {
                return this.dragIndicator.css({ visibility: 'hidden' });
            }

            this.dragIndicator.css({ visibility: 'visible', top: `${top}px` });
        },

        removeDragIndicator()
        {
            if ( this.dragIndicator ) {
                this.dragIndicator.get(0).remove();
            }

            delete this.dragIndicator;
        },

        createDragCounter(event)
        {
            if ( this.dragCounter ) {
                return;
            }

            this.dragCounter = Dom.make('div', {
                classList: ['n-draggable__counter']
            });

            this.dragCounter.html(
                `<span>${Locale.choice(':count Item|:count Items', this.veSelected.length)}</span>`
            );

            // Append dragimage to body
            this.dragCounter.appendTo(document.body);

            // Fix data transfer
            event.dataTransfer.setData('text/plain', '');

            if ( typeof event.dataTransfer.setDragImage !== 'function' ) {
                return;
            }

            // Set finally the drop image
            event.dataTransfer.setDragImage(this.dragCounter.get(0), 0, 0);
        },

        removeDragCounter()
        {
            if ( this.dragCounter ) {
                this.dragCounter.get(0).remove();
            }

            delete this.dragCounter;
        },

        /**
         * Event listeners
         */

        eventDragenter(event)
        {
            event.preventDefault();

            if ( Dom.find(event.target).closest(this.$el) ) {
                this.createDragIndicator(event);
            }
        },

        eventDragleave(event)
        {
            event.preventDefault();

            if ( Dom.find(event.target).closest(this.$el) ) {
                this.updateDragIndicator(false);
            }
        },

        eventDragend(event)
        {
            event.preventDefault();

            if ( Dom.find(event.target).closest(this.$el) ) {
                this.removeDragIndicator();
            }
        },

        eventEmptyDragenter(event)
        {
            event.preventDefault();
        },

        eventEmptyDragover(event)
        {
            event.preventDefault();

            Dom.find(this.$el).addClass('n-dragover');
        },

        eventEmptyDragleave(event)
        {
            Dom.find(this.$el).removeClass('n-dragover');
        },

        eventEmptyDragdrop(event)
        {
            event.preventDefault();

            let virtualItem = {
                [this.indexProp]: 0,
                [this.orderProp]: [0],
                [this.uniqueProp]: null
            };

            Dom.find(this.$el).removeClass('n-dragover');

            this.$emit('dragdrop', event, virtualItem, 'root');
        }

    },

    watch: {

        selected()
        {
            if ( this.selected !== this.veSelected ) {
                this.veSelected = this.selected;
            }
        },

        expanded()
        {
            if ( this.expanded !== this.veExpanded ) {
                this.veExpanded = this.expanded;
            }
        }

    },

    mounted()
    {
        this.$on('dragstart', this.dispatchSelected);
        this.$on('dragstart', this.createDragCounter);
        this.$on('dragstart', this.createDragIndicator);

        this.$on('dragdrop', this.moveItems);

        let ident = {
            _uid: this._uid
        };

        Event.bind('draggable.start', this.cacheItems, ident);
        Event.bind('draggable.stop', this.clearItems, ident);
        Event.bind('draggable.done', this.dropItems, ident);

        Dom.find(document).on('dragenter', this.eventDragenter, ident);
        Dom.find(document).on('dragleave', this.eventDragleave, ident);
        Dom.find(document).on('dragend', this.eventDragend, ident);
    },

    beforeDestroy()
    {
        let ident = {
            _uid: this._uid
        };

        Event.unbind('draggable.start', ident);
        Event.unbind('draggable.stop', ident);
        Event.unbind('draggable.done', ident);

        Dom.find(document).off('dragenter', null, ident);
        Dom.find(document).off('dragleave', null, ident);
        Dom.find(document).off('dragend', null, ident);
    },

    renderEmpty()
    {
        if ( ! this.showEmpty ) {
            return null;
        }

        let events = {
            dragenter: this.eventEmptyDragenter,
            dragover: this.eventEmptyDragover,
            dragleave: this.eventEmptyDragleave,
            dragdrop: this.eventEmptyDragdrop,
            drop: this.eventEmptyDragdrop
        };

        return (
            <div class="n-draggable__empty" on={events}>
                 <span>{ this.$slots.empty || this.trans('No entries') }</span>
            </div>
        );
    },

    renderItem(props)
    {
        let data = {
            key: props.value[this.keyProp], props
        };

        return this.$render('NDraggableItem', data, [
            this.$scopedSlots.default
        ]);
    },

    render($render)
    {
        this.$render = $render;

        if ( ! this.$slots.empty ) {
            this.$slots.empty = [this.ctor('renderEmpty')()];
        }

        let slots = Arr.each(this.$slots, (slot, name) => {
            return this.$render('template', { slot: name }, slot);
        });

        let props = Obj.assign(Obj.clone(this.$props), {
            items: this.veItems, renderNode: this.ctor('renderItem')
        });

        return this.$render('NVirtualscroller', {
            class: 'n-draggable', props
        }, slots);
    }

}
