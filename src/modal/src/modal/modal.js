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

        boundary: {
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
        },

        transitionModal: {
            default()
            {
                return 'n-fade-up';
            },
            type: [String]
        },

        transitionBackdrop: {
            default()
            {
                return 'n-fade';
            },
            type: [String]
        }

    },

    watch: {

        visible()
        {
            if ( this.visible !== this.veVisible ) {
                this.veVisible = this.visible;
            }
        },

    },

    methods: {

        open()
        {
            this.$emit('input', this.veVisible = true);
        },

        close(event)
        {
            if ( event ) {
                event.stopPropagation();
            }

            this.$emit('input', this.veVisible = false);
        },

        addClass() {
            Dom.find(this.$el).addClass('n-open');
            Dom.find(this.target).addClass('n-open');
            Dom.find(document.body).addClass('n-open');
        },

        removeClass() {
            Dom.find(this.$el).removeClass('n-open');
            Dom.find(this.target).removeClass('n-open');
            Dom.find(document.body).removeClass('n-open');
        },

        eventClick(event, target)
        {
            if ( event.which !== 1 ) {
                return;
            }

            if ( Dom.find(target).closest('.n-disabled') ) {
                return;
            }

            let result = !! Dom.find(target)
                .closest(this.target) || this.veVisible;

            if ( this.veVisible && this.closeOutside ) {
                result = ! Dom.find(target).closest(this.$refs.backdrop);
            }

            if ( result !== this.veVisible ) {
                this.$emit('input', this.veVisible = !! result);
            }

        },

    },

    data()
    {
        return {
            target: null, veVisible: this.visible
        };
    },

    mounted()
    {
        Dom.find(document.body).on('click',
            this.eventClick, { _uid: this._uid });

        if ( ! this.$listeners.close ) {
            this.$on('close', this.close);
        }

        this.target = Dom.find(this.$el).previous().get(0);

        if ( ! Any.isEmpty(this.selector) ) {
            this.target = Dom.find(this.$el).parent().find(this.selector).get(0);
        }

        Dom.find(document.body).append(this.$el);
    },

    beforeDestroy()
    {
        this.$off('close');

        this.$el.remove();
    },

    destroyed()
    {
        Dom.find(document.body).off('click',
            null, { _uid: this._uid });
    },

    renderClose()
    {
        if ( ! this.closable ) {
            return null;
        }

        let events = {
            click: () => this.$emit('close')
        };

        return (
            <div class="n-modal__close" on={events}>
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

    renderBody()
    {
        let style = {
            width: this.width, height: this.height
        };

        let rawHtml = (
            <div key={this.veVisible ? '1' : '0'} class="n-modal__frame" style={style}>
                { this.$slots.raw }
            </div>
        );

        if ( this.$slots.raw ) {
            return rawHtml;
        }

        return (
            <div key={this.veVisible ? '1' : '0'} class="n-modal__frame" style={style}>
                { this.ctor('renderHeader')() }
                <div class="n-modal__body">
                    <NScrollbar class="n-modal__wrap" relative={true}>
                        {this.$slots.default}
                    </NScrollbar>
                </div>
                { this.ctor('renderFooter')() }
            </div>
        )
    },

    renderBackdrop()
    {
        return (
            <div ref="backdrop" key={this.veVisible ? '1' : '0'} class="n-modal__backdrop"></div>
        )
    },

    renderModal()
    {
        if ( ! window.zIndex ) {
            window.zIndex = 9000;
        }

        let style = {
            zIndex: window.zIndex++
        };

        let classList = [
            'n-modal',
            'n-modal--' + this.type,
            'n-modal--' + this.position
        ];

        if ( this.closable ) {
            classList.push('n-closable');
        }

        let events = {
            'beforeEnter': this.addClass,
            'afterLeave': this.removeClass
        };

        return (
            <div class={classList} style={style}>
                <transition name={this.transitionModal} mode="out-in">
                    { this.veVisible ? this.ctor('renderBody')() : null }
                </transition>
                <transition name={this.transitionBackdrop} mode="out-in" on={events}>
                    { this.veVisible ? this.ctor('renderBackdrop')() : null }
                </transition>
            </div>
        );
    },

    render($render)
    {
        this.$render = $render;

        return this.ctor('renderModal')();
    }

}
