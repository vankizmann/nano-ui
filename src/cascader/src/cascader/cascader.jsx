import { Arr, Obj, Any } from "@kizmann/pico-js";

export default {

    name: 'NCascader',

    props: {

        modelValue: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        clearValue: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        options: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        current: {
            default()
            {
                return null;
            }
        },

        placeholder: {
            default()
            {
                return 'Please select';
            },
            type: [String]
        },

        emptyText: {
            default()
            {
                return 'No items';
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

        clearable: {
            default()
            {
                return false;
            },
            type: [Boolean]
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

        position: {
            default()
            {
                return 'bottom-start';
            },
            type: [String]
        },

        trigger: {
            default()
            {
                return 'hover';
            },
            type: [String]
        },

        labelProp: {
            default()
            {
                return 'label';
            },
            type: [String]
        },

        valueProp: {
            default()
            {
                return 'value';
            },
            type: [String]
        },

        childProp: {
            default()
            {
                return 'children';
            },
            type: [String]
        },

        disabledProp: {
            default()
            {
                return 'disabled';
            },
            type: [String]
        },

    },

    data()
    {
        return {
            tempValue: this.modelValue,
            tempHover: this.modelValue,
            focus: false,
        };
    },

    methods: {

        clearCascader()
        {
            this.focus = true;

            this.$emit('update:modelValue', 
                this.tempValue = this.tempHover = this.clearValue);
        },

        onCascaderInput(value)
        {
            this.focus = false;

            this.$emit('update:modelValue', 
                this.tempValue = value);
        },

        onCascaderHover(value)
        {
            this.$emit('update:hover', 
                this.tempHover = value);
        },

        onPopoverInput(value)
        {
            this.focus = value;
        },

    },

    watch: {

        modelValue(value) {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        }

    },

    renderLabelClear()
    {
        if ( ! this.clearable || Any.isEmpty(this.tempValue) ) {
            return null;
        }

        let props = {};

        if ( ! this.disabled ) {
            props.onMousedown = this.clearCascader;
        }

        return (
            <div class="n-cascader__clear n-form-clear" {...props}>
                <i class={ nano.Icons.times }></i>
            </div>
        );
    },

    renderLabelAngle()
    {
        return (
            <div class="n-cascader__angle n-form-angle">
                <i class={ nano.Icons.angleDown }></i>
            </div>
        );
    },

    renderLabelItems()
    {
        let items = this.options, renderList = [];

        if ( Any.isEmpty(this.tempValue) ) {
            return (
                <div class="n-cascader__placeholder">
                    { this.trans(this.placeholder) }
                </div>
            );
        }

        Arr.each(this.tempValue, (value) => {

            if ( ! items ) {
                return;
            }

            let item = Arr.find(items, {
                [this.valueProp]: value
            });

            items = Obj.get(item, this.childProp);

            let itemLabel = (
                <div class="n-cascader__item">
                    <span>{ Obj.get(item, this.labelProp) }</span>
                </div>
            );

            renderList.push(itemLabel);
        });

        return (
            <div class="n-cascader__items">
                { renderList }
            </div>
        );
    },

    renderDisplay()
    {
        let classList = [
            'n-cascader__display'
        ];

        return (
            <div class={classList}>
                { this.ctor('renderLabelClear')() }
                { this.ctor('renderLabelItems')() }
                { this.ctor('renderLabelAngle')() }
            </div>
        );
    },

    renderItems()
    {
        let emptyHtml = (
            <div class="n-popover-shadow n-cascader__empty">
                <NEmptyIcon inline={true}>{this.trans(this.emptyText)}</NEmptyIcon>
            </div>
        );

        if ( Any.isEmpty(this.options) ) {
            return emptyHtml;
        }

        let props = Obj.except(this.$props, ['modelValue'], {
            hover: this.tempHover,
            modelValue: this.tempValue,
        });

        props['onUpdate:hover'] = this.onCascaderHover;
        props['onUpdate:modelValue'] = this.onCascaderInput;

        return (
            <NCascaderPanel class="n-popover-shadow" {...props}></NCascaderPanel>
        );
    },

    renderPopover()
    {
        let props = {
            trigger: 'click',
            width: 0,
            size: this.size,
            position: this.position,
            scrollClose: true,
            disabled: this.disabled,
        };

        return (
            <NPopover ref="popover" vModel={this.focus} {...props}>
                { { raw: this.ctor('renderItems') } }
            </NPopover>
        );
    },

    renderElement()
    {
        let classList = [
            'n-cascader',
            'n-cascader--' + this.type,
            'n-cascader--' + this.size,
        ];

        if ( Any.isEmpty(this.tempValue) ) {
            classList.push('n-empty');
        }

        if ( this.clearable ) {
            classList.push('n-clearable');
        }

        if ( this.focus ) {
            classList.push('n-focus');
        }

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderDisplay')() }
            </div>
        );
    },

    render()
    {
        return [
            this.ctor('renderElement')(),
            this.ctor('renderPopover')()
        ];
    }

}