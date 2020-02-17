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
        Optiscroll.globalSettings.scrollMinUpdateInterval = 32;

        this.optiscroll = new Optiscroll(this.$el.parentNode, {
            classPrefix: 'n-scrollbar-', wrapContent: false
        });

        Dom.find(this.$el).parent().addClass('n-scrollbar');
    },


    render()
    {
        return (<div on={this.$listeners}>{ this.$slots.default }</div>);
    }

}
