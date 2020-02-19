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
        }

    },

    mounted()
    {
        Optiscroll.globalSettings.checkFrequency = 750;
        Optiscroll.globalSettings.scrollMinUpdateInterval = 64;

        this.optiscroll = new Optiscroll(this.$el.parentNode, {
            classPrefix: 'n-scrollbar-', wrapContent: false, preventParentScroll: true, forceScrollbars: true
        });

        Dom.find(this.$el).parent().addClass('n-scrollbar');
    },

    beforeDestroy()
    {
        this.optiscroll.destroy();

        Dom.find(this.$el).parent().removeClass('n-scrollbar');
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
