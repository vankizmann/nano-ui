import { UUID, Num, Arr, Obj, Any, Dom, Locale } from "@kizmann/pico-js";

window.NDrawerStack = [];

export default {

    name: 'NDrawer',

    inject: {

        NDrawer: {
            default: undefined
        },

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
                return '30%';
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

        theme: {
            default()
            {
                return 'auto';
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
                return 'right';
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
            NDrawer: this
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

        let showDrawer = () => {
            this.tempValue = true;
        };

        if ( this.modelValue ) {
            Any.delay(showDrawer, 100);
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

        closeDrawer(force = false, source = null)
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
            clearTimeout(this.refresh);

            Dom.find(this.$el).removeClass('n-ready');
        },

        startRefreshTimeout()
        {
            if ( ! this.tempValue ) {
                return this.stopRefreshTimeout();
            }

            window.zIndex += 1;

            Dom.find(this.$el).attr('data-drawer',
                window.zIndex);

            Dom.find(this.$el).css({
                'z-index': window.zIndex
            });

            this.queueRefreshTimeout();
        },

        queueRefreshTimeout()
        {
            if ( ! this.tempValue ) {
                return this.stopRefreshTimeout();
            }

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
                return this.closeDrawer(false, 'escape');
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
                return Dom.find(modal).attr('data-drawer');
            };

            let indexes = Dom.find('.n-drawer:not(.n-hidden)')
                .each(extractIndex);

            let index = Dom.find(this.$el).attr('data-drawer');

            if ( Arr.last(indexes.sort()) !== index ) {
                return;
            }

            this.closeDrawer(false, 'escape');
        },

    },

    renderClose()
    {
        if ( ! this.renderClose || ! this.closable ) {
            return null;
        }

        let props = {
            onClick: () => this.closeDrawer(false, 'escape')
        };

        return (
            <div class="n-drawer__close" {...props}>
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
            <div class="n-drawer__header">
                { [this.$slots.header && this.$slots.header({ closeDrawer: this.closeDrawer }) || this.title, this.ctor('renderClose')()] }
            </div>
        );
    },

    renderFooter()
    {
        if ( ! this.$slots.footer ) {
            return null;
        }

        return (
            <div class="n-drawer__footer">
                { this.$slots.footer({ closeDrawer: this.closeDrawer }) }
            </div>
        );
    },

    renderBody()
    {
        let bodyHtml = (
            <NScrollbar ref="scrollbar" relative={true} wrapClass="n-drawer__wrap">
                { this.$slots.default && this.$slots.default({ closeDrawer: this.closeDrawer }) }
            </NScrollbar>
        );

        if ( this.$slots.body ) {
            bodyHtml = this.$slots.body({ closeDrawer: this.closeDrawer });
        }

        return (
            <div class="n-drawer__body">
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
            width: this.width
        };

        let innerHtml = [
            this.ctor('renderHeader')(),
            this.ctor('renderBody')(),
            this.ctor('renderFooter')(),
        ]

        return (
            <div class="n-drawer__frame" style={style}>
                { this.$slots.raw ? this.$slots.raw() : innerHtml }
            </div>
        );
    },

    renderBackdrop()
    {
        let classList = [
            'n-drawer__backdrop',
        ];

        return (
            <div ref="backdrop" class={classList}></div>
        );
    },

    render()
    {
        if ( ! window.zIndex ) {
            window.zIndex = 9000;
        }

        let classList = [
            'n-drawer',
            'n-drawer--' + this.size,
            'n-drawer--' + this.position
        ];

        if ( this.theme ) {
            classList.push('n-theme--' + this.theme);
        }

        if ( this.tempValue ) {
            this.queueRefreshTimeout();
        }

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
