import { Obj, Any, Dom, UUID } from "nano-js";


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
                return null;
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
        },

        appendDom: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

    },

    watch: {

        visible()
        {
            if ( ! Any.isEqual(this.visibleBS, this.visible) ) {
                this.visibleBS = this.visible;
            }
        },

        visibleBS()
        {
            if ( this.visibleBS === true ) {
                Dom.find(this.$el).addClass('n-popover--open');
                Dom.find(this.target).addClass('n-popover--open');
            }

            if ( this.visibleBS === false ) {
                Dom.find(this.$el).removeClass('n-popover--open');
                Dom.find(this.target).removeClass('n-popover--open');
            }

            this.refresh();
        }

    },

    methods: {

        close()
        {
            this.$emit('input', this.visibleBS = false);
        },

        refresh()
        {
            let style = {};

            if ( this.$el === null ) {
                return { display: 'none' };
            }

            let clientX = Dom.find(this.target).offsetLeft(this.parent);

            if ( this.parent === document.body ) {
                clientX -= Dom.find(this.target).scrollLeft();
            }

            if ( this.trigger === 'context' ) {
                clientX = this.clientX - Dom.find(this.parent).offsetLeft();
            }

            let clientY = Dom.find(this.target).offsetTop(this.parent);

            if ( this.parent === document.body ) {
                clientY -= Dom.find(this.target).scrollTop();
            }

            if ( this.trigger === 'context' ) {
                clientY = this.clientY - Dom.find(this.parent).offsetTop();
            }

            let height = this.trigger === 'context' ?
                0 : Dom.find(this.target).height();

            let width = this.trigger === 'context' ?
                0 : Dom.find(this.target).width();

            let reset = {
                'max-width': this.width ? (this.width + 'px') : 'auto'
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


            if ( this.trigger === 'context' ) {

                if ( style.left < 0 ) {
                    style.left = 0;
                }

                if ( style.left + nodeWidth > parentWidth ) {
                    style.left = parentWidth - nodeWidth;
                }

                if ( style.top < 0 ) {
                    style.top = 0;
                }

                // if ( style.top + nodeHeight > parentHeight ) {
                //     style.top = parentHeight - nodeHeight;
                // }

            }

            if ( this.trigger !== 'context' && this.position.match(/^(top|bottom)-(start|center|end)$/) ) {

                if ( style.left < 0 ) {
                    style.left = 0;
                }

                if ( style.left > parentWidth ) {
                    style.left = parentWidth - nodeWidth;
                }

                if ( style.top + nodeHeight > parentHeight ) {
                    style.top = parentHeight - height - nodeHeight - offset.bottom;
                }

                if ( style.top - nodeHeight < 0 ) {
                    style.top = height + offset.top;
                }

            }

            if ( this.trigger !== 'context' && this.position.match(/^(left|right)-(start|center|end)$/) ) {

                if ( style.top < 0 ) {
                    style.top = 0;
                }

                if ( style.top > parentHeight ) {
                    style.top = parentHeight - nodeHeight;
                }

                if ( style.left + nodeWidth > parentWidth ) {
                    style.left = parentWidth - width - nodeWidth - offset.right;
                }

                if ( style.left - nodeWidth < 0 ) {
                    style.left = width + offset.left;
                }

            }

            let pseudo = Obj.map(Obj.clone(style), (prop) => prop + 'px');

            if ( this.trigger !== 'context' ) {
                pseudo['max-width'] = this.width ? (this.width + 'px') : 'auto';
            }

            if ( ! this.visibleBS && ! this.visible ) {
                pseudo.display = 'none';
            }

            return this.style = pseudo;
        },

        clickTrigger(event, target)
        {
            if ( ! Dom.find(target).inside(this.parent) && this.visibleBS === false ) {
                return;
            }

            if ( this.trigger !== 'click' || this.disabled === true || event.which !== 1 ) {
                return;
            }

            let final = Dom.find(target).closest(this.target),
                popover = Dom.find(target).closest(this.$el);

            let visible = popover !== null ||
                (final !== null && this.visibleBS === false);

            if ( visible === true && final !== null && event.which !== 1 ) {
                visible = false;
            }

            if ( this.closeInside === false && final !== null ) {
                visible = true;
            }

            if ( visible === true && this.visibleBS === true ) {
                return;
            }

            if ( visible === false && this.visibleBS === false ) {
                return;
            }

            this.$emit('input', this.visibleBS = visible);
        },

        hoverTrigger(event, el)
        {
            if ( this.disabled ) {
                return;
            }

            let target = Dom.find(el).closest(this.target),
                source = Dom.find(el).closest(this.$el);

            let result = !! target || !! source;

            if ( this.visibleBS === result ) {
                return;
            }

            this.$emit('input', this.visibleBS = result);
        },

        contextTrigger(event, target)
        {
            if ( ! Dom.find(target).inside(this.parent) && this.visibleBS === false ) {
                return;
            }

            if ( this.trigger !== 'context' || this.disabled === true ) {
                return;
            }

            let final = Dom.find(target).closest(this.target),
                popover = Dom.find(target).closest(this.$el);

            let visible = popover !== null ||
                (final !== null && this.visibleBS === false);

            if ( visible === true && final !== null && event.which !== 3 ) {
                visible = false;
            }

            if ( this.closeInside === false && final !== null ) {
                visible = true;
            }

            if ( visible === true && this.visibleBS === true ) {
                return;
            }

            if ( visible === false && this.visibleBS === false ) {
                return;
            }

            this.clientX = event.clientX;
            this.clientY = event.clientY;

            this.$emit('input', this.visibleBS = visible);
        },

        contextPrevent(event, target)
        {
            if ( this.trigger !== 'context' ) {
                return;
            }

            if ( Dom.find(target).closest(this.$el) ) {
                event.preventDefault();
            }

            if ( Dom.find(target).closest(this.target) ) {
                event.preventDefault();
            }
        }

    },

    data()
    {
        let options = {
            visibleBS: this.visible, clientX: 0, clientY: 0, target: null, parent: null
        };

        options.style = {
            display: 'none'
        };

        return options;
    },

    created()
    {
        this._uuid = UUID();
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

        this.target = Dom.find(this.$el).previous().get(0);

        if ( ! Any.isEmpty(this.selector) ) {
            this.target = Dom.find(this.$el).parent().find(this.selector).get(0);
        }

        this.parent = Dom.find(this.target).parent().get(0);

        if ( ! Any.isEmpty(this.boundry) ) {
            this.parent = Dom.find(this.boundry).get(0);
        }

        if ( ! Any.isEmpty(this.appendDom) ) {
            Dom.find(this.parent).append(this.$el);
        }

    },

    beforeDestroy()
    {
        Dom.find(document).off('mousedown',
            null, { _uid: this._uid });

        Dom.find(document).off('mousemove',
            null, { _uid: this._uid });

        Dom.find(document).off('contextmenu',
            null, { _uid: this._uid });

        this.$el.remove();
    },

    render()
    {
        let className = [
            'n-popover',
            'n-popover--beta',
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