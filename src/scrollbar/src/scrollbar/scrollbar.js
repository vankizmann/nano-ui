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

        height: {
            default()
            {
                return false;
            },
            type: [Boolean]
        }

    },

    mounted()
    {
        Optiscroll.globalSettings.checkFrequency = 750;
        Optiscroll.globalSettings.scrollMinUpdateInterval = 32;

        this.optiscroll = new Optiscroll(this.$el.parentNode, {
            classPrefix: 'n-scrollbar-',
            minTrackSize: 10,
            wrapContent: false,
            preventParentScroll: true,
        });

        if ( this.height ) {
            Dom.find(this.$el).parent().css({ height: this.height + 'px' });
        }

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
