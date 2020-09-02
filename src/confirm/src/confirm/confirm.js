import { Obj, Locale } from "nano-js";

export default {

    name: 'NConfirm',

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

        size: {
            default()
            {
                return 'default';
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
        },

        propagation: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

    },

    data()
    {
        return {
            veVisible: this.visible
        };
    },

    methods: {

        abort(event)
        {
            this.$refs.modal.close(event);
            this.$emit('abort');
        },

        confirm(event)
        {
            this.$refs.modal.close(event);
            this.$emit('confirm');
        },

        eventInput(value)
        {
            this.$emit('input', this.veVisible = value);
        }

    },

    watch: {

        visible()
        {
            if ( this.visible !== this.veVisible ) {
                this.veVisible = this.visible;
            }
        }

    },

    renderIcon()
    {
        return (
            <div class="n-confirm__icon">
                <span class={this.icons[this.type]}></span>
            </div>
        );
    },

    renderBody()
    {
        return (
            <div class="n-confirm__body">
                {this.$slots.default || this.trans('Are you sure?')}
            </div>
        );
    },

    renderAction()
    {
        return (
            <div class="n-confirm__actions">
                <NButton size={this.size} type="secondary" vOn:click={this.abort}>
                    {this.trans('Abort')}
                </NButton>
                <NButton size={this.size} type={this.type} vOn:click={this.confirm}>
                    {this.trans('Confirm')}
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
            type: 'confirm',
            visible: this.veVisible,
            selector: this.selector,
            width: this.width,
            position: this.position,
            closable: this.closable
        };

        let events = Obj.clone(this.$listeners);

        // Override input listener
        events['input'] = this.eventInput;

        return (
            <NModal ref="modal" props={props} on={events}>
                <div slot="raw" class={classList}>
                    { this.ctor('renderIcon')() }
                    { this.ctor('renderBody')() }
                    { this.ctor('renderAction')() }
                </div>
            </NModal>
        );
    }

}
