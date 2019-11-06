import { UUID, Arr, Obj, Dom, Any, Locale, Event } from "nano-js";

export default {

    name: 'NRenderList',

    model: {
        prop: 'items'
    },

    props: {

        items: {
            default()
            {
                return [];
            }
        },

        startCount: {
            default()
            {
                return 50;
            }
        },

        stepCount: {
            default()
            {
                return 25;
            }
        },

        stepTimer: {
            default()
            {
                return 150;
            }
        },

        itemHeight: {
            default()
            {
                return 0;
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

        nextStep()
        {
            setTimeout(() => {

                if (this.count >= Object.keys(this.items).length ) {
                    return;
                }

                this.count = this.count + this.stepCount;

            }, this.stepTimer);
        }

    },

    data()
    {
        return {
            count: this.startCount
        };
    },

    mounted()
    {
        this.nextStep();
    },

    updated()
    {
        this.nextStep();
    },

    render(h)
    {
        let style = {
            minHeight: (Object.keys(this.items).length * this.itemHeight) + 'px'
        };

        return (
            <div class="n-render-list" style={style}>
                {
                    Arr.each(this.items.slice(0, this.count), (value, key) => {
                        return this.renderNode(h, value, key);
                    })
                }
            </div>
        );
    }

}
