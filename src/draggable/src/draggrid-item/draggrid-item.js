import { Str, Arr, Obj } from "@kizmann/pico-js";

export default {

    name: 'NDraggridItem',

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
        }

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

            this.timer = setTimeout(() => {
                this.NDraggable.drag.bindNode(this);
            }, 50);

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

        isSelected()
        {
            return this.NDraggable.isSelected(this);
        },

        selectItem()
        {
            this.NDraggable.selectItem(this);
        },

        onClick()
        {
            this.NDraggable.setCurrent(this);

            if ( Arr.has(global.keyMods, 91) ) {
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
        if ( ! this.init ) {
            return null;
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
            <div class="n-draggrid-item__element">
                { renderFunction(props) }
            </div>
        );
    },

    renderHandle()
    {
        if ( ! this.NDraggable.renderHandle ) {
            return null;
        }

        let props = {};

        if ( this.isDraggable() ) {
            props.draggable = true;
        }

        return (
            <div class="n-draggrid-item__handle" {...props}>
                <div class="n-draggrid-item__ellipsis">
                    <i class={ nano.Icons.handle }></i>
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
            <div class="n-draggrid-item__select" {...props}>
                <div class="n-draggrid-item__checkbox">
                    <i class={ nano.Icons.checked }></i>
                </div>
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-draggrid-item'
        ];

        if ( this.isDisabled() ) {
            classList.push('n-disabled');
        }

        if ( this.isSelected() ) {
            classList.push('n-selected');
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

        if ( ! this.NDraggable.handle && this.isDraggable() ) {
            props.draggable = true;
        }

        props['data-unique'] = this.value[this.NDraggable.uniqueProp];

        return (
            <div class={classList} {...props}>
                { this.ctor('renderHandle')() }
                { this.ctor('renderSelect')() }
                { this.ctor('renderElement')() }
            </div>
        );
    }

}
