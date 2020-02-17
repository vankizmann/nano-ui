import { UUID, Num, Arr, Obj, Dom, Any, Event, Locale } from "nano-js";

export default {

    name: 'NDraggable',

    model: {
        prop: 'items'
    },

    inject: {

        NDraggable: {
            default: undefined
        },

        NDraggableTree: {
            default: undefined
        }

    },

    props: {

        items: {
            default()
            {
                return [];
            }
        },

        displayItems: {
            default()
            {
                return null;
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
                return (height) => height * 0.25;
            }
        },

        showEmpty: {
            default()
            {
                return true;
            }
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

        renderCollapse: {
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

        bufferItems: {
            default()
            {
                return 8;
            },
            type: [Number]
        },

        updateDelay: {
            default()
            {
                return 1500;
            },
            type: [Number]
        }

    },

    data()
    {
        return {
            veCopy: [], veItems: [], veSelected: [], veCollapsed: [], veCached: []
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
        this.veCopy = Obj.clone(this.items);

        this.$watch('veCopy', Any.debounce(() => {
            this.$emit('input', this.items = Obj.clone(this.veCopy));
        }, this.updateDelay), { deep: true });

        this.refreshItems();

        this.initialized = true;
    },

    methods: {

        refreshItems()
        {
            this.veItems = this.itemReducer([], this.veCopy);
        },

        moveItems(event, target, strategy = 'inner')
        {
            let ids = Arr.each(this.veCached, (item) => {
                return item[this.uniqueProp];
            });

            this.$emit('move', ids.join(','), target[this.uniqueProp], strategy);

            if ( this.disableMove ) {
                return;
            }

            let insertNode = Any.isFunction(this.insertNode) ?
                this.insertNode(target) : this.insertNode;

            if ( strategy === 'inner' && insertNode ) {

                let finalParent = Obj.get(this, target[this.pathProp]);

                let finalTarget = Arr.find(finalParent, {
                    [this.uniqueProp]: target[this.uniqueProp]
                });

                if ( finalTarget[this.childProp] === undefined ) {
                    finalTarget[this.childProp] = [];
                }

                Arr.each(this.veCached, (source) => {

                    let dropItem = this.dropItemBefore(target, source);

                    Arr.push(finalTarget[this.childProp], this.transformDrop(dropItem));
                });
            }

            if ( strategy === 'after' && insertNode ) {

                let finalTarget = Obj.get(this, target[this.pathProp]);

                let finalIndex = Arr.findIndex(finalTarget, {
                    [this.uniqueProp]: target[this.uniqueProp]
                });

                Arr.each(this.veCached, (source, count) => {

                    let dropItem = this.dropItemBefore(target, source);

                    // Add item before last item added, also transform item
                    Arr.insert(finalTarget, finalIndex + Num.int(count) + 1,
                        this.transformDrop(dropItem));
                });
            }

            if ( strategy === 'before' && insertNode ) {

                let finalTarget = Obj.get(this, target[this.pathProp]);

                let finalIndex = Arr.findIndex(finalTarget, {
                    [this.uniqueProp]: target[this.uniqueProp]
                });

                Arr.each(this.veCached, (source, count) => {

                    let dropItem = this.dropItemBefore(target, source);

                    // Add item before last item added, also transform item
                    Arr.insert(finalTarget, finalIndex + Num.int(count),
                        this.transformDrop(dropItem));
                });
            }

            Event.fire('draggable.done');
        },

        dropItemBefore(target, source)
        {
            let sourceOrder = Num.int(source[this.orderProp]
                .reverse().join(''));

            let targetOrder = Num.int(target[this.orderProp]
                .reverse().join(''));

            if ( sourceOrder < targetOrder ) {
                return source.item;
            }

            let item = Arr.clone(source.item);

            Arr.remove(Obj.get(this, source[this.pathProp]), {
                [this.uniqueProp]: source[this.uniqueProp]
            });

            Arr.remove(this.veSelected, {
                [this.uniqueProp]: source[this.uniqueProp]
            });

            return item;
        },

        dropItems()
        {
            let removeNode = Any.isFunction(this.removeNode) ?
                this.removeNode() : this.removeNode;

            if ( removeNode ) {

                Arr.each(this.veSelected, (item) => {

                    Arr.remove(Obj.get(this, item[this.pathProp]), {
                        [this.uniqueProp]: item[this.uniqueProp]
                    });

                });
            }

            this.removeDragCounter();
            this.removeDragIndicator();
            this.clearItems();
            this.refreshItems();
        },

        clearItems()
        {
            this.veSelected = [];
            this.veCached = [];
        },

        cacheItems(items)
        {
            this.veCached = Arr.each(items, (item) => Obj.clone(item));
        },

        collapseItem(id)
        {
            if ( ! Any.isString(id) ) {
                id = id[this.uniqueProp];
            }

            if ( ! Arr.has(this.veCollapsed, id) ) {
                Arr.remove(this.veSelected, { [this.uniqueProp]: id });
            }

            Arr.toggle(this.veCollapsed, id);

            this.refreshItems();
        },

        isCollapsed(id)
        {
            if ( ! Any.isString(id) ) {
                id = id[this.uniqueProp];
            }

            return ! Arr.has(this.veCollapsed, id);
        },

        dispatchSelected()
        {
            Event.fire('draggable.start', this.veSelected);
        },

        toggleItem(element, reset = false)
        {
            if ( reset ) {
                this.veSelected = [];
            }

            let index = Arr.findIndex(this.veSelected, {
                [this.uniqueProp]: element[this.uniqueProp]
            });

            if ( index !== -1 ) {
                Arr.splice(this.veSelected, index);
            }

            if ( index === -1 ) {
                Arr.push(this.veSelected, element);
            }

        },

        selectItem(element, reset = false)
        {
            if ( reset ) {
                this.veSelected = [];
            }

            Arr.add(this.veSelected, element, {
                [this.uniqueProp]: element[this.uniqueProp]
            });

        },

        unselectItem(element)
        {
            Arr.remove(this.veSelected, {
                [this.uniqueProp]: element[this.uniqueProp]
            });
        },

        canSelect(element)
        {
            if ( ! this.veSelected.length ) {
                return true;
            }

            let first = Arr.first(this.veSelected);

            return element[this.depthProp] === first[this.depthProp];
        },

        isSelected(id)
        {
            if ( ! Any.isString(id) ) {
                id = id[this.uniqueProp];
            }

            return Arr.has(this.veSelected, { [this.uniqueProp]: id });
        },

        canDrag(element)
        {
            return true;
        },

        canDrop(element)
        {
            let targetPath = `${element[this.pathProp]}.` +
                `${element[this.indexProp]}`;

            let result = Arr.filter(this.veSelected, (source) => {

                let sourcePath = `${source[this.pathProp]}.` +
                    `${source[this.indexProp]}`;

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
                    Obj.set(this, `${path}.${index}.${this.uniqueProp}`, dragObject[this.uniqueProp] = UUID());
                }

                // Order prop to sort on drag
                dragObject[this.orderProp] = Arr.merge(orders, [index + 1]);

                // Md5 item to check for any changes
                dragObject[this.keyProp] = Any.md5(dragObject);


                Arr.push(merge, dragObject);

                if ( ! Arr.has(this.veCollapsed, dragObject[this.uniqueProp]) ) {
                    return;
                }

                merge = this.itemReducer(merge, Obj.get(item, this.childProp, []),
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
                return this.dragIndicator.css({ display: 'none' });
            }

            this.dragIndicator.css({ display: 'block', top: `${top}px` });
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

            if ( ! Dom.find(event.target).closest(this.$el) ) {
                this.updateDragIndicator(false);
            }
        },

        eventDragend(event)
        {
            event.preventDefault();

            if ( Dom.find(event.target).closest(this.$el) ) {
                this.removeDragIndicator(event);
            }
        }

    },

    mounted()
    {
        this.$on('dragstart', this.dispatchSelected);
        this.$on('dragstart', this.createDragCounter);
        this.$on('dragstart', this.createDragIndicator);

        this.$on('dragdrop', this.moveItems);

        Event.bind('draggable.start', this.cacheItems);
        Event.bind('draggable.stop', this.clearItems);
        Event.bind('draggable.done', this.dropItems);

        Dom.find(document).on('dragenter', this.eventDragenter, { _uid: this._uid });
        Dom.find(document).on('dragleave', this.eventDragleave, { _uid: this._uid });
        Dom.find(document).on('dragend', this.eventDragend, { _uid: this._uid });
    },

    renderEmpty()
    {
        if ( this.$slots.empty ) {
            return this.$slots.empty;
        }

        return (
            <div class="n-draggable__empty">
                 <span>{ this.trans('No entries') }</span>
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

        if ( Any.isEmpty(this.veCopy) ) {
            return this.ctor('renderEmpty')();
        }

        let props = Obj.assign(Obj.clone(this.$props), {
            items: this.veItems, renderNode: this.ctor('renderItem')
        });

        return this.$render('NRenderList', {
            class: 'n-draggable', props
        });
    }

}
