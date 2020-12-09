import { UUID, Num, Arr, Obj, Dom, Any, Event, Locale } from "nano-js";

export default {

    // name: 'NDraggable',

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

        current: {
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

        allowGroups: {
            default()
            {
                return this.group;
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

        itemOffset: {
            default()
            {
                return 30;
            },
            type: [Number]
        },

        viewportHeight: {
            default()
            {
                return false;
            }
        },

        scrollTopOnChange: {
            default()
            {
                return true;
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

        cascadeProp: {
            default()
            {
                return 'cascade';
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

        ghostMode: {
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

        allowCurrent: {
            default()
            {
                return true;
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

        keyDebounce: {
            default()
            {
                return 100;
            },
            type: [Number]
        },

        loadingInit: {
            default()
            {
                return 0;
            }
        },

        loadingDelay: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        loadingMax: {
            default()
            {
                return 1250;
            },
            type: [Number]
        },

        loadingMin: {
            default()
            {
                return 350;
            },
            type: [Number]
        },

        useRenderCache: {
            default()
            {
                return true;
            },
            type: [Boolean]
        }

    },

    data()
    {
        return {
            veInview: false,
            veLoad: true,
            veCopy: [],
            veItems: [],
            veKeyBuffer: [],
            veCurrent: this.current,
            veSelected: this.selected,
            veExpanded: this.expanded
        };
    },

    provide()
    {
        return {
            NDraggable: this
        }
    },

    methods: {

        getParentById(unique)
        {
            let item = Arr.find(this.veItems, {
                [this.uniqueProp]: unique
            });

            return Obj.get(this.veCopy, item[this.pathProp]
                .replace(/\..*?$/, ''));
        },

        scrollTo(y = 0)
        {
            this.$refs.vscroller.scrollTop(y);
        },

        startLoading()
        {
            if ( this.loadingInit && this.veLoad ) {
                return this.addLoader(this.loadingInit);
            }

            if ( ! this.loadingDelay ) {
                return;
            }

            let itemDiff = this.veItems.length -
                (this.veLoadLength || 0);

            let loadingTime = (itemDiff * Math.sqrt(itemDiff * 0.5)) *
                this.loadingDelay;

            this.veLoadLength = this.veItems.length;

            if ( loadingTime <= 0 || loadingTime <= this.loadingMin ) {
                return;
            }

            this.addLoader(Math.min(loadingTime, this.loadingMax));
        },

        addLoader(delay)
        {
            if ( ! this.$el ) {
                return Any.delay(() => this.addLoader(delay), 50);
            }

            this.veLoad = false;

            Any.delay(() => {
                Dom.find(this.$el).addClass('n-load');
            }, 0);

            Any.delay(() => {
                Dom.find(this.$el).removeClass('n-load');
            }, delay)
        },

        pushItem(item, index = null)
        {
            if ( index === null ) {
                index = Obj.get(this.veCurrent, this.depthProp, 1) ? this.veCopy.length :
                    Obj.get(this.veCurrent, this.indexProp) + 1;
            }

            this.veCopy.splice(index, 0, item);

            this.refreshItems();
        },

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

            if ( this.$refs.vscroller && this.scrollTopOnChange ) {
                this.$refs.vscroller.scrollTop(0);
            }

            this.veCopy = Obj.clone(items);

            this.refreshItems();
        },

        refreshItems()
        {
            this.veItems = this.itemReducer([], this.veCopy);

            if ( ! Any.isEmpty(this.loadingDelay) ) {
                this.startLoading();
            }

            this.refreshCurrent();

            this.$emit('hook:refreshed');
        },

        moveItems(event, target, strategy = 'inner')
        {
            target = this.getTarget(target);

            let ids = Arr.each(this.veCached, (item) => {
                return item[this.uniqueProp];
            });

            if ( Any.isEmpty(ids) ) {
                return;
            }

            this.$emit('move', ids.join(','), target[this.uniqueProp], strategy);
            this.$emit('move-code', this.veCached, target, strategy);

            if ( this.disableMove ) {
                return;
            }

            let cacheBatches = this.getCachedBatches();

            let targetOrder = target[this.indexProp] + 1;

            if ( target[this.orderProp] && target[this.orderProp].length > 1 ) {
                targetOrder = Num.int(target[this.orderProp].slice(0, -1).join(''));
            }

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

            // Indicate update items
            this.veModified = true;

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

                this.veModified = true;
            });

            if ( this.veModified ) {
                this.refreshItems();
            }
        },

        clearItems()
        {
            this.veCached = [];
            this.veSelfCached = [];

            if ( this.veSelected.length ) {
                this.veSelected = [];
                this.updateSelected();
            }

            if ( this.veModified ) {
                this.$emit('moved', this.veCopy);
            }

            this.veModified = false;

            this.removeDragCounter();
            this.removeDragIndicator();
        },

        cacheItems(items, group = ['default'])
        {
            if ( Arr.intersect(group, this.allowGroups).length ) {
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
            this.updateExpanded();
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

            this.veSelfCached = Arr.clone(selected);

            Event.fire('draggable.start', selected, this.group);
        },

        getTarget(unique)
        {
            if ( ! Any.isString(unique) ) {
                unique = unique[this.uniqueProp];
            }

            let target = Arr.find(this.veItems, {
                [this.uniqueProp]: unique
            });

            let defaultTarget = {
                [this.pathProp]: 'veCopy',
                [this.indexProp]: 0,
                [this.uniqueProp]: unique,
            };

            if ( ! target ) {
                return defaultTarget;
            }

            target['item'] = Obj.get(this, target[this.pathProp] + '.' +
                target[this.indexProp]);

            return target;
        },

        highlightItem(value, prop = null)
        {
            if ( ! prop ) {
                prop = this.uniqueProp;
            }

            if ( ! Any.isString(value) ) {
                value = value[prop];
            }

            let finalProps = [];

            Arr.recursive(this.items, this.childProp, (item, cascade) => {

                if ( item[prop] !== value ) {
                    return;
                }

                finalProps.push(item[this.uniqueProp]);

                let keys = Arr
                    .each(cascade, (sub) => {
                        return sub[this.uniqueProp];
                    })
                    .filter((item) => {
                        return this.veExpanded.indexOf(item) === -1;
                    });

                this.veExpanded = Arr.merge(this.veExpanded, keys);
            });

            if ( ! finalProps.length ) {
                return;
            }

            this.updateExpanded();
            this.refreshItems();

            this.$nextTick(() => {
                this.highlightTimer(finalProps);
            });
        },

        highlightTimer(finalProps = [])
        {
            clearTimeout(this.highlightDelay);

            Dom.find(this.$el).find('.n-highlight')
                .removeClass('n-highlight');

            Arr.each(finalProps, (unique, index) => {

                if ( ! index ) {
                    this.scrollToItem(unique);
                }

                Dom.find(this.$el).find(`[data-id="${unique}"]`)
                    .addClass('n-highlight');
            });

            this.highlightDelay = setTimeout(() => {
                Dom.find(this.$el).find('.n-highlight')
                    .removeClass('n-highlight');
            }, 5000);
        },

        scrollToItem(unique)
        {
            if ( ! Any.isString(unique) ) {
                unique = unique[this.uniqueProp];
            }

            let index = Arr.findIndex(this.veItems, {
                [this.uniqueProp]: unique
            });

            // Get viewport height
            let height = Dom.find(this.$el).height();

            // Get scrolltop from virtual scroller
            let scrollY = this.$refs.vscroller.scrollTop();

            // Row is inview
            let veInview = scrollY < this.itemHeight * index &&
                scrollY + height > this.itemHeight * (index + 1);

            if ( veInview ) {
                return;
            }

            // New scrolltop value
            scrollX = this.itemHeight * index;

            this.$refs.vscroller.scrollTop(scrollX);
        },

        isCurrent(unique)
        {
            if ( ! this.veCurrent ) {
                return false;
            }

            if ( ! Any.isString(unique) ) {
                unique = unique[this.uniqueProp];
            }

            return this.veCurrent[this.uniqueProp] === unique;
        },

        refreshCurrent()
        {
            if ( ! this.veCurrent || ! this.veCurrent[this.uniqueProp] ) {
                return;
            }

            this.setCurrent(this.veCurrent[this.uniqueProp]);
        },

        updateCurrent(current)
        {
            this.$emit('update:current', this.veCurrent = current);
        },

        setCurrent(unique)
        {
            let current = this.getTarget(unique);

            let isSameCurrent = Any.md5(current) ===
                Any.md5(this.veCurrent);

            if ( isSameCurrent ) {
                return;
            }

            this.updateCurrent(current);
        },

        setDefaultCurrent()
        {
            let current = this.getTarget(this.veItems[0]);

            let isSameCurrent = Obj.get(current, this.uniqueProp) ===
                Obj.get(this.veCurrent, this.uniqueProp);

            if ( isSameCurrent ) {
                return;
            }

            this.updateCurrent(current);
        },

        currentDblclick()
        {
            if ( ! this.veCurrent ) {
                return null;
            }

            this.$emit('row-dblclick', this.veCurrent);
        },

        currentCollapse()
        {
            if ( ! this.veCurrent ) {
                return null;
            }

            this.expandItem(this.veCurrent);
        },

        currentPrev()
        {
            let index = 0;

            if ( ! this.veCurrent ) {
                return this.setDefaultCurrent();
            }

            index = Arr.findIndex(this.veItems, {
                [this.uniqueProp]: this.veCurrent[this.uniqueProp]
            });

            index--;

            if ( index < 0 ) {
                index = this.veItems.length - 1;
            }

            // Get viewport height
            let height = Dom.find(this.$el).height();

            // Get scrolltop from virtual scroller
            let scrollY = this.$refs.vscroller.scrollTop();

            // Row is inview
            let veInview = scrollY < this.itemHeight * index &&
                scrollY + height > this.itemHeight * (index + 1);

            if ( ! veInview ) {

                // New scrolltop value
                scrollX = this.itemHeight * index;

                this.$refs.vscroller.scrollTop(scrollX);
            }

            let current = this.getTarget(this.veItems[index]);

            this.updateCurrent(current);
        },

        currentNext()
        {
            let index = 0;

            if ( ! this.veCurrent ) {
                return this.setDefaultCurrent();
            }

            index = Arr.findIndex(this.veItems, {
                [this.uniqueProp]: this.veCurrent[this.uniqueProp]
            });

            index++;

            if ( index > this.veItems.length - 1 ) {
                index = 0;
            }

            // Get viewport height
            let height = Dom.find(this.$el).height();

            // Get scrolltop from virtual scroller
            let scrollY = this.$refs.vscroller.scrollTop();

            // Row is inview
            let veInview = scrollY < this.itemHeight * index &&
                scrollY + height > this.itemHeight * (index + 1);

            if ( ! veInview ) {

                // New scrolltop value
                scrollX = (this.itemHeight * (index + 1)) - height;

                this.$refs.vscroller.scrollTop(scrollX);
            }

            let current = this.getTarget(this.veItems[index]);

            this.updateCurrent(current);
        },

        removeItem(value)
        {
            let target = Obj.get(this, value[this.pathProp]);

            Arr.removeIndex(target, value[this.indexProp]);

            this.refreshItems();
        },

        copyItem(value)
        {
            let target = Obj.get(this, value[this.pathProp]);

            let item = Obj.assign({}, value.veItem, {
                [this.uniqueProp]: UUID()
            });

            Arr.insert(target, value[this.indexProp] + 1, item);

            this.refreshItems();
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

        itemReducer(merge, items, depth = 0, path = 'veCopy', orders = [], cascade = [])
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
                dragObject[this.orderProp] = Arr.merge(orders, [
                    index + 1
                ]);

                // Order prop to sort on drag
                dragObject[this.cascadeProp] = Arr.merge(cascade, [
                    dragObject[this.uniqueProp]
                ]);

                // Md5 item to check for any changes
                dragObject[this.keyProp] = Any.md5(dragObject);

                Arr.push(merge, dragObject);

                if ( ! Arr.has(this.veExpanded, dragObject[this.uniqueProp]) ) {
                    return;
                }

                let props = [
                    Obj.get(item, this.childProp, []),
                    depth + 1,
                    `${path}.${index}.${this.childProp}`,
                    dragObject[this.orderProp],
                    dragObject[this.cascadeProp]
                ];

                this.itemReducer(merge, ...props);

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

            this.dragIndicator.css({ visibility: 'visible', transform: `translateY(${top}px)` });
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

            if ( Dom.find(event.target).closest('[data-id]') ) {
                return;
            }

            let allowDropRainbow = Arr.each(this.veCached, (item) => {
                return ! Any.isFunction(this.allowDrop) ? this.allowDrop :
                    !! this.allowDrop(item, null, 'root');
            });

            if ( Arr.has(allowDropRainbow, false) ) {
                return;
            }

            let virtualItem = {
                [this.indexProp]: 0,
                [this.uniqueProp]: null
            };

            Dom.find(this.$el).removeClass('n-dragover');

            this.$emit('dragdrop', event, virtualItem, 'root');
        },

        eventMousemove(event, target)
        {
            this.veInview = Dom.find(target).closest(this.$el);
        },

        eventKeydown(event)
        {
            Arr.add(this.veKeyBuffer, event.which);

            if ( ! this.veInview ) {
                return;
            }

            if ( event.which === 13 ) {
                event.preventDefault();
                this.currentDblclick();
            }

            if ( event.which === 32 ) {
                event.preventDefault();
                this.currentCollapse();
            }

            if ( event.which === 38 || event.which === 37 ) {
                event.preventDefault();

                if ( this.lastUpdate && this.lastUpdate > Date.now() ) {
                    return;
                } else {
                    this.lastUpdate = Date.now() + this.keyDebounce;
                }

                this.currentPrev();
            }

            if ( event.which === 40 || event.which === 39 ) {
                event.preventDefault();

                if ( this.lastUpdate && this.lastUpdate > Date.now() ) {
                    return;
                } else {
                    this.lastUpdate = Date.now() + this.keyDebounce;
                }

                this.currentNext();
            }
        },

        eventKeyup(event)
        {
            Arr.remove(this.veKeyBuffer, event.which);
        }

    },

    watch: {

        selected()
        {
            if ( Any.md5(this.selected) !== Any.md5(this.veSelected) ) {
                this.veSelected = Obj.clone(this.selected);
            }
        },

        expanded()
        {
            if ( Any.md5(this.expanded) !== Any.md5(this.veExpanded) ) {
                this.veExpanded = Obj.clone(this.expanded);
            }
        }

    },

    beforeMount()
    {
        this.veModified = false;
        this.veCached = [];
        this.veSelfCached = [];

        this.$watch('veCopy', Any.debounce(this.exportItems,
            this.updateDelay));

        this.$watch('items', Any.debounce(this.importItems,
            this.updateDelay));

        this.importItems();
    },

    mounted()
    {
        if ( this.allowCurrent ) {
            this.$on('row-click', this.setCurrent);
        }

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

        Dom.find(document).on('mousemove', this.eventMousemove, ident);
        Dom.find(document).on('keydown', this.eventKeydown, ident);
        Dom.find(document).on('keyup', this.eventKeyup, ident);
    },

    beforeDestroy()
    {
        let ident = {
            _uid: this._uid
        };

        this.$off('row-click');
        this.$off('dragstart');
        this.$off('dragstart');
        this.$off('dragstart');
        this.$off('dragdrop');

        Event.unbind('draggable.start', ident);
        Event.unbind('draggable.stop', ident);
        Event.unbind('draggable.done', ident);

        Dom.find(document).off('dragenter', null, ident);
        Dom.find(document).off('dragleave', null, ident);
        Dom.find(document).off('dragend', null, ident);

        Dom.find(document).off('mousemove', null, ident);
        Dom.find(document).off('keydown', null, ident);
    },

}
