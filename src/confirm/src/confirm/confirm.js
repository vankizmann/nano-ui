import { Obj, Locale } from "@kizmann/pico-js";

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

        width: {
            default()
            {
                return 'auto';
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
        }

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
            tempVisible: this.visible
        };
    },

    methods: {

        abort(event)
        {
            this.$refs.modal.closeModal(true, 'self');
            this.$emit('abort');
        },

        confirm(event)
        {
            this.$refs.modal.closeModal(true, 'self');
            this.$emit('confirm');
        },

        eventInput(value, source)
        {
            if ( ! value && source !== 'self' ) {
                this.$emit('abort');
            }

            this.$emit('update:visible', this.tempVisible = value);
        }

    },

    renderIcon()
    {
        return (
            <div class="n-confirm__icon">
                <span class={nano.Icons[this.type]}></span>
            </div>
        );
    },

    renderBody()
    {
        return (
            <div class="n-confirm__body">
                { this.$slots.default && this.$slots.default() || this.trans('Are you sure?') }
            </div>
        );
    },

    renderAction()
    {
        let classList = [
            'n-confirm__action'
        ];

        if ( window.WIN ) {
            classList.push('n-reverse');
        }

        return (
            <div class={classList}>
                <NButton size={this.size} type={this.type} link={true} onClick={this.abort}>
                    { this.trans('Abort') }
                </NButton>
                <NButton size={this.size} type={this.type} link={false} onClick={this.confirm}>
                    { this.trans('Confirm') }
                </NButton>
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-confirm',
            'n-confirm--' + this.type,
            'n-confirm--' + this.size
        ];

        let props = {
            type: 'default',
            selector: this.selector,
            listen: this.listen,
            width: this.width,
            position: this.position,
            closable: this.closable,
            modelValue: this.tempVisible,
        };

        // Override input listener
        props['onUpdate:modelValue'] = this.eventInput;

        let innerHtml = {
            raw: () => (
                <div class={classList}>
                    { this.ctor('renderIcon')() }
                    { this.ctor('renderBody')() }
                    { this.ctor('renderAction')() }
                </div>
            )
        };

        return (
            <NModal ref="modal" {...props}>
                { innerHtml }
            </NModal>
        );
    }

}
