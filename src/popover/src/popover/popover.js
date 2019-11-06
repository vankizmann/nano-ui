import { Nano } from "nano-js";

let { Obj, Any, Dom } = Nano;

export default {

    name: 'NPopover',

    model: {
        prop: 'visible'
    },

    props: {

        visible: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        width: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        selector: {
            default()
            {
                return null;
            },
        },

        boundry: {
            default()
            {
                return window;
            },
        },

        trigger: {
            default()
            {
                return 'hover';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'default';
            },
            type: [String]
        },

        position: {
            default()
            {
                return 'bottom-center';
            },
            type: [String]
        },

        closeInside: {
            default()
            {
                return true;
            },
            type: [Boolean]
        }

    },

    computed: {

        parent()
        {
            return this.node.parentNode;
        },

        element()
        {
            if ( this.selector === null ) {
                return Dom.find(this.node).previous().get(0);
            }

            return Dom.find(this.node).parent().find(this.selector).get(0);
        }

    },

    watch: {

        visible()
        {
            if ( ! Any.isEqual(this.nativeVisible, this.visible) ) {
                this.nativeVisible = this.visible;
            }
        },

        nativeVisible()
        {
            if ( this.nativeVisible === true ) {

                Any.delay(() => {
                    Dom.find(this.node).addClass('n-popover--open');
                });

                Dom.find(this.element).addClass('n-popover--open');
            }

            if ( this.nativeVisible === false ) {
                Dom.find(this.node).removeClass('n-popover--open');
                Dom.find(this.element).removeClass('n-popover--open');
            }

            this.refresh();
        }

    },

    methods: {

        refresh()
        {
            let style = {};

            if ( this.node === null ) {
                return { display: 'none' };
            }

            let clientX = Dom.find(this.element).offsetLeft(window) -
                Dom.find(this.parent).scrollLeft(null);


            if ( this.trigger === 'context' ) {
                clientX = this.clientX;
            }

            let clientY = Dom.find(this.element).offsetTop(window) -
                Dom.find(this.parent).scrollTop(null);

            if ( this.trigger === 'context' ) {
                clientY = this.clientY;
            }

            let height = this.trigger === 'context' ?
                0 : Dom.find(this.element).height();

            let width = this.trigger === 'context' ?
                0 : Dom.find(this.element).width();

            let reset = {
                'max-width': (this.width || width) + 'px'
            };

            if ( this.width ) {
                reset.width = this.width + 'px';
            }

            let nodeWidth = Dom.find(this.node).realWidth(reset);
            let nodeHeight = Dom.find(this.node).realHeight(reset);

            if ( this.position.match(/^top-(start|center|end)$/) ) {
                style.top = clientY - nodeHeight;
            }

            if ( this.position.match(/^bottom-(start|center|end)$/) ) {
                style.top = clientY + height;
            }

            if ( this.position.match(/^(top|bottom)-start$/) ) {
                style.left = clientX;
            }

            if ( this.position.match(/^(top|bottom)-end$/) ) {
                style.left = clientX + width - nodeWidth;
            }

            if ( this.position.match(/^(top|bottom)-center$/) ) {
                style.left = clientX + (width / 2) - (nodeWidth / 2);
            }

            if ( this.position.match(/^left-(start|center|end)$/) ) {
                style.left = clientX - nodeWidth;
            }

            if ( this.position.match(/^right-(start|center|end)$/) ) {
                style.left = clientX + width;
            }

            if ( this.position.match(/^(left|right)-start$/) ) {
                style.top = clientY;
            }

            if ( this.position.match(/^(left|right)-end$/) ) {
                style.top = clientY + height - nodeHeight;
            }

            if ( this.position.match(/^(left|right)-center$/) ) {
                style.top = clientY + (height / 2) - (nodeHeight / 2);
            }

            let pseudo = Obj.map(Obj.clone(style), (prop) => prop + 'px');

            Dom.find(this.node).actual((el) => {

                let offsetTop = Dom.find(this.boundry).offsetTop(window);

                if ( offsetTop > style.top ) {
                    pseudo.top = (style.top - (style.top - offsetTop)) + 'px';
                }

                let boundryHeight = Dom.find(this.boundry).height();

                if ( style.top + nodeHeight > boundryHeight + offsetTop ) {
                    pseudo.top = (boundryHeight + offsetTop - nodeHeight) + 'px';
                }

                let offsetLeft = Dom.find(this.boundry).offsetLeft(window);

                if ( offsetLeft > style.left ) {
                    pseudo.left = (style.left - (style.left - offsetLeft)) + 'px';
                }

                let boundryWidth = Dom.find(this.boundry).width();

                if ( style.left + nodeWidth > boundryWidth + offsetLeft ) {
                    pseudo.left = (boundryWidth + offsetLeft - nodeWidth) + 'px';
                }

            }, pseudo);

            if ( this.trigger !== 'context' ) {
                pseudo['max-width'] = (this.width || width) + 'px';
            }

            if ( this.nativeVisible === false && this.visible === false ) {
                pseudo.display = 'none';
            }

            return this.style = pseudo;
        },

        clickTrigger(event, target)
        {
            if ( ! Dom.find(target).inside(this.parent) && this.nativeVisible === false ) {
                return;
            }

            if ( this.trigger !== 'click' || this.disabled === true ) {
                return;
            }

            let final = Dom.find(target).closest(this.element),
                popover = Dom.find(target).closest(this.node);

            let visible = popover !== null ||
                (final !== null && this.nativeVisible === false);

            if ( visible === true && final !== null && event.which !== 1 ) {
                visible = false;
            }

            if ( this.closeInside === false && final !== null ) {
                visible = true;
            }

            if ( visible === true && this.nativeVisible === true ) {
                return;
            }

            if ( visible === false && this.nativeVisible === false ) {
                return;
            }

            this.$emit('input', this.nativeVisible = visible);
        },

        hoverTrigger(event, target)
        {
            if ( ! Dom.find(target).inside(this.parent) && this.nativeVisible === false ) {
                return;
            }

            if ( this.trigger !== 'hover' || this.disabled === true ) {
                return;
            }

            let final = Dom.find(target).closest(this.element),
                popover = Dom.find(target).closest(this.node);


            let visible = final !== null || popover !== null;

            if ( visible === true && this.nativeVisible === true ) {
                return;
            }

            if ( visible === false && this.nativeVisible === false ) {
                return;
            }

            this.$emit('input', this.nativeVisible = visible);
        },

        contextTrigger(event, target)
        {
            if ( ! Dom.find(target).inside(this.parent) && this.nativeVisible === false ) {
                return;
            }

            if ( this.trigger !== 'context' || this.disabled === true ) {
                return;
            }

            let final = Dom.find(target).closest(this.element),
                popover = Dom.find(target).closest(this.node);

            let visible = popover !== null ||
                (final !== null && this.nativeVisible === false);

            if ( visible === true && final !== null && event.which !== 3 ) {
                visible = false;
            }

            if ( this.closeInside === false && final !== null ) {
                visible = true;
            }

            if ( visible === true && this.nativeVisible === true ) {
                return;
            }

            if ( visible === false && this.nativeVisible === false ) {
                return;
            }

            this.clientX = event.clientX;
            this.clientY = event.clientY;

            this.$emit('input', this.nativeVisible = visible);
        },

        contextPrevent(event, target)
        {
            if ( this.trigger !== 'context' ) {
                return;
            }

            if ( Dom.find(target).closest(this.node) ) {
                event.preventDefault();
            }

            if ( Dom.find(target).closest(this.element) ) {
                event.preventDefault();
            }
        }

    },

    data()
    {
        return {
            style: { display: 'none' }, node: null, nativeVisible: this.visible, clientX: 0, clientY: 0
        };
    },

    mounted()
    {
        if ( this.trigger === 'click' ) {
            Dom.find(document).on('mousedown',
                Any.throttle(this.clickTrigger, 80), { _uid: this._uid });
        }

        if ( this.trigger === 'hover' ) {
            Dom.find(document).on('mousemove',
                Any.debounce(this.hoverTrigger, 80), { _uid: this._uid });
        }

        if ( this.trigger === 'context' ) {
            Dom.find(document).on('mousedown',
                Any.throttle(this.contextTrigger, 80), { _uid: this._uid });

            Dom.find(document).on('contextmenu',
                Any.throttle(this.contextPrevent, 80), { _uid: this._uid });
        }

        this.node = this.$el;
    },

    beforeDestroy()
    {
        Dom.find(document).off('mousedown',
            null, { _uid: this._uid });

        Dom.find(document).off('mousemove',
            null, { _uid: this._uid });

        Dom.find(document).off('contextmenu',
            null, { _uid: this._uid });
    },

    render()
    {
        let className = [
            'n-popover',
            'n-popover--' + this.type,
            'n-popover--' + this.position
        ];

        let style = this.style;

        if ( this.width ) {
            style.width = this.width + 'px';
        }

        return (
            <div class={className} style={this.style}>
                { this.$slots.raw ||
                    <div class="n-popover__frame">
                        { this.$slots.header &&
                            <div class="n-popover__header">
                                {this.$slots.header}
                            </div>
                        }
                        <div class="n-popover__body">
                            {this.$slots.default}
                        </div>
                        { this.$slots.footer &&
                            <div class="n-popover__footer">
                                {this.$slots.footer}
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }

}
