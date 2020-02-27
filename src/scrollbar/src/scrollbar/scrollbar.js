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

        adjustScrollbars()
        {
            let styles = Dom.find(this.$el).css(), addStyle = {};

            if ( styles.bottom ) {
                addStyle['margin-top'] = '-15px';
            }

            if ( styles.right ) {
                addStyle['margin-left'] = '-15px';
            }

            if ( Any.isEmpty(addStyle) ) {
                return;
            }

            Dom.find(this.$el).css(addStyle);
        },

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

            let $event = {
                _uid: this._uid
            };

            if ( this.relative ) {
                Dom.find(this.$el).on('sizechange', Any.debounce(this.adjustScrollbars), $event);
                this.adjustScrollbars();
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

            let $event = {
                _uid: this._uid
            };

            Dom.find(this.$el).off('sizechange', null, $event);
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
    },

    destroyed()
    {
        Any.delay(this.destroy, 500);
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
