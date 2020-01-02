import { UUID, Num, Arr, Obj, Dom, Any, Event } from "nano-js";

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

        use: {
            default()
            {
                return null;
            }
        },

        useBefore: {
            default()
            {
                return null;
            }
        },

        useAfter: {
            default()
            {
                return null;
            }
        },

        selected: {
            default()
            {
                return null;
            }
        },

        depth: {
            default()
            {
                return 0;
            },
            type: [Number]
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
            }
        },

        itemHeight: {
            default()
            {
                return 34;
            },
            type: [Number]
        },

        uniqueProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        childProp: {
            default()
            {
                return null;
            }
        },

        transformDrop: {
            default()
            {
                return (item) => item;
            }
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

        className: {
            default()
            {
                return ['n-draggable'];
            }
        }

    },

    methods: {

        draggableStart(cache, group)
        {
            if ( Arr.intersect(group, this.group).length === 0 ) {
                return;
            }

            this.cache = cache;
        },

        draggableEnd(group)
        {
            if ( Arr.intersect(group, this.group).length === 0 ) {
                return;
            }

            let selected = this.selected || this.nativeSelected;

            if ( this.self.length === 0 ) {
                return;
            }

            let items = this.items;

            Arr.each(selected, (item) => {

                let removeNode = typeof this.removeNode === 'function' ?
                    this.removeNode : () => this.removeNode;

                if ( ! removeNode(item) ) {
                    return;
                }

                items = Arr.remove(items, { _dragid: item._dragid });
            });

            this.$emit('update:selected', this.nativeSelected =
                this.cache = this.self =  []);

            this.$emit('input', items);
        },

        draggableAbort()
        {
            this.cache = this.self = this.nativeSelected = [];
        },

        docDragOver(event)
        {
            event.preventDefault();

            let target = Dom.location(this.clientX = event.clientX,
                this.clientY = event.clientY).get(0);

            if ( Dom.find(target).inside(this.$refs.indicator) ) {
                return;
            }

            let dragFrame = Dom.find(target)
                .closest('.n-draggable');

            let dragItem = Dom.find(target)
                .closest('[data-drag-id]');

            if (
                ! Dom.find(dragFrame).is(this.$el) &&
                ! Dom.find(dragItem).isParent(this.$el)
            ) {
                return this.frameDragLeave(event, this.$el);
            }

            if ( dragItem !== null ) {
                return this.itemDragOver(event, dragItem);
            }

            this.frameDragOver(event, this.$el);
        },

        docDragLeave(event)
        {
            let target = Dom.location(event.clientX,
                event.clientY).get(0);

            let dragItem = Dom.find(target).closest('[data-drag-id]');

            if ( ! Dom.find(dragItem).isParent(this.$el) ) {
                return;
            }

            delete this.clientX;
            delete this.clientY;

            this.frameDragLeave(event, this.$el);
        },

        docDragEnd(event)
        {
            if ( event.dataTransfer ) {
                event.dataTransfer.dropEffect = "move";
            }

            if ( this.clientX === undefined || this.clientY === undefined ) {
                return;
            }

            let target = Dom.location(this.clientX,
                this.clientY).first();

            let dragFrame = Dom.find(target)
                .closest('.n-draggable');

            let dragItem = Dom.find(target)
                .closest('[data-drag-id]');

            if (
                ! Dom.find(dragFrame).is(this.$el) &&
                ! Dom.find(dragItem).isParent(this.$el)
            ) {
                return;
            }

            if ( dragItem !== null ) Any.delay(() => {
                this.itemDragEnd(event, dragItem);
            }, 14);

            if ( this.items.length === 0 ) Any.delay(() => {
                this.frameDragEnd(event, this.$el);
            }, 14);
        },

        frameDragLeave(event, target)
        {
            if ( this.$refs.indicator !== undefined ) {
                Dom.find(this.$refs.indicator).css({ top: -99999 + 'px' });
            }

            Dom.find(target).childs('[data-drag-id]').each((el) => {
                Dom.find(el).removeClass('n-draggable--dragover');
            });

            Dom.find(target).removeClass('n-draggable--dragover');
            Dom.find('.n-draggable--selected').removeClass('n-draggable--nodrop');
        },

        frameDragEnd(event, target)
        {
            if ( ! Dom.find(target).inside(this.$el) ) {
                return;
            }

            let cache = Arr.clone(this.cache);

            Arr.each(cache, (item, key) => {
                cache[key]['_dragid'] = UUID();
            });

            let items = this.items;

            Arr.each(cache, (item) => {
                items.splice(items.length, 0, this.transformDrop(item));
            });

            Dom.find(target).removeClass('n-draggable--dragover');

            let sources = Arr.each(this.selected || this.nativeSelected, (item) => {
                return item[this.uniqueProp];
            });

            Event.fire('draggable:end', this.group);

            this.$emit('move', sources.join(','), null, 'inner');
        },

        frameDragOver(event, target)
        {
            if ( ! Dom.find(target).inside(this.$el) ) {
                return;
            }

            Dom.find(this.$refs.indicator).css({ top: -99999 + 'px' });

            Dom.find(this.$el).childs('[data-drag-id]').each((el) => {
                Dom.find(el).removeClass('n-draggable--dragover');
            });

            Dom.find(target).addClass('n-draggable--dragover');
        },

        itemMouseDown(event, target)
        {
            if ( event.which !== 1 ) {
                return;
            }

            if ( ! Dom.find(target).parent().parent().is(this.$el) ) {
                return;
            }

            let item = Arr.find(this.items, {
                _dragid: Dom.find(target).attr('data-drag-id')
            });

            if ( Any.isEmpty(item) === true ) {
                return;
            }

            this.nativeSelected = [Obj.clone(item)];
        },

        itemMouseUp(event, target)
        {
            if ( ! Dom.find(target).parent().parent().is(this.$el) ) {
                return;
            }

            this.nativeSelected = [];
        },

        itemDragStart(event, target)
        {
            if ( ! Dom.find(target).inside(this.$el) ) {
                return;
            }

            let selected = Any.isEmpty(this.selected) ?
                this.nativeSelected : this.selected;

            if ( Any.isEmpty(selected) === true ) {
                return;
            }

            let index = Arr.findIndex(selected, {
                _dragid: Dom.find(target).attr('data-drag-id')
            });

            if ( index === -1 ) {
                selected = this.nativeSelected
            }

            this.$emit('update:selected', selected);

            if ( window.IE === true ) {
                event.dataTransfer.setData('Text', '');
            } else {
                event.dataTransfer.setData('text/plain', '');
            }

            if (typeof event.dataTransfer.setDragImage === "function") {

                let dragImage = Dom.find(this.$refs.placeholder)
                    .appendTo(document.body);

                event.dataTransfer.setDragImage(dragImage.get(0), 0, 0);
            }

            Event.fire('draggable:start', this.self = selected, this.group);
        },

        itemDragOver(event, target)
        {
            if ( ! Dom.find(target).inside(this.$el) ) {
                return;
            }

            Dom.find('.n-draggable--dragover').each((el) => {
                Dom.find(el).not(target).removeClass('n-draggable--dragover');
            });

            let offset = Dom.find(this.$el).offsetTop() -
                    Dom.find(this.$el.parentNode).scrollTop(null, window);

            let inside = Dom.find(target).offsetTop(this.$el) -
                    Dom.find(this.$el.parentNode).scrollTop(null, this.$el);

            let height = Dom.find(target).height(),
                displayHeight = Dom.find(target).height();

            if ( ! Dom.find(target).next().attr('data-drag-id') ) {
                displayHeight += Dom.find(target).next().height();
            }

            let safeZone = typeof this.safeZone === 'function' ?
                this.safeZone(height) : this.safeZone;

            this.move = 'inner';

            if ( event.clientY < offset + inside + safeZone ) {
                this.move = 'before';
            }

            if ( event.clientY > offset + inside + height - safeZone ) {
                this.move = 'after';
            }

            let index = Arr.findIndex(this.items, {
                _dragid: Dom.find(target).attr('data-drag-id')
            });

            if ( this.move === 'before' ) {
                displayHeight = 0;
            }

            if ( index === 0 ) {
                displayHeight += 1;
            }

            if ( index === this.items.length - 1 ) {
                displayHeight -= 1;
            }

            let dest = this.items[index];

            let rainbow = Arr.each(this.cache, (src) => {
                return typeof this.allowDrop === 'function' ?
                    this.allowDrop(src, dest, this.move, this.depth) : this.allowDrop;
            });

            if ( Arr.has(rainbow, false) || this.cache.length === 0 ) {
                this.move = 'nodrop';
            }

            if ( this.childProp === null && this.move === 'inner' ) {
                this.move = 'nodrop';
            }

            if ( this.move === 'inner' ) {
                Dom.find(this.$refs.indicator).css({ top: -99999 + 'px' });
            }

            if ( this.move === 'nodrop' ) {
                Dom.find(this.$refs.indicator).css({ top: -99999 + 'px' });
            }

            if ( this.move === 'before' ) {
                Dom.find(this.$refs.indicator).css({ top: (inside + displayHeight) + 'px' });
            }

            if ( this.move === 'after' ) {
                Dom.find(this.$refs.indicator).css({ top: (inside + displayHeight) + 'px' });
            }

            if ( this.move === 'inner' ) {
                Dom.find(target).addClass('n-draggable--dragover');
            } else {
                Dom.find(target).removeClass('n-draggable--dragover');
            }

            if ( this.move === 'nodrop' ) {
                Dom.find('.n-draggable--selected').addClass('n-draggable--nodrop');
            } else {
                Dom.find('.n-draggable--selected').removeClass('n-draggable--nodrop');
            }

            Dom.find(this.$el).removeClass('n-draggable--dragover');
        },

        itemDragEnd(event, target)
        {
            Dom.find(this.$refs.indicator).css({ top: -99999 + 'px' });

            Dom.find(target).removeClass('n-draggable--dragover');

            Dom.find('.n-draggable--selected').removeClass('n-draggable--nodrop');

            if ( Dom.find(target).inside('.n-draggable--selected') ) {
                return Event.fire('draggable:abort', this.group);
            }

            if ( Dom.find(target).inside('.n-draggable--selected + .n-draggable') ) {
                return Event.fire('draggable:abort', this.group);
            }

            if ( this.move === 'nodrop' ) {
                return Event.fire('draggable:abort', this.group);
            }

            let item = Arr.find(this.items, {
                _dragid: Dom.find(target).attr('data-drag-id')
            });

            let rainbow = Arr.each(this.cache, (src) => {
                return typeof this.allowDrop === 'function' ?
                    this.allowDrop(src, item, this.move, this.depth) : this.allowDrop;
            });

            if ( Arr.has(rainbow, false) === true ) {
                return Event.fire('draggable:abort', this.group);
            }

            let index = Arr.findIndex(this.items, {
                _dragid: Dom.find(target).attr('data-drag-id')
            });

            let cache = Arr.clone(this.cache);

            Arr.each(cache, (item, key) => {
                cache[key]['_dragid'] = UUID();
            });

            let insertNode = typeof this.insertNode === 'function' ?
                this.insertNode : () => this.insertNode;

            let items = this.items;

            if ( this.move === 'before' && insertNode ) {
                Arr.each(cache, (_item, count) => {

                    _item = this.transformDrop(_item);

                    if ( ! insertNode(_item, item) ) {
                        return;
                    }

                    items.splice(index + Num.int(count), 0, _item);
                });
            }

            if ( this.move === 'after' && insertNode ) {
                Arr.each(cache, (_item, count) => {

                    _item = this.transformDrop(_item);

                    if ( ! insertNode(_item, item) ) {
                        return;
                    }

                    items.splice(index + Num.int(count) + 1, 0, _item);
                });
            }

            if ( this.move === 'inner' && insertNode ) {
                Arr.each(cache, (_item) => {

                    _item = this.transformDrop(_item);

                    if ( ! insertNode(_item, item) ) {
                        return;
                    }

                    items[index][this.childProp].splice(
                        items[index][this.childProp].length, 0, _item);
                });
            }

            Event.fire('draggable:end', this.group);

            let sources = Arr.each(cache, (item) => {
                return item[this.uniqueProp];
            });

            this.$emit('move', sources.join(','), item[this.uniqueProp], this.move);
        },

        renderNode(h, value, key)
        {
            let realKey = Arr.findIndex(this.items, {
                _dragid: value._dragid
            });

            value = this.items[realKey];

            let className = [
                'n-draggable__item'
            ];

            let index = Arr.findIndex(this.selected || this.nativeSelected, {
                _dragid: value._dragid
            });

            if ( index !== -1 ) {
                className.push('n-draggable--selected');
            }

            let selectable = typeof this.allowSelect === 'function' ?
                this.allowSelect(value, this.depth) : this.allowSelect;

            let draggable = typeof this.allowDrag === 'function' ?
                this.allowDrag(value, this.depth) : this.allowDrag;

            let updateItem = (input) => {
                value = input;
            };

            let updateProp = (path) => {
                return (input) => {
                    Obj.set(value, path, input);
                }
            };

            let props = {
                value: value, key: key, updateItem, updateProp
            };

            let on = {
                input: (input) => {
                    this.$emit('input', Arr.set(this.items, key, input));
                },
                remove: () => {
                    this.$emit('input', Arr.removeIndex(this.items, key));
                },
                clone: () => {
                    let clone = Obj.assign({}, value, { _dragid: UUID() });
                    this.$emit('input', Arr.insert(this.items, key, clone));
                }
            };

            let beforeSlot = [this.$scopedSlots.before ?
                this.$scopedSlots.before(props) : null];

            if ( this.useBefore !== null ) {
                Arr.append(beforeSlot, h(this.useBefore, {
                    key: value._dragid + '_before', props, on
                }));
            }

            let afterSlot = [this.$scopedSlots.after ?
                this.$scopedSlots.after(props) : null];

            if ( this.useAfter !== null ) {
                Arr.prepend(afterSlot, h(this.useAfter, {
                    key: value._dragid + '_after', props, on
                }));
            }

            let defaultSlot = (
                <div class={className} data-drag-id={value._dragid} selectable={selectable} draggable={draggable}>
                    { this.use === null ? this.$scopedSlots.default(props) : h(this.use, { key: value._dragid, props, on }) }
                </div>
            );

            return Arr.merge(beforeSlot, [defaultSlot], afterSlot);
        }
    },

    data()
    {
        return {
            move: null, nativeSelected: [], self: [], cache: []
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
        Arr.each(this.items, (item, key) => {
            if ( item._dragid === undefined )
                this.items[key]['_dragid'] = UUID();
        });
    },

    beforeUpdate()
    {
        Arr.each(this.items, (item, key) => {
            if ( item._dragid === undefined )
                this.items[key]['_dragid'] = UUID();
        });
    },

    mounted()
    {
        Event.bind('draggable:start',
            this.draggableStart, { _uid: this._uid });

        Event.bind('draggable:end',
            this.draggableEnd, { _uid: this._uid });

        Event.bind('draggable:abort',
            this.draggableAbort, { _uid: this._uid });

        Dom.find(document).on('dragend',
            Any.throttle(this.docDragEnd, 25), { _uid: this._uid });

        Dom.find(document).on('dragover',
            Any.throttle(this.docDragOver, 25), { _uid: this._uid });

        Dom.find(document).on('dragleave',
            Any.throttle(this.docDragLeave, 25), { _uid: this._uid });

        Dom.find(document).live('mousedown',
            '[data-drag-id][selectable="true"]', this.itemMouseDown, { _uid: this._uid });

        Dom.find(document).live('mouseup',
            '[data-drag-id][selectable="true"]', this.itemMouseUp, { _uid: this._uid });

        Dom.find(document).live('dragstart',
            '[data-drag-id][draggable="true"]', this.itemDragStart, { _uid: this._uid });
    },

    beforeDestroy()
    {
        Event.unbind('draggable:start',
            { _uid: this._uid });

        Event.unbind('draggable:end',
            { _uid: this._uid });

        Event.unbind('draggable:abort',
            { _uid: this._uid });

        Dom.find(document).off('dragend',
            null, { _uid: this._uid });

        Dom.find(document).off('dragover',
            null, { _uid: this._uid });

        Dom.find(document).off('dragleave',
            null, { _uid: this._uid });

        Dom.find(document).off('mousedown',
            '[data-drag-id][selectable="true"]', { _uid: this._uid });

        Dom.find(document).off('mouseup',
            '[data-drag-id][selectable="true"]', { _uid: this._uid });

        Dom.find(document).off('dragstart',
            '[data-drag-id][draggable="true"]', { _uid: this._uid });
    },

    render(h)
    {
        let className = Arr.clone(this.className);

        if ( this.NDraggable === undefined ) {
            className.push('n-draggable--root');
        }

        let items = this.displayItems || this.items;

        if ( Any.isEmpty(items) === true && this.showEmpty === false ) {
            return null;
        }

        let props = {
            items: items, itemHeight: this.itemHeight, renderNode: this.renderNode
        };

        return (
            <div class={className}>
                { Any.isEmpty(this.items) === false &&
                    h('NRenderList', { props })
                }
                { Any.isEmpty(this.items) === true && (this.$slots.empty ||
                    <div class="n-draggable__empty">
                         <span>
                             { this.trans('No entries') }
                         </span>
                    </div>)
                }
                <div ref="indicator" class="n-draggable__indicator">
                    <span></span>
                </div>
                <div ref="placeholder" class="n-draggable__placeholder">
                    <span>
                        { this.choice(':count entry|:count entries', this.self.length) }
                    </span>
                </div>
            </div>
        );
    }

}
