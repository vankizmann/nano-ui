import { Obj, Arr, Str, Any, Dom } from "@kizmann/pico-js";

export default {

    name: 'NPreviewImage',

    props: {

        src: {
            default()
            {
                return null;
            }
        },

    },

    data()
    {
        return {
            init: false, load: false, tempSrc: null
        };
    },

    mounted()
    {
        this.resolveLoad();
    },

    watch: {

        'src': function () {
            this.resolveLoad();
        }

    },

    methods: {

        resolveLoad()
        {
            this.tempSrc = null;

            if ( Any.isObject(this.src) ) {
                this.resolveData();
            }

            Dom.find(this.$refs.image).loaded(() => {
                Any.delay(() => this.load = false, 25);
            });

            this.load = this.init = true;
        },

        resolveData()
        {
            let reader = new FileReader();

            reader.onload = () => {
                this.tempSrc = reader.result;
            };

            reader.readAsDataURL(this.src);
        }

    },

    render()
    {
        let classList = [
            'n-preview-image'
        ];

        if ( ! this.load ) {
            classList.push('n-ready');
        }

        return (
            <div class={classList}>
                <img ref="image" src={this.tempSrc || this.src} />
            </div>
        );
    }

}