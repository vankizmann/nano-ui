import { Arr, Obj, Any } from "@kizmann/pico-js";

export default {

    name: 'NReferencePicker',

    props: {

        modelValue: {
            default()
            {
                return '';
            },
            type: [String]
        },

        model: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        scope: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        width: {
            default()
            {
                return '100%';
            },
            type: [String]
        },

        height: {
            default()
            {
                return '100%';
            },
            type: [String]
        },

    },

    data()
    {
        return {
            modal: false, tempValue: this.modelValue
        };
    },

    methods: {

        updateValue(value)
        {
            this.$emit('update:modelValue', this.tempValue = value);
        }

    },

    renderModal()
    {
        if ( ! this.modal ) {
            return null;
        }

        let modalProps = {
            modelValue: true,
            width: this.width,
            height: this.height,
        };

        modalProps['onClose'] = () => {
            this.modal = false;
        };

        let panelProps = {
            model: this.model, scope: this.scope,
        };

        panelProps['onUpdate:modelValue'] = (value) => {
            this.updateValue(value); this.modal = false;
        };

        let slots = {
            //
        };

        slots['body'] = () => (
            <NReferencePanel class="in-modal" {...panelProps} />
        );

        return (
            <NModal {...modalProps} v-slots={slots} />
        );
    },

    renderInput()
    {
        let inputProps = {
            modelValue: this.tempValue,
            icon: 'fa fa-expand',
            size: this.size,
        };

        inputProps['onUpdate:modelValue'] = (value) => {
            this.updateValue(value);
        };

        inputProps['onBlur'] = (e) => {
            this.$emit('onBlur', e);
        };

        inputProps['onIconClick'] = () => {
            this.modal = true;
        };

        return (
            <NInput {...inputProps} />
        );
    },

    render()
    {
        return (
            <div class="n-reference-picker">
                {[this.ctor('renderInput')(), this.ctor('renderModal')()]}
            </div>
        );
    }

}