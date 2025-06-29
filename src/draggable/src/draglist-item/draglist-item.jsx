import { Str, Obj, Arr, Dom } from "@kizmann/pico-js";

export default {

    name: 'NDraglistItem',

    inject: {

        NDraggable: {
            default: undefined
        }
    
    },

    provide()
    {
        return {
            NDraggableItem: this
        };
    },

    props: {

        value: {
            required: true
        },

    },

    computed: {

        uid()
        {
            return Obj.get(this.value, this.NDraggable.uniqueProp);
        },

        item()
        {
            return Obj.get(this.NDraggable, this.value.route);
        },

        touch() {
            return !! ('ontouchstart' in window ||
                navigator.msMaxTouchPoints);
        },

        mousedown() {
            return this.touch ? 'touchstart' :
                'mousedown';
        },

        mousemove() {
            return this.touch ? 'touchmove' :
                'mousemove';
        },

        mouseup() {
            return this.touch ? 'touchend' :
                'mouseup';
        }

    },

    data()
    {
        return {
            init: ! this.NDraggable.lazyload
        };
    },

    mounted()
    {
        this.timer = setTimeout(() => {

            if ( this.NDraggable.draggable ) {
                this.timer = setTimeout(() => {
                    this.NDraggable.drag.bindNode(this);
                }, 10);
            }

            this.init = true;
        }, 5);
    },

    beforeUnmount()
    {
        clearTimeout(this.timer);

        this.NDraggable.drag.unbindNode(this);
    },

    methods: {

        copy()
        {
            return this.NDraggable.drag.copyNode(this);
        },

        remove()
        {
            return this.NDraggable.drag.removeNode(this);
        },

        hasChildren()
        {
            return this.NDraggable.hasChildren(this);
        },

        isDisabled()
        {
            return this.NDraggable.isDisabled(this);
        },

        isHighlight()
        {
            return this.NDraggable.isHighlight(this);
        },

        isCurrent()
        {
            return this.NDraggable.isCurrent(this);
        },

        isDraggable()
        {
            return this.NDraggable.isDraggable(this);
        },

        isExpanded()
        {
            return this.NDraggable.isExpanded(this);
        },

        expandItem()
        {
            this.NDraggable.expandItem(this);
        },

        isSelected()
        {
            return this.NDraggable.isSelected(this);
        },

        selectItem()
        {
            this.NDraggable.selectItem(this);
        },

        onClick(event)
        {
            let isExpand = Dom.find(event.target)
                .closest('.n-draglist-item__expand');

            if ( isExpand ) {
                return;
            }

            this.NDraggable.setCurrent(this);

            if ( Arr.has(window.keyMods, 91) ) {
                this.NDraggable.selectItem(this);
            }

            this.NDraggable.$emit('row-click', this);
        },

        onDblclick()
        {
            this.NDraggable.setCurrent(this);

            this.NDraggable.$emit('row-dblclick', this);
        }

    },

    renderElement()
    {
        let classList = [
            'n-draglist-item__element'
        ];

        if ( ! this.init ) {
            return (<div class={classList} />);
        }

        let props = {
            value: this.value,
            item: this.item,
            copy: this.copy,
            remove: this.remove,
        };

        let renderFunction = this.$slots.default;

        if ( this.NDraggable.renderNode ) {
            renderFunction = this.NDraggable.renderNode;
        }

        return (
            <div class={classList}>
                { renderFunction(props) }
            </div>
        );
    },

    renderSpacer()
    {
        let width = this.value.depth * 
            this.NDraggable.itemOffset;

        if ( ! width ) {
            return null;
        }

        let style = {
            width: width + 'px'
        };

        return (
            <div class="n-draglist-item__spacer" style={style}>
                { /* SPACER */ }
            </div>
        );
    },

    renderHandle()
    {
        if ( ! this.NDraggable.renderHandle ) {
            return null;
        }

        let props = {};

        if ( this.NDraggable.draggable && this.isDraggable() ) {
            props.draggable = true;
        }

        return (
            <div class="n-draglist-item__handle" {...props}>
                <div class="n-draglist-item__ellipsis">
                    <i class={ nano.Icons.handle }></i>
                </div>
            </div>
        );
    },

    renderExpand()
    {
        if ( ! this.NDraggable.renderExpand ) {
            return null;
        }

        let props = {
            ['on' + Str.ucfirst(this.mousedown)]: this.expandItem
        };

        return (
            <div class="n-draglist-item__expand" {...props}>
                <div class="n-draglist-item__angle">
                    <i class={ nano.Icons.angleRight }></i>
                </div>
            </div>
        );
    },

    renderSelect()
    {
        if ( ! this.NDraggable.renderSelect ) {
            return null;
        }

        let props = {
            ['on' + Str.ucfirst(this.mousedown)]: this.selectItem
        };

        return (
            <div class="n-draglist-item__select" {...props}>
                <div class="n-draglist-item__checkbox">
                    <i class={ nano.Icons.checked }></i>
                </div>
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-draglist-item'
        ];

        if ( this.hasChildren() ) {
            classList.push('n-children');
        }

        if ( this.isDisabled() ) {
            classList.push('n-disabled');
        }

        if ( this.isSelected() ) {
            classList.push('n-selected');
        }

        if ( this.isExpanded() ) {
            classList.push('n-expanded');
        }

        if ( this.isCurrent() ) {
            classList.push('n-current');
        }

        if ( this.isHighlight() ) {
            classList.push('n-highlight');
        }

        let props = {
            onClick: this.onClick,
            onDblclick: this.onDblclick,
        };

        if ( this.NDraggable.draggable && ! this.NDraggable.handle && this.isDraggable() ) {
            props.draggable = true;
        }

        props['data-unique'] = this.value[this.NDraggable.uniqueProp];

        return (
            <div class={classList} {...props}>
                { this.ctor('renderHandle')() }
                { this.ctor('renderSpacer')() }
                { this.ctor('renderExpand')() }
                { this.ctor('renderSelect')() }
                { this.ctor('renderElement')() }
            </div>
        );
    }

}
