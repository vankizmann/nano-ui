import { PropType, defineComponent } from "vue";
import { Props } from "../../../root/index.ts";
import { NPaginatorController } from "./NPaginatorController.ts";

export const NPaginatorLimits = [
    25, 50, 100, 500, 1000, 2500
];

export const NPaginatorLayout = [
    'limit', 'count', 'spacer', 'goto', 'pages'
];

export const NPaginatorProps = {

    ...Props.Size,
    ...Props.Type,

    /**
     * @type {PropType<number>}
     */
    page: {
        type: [Number], default: 1
    },

    /**
     * @type {PropType<number>}
     */
    limit: {
        type: [Number], default: 100
    },

    /**
     * @type {PropType<array>}
     */
    limitOptions: {
        type: [Array], default: () => NPaginatorLimits
    },

    /**
     * @type {PropType<number>}
     */
    total: {
        type: [Number], default: 0
    },

    /**
     * @type {PropType<number>}
     */
    maxPages: {
        type: [Number], default: 5
    },

    /**
     * @type {PropType<array>}
     */
    layout: {
        type: [Array], default: () => NPaginatorLayout
    },

    /**
     * @type {PropType<array>}
     */
    limitText: {
        type: [String], default: ':count item|:count items'
    },

    /**
     * @type {PropType<array>}
     */
    countText: {
        type: [String], default: 'No items|Total :count item|Total :count items'
    },

    /**
     * @type {PropType<object>}
     */
    buttonProps: {
        type: [Object], default: null
    },

};

export default defineComponent({

    /**
     * @type {string}
     */
    name: 'NPaginator',

    /**
     * @type {typeof NPaginatorProps}
     */
    props: NPaginatorProps,

    /**
     * @type {string[]}
     */
    emits: [
        'paginate',
        'update:page',
        'update:limit',
    ],

    setup(props, context)
    {
        let ncx = new NPaginatorController(props, context);

        ncx.dispose(() => {
            ncx = null;
        });

        return ncx.render();
    }

});