import { Arr, Obj, Any, Dom, UUID, Locale } from "@kizmann/pico-js";

export default {

    name: 'NFrameItem',

    inject: {

        NFrame: {
            default: undefined
        },

    },

    props: {

        width: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        resize: {
            default() {
                return null;
            },
            type: [Boolean]
        },

        scrollbar: {
            default() {
                return null;
            },
            type: [Boolean]
        }

    },

    computed: {

        itemResize() {
            return Any.isNull(this.resize) ? this.NFrame.resize : this.resize;
        },

        itemScrollbar() {
            return Any.isNull(this.scrollbar) ? this.NFrame.scrollbar : this.scrollbar;
        }

    },

    renderContent()
    {
        if ( ! this.itemScrollbar ) {
            return this.$slots.default && this.$slots.default();
        }

        return (
            <NScrollbar>{this.$slots.default && this.$slots.default()}</NScrollbar>
        );
    },

    renderDiv(classList)
    {
        let style = {
            //
        };

        if ( this.width ) {
            style.width = this.width + 'px';
        }

        return (
            <div class={classList} style={style}>
                {this.ctor('renderContent')()}
            </div>
        );
    },

    renderResizer(classList, style)
    {
        let props = {
            width: this.width
        };

        return (
            <NResizer class={classList} {...props}>
                {this.ctor('renderContent')()}
            </NResizer>
        );
    },

    render()
    {
        let classList = [
            'n-frame-item'
        ];

        if ( this.itemResize ) {
            classList.push('is-resize');
        }

        if ( this.itemScrollbar ) {
            classList.push('is-scrollbar');
        }

        if ( this.itemResize ) {
            return this.ctor('renderResizer')(classList);
        }

        return this.ctor('renderDiv')(classList);
    }
}
