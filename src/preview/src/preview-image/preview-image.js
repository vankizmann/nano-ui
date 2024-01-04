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
            load: false, tempSrc: null
        };
    },

    beforeMount()
    {
        if ( ! window.ImageCache ) {
            window.ImageCache = [];
        }
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
                return this.resolveData();
            }

            Dom.find(this.$refs.image).loaded(() => {

                /**
                 * Add image to cache
                 */
                Arr.add(window.ImageCache, this.src);

                /**
                 * Mark image as loaded
                 */
                Any.delay(() => this.load = false, 200);
            });

            this.load = true;
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

        // if ( Arr.has(window.ImageCache, this.src) ) {
        //     classList.push('n-cached');
        // }

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