import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "nano-js";

export default {

    name: 'NModal',

    inject: {

        NScrollbar: {
            default: undefined
        }

    },

    props: {

        modelValue: {
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

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
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
                return false;
            },
            type: [Boolean]
        }

    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        },

        tempValue()
        {
            this.startRefreshTimeout();
        }

    },

    methods: {

        open()
        {
            this.$emit('update:modelValue', this.tempValue = true);
        },

        close(event)
        {
            if ( event ) {
                event.stopPropagation();
            }

            this.$emit('update:modelValue', this.tempValue = false);
        },

        addClass() {
            // Dom.find(this.$el).addClass('n-open');
            // Dom.find(this.target).addClass('n-open');
            // Dom.find(document.body).addClass('n-open');
        },

        removeClass() {
            // Dom.find(this.$el).removeClass('n-open');
            // Dom.find(this.target).removeClass('n-open');
            // Dom.find(document.body).removeClass('n-open');
        },

        stopRefreshTimeout()
        {
            clearInterval(this.refresh);

            Dom.find(this.$el).removeClass('n-ready');
        },

        startRefreshTimeout()
        {
            if ( ! this.tempValue ) {
                return this.stopRefreshTimeout();
            }

            Dom.find(this.$el).css({ 
                'z-index': window.zIndex++
            });

            this.refresh = setTimeout(() => {
                Dom.find(this.$el).addClass('n-ready');
            }, 100);
        },

        eventClick(event, el)
        {
            if ( this.disabled || event.which !== 1 ) {
                return;
            }

            let result = !! Dom.find(el).closest(this.target) || this.tempValue;

            if ( this.tempValue && this.closable ) {
                result = ! Dom.find(el).closest(this.$refs.backdrop);
            }

            if ( result === this.tempValue ) {
                return;
            }

            this.$emit('update:modalValue', this.tempValue = !! result);
        },

        eventKeydown(event, target)
        {
            if ( ! this.tempValue || ! this.closable ) {
                return;
            }

            if ( event.which !== 27 ) {
                return;
            }

            let toIndex = 0;

            Dom.find('.n-modal.n-open').each((el) => {

                if ( Dom.find(el).attr('data-index') < toIndex ) {
                    return;
                }

                toIndex = Dom.find(el).attr('data-index');
            });

            let meIndex = Dom.find(this.$el)
                .attr('data-index');

            if ( toIndex !== meIndex ) {
                return;
            }

            this.$nextTick(() => this.$emit('close'));
        },

    },

    // provide()
    // {
    //     return {
    //         NModal: this
    //     };
    // },

    data()
    {
        return {
            target: null, tempValue: this.modelValue
        };
    },

    mounted()
    {
        this.target = Dom.find(this.$el).previous().get(0);

        Dom.find(document.body).on('mousedown',
            this.eventClick, this._.uid);

        // Dom.find(document.body).on('keydown',
        //     this.eventKeydown, this._.uid);

        // if ( ! this.$listeners.close ) {
        //     this.$on('close', this.close);
        // }

        // this.target = Dom.find(this.$el).previous().get(0);

        // if ( ! Any.isEmpty(this.selector) ) {
        //     this.target = Dom.find(this.$el).parent().find(this.selector).get(0);
        // }

        Dom.find(document.body).append(this.$el);
    },

    beforeUnmount()
    {
        this.$el.remove();
    },

    unmounted()
    {
        Dom.find(document.body).off('mousedown',
            null, this._.uid);

        Dom.find(document.body).off('keydown',
            null, this._.uid);
    },

    renderClose()
    {
        if ( ! this.closable ) {
            return null;
        }

        let props = {
            onClick: this.close
        };

        return (
            <div class="n-modal__close" {...props}>
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
                { [this.$slots.header && this.$slots.header() || this.title, this.ctor('renderClose')()] }
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
                { this.$slots.footer() }
            </div>
        );
    },

    renderBody()
    {
        return (
            <div class="n-modal__body">
                <NScrollbar ref="scrollbar" relative={true} wrapClass="n-modal__wrap">
                    { this.$slots.default && this.$slots.default() }
                </NScrollbar>
            </div>
        );
    },

    renderFrame()
    {
        if ( ! this.tempValue ) {
            return null;
        }

        let style = {
            width: this.width, height: this.height
        };

        let innerHtml = [
            this.ctor('renderHeader')(),
            this.ctor('renderBody')(),
            // this.ctor('renderFooter')(),
        ]

        return (
            <div class="n-modal__frame" style={style}>
                { this.$slots.raw ? this.$slots.raw() : innerHtml }
            </div>
        );
    },

    renderBackdrop()
    {
        return (
            <div ref="backdrop" class="n-modal__backdrop"></div>
        );
    },

    render()
    {
        if ( ! window.zIndex ) {
            window.zIndex = 9000;
        }

        let classList = [
            'n-modal',
            'n-modal--' + this.type,
            'n-modal--' + this.position
        ];

        // if ( this.closable ) {
        //     classList.push('n-closable');
        // }

        if ( ! this.tempValue ) {
            classList.push('n-hidden');
        }

        let innerHtml = null;

        if ( this.tempValue ) {
            innerHtml = this.ctor('renderFrame')();
        }

        return (
            <div class={classList}>
                { [innerHtml, this.ctor('renderBackdrop')()] } 
            </div>
        );
    }

}
