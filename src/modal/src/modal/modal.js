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
            this.nativeVisible = this.visible;
        },

        nativeVisible()
        {
            if ( this.nativeVisible === true ) {

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

            if ( this.nativeVisible === false ) {
                Dom.find(this.element).removeClass('n-modal--open');
            }
        }

    },

    methods: {

        clickTrigger(event, target)
        {
            if ( ! Dom.find(target).inside(this.parent) ) {
                return;
            }

            let element = Dom.find(target).closest(this.element);

            if ( Dom.find(element).hasClass('n-disabled') ) {
                return;
            }

            if ( Any.isEmpty(element) === false ) {
                return this.$emit('input', this.nativeVisible = true);
            }

            if ( this.nativeVisible === false ) {
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

            this.$emit('input', this.nativeVisible = false);
        },

    },

    data()
    {
        return {
            node: null, nativeVisible: this.visible
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
            this.$emit('input', this.nativeVisible = false);
        });
    },

    updated()
    {
        this.node = this.$el;
    },

    destroyed()
    {
        Dom.find(document.body).off('mousedown',
            null, { _uid: this._uid });
    },

    render(h)
    {
        if ( this.visible === false && this.nativeVisible === false ) {
            return null;
        }

        let className = [
            'n-modal', 'n-modal--' + this.type, 'n-modal--' + this.position
        ];

        if ( this.closable === true ) {
            className.push('n-modal--closable');
        }

        let style = {
            width: this.width, height: this.height
        };

        if ( ! this.$slots.header && ! Any.isEmpty(this.title) ) {
            this.$slots.header = this.title;
        }

        return (
            <div class={className}>
                { ! this.$slots.raw &&
                    <div class="n-modal__frame" style={style}>
                        { this.$slots.header &&
                            <div class="n-modal__header">
                                { this.$slots.header }
                                { this.closable === true &&
                                    <div ref="close" class="n-modal__close">
                                        <span class="fa fa-times"></span>
                                    </div>
                                }
                            </div>
                        }
                        <div class="n-modal__body">
                            { this.$slots.default }
                        </div>
                        { this.$slots.footer &&
                            <div class="n-modal__footer">
                                { this.$slots.footer }
                            </div>
                        }
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
