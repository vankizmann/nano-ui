import { UUID, Num, Arr, Obj, Dom, Any, Event, Locale } from "@kizmann/pico-js";
import NDraghandler from "../draghandler/draghandler.js";

window.DEBUG_NDLIST = false;

export default {

    name: 'NDropzone',

    model: {
        prop: 'item'
    },

    props: {

        item: {
            default()
            {
                return null;
            }
        },

        renderNode: {
            default()
            {
                return null;
            }
        },

        draggable: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        type: {
            default()
            {
                return 'primary';
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

        group: {
            default()
            {
                return ['default'];
            },
            type: [Array]
        },

        allowGroups: {
            default()
            {
                return ['default'];
            },
            type: [Array]
        },

        showEmptyIcon: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        uniqueProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        transformDrop: {
            default()
            {
                return (node) => node;
            }
        },

        disableMove: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        insertNode: {
            default()
            {
                return true;
            }
        },

        removeNode: {
            default()
            {
                return true;
            }
        },

        allowDrop: {
            default()
            {
                return () => true;
            }
        },

    },

    provide()
    {
        return {
            NDropzone: this
        };
    },

    data()
    {
        return {
            uid: UUID(),
        };
    },

    beforeMount()
    {
        this.drag = new NDraghandler(this);
    },

    mounted()
    {
        this.drag.bindRoot(this.$el);
    },

    beforeUnmount()
    {
        this.drag.unbindRoot();
    },

    renderItem()
    {
        if ( Any.isEmpty(this.item) ) {
            return null;
        }

        return this.$slots.default && this.$slots.default(this.item)
    },

    renderEmpty()
    {
        if ( ! Any.isEmpty(this.item) ) {
            return null;
        }

        return (
            <NEmptyIcon disabled={! this.showEmptyIcon} class="n-dropzone__empty">
                { this.$slots.empty && this.$slots.empty() || this.trans('No entry') }
            </NEmptyIcon>
        );
    },

    render()
    {
        let classList = [
            'n-dropzone',
            'n-dropzone--' + this.size,
            'n-dropzone--' + this.type
        ];

        if ( Any.isEmpty(this.item) ) {
            classList.push('n-empty');
        }

        return (
            <div class={classList}>
                {[this.ctor('renderItem')(), this.ctor('renderEmpty')()]}
            </div>
        );
    }

}
