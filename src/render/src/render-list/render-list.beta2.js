import { UUID, Arr, Obj, Num, Dom, Any, Locale, Event } from "nano-js";
import { RecycleScroller } from "vue-virtual-scroller";

export default {

    name: 'NRenderList',

    model: {
        prop: 'items'
    },

    components: {
        RecycleScroller
    },

    props: {

        items: {
            default()
            {
                return [];
            }
        },

        itemHeight: {
            default()
            {
                return 30;
            }
        },

        viewportHeight: {
            default()
            {
                return false;
            }
        },

        renderNode: {
            default()
            {
                return null;
            }
        }

    },

    methods: {

    },

    data()
    {
        return {
            height: 0
        };
    },

    beforeMount()
    {
    },

    mounted()
    {
    },

    render($render)
    {
        this.$render = $render;

        if ( this.viewportHeight === false ) {
            return (
                <div class="n-render-list">
                    {
                        Arr.each(this.items, (value, key) => {
                            return this.renderNode(this.$render, value, key);
                        })
                    }
                </div>
            );
        }

        return (
            <RecycleScroller items={this.items}  item-size={this.itemHeight} prerender="10">
                { (props) => this.renderNode($render, props.item, props.index)}}
            </RecycleScroller>
        );
    }

}
