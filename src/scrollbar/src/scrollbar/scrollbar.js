import { UUID, Arr, Obj, Dom, Any, Locale, Event, Num } from "nano-js";
import Optiscroll from 'optiscroll';

export default {

    name: 'NScrollbar',

    provide()
    {
        return {
            NScrollbar: this
        };
    },

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

        scrollTop(value)
        {
            Dom.find(this.$el).scrollTop(value);
        },

        scrollUp(offset = 0)
        {
            this.scrollTop(offset);
        },

        scrollDown(offset = 0)
        {
            let value = Dom.find(this.$el).height() -
                Dom.find(this.$el).innerHeight();

            this.scrollTop(value + offset);
        },

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
            Optiscroll.globalSettings.scrollMinUpdateInterval = 16;

            let options = {
                classPrefix: 'n-scrollbar-',
                minTrackSize: 10,
                wrapContent: false,
                preventParentScroll: true,
                forceScrollbars: false
            };

            this.optiscroll = new Optiscroll(this.$el.parentNode, options);

            if ( this.relative ) {
                Dom.find(this.$el).parent().addClass('n-relative');
            }

            let $event = {
                _uid: this._uid
            };

            if ( this.relative ) {

                Dom.find(this.$el).on('sizechange',
                    Any.debounce(this.adjustScrollbars), $event);

                this.adjustScrollbars();
            }

            Dom.find(this.$el).parent().addClass('n-scrollbar');

        },

        destroy()
        {
            try {
                this.optiscroll = this.optiscroll.destroy();
            } catch (e) {
                console.error('NScrollbar casualities...');
            }

            let $event = {
                _uid: this._uid
            };

            Dom.find(this.$el).off('sizechange', null, $event);

            Dom.find(this.$el).css(null);
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
        this.$parent.$on('hook:destroyed', this.destroy);

        this.initialize();
    },

    beforeDestroy()
    {
        this.destroy();

        this.$parent.$off('hook:updated');
        this.$parent.$off('hook:destroyed');
    },

    render()
    {
        return (
            <div ref="body" on={this.$listeners}>
                { this.$slots.default }
            </div>
        );
    }

}
