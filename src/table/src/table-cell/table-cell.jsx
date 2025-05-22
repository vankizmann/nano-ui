import { Obj } from "@kizmann/pico-js";

export default {

    inject: {

        NTable: {
            default: undefined
        },

        NDraggableItem: {
            default: undefined
        }

    },

    props: {

        uid: {
            required: true
        },

        column: {
            required: true
        },

        item: {
            required: true
        },

        value: {
            required: true
        },

        copy: {
            required: true
        },

        remove: {
            required: true
        },


    },

    computed: {

        input()
        {
            return Obj.get(this.item, this.column.prop);
        }

    },

    data()
    {
        return { init: false };
    },

    mounted()
    {
        this.timer = setTimeout(() => this.init = true, 20);
    },

    beforeUnmount()
    {
        clearTimeout(this.timer);
    },

    methods: {

        setFirstState(state)
        {
            Obj.set(this.column.changedStates,
                this.uid, this.firstState = state);
        }

    },

    render()
    {
        if ( this.column.$slots.default ) {
            return this.column.$slots.default(this);
        }
        
        return (
            <div>{ this.input }</div>
        );
    }

}
