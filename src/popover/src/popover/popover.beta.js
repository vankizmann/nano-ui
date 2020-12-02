import { Obj, Any, Dom, UUID } from "nano-js";


export default {

    name: 'NPopover',

    model: {
        prop: 'visible'
    },

    inject: {

        NPopover: {
            default: undefined
        },

        NScrollbar: {
            default: undefined
        }

    },

    provide()
    {
        return {
            NPopover: this
        };
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
            }
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

        boundary: {
            default()
            {
                return null;
            },
        },

        contain: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        window: {
            default()
            {
                return false;
            },
            type: [Boolean]
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

        size: {
            default()
            {
                return null;
            }
        },

        position: {
            default()
            {
                return this.trigger === 'context' ?
                    'bottom-start' : 'bottom-center';
            },
            type: [String]
        },

        closeInside: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        updateInterval: {
            default()
            {
                return 1000 / 15;
            },
            type: [Number]
        }

    },

    watch: {

        visible()
        {
            if ( this.veVisible !== this.visible ) {
                this.veVisible = this.visible;
            }
        },

        veVisible()
        {
            this.$nextTick(this.refresh);
        }

    },

    methods: {

        active()
        {
            return this.veVisible;
        },

        close()
        {
            this.$emit('input', this.veVisible = false);
        },

        refresh()
        {
            if ( ! this.veVisible ) {
                return this.style;
            }

            if ( ! window.zIndex ) {
                window.zIndex = 9000;
            }

            let style = {};

            let clientX = Dom.find(this.target).offset('left', this.parent);

            if ( this.trigger === 'context' ) {
                clientX = this.clientX - Dom.find(this.parent).offset('left');
            }

            let clientY = Dom.find(this.target).offset('top', this.parent);

            if ( this.trigger === 'context' ) {
                clientY = this.clientY - Dom.find(this.parent).offset('top');
            }

            let height = this.trigger === 'context' ?
                0 : Dom.find(this.target).height();

            let width = this.trigger === 'context' ?
                0 : Dom.find(this.target).width();

            let realWidth = this.width;

            if ( realWidth === '100%' ) {
                realWidth = Dom.find(this.target).width();
            }

            let reset = {
                'max-width': realWidth ? (realWidth + 'px') : 'auto'
            };

            if ( this.width ) {
                reset.width = this.width + 'px';
            }

            let nodeWidth = Dom.find(this.$el).realWidth(reset);
            let nodeHeight = Dom.find(this.$el).realHeight(reset);

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

            let parentWidth = Dom.find(this.parent).width();
            let parentHeight = Dom.find(this.parent).height();

            // Get target offsets to adjust padding or margin
            let offset = Dom.find(this.target).offset(null, this.parent);

            // Get target scroll offset to adjust padding or margin
            let scroll = Dom.find(this.target).scroll(null, this.parent);

            let parentInnerWidth = 0, parentInnerHeight = 0;

            Dom.find(this.$el).actual(() => {
                parentInnerWidth = this.parent.scrollWidth;
                parentInnerHeight = this.parent.scrollHeight;
            }, { display: 'none' });


            if ( this.trigger === 'context' ) {

                style.left = this.parent.scrollLeft + clientX;

                if ( style.left < 0 ) {
                    style.left = 0;
                }

                if ( style.left + nodeWidth - this.parent.scrollLeft > this.parent.clientWidth ) {
                    style.left = this.parent.scrollLeft - nodeWidth + this.parent.clientWidth;
                }

                style.top = this.parent.scrollTop + clientY;

                if ( style.top < 0 ) {
                    style.top = 0;
                }

                if ( style.top + nodeHeight - this.parent.scrollTop > this.parent.clientHeight ) {
                    style.top = this.parent.scrollTop - nodeHeight + this.parent.clientHeight;
                }

                console.log(style.top, this.parent.clientHeight, nodeHeight, this.parent.scrollTop, clientY)
            }

            if ( this.trigger !== 'context' && this.position.match(/^(top|bottom)-/) && this.contain ) {

                if ( style.left < 0 ) {
                    style.left = 0;
                }

                if ( style.left + nodeWidth > parentInnerWidth ) {
                    style.left = parentInnerWidth - nodeWidth;
                }

                if ( style.top + nodeHeight > parentInnerHeight ) {
                    style.top = offset.top - nodeHeight;
                }

                if ( style.top - nodeHeight < 0 ) {
                    style.top = height + offset.top;
                }
            }

            if ( this.trigger !== 'context' && this.position.match(/^(left|right)-/) && this.contain ) {

                if ( style.top < 0 ) {
                    style.top = 0;
                }

                if ( style.top + nodeHeight > parentHeight ) {
                    style.top = parentHeight - nodeHeight;
                }

                if ( style.left + nodeWidth > parentWidth ) {
                    style.left = offset.left - scroll.left - nodeWidth;
                }

                if ( style.left - nodeWidth < 0 ) {
                    style.left = width + offset.left;
                }

            }

            let pseudo = Obj.map(Obj.clone(style), (prop) => prop + 'px');

            if ( this.trigger !== 'context' ) {
                pseudo['max-width'] = realWidth ? (realWidth + 'px') : 'auto';
            }

            pseudo['z-index'] = window.zIndex++;

            return this.style = pseudo;
        },

        addClass() {
            Dom.find(this.$el).addClass('n-open');
        },

        addTargetClass() {
            Dom.find(this.target).addClass('n-open');
        },

        removeClass() {
            Dom.find(this.$el).removeClass('n-open');
        },

        removeTargetClass() {
            Dom.find(this.target).removeClass('n-open');
        },

        eventMousemove(event, el)
        {
            if ( this.disabled ) {
                return;
            }

            let target = Dom.find(el).closest(this.target),
                source = Dom.find(el).closest(this.$el);

            let result = !! target || !! source;

            if ( this.veVisible === result ) {
                return;
            }

            this.$emit('input', this.veVisible = result);
        },

        eventClick(event, el)
        {
            this.clientX = event.clientX;
            this.clientY = event.clientY;

            if ( event.which !== 1 ) {
                return;
            }

            if ( this.disabled ) {
                return;
            }

            let target = Dom.find(el).closest(this.target),
                source = Dom.find(el).closest(this.$el);

            let result = !! target || !! source;

            if ( result && this.veVisible ) {
                result = ! this.closeInside;
            }

            if ( target && this.veVisible ) {
                result = false;
            }

            if ( this.veVisible !== result ) {
                this.$emit('input', this.veVisible = result);
            }
        },

        eventContextmenu(event, el)
        {
            this.clientX = event.clientX;
            this.clientY = event.clientY;

            if ( this.disabled ) {
                return;
            }

            let target = Dom.find(el).closest(this.target),
                source = Dom.find(el).closest(this.$el);

            if ( ! this.closeInside && source ) {
                return;
            }

            let result = (!! target || !! source) &&
                event.which === 3;

            if ( result && this.veVisible ) {
                result = ! this.closeInside;
            }

            if ( result ) {
                event.preventDefault();
            }

            if ( this.veVisible === result ) {
                return;
            }

            this.$emit('input', this.veVisible = result);
        },

        eventMousedown(event, el)
        {
            let target = Dom.find(el).closest(this.target),
                source = Dom.find(el).closest(this.$el);

            if ( ! target && ! source ) {
                return;
            }

            event.preventDefault();
        }

    },

    data()
    {
        let options = {
            veVisible: this.visible,
            clientX: 0,
            clientY: 0,
            target: null,
            parent: null
        };

        options.style = {
            display: 'none'
        };

        return options;
    },

    mounted()
    {
        let $event = {
            _uid: this._uid
        };

        if ( this.trigger === 'hover' ) {
            Dom.find(document).on('mousemove', Any.debounce(this.eventMousemove), $event);
        }

        if ( this.trigger === 'click' ) {
            Dom.find(document).on('click', this.eventClick, $event);
        }

        if ( this.trigger === 'context' ) {
            Dom.find(document).on('mousedown', this.eventContextmenu, $event);
            Dom.find(document).on('contextmenu', this.eventMousedown, $event);
        }

        this.target = Dom.find(this.$el).previous().get(0);

        if ( ! Any.isEmpty(this.selector) ) {
            this.target = Dom.find(this.$el).parent().find(this.selector).get(0);
        }

        this.parent = null;

        if ( this.NScrollbar ) {
            this.parent = this.NScrollbar.$el;
        }

        if ( this.NPopover ) {
            this.parent = this.NPopover.boundary;
        }

        if ( this.window ) {
            //this.parent = Dom.find(document.body).get(0);
            this.parent = Dom.find(this.$el).closestScrollable();
        }

        if ( this.boundary && ! this.parent ) {
            this.parent = Dom.find(this.boundary).get(0);
        }

        if ( this.parent ) {
            Dom.find(this.parent).append(this.$el);
        }

        if ( ! this.parent ) {
            this.parent = Dom.find(this.target).parent().get(0);
        }
    },

    beforeDestroy()
    {
        let $event = {
            _uid: this._uid
        };

        Dom.find(document).off('mousemove', null, $event);
        Dom.find(document).off('click', null, $event);
        Dom.find(document).off('contextmenu', null, $event);
        Dom.find(document).off('mousedown', null, $event);

        this.$el.remove();
    },

    renderBody()
    {
        if ( this.$slots.raw ) {
            return this.$slots.raw;
        }

        return (
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
        );
    },

    render()
    {
        let classList = [
            'n-popover',
            'n-popover--' + this.type,
            'n-popover--' + this.position
        ];

        if ( this.size ) {
            classList.push('n-popover--' + this.size);
        }

        let style = this.style;

        if ( this.width ) {
            style.width = this.width + 'px';
        }

        let events = {
            beforeEnter: this.addClass,
            afterEnter: this.addTargetClass,
            beforeLeave: this.removeTargetClass,
            afterLeave: this.removeClass,
        };

        return (
            <div class={classList} style={this.style}>
                <transition name="n-fade-fast" mode="out-in" on={events}>
                    { this.veVisible ? this.ctor('renderBody')() : null }
                </transition>
            </div>
        );
    }

}
