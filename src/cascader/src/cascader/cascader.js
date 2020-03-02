import { Arr, Obj, Any } from "nano-js";

export default {

    name: 'NCascader',

    props: {

        value: {
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

        items: {
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
                return this.trans('Please select');
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
                return 'default';
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

        boundary: {
            default()
            {
                return null;
            }
        },

        trigger: {
            default()
            {
                return 'click';
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
        }

    },

    data()
    {
        return {
            veValue: this.value,
            veHover: this.value,
            veOpen: false,
        };
    },

    methods: {

        clear()
        {
            this.$emit('input', this.veHover = this.veValue = this.clearValue);
        },

        eventPopoverInput(input)
        {
            this.veOpen = input;
        },

        eventHover(cascade)
        {
            this.$once('hook:updated', this.$refs.popover.refresh);

            if ( this.trigger !== 'hover' ) {
                this.$emit('hover', this.veHover = cascade);
            }

            // Hover intend emulation
            clearTimeout(this.veDelay);

            this.veDelay = setTimeout(() => {
                this.$emit('hover', this.veHover = cascade);
            }, 75);
        },

        eventSelect(cascade)
        {
            this.veOpen = false;
            this.$emit('input', this.veValue = cascade);
        },

    },

    watch: {

        value() {
            if ( this.value !== this.veValue ) {
                this.veValue = this.value;
            }
        }

    },

    renderLabelClear()
    {
        if ( ! this.clearable || this.disabled ) {
            return null;
        }

        let events = {
            click: this.clear
        };

        return (
            <div class="n-cascader__clear" on={events}>
                <span class={this.icons.times}></span>
            </div>
        );
    },

    renderLabelItems()
    {
        let items = this.items, renderList = [];

        Arr.each(this.veValue, (value) => {

            if ( ! items ) {
                return;
            }

            let item = Arr.find(items, {
                [this.valueProp]: value
            });

            items = Obj.get(item, this.childProp);

            let itemLabel = (
                <span class="n-cascader__item">
                    { Obj.get(item, this.labelProp) }
                </span>
            );

            renderList.push(itemLabel);
        });

        return renderList;
    },

    renderLabelAngle()
    {
        return (
            <div class="n-cascader__angle">
                <span class={this.icons.angleDown}></span>
            </div>
        );
    },

    renderLabel()
    {
        return (
            <div class="n-cascader__label">
                { !! this.veValue.length &&
                    this.ctor('renderLabelItems')()
                }
                { ! this.veValue.length &&
                    <span class="n-cascader__placeholder">
                        {this.placeholder}
                    </span>
                }
            </div>
        );
    },

    renderDisplay()
    {
        let classList = [
            'n-cascader',
            'n-cascader--' + this.size
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
        let veCascade = Arr.clone(cascade);

        veCascade.push(item[this.valueProp]);

        let classList = [
            'n-popover-option'
        ];

        if ( Arr.has(this.veValue, item[this.valueProp]) ) {
            classList.push('n-active');
        }

        if ( Arr.has(this.veHover, item[this.valueProp]) ) {
            classList.push('n-current');
        }

        let events = {};

        if ( this.trigger === 'hover' ) {
            events.mousemove = () => this.eventHover(veCascade);
            events.click = () => this.eventSelect(veCascade);
        }

        if ( this.trigger === 'click' ) {
            events.click = () => this.eventHover(veCascade);
            events.dblclick = () => this.eventSelect(veCascade);
        }

        let children = Obj.get(item, this.childProp);

        return (
            <div class={classList} on={events}>
                <div class="n-cascader-option__label">
                    <span>{ Obj.get(item, this.labelProp) }</span>
                </div>
                { ! Any.isEmpty(children) &&
                    <div class="n-cascader-option__arrow">
                        <span class={this.icons.angleRight}></span>
                    </div>
                }
            </div>
        );
    },

    renderOptions(items, cascade = [])
    {
        if ( Any.isEmpty(items) ) {
            return null;
        }

        return (
            <div class="n-cascader__items">
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
            this.ctor('renderOptions')(this.items)
        ];

        let items = this.items, cascade = [];

        Arr.each(this.veHover, (value) => {

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

    renderPopover()
    {
        let props = {
            visible: this.veOpen,
            type: 'cascader',
            trigger: 'click',
            width: '100%',
            size: this.size,
            disabled: this.disabled,
            position: this.position,
            boundary: this.boundary,
            window: ! this.boundary,
        };

        let events = {
            input: this.eventPopoverInput
        };

        return (
            <NPopover ref="popover" props={props} on={events}>
                { this.ctor('renderCascade')() }
            </NPopover>
        );
    },

    render()
    {
        let classList = [
            'n-cascader__wrapper'
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderDisplay')() }
                { this.ctor('renderPopover')() }
            </div>
        );
    }

}