import { Arr, Obj, Any, Locale } from "nano-js";

export default {

    name: 'NFile',

    props: {

        value: {
            default()
            {
                return null;
            }
        },

        multiple: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        icon: {
            default()
            {
                return '';
            },
            type: [String]
        },

        size: {
            default()
            {
                return 'default';
            },
            type: [String]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        placeholder: {
            default()
            {
                return '';
            },
            type: [String]
        },

        clearable: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        clearableIcon: {
            default()
            {
                return this.icons.times;
            },
            type: [String]
        },

        buttonText: {
            default()
            {
                return this.trans('Select file');
            },
            type: [String]
        }

    },

    methods: {

        openContext()
        {
            this.$refs.input.click();
        },

        updateFile()
        {
            let veValue = [...this.$refs.input.files];

            if ( ! this.multiple ) {
                veValue = veValue[0];
            }

            this.$emit('input', this.veValue = veValue);
        },

        clearFile()
        {
            this.$emit('input', null);
        }

    },

    data()
    {
        return {
            veValue: this.value
        };
    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue ) {
                this.veValue = this.value;
            }
        }

    },

    renderInput()
    {
        let events = {
            'icon-click': this.clearFile
        };

        let props = {
            size: this.size,
            disabled: true,
            iconDisabled: Any.isEmpty(this.veValue)
        };

        if ( ! this.multiple ) {
            props.value = Obj.get(this.veValue, 'name');
        }

        if ( this.multiple ) {
            props.value = Locale.choice(':count File|:count Files',
                this.veValue.length);
        }

        if ( this.clearable ) {
            props.icon = this.clearableIcon;
        }

        return (
            <NInput props={props} on={events}>
                { /* Input field for text */ }
            </NInput>
        );
    },

    renderButton()
    {
        let events = {
            click: this.openContext
        };

        let props = {
            size: this.size,
            disabled: this.disabled,
            icon: this.icon
        };

        return (
            <NButton props={props} on={events}>
                {this.buttonText}
            </NButton>
        );
    },

    renderHidden()
    {
        let events = {
            input: this.updateFile
        };

        return (
            <div class="n-file__input">
                <input ref="input" type="file" multiple={this.multiple} on={events} />
            </div>
        );
    },

    render(h)
    {
        let classList = [
            'n-file__wrapper'
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderInput')() }
                { this.ctor('renderButton')() }
                { this.ctor('renderHidden')() }
            </div>
        )
    }

}
