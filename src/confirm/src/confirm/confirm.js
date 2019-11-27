import { Locale } from "nano-js";

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

        boundry: {
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
                return false;
            },
            type: [Boolean]
        }

    },

    watch: {

        visible()
        {
            this.nativeVisible = this.visible;
        }

    },

    methods: {

        abort()
        {
            this.$emit('input', this.nativeVisible = false);
            this.$emit('abort');
        },

        confirm()
        {
            this.$emit('input', this.nativeVisible = false);
            this.$emit('confirm');
        }


    },

    data()
    {
        return {
            nativeVisible: this.visible
        };
    },

    render()
    {
        let className = [
            'n-confirm', 'n-confirm--' + this.type, 'n-confirm--' + this.size
        ];

        return (
            <NModal type="confirm" vModel={this.nativeVisible} selector={this.selector} width={this.width} position={this.position} closable={this.closable}>
                <template slot="raw">
                    <div class={className}>
                        <div class="n-confirm__icon">
                            { this.type === 'success' &&
                                <span class="fa fa-check-circle"></span>
                            }
                            { this.type === 'warning' &&
                                <span class="fa fa-exclamation-circle"></span>
                            }
                            { this.type === 'danger' &&
                                <span class="fa fa-times-circle"></span>
                            }
                            { this.type === 'primary' &&
                                <span class="fa fa-info-circle"></span>
                            }
                        </div>
                        <div class="n-confirm__body">
                            { this.$slots.default || this.trans('Are you sure?') }
                        </div>
                        <div class="n-confirm__actions">
                            <NButton size={this.size} type="secondary" vOn:click={this.abort}>
                                { this.trans('Abort') }
                            </NButton>
                            <NButton size={this.size} type={this.type} vOn:click={this.confirm}>
                                { this.trans('Confirm') }
                            </NButton>
                        </div>
                    </div>
                </template>
            </NModal>
        );
    }

}
