import { Obj, Locale, Dom, Arr, Any } from "@kizmann/pico-js";

export default {

    name: 'NConfirm',

    props: {

        modelValue: {
            default()
            {
                return false;
            },
            type: [Boolean]
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

        selector: {
            default()
            {
                return null;
            },
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        confirmText: {
            default()
            {
                return Locale.trans('Okay');
            },
            type: [String]
        },

        cancelText: {
            default()
            {
                return Locale.trans('Cancel');
            },
            type: [String]
        },

    },

    watch: {

        modelValue()
        {
            if ( this.modelValue !== this.tempValue ) {
                this.tempValue = this.modelValue;
            }
        }

    },

    data()
    {
        return {
            tempValue: this.modelValue, activeState: false,
        };
    },

    mounted()
    {
        this.$watch('tempValue', () => {
            this.changeVisible();
        });

        this.$nextTick(() => {
            this.changeVisible();
        });

        this.target = Dom.find(this.selector || this.$el)
            .previous().get(0);

        Dom.find(document.body).on('mousedown',
            this.eventClick, this._.uid);

        Dom.find(document.body).append(this.$el);
    },

    unmounted()
    {
        Dom.find(document.body).off('mousedown',
            null, this._.uid);
    },

    methods: {

        extractText(fallback)
        {
            if ( !this.$slots.default ) {
                return fallback;
            }

            let nodes = this.$slots.default();

            if ( Any.isEmpty(nodes) ) {
                return fallback;
            }

            let html = [];

            nodes.map((el) => {

                if ( !Any.isString(el.children) ) {
                    return;
                }

                html.push(el.children);
            });

            return html.join(' ');
        },

        changeVisible()
        {
            if ( !this.tempValue || this.activeState ) {
                return;
            }

            let text = this.trans('Are you sure?');

            if ( this.$slots.default ) {
                text = this.$el.innerHTML;
            }

            let options = Obj.only(this.$props, ['size', 'type', 'confirmText', 'cancelText'], {
                text
            });

            this.Confirm.make(options)
                .then(() => {
                    this.activeState = false;
                    this.confirm();
                })
                .catch(() => {
                    this.activeState = false;
                    this.abort();
                });

            this.activeState = true;
        },

        abort()
        {
            this.$emit('update:modelValue', this.tempValue = false);
            this.$emit('abort');
        },

        confirm()
        {
            this.$emit('update:modelValue', this.tempValue = false);
            this.$emit('confirm');
        },

        eventClick(event, el)
        {
            if ( !this.listen || this.disabled || event.which !== 1 ) {
                return;
            }

            let result = !!Dom.find(el).closest(this.target);

            if ( result === this.tempValue ) {
                return;
            }

            event.preventDefault();

            this.$emit('update:modelValue', this.tempValue = true);
        },

    },

    render()
    {
        return (
            <div data-confirm="text" style="display: none !important;">
                {this.$slots.default && this.$slots.default()}
            </div>
        );
    }

}
