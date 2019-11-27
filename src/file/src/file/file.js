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
                return 'fa fa-times';
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
            this.nativeValue = [...this.$refs.input.files];

            this.$emit('input', this.multiple === true ?
                this.nativeValue : Arr.first(this.nativeValue));
        },

        clearFile()
        {
            this.nativeValue = [];

            this.$emit('input', this.multiple === true ?
                this.nativeValue : null);
        }

    },

    data()
    {
        return {
            nativeValue: []
        };
    },

    render(h)
    {
        let inputEvents = {
            'icon-click': this.clearFile
        };

        let inputProps = {
            size: this.size,
            disabled: true,
            iconDisabled: Any.isEmpty(this.nativeValue)
        };

        let text = Locale.choice(':count File|:count Files',
            this.nativeValue.length);

        if ( this.nativeValue.length !== 0 ) {
            inputProps.value = this.nativeValue.length === 1 ?
                Obj.get(this.nativeValue, '0.name', text) : text;
        }

        if ( this.clearable === true ) {
            inputProps.icon = this.clearableIcon
        }

        let buttonEvents = {
            'click': this.openContext
        };

        let buttonProps = {
            size: this.size,
            disabled: this.disabled,
            icon: this.icon
        };

        return (
            <div class={['n-file__wrapper', this.disabled && 'n-disabled']}>

                {/* Input field for text */}
                <NInput props={inputProps} on={inputEvents}>

                </NInput>

                {/* Select button */}
                <NButton props={buttonProps} on={buttonEvents}>
                    {this.buttonText}
                </NButton>

                {/* Hidden input field */}
                <div class="n-file__input">
                    <input ref="input" type="file" multiple={this.multiple} vOn:input={this.updateFile} />
                </div>

            </div>
        )
    }

}
