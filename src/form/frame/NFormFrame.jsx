import NFormFrameClass from "./NFormFrameClass.js";
import { defineComponent, ref } from "vue";
import NFormFrameRender from "./NFormFrameRender.jsx";

const cls = new NFormFrameClass();

export default defineComponent({

    name: 'NFormFrame',

    props: {
        showSearch: Boolean,
        searchPlaceholder: String,
        searchIcon: String,
        kind: {
            default()
            {
                return 'fieldset';
            },
            types: [String]
        },
        multiple: Boolean
    },

    emits: ['update:kind'],

    setup(props, scope)
    {
        const vm = {
            props
        };

        vm.data = {
            count: ref(0)
        };

        vm.addCount = () => {
            vm.data.count.value++;
        };

        const render = new NFormFrameRender(vm);

        return () => {
            return render.renderDefault();
        };
    }

});