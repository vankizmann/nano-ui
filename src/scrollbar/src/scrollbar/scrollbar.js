import { UUID, Arr, Obj, Dom, Any, Locale, Event, Num } from "nano-js";
import Optiscroll from 'optiscroll';

export default {

    name: 'NScrollbar',

    props: {

        options: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        relative: {
            default()
            {
                return false;
            },
            type: [Boolean]
        }

    },

    methods: {

        initialize()
        {
            if ( this.optiscroll ) {
                this.destroy();
            }

            Optiscroll.globalSettings.checkFrequency = 750;
            Optiscroll.globalSettings.scrollMinUpdateInterval = 32;

            this.optiscroll = new Optiscroll(this.$el.parentNode, {
                classPrefix: 'n-scrollbar-',
                minTrackSize: 10,
                wrapContent: false,
                preventParentScroll: true,
                forceScrollbars: true
            });

            if ( this.relative ) {
                Dom.find(this.$el).parent().addClass('n-relative');
            }

            Dom.find(this.$el).parent().addClass('n-scrollbar');
        },

        destroy()
        {
            if ( ! this.optiscroll ) {
                return;
            }

            this.optiscroll.destroy();

            delete this.optiscroll;

            Dom.find(this.$el).parent().removeClass('n-scrollbar');
        },

        refresh()
        {
            if ( ! Dom.find(this.$el).parent().hasClass('is-enabled') ) {
                this.initialize();
            }
        }

    },

    mounted()
    {
        this.$parent.$on('hook:updated', this.refresh);

        this.initialize();
    },

    beforeDestroy()
    {
        this.$parent.$off('hook:updated');

        this.destroy();
    },

    render()
    {
        return (
            <div on={this.$listeners}>
                { this.$slots.default }
            </div>
        );
    }

}
