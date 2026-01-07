import { Arr, Any, Dom, Event, UUID } from "@kizmann/pico-js";


export default {

    name: 'NPopover',

    provide()
    {
        return {
            NPopover: this
        };
    },

    inject: {

        NPopover: {
            default: undefined
        }

    },

    props: {

        modelValue: {
            default()
            {
                return null;
            }
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

        listen: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        window: {
            default()
            {
                return true;
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

        theme: {
            default()
            {
                return 'dark';
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
                return 'bottom-center';
            },
            type: [String]
        },

        toggle: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        scrollClose: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        multiClose: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        alwaysRender: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        framerate: {
            default()
            {
                return 15;
            },
            type: [Number]
        }

    },

    data()
    {
        return {
            uid: UUID(),
            tempValue: false,
            clientX: 0,
            clientY: 0,
            target: null,
            prevent: false,
        };
    },

    watch: {

        modelValue()
        {
            this.tempValue = this.modelValue;
        },

    },

    beforeMount()
    {
        this.tempValue = this.modelValue;
    },

    mounted()
    {
        this.target = Dom.find(this.$el).previous().get(0);

        if ( this.trigger === 'context' ) {
            this.target = Dom.find(this.$el).parent().get(0);
        }

        let options = {
            uid: this.uid,
            target: this.target,
            listen: this.listen,
            position: this.position,
            toggle: this.toggle,
            trigger: this.trigger,
            width: this.width,
            scrollClose: this.scrollClose,
            multiClose: this.multiClose,
        };

        if ( this.NPopover ) {
            options.parent = this.NPopover.popel;
        }

        this.popel = this.Popover.append(this.$el, options);

        this.popel.on('open', () => {
            if ( this.tempValue !== true ) {
                this.$emit('update:modelValue', this.tempValue = true);
            }
        });

        this.popel.on('close', () => {
            if ( this.tempValue !== false ) {
                this.$emit('update:modelValue', this.tempValue = false);
            }
        });

        this.$watch('tempValue', () => {
            this.tempValue ? this.popel.show() : this.popel.hide();
        });

        Dom.find(document.body).append(this.$el);
    },

    beforeUnmount()
    {
        this.Popover.remove({ uid: this.uid });

        this.$el.remove();
    },

    methods: {

        active()
        {
            return this.tempValue;
        },

        open()
        {
            this.popel.open();
        },

        close()
        {
            this.popel.hide();
        },

    },

    renderBody()
    {
        if ( this.$slots.raw ) {
            return this.$slots.raw();
        }

        return (
            <div class="n-popover__frame">
                {this.$slots.header &&
                    <div class="n-popover__header">
                        {this.$slots.header()}
                    </div>
                }
                <div class="n-popover__body">
                    {this.$slots.default()}
                </div>
                {this.$slots.footer &&
                    <div class="n-popover__footer">
                        {this.$slots.footer()}
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
            'n-popover--' + this.size,
            'n-popover--' + this.position,
        ];

        if ( !this.tempValue ) {
            classList.push('n-hidden');
        }

        let viewBody = this.modelValue;

        if ( Any.isNull(this.modelValue) ) {
            viewBody = this.tempValue;
        }

        if ( this.alwaysRender ) {
            viewBody = true;
        }

        if ( viewBody ) {
            classList.push('n-ready');
        }

        if ( this.theme ) {
            classList.push('n-theme--' + this.theme);
        }

        return (
            <div class={classList}>
                {viewBody && this.ctor('renderBody')()}
            </div>
        );
    }

}
