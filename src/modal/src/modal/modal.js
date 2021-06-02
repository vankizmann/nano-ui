import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "@kizmann/pico-js";

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

        listen: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        update: {
            default()
            {
                return true;
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

        size: {
            default()
            {
                return 'md';
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

        renderClose: {
            default()
            {
                return true;
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

    provide()
    {
        return {
            NModal: this
        };
    },

    data()
    {
        return {
            target: null, tempValue: false
        };
    },

    mounted()
    {
        this.target = Dom.find(this.selector || this.$el)
            .previous().get(0);

        Dom.find(document.body).on('mousedown',
            this.eventClick, this._.uid);

        Dom.find(document.body).on('keydown',
            this.eventKeydown, this._.uid);

        let showModal = () => {
            this.tempValue = true;
        };

        if ( this.modelValue ) {
            Any.delay(showModal, 100);
        }

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

    methods: {

        openModal(force = false, source = null)
        {
            if ( this.tempValue ) {
                return;
            }

            if ( this.closable || force ) {
                this.tempValue = true;
            }

            this.$emit('update:modelValue', true, source);
        },

        closeModal(force = false, source = null)
        {
            if ( ! this.tempValue ) {
                return;
            }

            if ( ! this.update ) {
                return this.$emit('close', source);
            }

            if ( this.closable || force ) {
                this.tempValue = false;
            }

            this.$emit('update:modelValue', false, source);
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

            window.zIndex += 1;

            Dom.find(this.$el).attr('data-modal', 
                window.zIndex);

            Dom.find(this.$el).css({ 
                'z-index': window.zIndex
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

            let result = !! Dom.find(el).closest(this.target);

            if ( ! result && ! this.tempValue ) {
                return;
            }

            if ( this.tempValue && this.closable ) {
                result = ! Dom.find(el).closest(this.$refs.backdrop);
            }

            if ( result === this.tempValue ) {
                return;
            }

            if ( ! result ) {
                return this.closeModal(false, 'escape');
            }

            if ( this.listen ) {
                this.openModal(true, 'selector');
            }
        },

        eventKeydown(event, el)
        {
            if ( ! this.tempValue || event.which !== 27 ) {
                return;
            }

            let extractIndex = (modal) => { 
                return Dom.find(modal).attr('data-modal');
            };

            let indexes = Dom.find('.n-modal:not(.n-hidden)')
                .each(extractIndex);

            let index = Dom.find(this.$el).attr('data-modal');

            if ( Arr.last(indexes.sort()) !== index ) {
                return;
            }

            this.closeModal(false, 'escape');
        },

    },

    renderClose()
    {
        if ( ! this.renderClose || ! this.closable ) {
            return null;
        }

        let props = {
            onClick: () => this.closeModal(false, 'escape')
        };

        return (
            <div class="n-modal__close" {...props}>
                <span class={nano.Icons.times}></span>
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
                { [this.$slots.header && this.$slots.header({ closeModal: this.closeModal }) || this.title, this.ctor('renderClose')()] }
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
                { this.$slots.footer({ closeModal: this.closeModal }) }
            </div>
        );
    },

    renderBody()
    {
        let bodyHtml = (
            <NScrollbar ref="scrollbar" relative={true} wrapClass="n-modal__wrap">
                { this.$slots.default && this.$slots.default({ closeModal: this.closeModal }) }
            </NScrollbar>
        );

        if ( this.$slots.body ) {
            bodyHtml = this.$slots.body({ closeModal: this.closeModal });
        }

        return (
            <div class="n-modal__body">
                { bodyHtml }
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
            this.ctor('renderFooter')(),
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
            'n-modal--' + this.size,
            'n-modal--' + this.type,
            'n-modal--' + this.position
        ];

        if ( this.renderClose ) {
            classList.push('n-closable');
        }

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
