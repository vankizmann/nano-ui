import { Arr, Obj, Any } from "nano-js";

export default {

    name: 'NCascaderPanel',

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

        hover: {
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

        disabled: {
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
            tempHover: this.hover,
        };
    },

    watch: {

        modelValue(value) {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        },

        hover(value) {
            if ( value !== this.tempHover ) {
                this.tempHover = value;
            }
        }

    },

    methods: {

        clearCascader()
        {
            this.$emit('update:modelValue', this.tempHover = 
                this.tempValue = this.clearValue);
        },

        onHover(cascade)
        {
            return (event) => this.hoverItem(cascade, event)
        },

        onSelect(cascade)
        {
            return (event) => this.selectItem(cascade, event)
        },

        hoverItem(cascade, event = null)
        {
            // Hover intend emulation
            clearTimeout(this.delay);

            let updateHover = () => {
                this.$emit('update:hover', 
                    this.tempHover = cascade);
            };

            this.delay = setTimeout(updateHover, 130);
        },

        selectItem(cascade, event = null)
        {
            if ( event ) {
                event.stopPropagation();
            }

            this.$emit('update:modelValue', 
                this.tempValue = cascade);
        },

    },

    renderDisplay()
    {
        let classList = [
            'n-cascader-panel',
            'n-cascader-panel--' + this.size
        ];

        return (
            <div class={classList}>
                { this.ctor('renderLabelClear')() }
                { this.ctor('renderLabel')() }
                { this.ctor('renderLabelAngle')() }
            </div>
        )
    },

    renderOption(item, cascade = [])
    {
        let value = Obj.get(item, this.valueProp);

        let classList = [
            'n-popover-option'
        ];

        if ( Arr.has(this.tempValue, item[this.valueProp]) ) {
            classList.push('n-active');
        }

        let disabled = Obj.get(item, this.disabledProp, false);

        if ( disabled ) {
            classList.push('n-disabled');
        }

        let props = {
            size: this.size,
            type: this.type,
            clickClose: false
        };

        if ( Arr.last(this.tempValue) === value ) {
            props.icon = this.icons.checked;
        }

        let tempCascade = Arr.merge(Arr.clone(cascade), [value]);

        if ( this.trigger === 'hover' ) {
            props.onMousemove = Any.framerate(this.onHover(tempCascade), 30);
        }

        if ( this.trigger === 'hover' && ! disabled ) {
            props.onClick = this.onSelect(tempCascade);
        }

        if ( this.trigger === 'click' ) {
            props.onMousedown = Any.framerate(this.onHover(tempCascade), 30);
        }

        if ( this.trigger === 'click' && ! disabled ) {
            props.onDblclick = this.onSelect(tempCascade);
        }

        let children = Obj.get(item, this.childProp);

        if (  ! props.icon && ! Any.isEmpty(children) ) {
            props.icon = this.icons.angleRight;
        }

        return (
            <NPopoverOption class={classList} {...props}>
                { Obj.get(item, this.labelProp) }
            </NPopoverOption>
        );
    },

    renderOptions(items, cascade = [])
    {
        if ( Any.isEmpty(items) ) {
            return null;
        }

        return (
            <div class="n-cascader-panel__items">
                <NScrollbar relative={true}>
                    {
                        Arr.each(items, (item) => {
                            return this.ctor('renderOption')(item, cascade);
                        })
                    }
                </NScrollbar>
            </div>
        )
    },

    renderCascade()
    {
        let renderList = [
            this.ctor('renderOptions')(this.options)
        ];

        let items = this.options, cascade = [];

        Arr.each(this.tempHover, (value) => {

            if ( ! items ) {
                return;
            }

            cascade.push(value);

            let item = Arr.find(items, {
                [this.valueProp]: value
            });

            items = Obj.get(item, this.childProp);

            let options = this.ctor('renderOptions')
                (items, cascade);

            renderList.push(options);
        });

        return renderList;
    },

    render()
    {
        let classList = [
            'n-cascader-panel',
            'n-cascader-panel--' + this.size
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>{ this.ctor('renderCascade')() }</div>
        );
    }

}