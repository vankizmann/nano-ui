import { Arr, Obj, Any, Locale } from "@kizmann/pico-js";

export default {

    name: 'NFile',

    props: {

        modelValue: {
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
                return 'md';
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
                return nano.Icons.times;
            },
            type: [String]
        },

        buttonText: {
            default()
            {
                return Locale.trans('Select file');
            },
            type: [String]
        }

    },

    data()
    {
        return {
            tempValue: this.value
        };
    },

    watch: {

        modelValue()
        {
            if ( this.modelValue !== this.tempValue ) {
                this.tempValue = this.modelValue;
            }
        }

    },

    methods: {

        openContext()
        {
            this.$refs.input.click();
        },

        updateFile()
        {
            let tempValue = [
                ...this.$refs.input.files
            ];

            if ( ! this.multiple ) {
                tempValue = tempValue[0];
            }

            console.log(tempValue);

            this.$emit('update:modelValue', this.tempValue = tempValue);
        },

        clearFile()
        {
            this.$emit('update:modelValue', null);
        }

    },

    renderInput()
    {
        let props = {
            size: this.size,
            disabled: true,
            iconDisabled: Any.isEmpty(this.tempValue)
        };

        props['onIconClick'] = this.clearFile;

        if ( ! this.multiple ) {
            props.modelValue = Obj.get(this.tempValue, 'name');
        }

        if ( this.multiple ) {
            props.modelValue = Locale.choice(':count File|:count Files',
                this.tempValue.length);
        }

        if ( this.clearable ) {
            props.icon = this.clearableIcon;
        }

        return (
            <NInput {...props}>
                { /* Input field for text */ }
            </NInput>
        );
    },

    renderButton()
    {
        let props = {
            size: this.size,
            disabled: this.disabled,
            icon: this.icon,
            onClick: this.openContext
        };

        return (
            <NButton {...props}>{this.buttonText}</NButton>
        );
    },

    renderHidden()
    {
        let props = {
            'onInput': this.updateFile
        };

        return (
            <div class="n-file__input">
                <input ref="input" type="file" multiple={this.multiple} {...props}></input>
            </div>
        );
    },

    render()
    {
        let classList = [
            'n-file'
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
