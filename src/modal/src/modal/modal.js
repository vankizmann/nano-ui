import { UUID, Num, Obj, Any, Dom, Locale } from "nano-js";

export default {

    name: 'NModal',

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

        selector: {
            default()
            {
                return null;
            },
        },

        boundry: {
            default()
            {
                return document.body;
            },
        },

        width: {
            default()
            {
                return '50%';
            },
            type: [String]
        },

        height: {
            default()
            {
                return 'auto';
            },
            type: [String]
        },

        title: {
            default()
            {
                return '';
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
                return 'center-center';
            },
            type: [String]
        },

        closable: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        closeOutside: {
            default()
            {
                return this.closable;
            },
            type: [Boolean]
        }

    },

    computed: {

        parent()
        {
            return Dom.find(this.$el || this.node).parent().get(0);
        },

        element()
        {
            if ( this.selector === false ) {
                return null;
            }

            if ( this.selector === null ) {
                return Dom.find(this.$el || this.node).previous().get(0);
            }

            return Dom.find(this.parent).find(this.selector).get(0);
        }

    },

    watch: {

        visible()
        {
            this.veVisible = this.visible;
        },

        veVisible()
        {
            if ( this.veVisible === true ) {

                let interval = setInterval(() => {

                    if ( ! (this.$el || this.node) ) {
                        return;
                    }

                    // Clear interval
                    clearInterval(interval);

                    Dom.find(this.$el || this.node).addClass('n-modal--open');
                }, 100);

                Dom.find(this.element).addClass('n-modal--open');
            }

            if ( this.veVisible === false ) {
                Dom.find(this.element).removeClass('n-modal--open');
            }
        }

    },

    methods: {

        clickTrigger(event, target)
        {
            if ( event.which !== 1 ) {
                return;
            }

            if ( ! Dom.find(target).inside(this.parent) ) {
                return;
            }

            let element = Dom.find(target).closest(this.element);

            if ( Dom.find(element).hasClass('n-disabled') ) {
                return;
            }

            if ( Any.isEmpty(element) === false ) {
                return this.$emit('input', this.veVisible = true);
            }

            if ( this.veVisible === false ) {
                return;
            }

            if ( Dom.find(target).closest(this.$refs.close) ) {
                return this.$emit('close');
            }

            let content = Dom.find(this.$el || this.node).child().get(0);

            if ( Dom.find(target).closest(content) ) {
                return;
            }

            if ( this.closeOutside === false ) {
                return;
            }

            this.$emit('input', this.veVisible = false);
        },

    },

    data()
    {
        return {
            node: null, veVisible: this.visible
        };
    },

    mounted()
    {
        this.node = this.$el;

        Dom.find(document.body).on('mousedown',
            Any.throttle(this.clickTrigger, 150), { _uid: this._uid });

        if ( this.$listeners.close !== undefined ) {
            return;
        }

        this.$on('close', () => {
            this.$emit('input', this.veVisible = false);
        });

        Dom.find(document.body).append(this.$el);
    },

    updated()
    {
        this.node = this.$el;
    },

    beforeDestroy()
    {
        this.$el.remove();
    },

    destroyed()
    {
        Dom.find(document.body).off('mousedown',
            null, { _uid: this._uid });
    },

    renderClose()
    {
        if ( ! this.closable ) {
            return null;
        }

        return (
            <div ref="close" class="n-modal__close">
                <span class={this.icons.times}></span>
            </div>
        );
    },

    renderHeader()
    {
        if ( ! this.$slots.header && ! this.title ) {
            return null;
        }

        return (
            <div class="n-modal__header">
                { [this.$slots.header || this.title, this.ctor('renderClose')()] }
            </div>
        );
    },

    renderFooter()
    {
        if ( ! this.$slots.footer ) {
            return null;
        }

        return (
            <div class="n-modal__footer">
                { this.$slots.footer }
            </div>
        );
    },

    render($render)
    {
        this.$render = $render;

        if ( ! this.visible && ! this.veVisible ) {
            return null;
        }

        let classList = [
            'n-modal',
            'n-modal--' + this.type,
            'n-modal--' + this.position
        ];

        if ( this.closable === true ) {
            classList.push('n-closable');
        }

        let style = {
            width: this.width, height: this.height
        };

        return (
            <div class={classList}>
                { ! this.$slots.raw &&
                    <div class="n-modal__frame" style={style}>
                        { this.ctor('renderHeader')() }
                        <div class="n-modal__body">
                            { this.$slots.default }
                        </div>
                        { this.ctor('renderFooter')() }
                    </div>
                }
                { this.$slots.raw &&
                    <div class="n-modal__frame" style={style}>
                        { this.$slots.raw }
                    </div>
                }
            </div>
        );
    }

}
