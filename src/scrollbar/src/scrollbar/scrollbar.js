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

            let vtrack = Dom.find(this.$el).parent()
                .find('.n-scrollbar-v').get(0);

            if ( vtrack ) {
                vtrack.remove();
            }

            let htrack = Dom.find(this.$el).parent()
                .find('.n-scrollbar-h').get(0);

            if ( htrack ) {
                htrack.remove();
            }

            Optiscroll.globalSettings.checkFrequency = 750;
            Optiscroll.globalSettings.scrollMinUpdateInterval = 16;

            this.optiscroll = new Optiscroll(this.$el.parentNode, {
                classPrefix: 'n-scrollbar-',
                minTrackSize: 10,
                wrapContent: false,
                preventParentScroll: true,
                forceScrollbars: false
            });

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
        this.$parent.$on('hook:destroyed', this.destroy);

        this.initialize();
    },

    beforeDestroy()
    {
        this.$parent.$off('hook:updated');
        this.$parent.$off('hook:destroyed');
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
