import { Obj, Locale, Dom, Arr, Any } from "@kizmann/pico-js";

export default {

    name: 'NConfirm',

    props: {

        visible: {
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
                return Locale.trans('Okay2');
            },
            type: [String]
        },

        cancelText: {
            default()
            {
                return Locale.trans('Cancel2');
            },
            type: [String]
        },

    },

    watch: {

        visible()
        {
            if ( this.visible !== this.tempVisible ) {
                this.tempVisible = this.visible;
            }
        }

    },

    data()
    {
        return {
            tempVisible: false, activeState: false,
        };
    },

    mounted()
    {
        this.$watch('tempVisible', () => {
            this.changeVisible();
        });

        this.target = Dom.find(this.selector || this.$el)
            .previous().get(0);

        Dom.find(document.body).on('mousedown',
            this.eventClick, this._.uid);
    },

    unmounted()
    {
        Dom.find(document.body).off('mousedown',
            null, this._.uid);
    },

    methods: {

        extractText(fallback)
        {
            if ( ! this.$slots.default ) {
                return fallback;
            }

            let nodes = this.$slots.default();

            if ( Any.isEmpty(nodes) ) {
                return fallback;
            }

            let html = [];

            nodes.map((el) => {

                if ( ! Any.isString(el.children) ) {
                    return;
                }

                html.push(el.children);
            });

            return html.join(' ');
        },

        changeVisible()
        {
            if ( ! this.tempVisible || this.activeState ) {
                return;
            }

            let text = this.trans('Are you sure?');

            if ( this.$slots.default ) {
                text = this.extractText(text);
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

            console.log(this.tempVisible, this.activeState);

            this.activeState = true;
        },

        abort()
        {
            this.$emit('update:visible', this.tempVisible = false);
            this.$emit('abort');
        },

        confirm()
        {
            this.$emit('update:visible', this.tempVisible = false);
            this.$emit('confirm');
        },

        eventClick(event, el)
        {
            if ( !this.listen || this.disabled || event.which !== 1 ) {
                return;
            }

            let result = !! Dom.find(el).closest(this.target);

            if ( result === this.tempVisible ) {
                return;
            }

            event.preventDefault();

            this.tempVisible = true;
        },

    },

    render()
    {
        return null;
    }

}
