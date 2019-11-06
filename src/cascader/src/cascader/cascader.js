import CtorMixin from "../../../mixins/src/ctor";
import { Arr, Obj, Any } from "nano-js";

export default {

    name: 'NCascader',

    model: {
        prop: 'cascade'
    },

    props: {

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

        cascade: {
            default()
            {
                return [];
            },
            type: [Array]
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

    methods: {

        ...CtorMixin,

        toggleHover(cascade)
        {
            Any.debounce((value) => this.hoverCascade = value, 50, this)(cascade);
        },

        toggleSelect(cascade)
        {
            cascade = Arr.filter(cascade, (item) => {
                return Any.isEmpty(item) === false;
            });

            cascade = Arr.each(cascade, (item) => {
                return Obj.get(item, this.valueProp);
            });

            this.visible = false;

            this.$emit('input', this.nativeCascade = cascade);
        },

        solveNativeCascade()
        {
            if ( ! Any.isArray(this.cascade) ) {
                return;
            }

            if ( Any.isEqual(this.nativeCascade, this.cascade) ) {
                return;
            }

            this.nativeCascade = this.cascade;
        },

        clearNativeCascade()
        {
            this.$emit('input', this.nativeCascade = []);
        },

        solveSelectedCascade()
        {
            let selected = [], items = this.items;

            Arr.each(this.nativeCascade, (value) => {

                let item = Arr.find(items, { [this.valueProp]: value });

                selected.push(item);

                items = Obj.get(item, this.childProp, []);
            });

            this.selectedCascade = selected;
        }

    },

    watch: {

        cascade: {
            handler: 'solveNativeCascade'
        },

        nativeCascade: {
            handler: 'solveSelectedCascade'
        },

    },

    data()
    {
        return {
            visible: false, timeout: null, hoverCascade: [null], nativeCascade: [], selectedCascade: []
        };
    },

    beforeMount()
    {
        this.solveNativeCascade();
    },

    renderItem(item, index)
    {
        let hoverEvent = () => {

            let clone = Arr.slice(this.hoverCascade,
                0, index + 1);

            this.toggleHover(Arr.merge(clone, [item]));
        };

        let selectEvent = () => {

            let clone = Arr.slice(this.hoverCascade,
                0, index + 1);

            this.toggleSelect(Arr.merge(clone, [item]));
        };

        let events = {};

        if ( this.trigger === 'hover' ) {
            events.mousemove = hoverEvent;
            events.click = selectEvent;
        }

        if ( this.trigger === 'click' ) {
            events.mousedown = hoverEvent;
            events.dblclick = selectEvent;
        }

        let value = Obj.get(item, this.valueProp);

        let className = [
            'n-cascader-option'
        ];

        if ( Arr.has(this.nativeCascade, value) ) {
            className.push('n-cascader-option--active');
        }

        let childs = Obj.get(item, this.childProp);

        return (
            <div class={className} on={events}>
                <div class="n-cascader-option__label">
                    <span>{ Obj.get(item, this.labelProp) }</span>
                </div>
                { Any.isEmpty(childs) === false &&
                    <div class="n-cascader-option__arrow">
                        <span class="fa fa-angle-right"></span>
                    </div>
                }
            </div>
        );
    },

    renderCascade(cascade, index)
    {
        let items = Obj.get(cascade, this.childProp);

        if ( index === 0 ) {
            items = this.items;
        }

        if ( Any.isEmpty(items) === true ) {
            return;
        }

        return (
            <div class="n-cascader__options">
                {
                    Arr.each(items, (item) => {
                        return this.ctor('renderItem')(item, index);
                    })
                }
            </div>
        )
    },

    render()
    {
        let className = [
            'n-cascader', 'n-cascader--' + this.size
        ];

        if ( this.disabled === true ) {
            className.push('n-cascader--disabled');
        }

        return (
            <div class={['n-cascader__wrapper', this.disabled && 'n-disabled']}>
                <div class={className}>
                    { (this.clearable === true && this.disabled === false && this.nativeCascade.length !== 0 ) &&
                        <div class="n-cascader__clear" vOn:mousedown_stop={this.clearNativeCascade}>
                            <span class="fa fa-times"></span>
                        </div>
                    }
                    <div class="n-cascader__label">
                        { this.selectedCascade.length !== 0 &&
                            Arr.each(this.selectedCascade, (item) => {
                                return (
                                    <span class="n-cascader__item">
                                        { Obj.get(item, this.labelProp) }
                                    </span>
                                );
                            })
                        }
                        { this.selectedCascade.length === 0 &&
                            <span class="n-cascader__placeholder">
                                { this.placeholder }
                            </span>
                        }
                    </div>
                    <div class="n-cascader__arrow">
                        <span class="fa fa-angle-down"></span>
                    </div>
                </div>
                <NPopover vModel={this.visible} disabled={this.disabled} type="cascader" trigger="click" position="bottom-start">
                    {
                        Arr.each(this.hoverCascade, (cascade, index) => {
                            return this.ctor('renderCascade')(cascade, index);
                        })
                    }
                </NPopover>
            </div>

        );
    }

}