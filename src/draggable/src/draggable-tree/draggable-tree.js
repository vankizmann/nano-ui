import { Arr, Obj, Any } from "nano-js";
import NDraggable from "../draggable/draggable";

export default {

    name: 'NDraggableTree',

    model: {
        prop: 'items'
    },

    props: {

        items: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        cascade: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        expanded: {
            default()
            {
                return [];
            }
        },

        use: {
            default()
            {
                return null;
            }
        },

        useBefore: {
            default()
            {
                return null;
            }
        },

        useAfter: {
            default()
            {
                return null;
            }
        },

        depth: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        depthOffset: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        group: {
            default()
            {
                return ['default'];
            },
            type: [Array]
        },

        safeZone: {
            default()
            {
                return (height) => height * 0.25;
            }
        },

        showEmpty: {
            default()
            {
                return false;
            }
        },

        itemHeight: {
            default()
            {
                return 34;
            },
            type: [Number]
        },

        viewportHeight: {
            default()
            {
                return false;
            }
        },

        uniqueProp: {
            default()
            {
                return 'id';
            }
        },

        childProp: {
            default()
            {
                return 'children';
            }
        },

        transformDrop: {
            default()
            {
                return (item) => item;
            }
        },

        insertNode: {
            default()
            {
                return () => true;
            }
        },

        removeNode: {
            default()
            {
                return () => true;
            }
        },

        allowSelect: {
            default()
            {
                return true;
            }
        },

        allowDrag: {
            default()
            {
                return true;
            }
        },

        allowDrop: {
            default()
            {
                return true;
            }
        },

        className: {
            default()
            {
                return ['n-draggable', 'n-draggable-tree'];
            }
        }

    },

    watch: {

        nativeCascade()
        {
            this.$emit('update:cascade', this.nativeCascade);
        }

    },

    methods: {

        renderAfter(h, value)
        {
            let key = Any.integer(value.key);

            let item = this.items[key];

            let events = {

                input: Any.throttle((input) => {
                    item[this.childProp] = input;
                }, 7),

                cascade: Any.throttle((input) => {
                    this.$emit('cascade', this.nativeCascade =
                        Arr.merge([value.value[this.uniqueProp]], input));
                }, 7),

                move: Any.throttle((...args) => {
                    this.$emit('move', ...args);
                }, 7)

            };

            let props = Obj.assign({}, this.$props, {
                items: item[this.childProp], depth: this.depth + 1
            });

            let visible = Arr.has(this.expanded,
                value.value[this.uniqueProp]);

            return Any.isEmpty(item[this.childProp]) === false && visible ? h('NDraggableTree', {
                key: value.value._dragid, props: props, on: events, scopedSlots: this.$scopedSlots
            }) : null;
        },

        renderDefault(h, value)
        {
            let key = Any.integer(value.key);

            let events = {
                input: Any.throttle((input) => {
                    this.items.splice(key, 1, input);
                }, 7),
                cascade: Any.throttle((input) => {
                    this.$emit('cascade', this.nativeCascade = [input])
                }, 7),
                expand: Any.throttle((input) => {
                    Arr.toggle(this.expanded, input);
                }, 7),
            };

            return h('NDraggableTreeItem', { props: value, on: events }, [
                this.use === null ? this.$scopedSlots.default(value) :
                    h(this.use, { props: value, on: events })
            ]);
        }

    },

    provide()
    {
        return {
            NDraggableTree: this
        }
    },

    data()
    {
        return {
            nativeCascade: this.cascade
        };
    },

    render(h)
    {
        let scopedSlots = {
            default: (p) => this.renderDefault(h, p), after: (p) => this.renderAfter(h, p)
        };

        let events = {
            input: Any.throttle((...args) => {
                this.$emit('input', ...args);
            }, 7),
            move: Any.throttle((...args) => {
                this.$emit('move', ...args);
            }, 7)
        };

        let props = Obj.assign({}, this.$props, {
            use: null
        });

        if ( this.NDraggableTree ) {
            props.viewportHeight = false;
        }

        return h('NDraggable', {
            props: props, on: events, scopedSlots
        });
    }

}
